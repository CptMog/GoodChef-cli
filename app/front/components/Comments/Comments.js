import styles from "./comments.module.css"
import Commentcard from "../CommentCard/Commentcard"
import { useEffect, useState } from "react"
export default function Comments({recepie,id_client}){
    const [comments,setComments] = useState([]); 
    const [updateComment,setUpdateComment] = useState(1);
    const [isSomeoneEditing,setIsSomeoneEditing] = useState(false);
    const [timeCheck,setTimeCheck] = useState('');
    const [clientInfo,setClientInfo] = useState(0);
    const sendComment = async (evt)=>{
        evt.preventDefault();
        const form = new FormData(evt.target);
        await fetch("http://localhost:8080/createComment",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id_recepie:recepie.id,id_user:id_client,description:form.get('description')})
        })
        setUpdateComment(updateComment+1)
    }
    useEffect(()=>{
        async function getComments(){
            const req = await fetch('http://localhost:8080/getRecepieComment',{
                method:'POST', 
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id_recepie:recepie.id})
            });
            const res = await req.json();
            return res;
        }
        getComments().then(data=>setComments(data.comments))
        setTimeout(()=>{
            const wrapper = document.querySelector('div#wrapper');
            const textarea = document.querySelector('textarea#description');
            if(textarea){
                textarea.value=''
            }
            wrapper.scrollTop = wrapper.scrollHeight;
        },10)
    },[updateComment])

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
        const idTime=localStorage.getItem('sessionID') != null?setInterval(() => {
            if(localStorage.getItem('sessionID') != null){
                setIsSomeoneEditing(true)
            }else{
                setIsSomeoneEditing(false)
                clearInterval(timeCheck)
            }
        }, 500):"";
        
        setTimeCheck(idTime)
        
    },[])

    return (
        <div className={styles.commscontainer}>
            <h2>Commentaire(s) {comments.length > 0?`(${comments.length})`:'(0)'}</h2>
                
            <div id="wrapper" className={styles.wrapper}>
                {
                    comments.map((comm,index)=>(
                        <Commentcard key={index} setUpdateComment={setUpdateComment} comment={comm}/>
                    ))
                }
                { isSomeoneEditing ?
                    <div className={styles.formcontainer}>
                        <form onSubmit={sendComment}>
                            { clientInfo != 0&&
                                <img src={clientInfo != null?'http://localhost:8080/uploads/'+clientInfo.image:"http://localhost:3000/imgbase.png"} alt="profile" />
                            }
                            <div className={styles.containerText}>
                                <textarea id="description" name="description" placeholder="Écrivez un commmentaire..." className={styles.commentInput} ></textarea>
                                <button>Envoyer</button>
                            </div>
                            
                            {/* <div><button type="submit">Envoyer</button></div> */}
                        </form>
                    </div>
                    :
                    <></>
                }
            </div>

        </div>
    )
}