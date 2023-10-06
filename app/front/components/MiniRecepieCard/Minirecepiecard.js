import Link from "next/link";
import styles from "./minirecepiecard.module.css";

export default function Minirecepiecard({recepie,setIsActivate="",setIdRecepie="",isManager}){

    const morationColor=()=>{
        let color="";
        switch(recepie.moderation_state){
            case '0': color="#E87C30"
                break;
            case '1': color="#42FA49"
                break;
            default: color="#FF3D00"
                break;
        }
        return color;
    }
    
    return(
        <div className={styles.container}>  
            {/* {isManager&&
                setIdRecepie(recepie.id)
            }       */}
            <div>
                <img src={recepie.image?"http://localhost:8080/uploads/"+recepie.image:"http://localhost:3000/imgbase.png"} alt="recette" />
            </div>
            <div>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{fill: "#F9C74F"}}><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
                    4.2/5
                </span>
                <h3>{recepie.title.length > 10?recepie.title.substring(0,10)+"...":recepie.title}</h3>
                <div className={styles.align}>
                    <Link href={"/recettes/"+recepie.url}>Voir</Link>
                    {isManager&&<Link href={"mes-recettes/edition/"+recepie.url}>editer</Link>}
                </div>
            </div>
            {isManager&&
                <svg onClick={()=>{setIdRecepie(recepie.id);setIsActivate(true)}} className={styles.closebtn} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "#333333"}}><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            }
            {isManager && <svg className={styles.updatebtn} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{fill:morationColor()}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg>}
        </div>
    )
}