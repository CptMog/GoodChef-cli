import Link from "next/link"
import styles from "./recepiecard.module.css"
import { useEffect, useState } from "react"
export default function Recepiecard({recepie}){
    const [user,setUser] = useState(0);
    const [comments,setComments] = useState([])
    useEffect(()=>{
        async function getUser(){
            const req = await fetch('http://localhost:8080/getUserById',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id:recepie.id_author})
            })
            const res = await req.json()
            return res;
        }

        async function getComments(){
            const req = await fetch('http://localhost:8080/getRecepieComment',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id_recepie:recepie.id})
            })
            const res = await req.json()
            return res;
        }

        getComments().then(data=>setComments(data.comments))
        getUser().then(data=>setUser(data.user))
    },[])


    return(
        <div className={styles.recepiecontainer}>
            <div>
                <img src={recepie.image?"http://localhost:8080/uploads/"+recepie.image:"http://localhost:3000/imgbase.png"} alt="dish" />
            </div>
            <div className={styles.data}>
                <Link href={"/recettes/"+recepie.url}><h3>{recepie.title}</h3></Link>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>
                         0.0 ({comments.length})
                    </span>
                    <span className={styles.textprimary}>
                        {  user != 0&&
                            "Par "+user.first_name    
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}