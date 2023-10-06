'use client';
import styles from "./page.module.css"
import { useEffect, useState } from "react";
import Cardprofile from "@/app/front/components/CardProfile/Cardprofile"
import Minirecepiecard from "@/app/front/components/MiniRecepieCard/Minirecepiecard"
import Link from "next/link";

export default function Dashboard(){
    const [clientInfo,setClientInfo] = useState(0)
    const [recepies,setRecepies] = useState([])
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
 
     useEffect(()=>{
        async function getRecepies(){
            const request = await fetch('http://localhost:8080/getLimitRecepies',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ limit:4 })
            });
            const response = await request.json();
            return response;
        }
        getRecepies().then(data => setRecepies(data.recepies)) 
     },[])
    return(
        <section className={styles.container}>
            <Cardprofile  user={clientInfo}/>
            <div className={styles.dashboard}>
                <article>
                    <h2>Bonjour, <strong>{clientInfo.last_name}</strong></h2>
                    <p>Tu as besoin d’inspiration ? Jete un oeil aux nouvelles recettes</p>
                    <Link href={"/recettes"}>Voir les nouvelles recettes</Link>
                </article>
                <h2><strong>Recettes populaires</strong> de la semaine</h2>
                <div className={styles.recepiecontainer}>
                {
                    recepies.map((recepie,index)=>(
                        <Minirecepiecard recepie={recepie} key={index} />
                    ))
                } 
                </div>
                <h2><strong>Recette</strong> du jour</h2>
                {/* <div className={styles.recepieday}><Minirecepiecard  /></div> */}
            </div>
        </section>
    )
}