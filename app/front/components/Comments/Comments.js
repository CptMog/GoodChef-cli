import styles from "./comments.module.css"
import Commentcard from "../CommentCard/Commentcard"
export default function Comments({commtab}){
    return (
        <div className={styles.commscontainer}>
            <div>
                {
                    [1,2,3].map((comm,index)=>(
                        <Commentcard key={index} />
                    ))
                }
            </div>
            <button>charger plus</button>
        </div>
    )
}