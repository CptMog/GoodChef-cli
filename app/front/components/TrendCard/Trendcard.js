import Link from "next/link"
import styles from "./trendcard.module.css"
import { useState,useEffect } from "react"

export default function Trendcard({id,recepie,recepies,setRecepies}){
    const [timeP,setTimeP] = useState([])
    const [timeR,setTimeR] = useState([])
    const [timeC,setTimeC] = useState([])
    const getTotalTime = ()=>{
        let hours = parseInt(timeP[0])+parseInt(timeR[0])+parseInt(timeC[0])
        let minutes = parseInt(timeP[1])+parseInt(timeR[1])+parseInt(timeC[1])

        if(minutes >= 60){
            minutes -= 60;
            hours++;
        }

        return `${hours}h${minutes}min`
           
    }

    useEffect(()=>{
        if(recepie !=0){
            setTimeP(recepie.time_prepare.split(/\h|\min/))
            setTimeR(recepie.time_rest.split(/\h|\min/))
            setTimeC(recepie.time_cooking.split(/\h|\min/))
        }
        
    },[recepie])

    const update = ()=>{
        setRecepies(recepies.map((value,index)=>{return {...value,state:value.id==id?true:false}}))
    }

    const contentNotHovered = ()=>(
        <>
            <img src={recepie.image?"http://localhost:8080/uploads/"+recepie.image:"http://localhost:3000/imgbase.png"} alt="recette" />
            <div className={styles.containerInfo}>
                <h3>{recepie.title.length>12?recepie.title.substring(0,9):recepie.title}</h3>
            </div>
        </>
    )
    
    const contentHovered = ()=>(
        <>
            <img src={recepie.image?"http://localhost:8080/uploads/"+recepie.image:"http://localhost:3000/imgbase.png"} alt="recette" />
            <div className={styles.containerInfoHov}>
                <h3><Link href={"/recettes/"+recepie.url}>{recepie.title}</Link></h3>
                <div>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(255, 255, 255, 1)",color:"white"}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                        <span>{getTotalTime()}</span>
                    </p>
                    {/* <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(255, 255, 255, 1)",color:"white"}}><path d="M16.5 8c0 1.5-.5 3.5-2.9 4.3.7-1.7.8-3.4.3-5-.7-2.1-3-3.7-4.6-4.6-.4-.3-1.1.1-1 .7 0 1.1-.3 2.7-2 4.4C4.1 10 3 12.3 3 14.5 3 17.4 5 21 9 21c-4-4-1-7.5-1-7.5.8 5.9 5 7.5 7 7.5 1.7 0 5-1.2 5-6.4 0-3.1-1.3-5.5-2.4-6.9-.3-.5-1-.2-1.1.3"></path></svg>
                        <span>350 kcal</span>
                    </p> */}
                </div>
            </div>
        </>
    )

    return(
        <div onMouseEnter={update} className={recepie.state?styles.containerHov : styles.container}>
            {
                recepie.state?contentHovered():contentNotHovered()
            }
        </div>
    )
}