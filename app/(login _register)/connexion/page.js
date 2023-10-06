'use client';
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
// import { cookies } from 'next/headers'

export default function LoginPage(){
    const [isloginauthorized,setIsLoginAuthorized] = useState(false);
    const[message,setMessage] = useState("")
    const emailRef = useRef(null);
    const router = useRouter();
    const passwordRef = useRef(null);
    const fetchLogin=async(evt)=>{ /**Penser à la sécurit ! faille XSS + encaodage bcrypte mdp"*/
        evt.preventDefault();
        const result =await fetch('http://localhost:8080/login',{ 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:emailRef.current.value,password:passwordRef.current.value})
        })
        
        await result.json().then((data) =>{
            if(data.authorized){
                localStorage.setItem("sessionID",data.sessionID)
                setIsLoginAuthorized(true) 
            }
            setMessage(data.msg)
            
        })
        
    }
    
    useEffect(()=>{
        if(isloginauthorized || localStorage.getItem("sessionID")){ 
            router.push("/dashboard")
        }
    },[isloginauthorized])
    
    return(
        <section className={styles.container}>
            <div className={styles.wallpaper}>
                <img src={"http://localhost:3000/wallpaper.jpg"} alt="wallpaper" />
            </div>
            <div>
                <Link href={'/'} className={styles.close}>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                </Link>
                <img src="http://localhost:3000/logo.svg" alt="logo" />
                <Link className={styles.btn} href={"/"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                        <path d="M3.15283 7.3455L6.43833 9.755C7.32733 7.554 9.48033 6 11.9998 6C13.5293 6 14.9208 6.577 15.9803 7.5195L18.8088 4.691C17.0228 3.0265 14.6338 2 11.9998 2C8.15883 2 4.82783 4.1685 3.15283 7.3455Z" fill="#FF3D00"/>
                        <path d="M12.0002 22C14.5832 22 16.9302 21.0115 18.7047 19.404L15.6097 16.785C14.5719 17.5742 13.3039 18.001 12.0002 18C9.39916 18 7.19066 16.3415 6.35866 14.027L3.09766 16.5395C4.75266 19.778 8.11366 22 12.0002 22Z" fill="#4CAF50"/>
                        <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                    </svg> 
                    se connectez avec Google
                </Link>
                <form onSubmit={fetchLogin}>
                    <span>Ou</span>
                    <input ref={emailRef} type="email" name="email" id="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" name="password" id="password" placeholder="Mot de passe" />
                    <Link href={"/forgot"}>mot de passe oublier</Link>
                    <button type="submit" className={styles.btnprimary}>Connexion</button>
                </form>
                {message}
            </div>
        </section>
    )

}