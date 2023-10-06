import styles from "./commentcard.module.css"
export default function Commentcard({comments}){
    
    return(
        <div className={styles.commcard}>
            <div>
                <img className={styles.profile} src={"http://localhost:3000/imgbase.png"} alt="profile"/>
                <div className={styles.info}>
                    <span>Name of a person</span>
                    <div>
                        <img className={styles.stars} src={"/assets/4_starhalf.png"} alt="notation" />
                    </div>
                    <p>
                        Ut quis egestas lacus. Duis finibus, arcu quis eleifend dapibus, nulla quam aliquam ligula, vitae malesuada dui quam quis lacus. Donec vitae auctor ex. Proin auctor porttitor augue, sit amet imperdiet risus
                    </p>
                </div>
            </div>
            <p className={styles.text}>
                Ut quis egestas lacus. Duis finibus, arcu quis eleifend dapibus, nulla quam aliquam ligula, vitae malesuada dui quam quis lacus. Donec vitae auctor ex. Proin auctor porttitor augue, sit amet imperdiet risus
            </p>
        </div>
    )
} 