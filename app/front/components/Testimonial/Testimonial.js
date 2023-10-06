import Link from "next/link"
import Testimonialcard from "../TestimonialCard/Testimonialcard"
import styles from "./testimonial.module.css"



export default function Testimonial({number}){
    return(
        <>
        <div className={styles.testimonialcontainer}>
            {
                [1,2,3].map((value,index)=>(
                    <Testimonialcard key={index} />
                ))
            }
        </div>
        <div className={styles.seeallcontainer}>
            <Link href={"/testimonials"}>voir tout</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "#F97B22"}}><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg>
        </div>
        </>
    )
}