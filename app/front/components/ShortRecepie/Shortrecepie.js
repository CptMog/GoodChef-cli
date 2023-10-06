import Link from "next/link";
import styles from "./shortrecepie.module.css";

export default function Shortrecepie({recepie}){
    return(
        <div className={styles.container}>
            <div>

            </div>
            <div>
                <h3><Link href={"/recettes/link"}>Title of the dish</Link></h3>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{fill:"#333"}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                    25min
                </span>
            </div>
        </div>
    )
}