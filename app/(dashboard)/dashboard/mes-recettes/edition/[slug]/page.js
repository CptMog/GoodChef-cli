'use client';
import { useState,useEffect } from "react";
import EditionForm from "@/app/front/layouts/recepieForm";

export default function updateRecepie({params}){
    const [recepie,setRecepie] = useState(0)
    useEffect(()=>{ 
        async function getARecepie(){
            const req = await fetch('http://localhost:8080/getARecepie',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({url:params.slug})
            })
            const res = await req.json()
            return res;
        }
        getARecepie().then(data=>setRecepie(data.recepie))
    },[])

    return(
        <>
            <EditionForm  isRecepieEdited={true} recepie={recepie}/>
        </>
    )
}