import styles from "./testimonialcard.module.css";

export default function Testimonialcard({user}){
    return(
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src="https://picsum.photos/200" alt="avatar"/>
            </div>
            <div className={styles.datatestimonial}>
                <h2>Name of person</h2>
                <p><small>profession</small></p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies lobortis nisi, ut efficitur diam aliquet et.</p>
            </div>
        </div>
    )
} 