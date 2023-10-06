'use client';
import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
export default function Compte(){
    const router = useRouter()
    const [isDeleted,setIsDeleted] = useState(false);
    const [clientInfo,setClientInfo] = useState(0);
    const [isInputPasswordActivated,setisInputPasswordActivated] = useState(-1);
    const [openModal,setOpenModal] = useState(-1);
    const [userUpdated,setUserUpdated] = useState(0);
    const [stateAccount,setStateAccount]= useState(0);
    const [formValue,setFormValue] = useState('')

    const sendUpdate = async (evt)=>{   

        await fetch('http://localhost:8080/update',{ 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...clientInfo})
         })
         await fetch('http://localhost:8080/uploads',{ 
            method:'POST',
            body:new FormData(formValue)
        })
       setOpenModal(-1);
       setUserUpdated(userUpdated+1)
    }
    const sendDelete = async ()=>{
        const result = await fetch('http://localhost:8080/delete',{  
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...clientInfo,sessionID:localStorage.getItem("sessionID")})
         })   
         result.json().then(data=>{
            if(data.isDelete){
                localStorage.clear()
                setIsDeleted(true)
            }
         })
    }

    const dialogTemplate=()=>(
        <dialog className={styles.modal} open>
            <div className={styles.head}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setOpenModal(openModal*-1)} width="24" height="24" viewBox="0 0 24 24" style={{fill:"rgba(0, 0, 0, 1)"}}><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path></svg>
            </div>
            <h2>Veuillez confirmer votre mot de passe</h2>
            <div className={styles.inputformated}>
                <label>Mot de passe</label>
                <input type="password"  onChange={(evt)=>setClientInfo((cliInfo)=>cliInfo = {...cliInfo,passwordConf:evt.target.value})} name="passwordConf" />
            </div>
            <div>
                <button onClick={(evt)=>{
                    if(stateAccount == 1){
                        sendUpdate(evt)
                    }else{
                        sendDelete()
                    }
                }} className={styles.btn}>
                    Confirmer
                </button>
            </div>
            
        </dialog>
    )
    useEffect(()=>{
        if(isDeleted){ 
            router.push("/connexion")
        }
    },[isDeleted])
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
             setClientInfo(infos=> infos = {...infos,newPassword:""})  
        } 
        getSession()
        
     },[userUpdated])

    return(
        <section className={styles.container}>
            {openModal == 1 &&
            dialogTemplate()}
            <h2>Compte</h2>
            <form onClick={(evt)=>setFormValue(evt.currentTarget)}> 
                <h3>Information général</h3>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <img src={clientInfo.image == null?"http://localhost:3000/imgbase.png":"http://localhost:8080/uploads/"+clientInfo.image} alt="profile" />
                        <input type="file" accept="image/*" /*value={clientInfo.image!=null?clientInfo.image:""}*/ onChange={(evt)=>setClientInfo((cliInfo)=>cliInfo = {...cliInfo,image:evt.target.files[0].name})}  name="image" />    
                        <div className={styles.authorized}>
                            <input type="checkbox" onChange={()=>setisInputPasswordActivated(isInputPasswordActivated*-1)} name="authorized" />
                            <label>Modifier le mot de passe</label>
                        </div>
                        { isInputPasswordActivated == 1 &&
                        <div className={styles.inputformated}>
                            <label>Mot de passe</label>
                            <input type="password" onChange={(evt)=>setClientInfo(infos=> infos = {...infos,newPassword:evt.target.value})} name="newPassword" />
                        </div>
                        }
                        
                    </div>
                    <div className={styles.right}>
                        <div className={styles.inputformated}>
                            <label>Nom</label>
                            <input type="text" defaultValue={clientInfo.first_name}  onChange={(evt)=>setClientInfo((cliInfo)=>cliInfo = {...cliInfo,first_name:evt.target.value})} name="first_name" />
                        </div>
                        <div className={styles.inputformated}>
                            <label>Prénom</label>
                            <input type="text" defaultValue={clientInfo.last_name} onChange={(evt)=>setClientInfo((cliInfo)=>cliInfo = {...cliInfo,last_name:evt.target.value})} name="last_name" />
                        </div>
                        <div className={styles.inputformated}>
                            <label>Émail</label>
                            <input type="mail"defaultValue={clientInfo.email} onChange={(evt)=>setClientInfo((cliInfo)=>cliInfo = {...cliInfo,email:evt.target.value})} name="mail" />
                        </div>
                        <div className={styles.inputformated}>
                            <label htmlFor="desc">Descriptions:</label>
                            <textarea id="desc" defaultValue={clientInfo.description} onChange={(evt)=>setClientInfo((cliInfo)=>cliInfo = {...cliInfo,description:evt.target.value})}  name="desc" rows="13" cols="33"></textarea>
                        </div>
                    </div>
                </div>
            </form>
            <div className={styles.alignbuttons}>
                <button onClick={()=>{
                    setOpenModal(openModal*-1)
                    setStateAccount(1) //update
                    }}>
                    Enregistrer
                </button>
                <button onClick={()=>setOpenModal(openModal*-1)}>
                    Supprimer mon compte
                </button> 
            </div>
            
        </section>
    )
}