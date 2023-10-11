import { useEffect, useState } from "react"
import styles from "./commentcard.module.css"
export default function Commentcard({comment,setUpdateComment}){
    const [user,setUser] = useState(0)
    const [clientInfo,setClientInfo] = useState(0);
    const [stateUpdate,setStateUpdate] = useState(false)
    const deleteComment = async ()=>{
        await fetch('http://localhost:8080/deleteComment',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:comment.id})
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.state == 1){
                setUpdateComment(state=>state+1)
                setStateUpdate(false)
            }else{
                alert(data.msg)
            }
        })
    }

    const updateComment = async(evt)=>{
        evt.preventDefault();
        const form = new FormData(evt.target)
        await fetch('http://localhost:8080/updateComment',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:comment.id,id_recepie:comment.id_recepie,id_user:clientInfo.id,description:form.get('description')})
        })
        .then(data => data.json())
        .then(data =>{
            if(data.state){ 
                setUpdateComment(state=>state+1)
                setStateUpdate(false) 
            }
        })
    }

    useEffect(()=>{
        async function getSession(){
             const idSession = localStorage.getItem('sessionID');
             const result =await fetch('http://localhost:8080/logged',{ 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionID:idSession })
             })
             const res = await result.json()
             setClientInfo(res.user); 
        }
        if(localStorage.getItem('sessionID') != null) 
            getSession()
     },[])
    useEffect(()=>{
        async function getUser(){
            const req = await fetch('http://localhost:8080/getUserById',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id:comment.id_user})
            })
            const res = req.json()
            return res;
        }
        getUser().then(data=>setUser(data.user))
    },[])

    return( 
        
        <div className={styles.commcard}> 
            <div>
                <img className={styles.profile} src={user.image != null?"http://localhost:8080/"+user.image:"http://localhost:3000/imgbase.png"} alt="profile"/>
                <div className={styles.info}>
                
                    <span>{user.first_name+' '+user.last_name}</span>
                    { !stateUpdate?
                        <p>{comment.description}</p>
                       :
                       <form onSubmit={updateComment} className={styles.desktopText}>
                            <textarea id="updateComm" name="description" defaultValue={comment.description} className={styles.updateComm}></textarea>
                            <div><button type="submit">Modifier</button></div>
                       </form>
                    }
                    
                </div>
                {
                        clientInfo.id == user.id && localStorage.getItem("sessionID") != null &&
                        <div className={styles.editions}>
                            <svg onClick={deleteComment} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                            <svg onClick={()=>setStateUpdate(!stateUpdate)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z"></path></svg>
                        </div>        
                    }
            </div>
            
            { !stateUpdate?
                <p className={styles.text}>
                    {comment.description}
                </p>
                :
                <form className={styles.MobileText}>
                    <textarea id="updateComm" name="description" defaultValue={comment.description} className={styles.updateComm}></textarea>
                    <div><button type="submit">Modifier</button></div>
                </form>
            }
            
        </div> 
    )
} 