'use client';
import Link from "next/link";
import styles from "./page.module.css";
import { useRef } from "react";
export default function RegisterPage(){
        const first_nameRef = useRef(null);
        const last_nameRef = useRef(null);
        const emailRef = useRef(null);
        const passwordRef = useRef(null);
        const passwordConfRef = useRef(null);
        const fetchRegister = (evt)=>{ /**Penser à la sécurit ! faille XSS + encaodage bcrypte mdp" */
            const result = fetch('http://localhost:8080/register',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    first_name:first_nameRef.current.value,
                    last_name:last_nameRef.current.value,
                    email:emailRef.current.value,
                    password:passwordRef.current.value,
                    passwordConf:passwordConfRef.current.value
                })
            })
            evt.preventDefault()
            result.then(data=>data.json()).then(data=>alert(data.msg))
        }
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
                    <form onSubmit={fetchRegister}>
                        <input ref={first_nameRef} type="text" name="first_name" placeholder="Nom" />
                        <input ref={last_nameRef} type="text" name="last_name" placeholder="Prénom" />
                        <input ref={emailRef} type="email" name="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" name="password" placeholder="Mot de passe" />
                        <input ref={passwordConfRef} type="password" name="confpassword" placeholder="Confirmer le mot de passe" />
                        <button type="submit" className={styles.btnprimary}>Inscription</button>
                    </form>
                </div>
            </section>
        )

}