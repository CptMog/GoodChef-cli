import Link from "next/link";
import styles from "./bigrecepiecard.module.css";
import { useState,useEffect } from "react";
export default function Bigrecepiecard({recepie}){
    const [tags,setTags] = useState([])
    const [catagories,setCategories] = useState([])
    useEffect(()=>{
        async function getClass(){
            const req = await fetch('http://localhost:8080/getClassificationsByRecepie',{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({ id_recepie:recepie.id})
            })
            .then(data=>data.json())
            .then(data => setTags(data.classifications))
        }
        getClass()
    },[])

    useEffect(()=>{
        async function getCategories(id){
           
            await fetch('http://localhost:8080/getACategorie',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id:id})
            })
            .then(data=>data.json())
            .then(data => setCategories([...catagories,data.catagorie]))
        }
        if(tags.length > 0){
            tags.map(value => getCategories(value.id_category))
        }
    },[tags])
    useEffect(()=>{ 
    },[catagories])
    return(
        <div className={styles.slide}>
            <img src={recepie.image?"http://localhost:8080/uploads/"+recepie.image:"http://localhost:3000/imgbase.png"} alt="Recette du jour" />
            <div>
                <div  className={styles.categriestag}>
                {/* {
                    catagories.map((tag,index)=>( 
                        <span key={index}>{tag.name}</span>
                    ))
                } */}
                </div>
                <Link href={"/recettes/"+recepie.url}>
                    <h2>{recepie.title}</h2>
                </Link>
            </div>
        </div>
    )
}