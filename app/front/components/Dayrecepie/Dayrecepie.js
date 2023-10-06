
import { useEffect,useState } from "react"
import styles from "./dayrecepie.module.css"
import Link from "next/link"
export default function Dayrecepie(){
    const [recepieDay,setRecepieDay] = useState(0)
    useEffect(()=>{
        async function getDayRecepie(){
           const req = await fetch('http://localhost:8080/getRecepieUne')
           const res = await req.json()
           return res;
        }
        getDayRecepie().then(data=>setRecepieDay(data.recepie))
    },[])

    return(
        <div className={styles.align}>
            <div>
                <img src={recepieDay.image?"http://localhost:8080/uploads/"+recepieDay.image:"http://localhost:3000/imgbase.png"} alt="Recette du jour" />
            </div>
            <div className={styles.infos}> 
                <h2>{recepieDay.title}</h2>
                <p>{recepieDay.description}</p>
                <div>
                    <Link className={styles.link} href={"/recettes/"+recepieDay.url}>Voir la recette</Link>
                </div>
                
            </div>
        </div>
    )
}