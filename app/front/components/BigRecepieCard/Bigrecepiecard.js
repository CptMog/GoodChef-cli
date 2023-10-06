import Link from "next/link";
import styles from "./bigrecepiecard.module.css";

export default function Bigrecepiecard({recepie}){

    return(
        <div className={styles.slide}>
            <img src={recepie.image?"http://localhost:8080/uploads/"+recepie.image:"http://localhost:3000/imgbase.png"} alt="Recette du jour" />
            <div>
                <div className={styles.categriestag}>
                    <span>Tag</span>
                </div>
                <Link href={"/recettes/"+recepie.url}>
                    <h2>{recepie.title}</h2>
                </Link>
            </div>
        </div>
    )
}