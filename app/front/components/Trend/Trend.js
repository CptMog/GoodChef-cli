import { useEffect, useState } from "react";
import Trendcard from "../TrendCard/Trendcard";
import styles from "./trend.module.css";

export default function Trend(){

    const [recepies,setRecepies] = useState([])

    const getTrendings = async (limit)=>{
        const req = await fetch("http://localhost:8080/getTrendings",{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({limit:limit})
        })
        const res = await req.json()
        return res;
    }

    useEffect(()=>{
        
        if(window.innerWidth <= 660){ 
            getTrendings(1).then(data=>setRecepies(data.recepies.map((value,index)=>{return {...value,state:index==0?true:false}})))
        }

        if(661 <= window.innerWidth && window.innerWidth < 1023){
            getTrendings(3).then(data=>setRecepies(data.recepies.map((value,index)=>{return {...value,state:index==0?true:false}})))
        }
        
        if(window.innerWidth > 1023){
            getTrendings(5).then(data=>setRecepies(data.recepies.map((value,index)=>{return {...value,state:index==0?true:false}})))
        }

        window.addEventListener("resize", (event) => {

            if(window.innerWidth <= 660){ 
                getTrendings(1).then(data=>setRecepies(data.recepies.map((value,index)=>{return {...value,state:index==0?true:false}})))
            }
    
            if(661 <= window.innerWidth && window.innerWidth < 1023){
                getTrendings(3).then(data=>setRecepies(data.recepies.map((value,index)=>{return {...value,state:index==0?true:false}})))
            }
            
            if(window.innerWidth > 1023){
                getTrendings(5).then(data=>setRecepies(data.recepies.map((value,index)=>{return {...value,state:index==0?true:false}})))
            }
        });
    },[])
    return (
        <>
       <div className={styles.titleContainer}>
            <h2>Tendance</h2>
       </div>
        <div className={styles.container}>
            {
                recepies.map((recepie,index)=>(
                     <Trendcard key={index} id={recepie.id} setRecepies={setRecepies} recepies={recepies} recepie={recepie} />
                ))
            }
        </div>
        </>
    )
}