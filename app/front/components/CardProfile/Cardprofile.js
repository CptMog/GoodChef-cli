import Link from "next/link";
import styles from "./cardprofile.module.css";
import Shortrecepie from "../ShortRecepie/Shortrecepie";

export default function Cardprofile({user,user_collection,user_stats}){
    const imageUser = ()=>{
        return user.image != null?"http://localhost:8080/uploads/"+user.image:"http://localhost:3000/imgbase.png";
    }
    return(
        <div className={styles.container}>
            <figure>
                <div className={styles.circle}>
                    <img src={imageUser()} alt="profile photo" />
                </div>
                <figcaption>{user.first_name+" "+user.last_name}</figcaption>
            </figure>
            <div>
                {/* <div>
                    <span>13</span>
                    <span>Recettes</span>
                </div>
                <div>
                    <span>1,073</span>
                    <span>Abonnez</span>
                </div>
                <div>
                    <span>22</span>
                    <span>Abonnement</span>
                </div> */}
            </div>
            <div>
                <h2>Recettes sauvegardées</h2>
                {
                    [1,2,3,4,5,6,7].map((recepie,index)=>(
                        <Shortrecepie key={index} />
                    ))
                }
                <Link href={"/dashboard/sauvegrder"}>VOIR TOUT</Link>
            </div>
        </div>
    )
} 