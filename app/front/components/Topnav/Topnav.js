import Link from "next/link";
import styles from "./topnav.module.css"
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Topnav(){
    let [clicked,setClicked] = useState(0);
    const [clientInfo,setClientInfo] = useState(0);
    const [isOvered,setIsOvered] = useState(false);
    const logOutUser = async()=>{
        const idSession = localStorage.getItem('sessionID');
        await fetch("http://localhost:8080/logout",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionID:idSession })
        })
        setClientInfo(0)
        localStorage.clear()
    }
    const logSystem = ()=>{
        return clientInfo != 0?
            <div onMouseEnter={()=>setIsOvered(true)} onMouseLeave={()=>setIsOvered(false)} className={styles.avatarContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
                <img src={clientInfo.image == null?"http://localhost:3000/imgbase.png":"http://localhost:8080/uploads/"+clientInfo.image} width={64} height={64} alt="profile" />
                {
                    isOvered?
                    <div className={styles.profileMenu}>
                        <ul>
                            <li><Link href={"/dashboard"}>Dashboard</Link></li>
                            {clientInfo.is_admin == 1?<li><Link href={"/manager"}>Administration</Link></li>:<></>}
                            <li><hr/></li>
                            <li onClick={logOutUser}>Déconnexion</li>
                        </ul>
                    </div>
                    :<></>
                }
            </div>
        :
            <div className={styles.containerLogin}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
                <Link href={"/connexion"}>connexion</Link>
                <Link href={"/inscription"}><button className={styles.registration}>inscription</button></Link>
            </div>
    }

    useEffect(()=>{
        async function getSession(){
             const idSession = localStorage.getItem('sessionID');
             const result =await fetch('http://localhost:8080/logged',{ 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionID:idSession })
             })
             const res = await result.json()
             setClientInfo(res.user); 
        } 
        getSession()
     },[])
    return(
        <>
        <header className={styles.header}>
            <nav className={styles.nav}>
                
                    
                    <button className={styles.iconButton} onClick={()=>setClicked(!clicked)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                    </button>

                    <ul className={styles.listNaviation+" "+(clicked == 1 ? styles.open : styles.close)}>
                        <li className={styles.list}><Link href={"/recettes"}>Recettes</Link></li>
                        <li className={styles.list}><Link href={"#"}>Chef's Blog</Link></li>
                        <li className={styles.list}><Link href={"#"}>A propos</Link></li>
                        <li className={styles.list}><Link href={"#"}>Contact</Link></li>
                    </ul>
                    
                    <Link href={"/"}>
                        <Image src={"/logo.svg"} alt="Logo du site" width={99} height={65} />
                    </Link>
                
                    {logSystem()}
            </nav>
        </header>
        <div className={styles.submenuConatainer}>
            <ul>
                <li><Link href={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path></svg></Link></li>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg></li>
                <li><Link href={"/recettes"}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z"></path><path d="M8 6h9v2H8z"></path></svg></Link></li>
                <li><Link href={"/connexion"}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg></Link></li>
            </ul>
        </div>
        </>
    )
}