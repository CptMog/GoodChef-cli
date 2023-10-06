"use client";
import Minirecepiecard from "@/app/front/components/MiniRecepieCard/Minirecepiecard";
import styles from "./page.module.css";
import { useEffect,useState } from "react";
import Link from "next/link";

export default function MyRecepies(){
    const [myRecepies,setMyRecepies] = useState([]);
    const [clientInfo,setClientInfo] = useState(0);
    const [isActivate,setIsActivate] = useState(false);
    const [idRecepie,setIdRecepie] = useState(0);
    const [reloadData,setReloadData] = useState(1);
    const sendDelete = async ()=>{
        const result = await fetch('http://localhost:8080/deleteRecepie',{  
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id:idRecepie,id_author:clientInfo.id,passwordConf:clientInfo.passwordConf})
         })   
         result.json().then(data=>{
            if(data.state){
                setIsActivate(false)
                setReloadData(reloadData+1)
            }
         })
         
    }
    const dialogTemplate=()=>(
        <dialog className={styles.modal} open>
            <div className={styles.head}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setIsActivate(false)} width="24" height="24" viewBox="0 0 24 24" style={{fill:"rgba(0, 0, 0, 1)"}}><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path></svg>
            </div>
            <h2>Veuillez confirmer votre mot de passe</h2>
            <div className={styles.inputformated}>
                <label>Mot de passe</label>
                <input type="password"  onChange={(evt)=>setClientInfo((cliInfo)=>cliInfo = {...cliInfo,passwordConf:evt.target.value})} name="passwordConf" />
            </div>
            <div>
                <button onClick={()=>{
                    sendDelete()
                }}>
                    Confirmer
                </button>
            </div>     
        </dialog>
    )
    useEffect(()=>{
        async function getMyRecepies(){
            const request = await fetch('http://localhost:8080/myRecepies',{ 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_author:clientInfo.id})
            })
            const response = await request.json()
            return response;
        }
        if(clientInfo != 0){
            getMyRecepies().then(data => setMyRecepies(data.recepies))
        }
        
    },[reloadData,clientInfo])
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
        getSession()
     },[])

    return(
        <section className={styles.container}>
            {isActivate&&
                dialogTemplate()
            }
            <h2>Mes recettes</h2>
            <div className={styles.filters}>
                <select>
                    <option value={""}>filtrer par categorie</option>
                </select>
                <button>
                    trier
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "#fff"}}><path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path></svg>
                </button>
            </div>
            <div className={styles.wrapper}>
                <section className={styles.myrecepies}>
                    <div className={styles.addnewrecepie}>
                        <h3>Ajouter une nouvelle recette</h3>
                        <Link href={"mes-recettes/edition"}>ajouter</Link>
                    </div>
                    {
                        myRecepies.map((recepie,index)=>(
                            <Minirecepiecard key={index} setIsActivate={setIsActivate} setIdRecepie={setIdRecepie} isManager={true} recepie={recepie} />
                        ))
                    }
            </section>
            </div>
        </section>
    )
}