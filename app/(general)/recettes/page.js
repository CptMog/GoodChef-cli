'use client';
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import Recepiecard from "@/app/front/components/RecepieCard/Recepiecard";
import { useState,useEffect } from "react";

export default function RecetteHome(){
    const [typeDishOpenState,setTypeDishOpenState] = useState(0);
    const [sandwishOpenState,setSandwishOpenState] = useState(0);
    const [recepies,setRecepies] = useState([])
    useEffect(()=>{
        
        async function getRecepies(){
            const req = await fetch('http://localhost:8080/getRecepies');
            const res = await req.json();
            return res;
        }
        
        // setInterval(()=>{
            getRecepies()
            .then(data=>setRecepies(data.recepies))
        // },2000)

    },[])
    return(
        <main className={styles.container}>
            <title>GoodChef: Toutes nos recettes</title>
            <meta name="description" content="La plateforme Goodchef permet de trouver des recettes délicieuses"/>
            <meta name="keywords" content="recette,chef" />
            <meta property="og:title" content="GoodChef" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://localhost:3000/" />
            <meta property="og:description" content="La plateforme Goodchef permet de trouver des recettes délicieuses" />
            <div className={styles.banner}>
                <div>
                    <h1>Bienvenue dans notre livre de recettes</h1>
                    <p>Ce recueille de recettes est alimenter par la
    communauté de <strong>Good CHEF</strong>. Vous souhaitez y contribuer ?</p>
                    <Link className={styles.btnprimary} href={"#"}>En savoir plus</Link>
                </div>
                <Image src={"/original.svg"} alt="image" width={427}  height={261} />
            </div>
            <div className={styles.containerrecepie}>
                {/* <div className={styles.filtercontainer}>
                    <strong>Flitrer par : </strong>
                    <div className={styles.align}>
                        <span>Vinqueur concour</span>
                        <input type="checkbox" className={styles.checker} />
                    </div>
                    <div className={styles.align}>
                        <span>Test cuisine approuvé</span>
                        <input type="checkbox" className={styles.checker} />
                    </div>
                    <div className={styles.blockfilter}>
                        <div className={styles.align} onClick={()=>setTypeDishOpenState(!typeDishOpenState)}>
                            <span className={styles.titleFilter}>Type de plat</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                        </div>
                        {
                            typeDishOpenState
                            ?
                                <ul>
                                    <li>Viande</li>
                                    <li>Poulet</li>
                                    <li>Poisson</li>
                                    <li>Salade</li>
                                    <li>Crustacés</li>
                                    <li>Pizza</li>
                                    <li>Pâtes</li>
                                </ul>
                            :
                            <></>
                        }
                    </div>
                    <div className={styles.blockfilter}>
                        <div className={styles.align} onClick={()=>setSandwishOpenState(!sandwishOpenState)}>
                            <span className={styles.titleFilter}>Sandwish</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                        </div>
                        {
                            sandwishOpenState
                            ?
                                <ul>
                                    <li>Sandwish</li>
                                    <li>Hambuger</li>
                                    <li>Croque-monsieur</li>
                                    <li>Bagels</li>
                                    <li>Pita</li>
                                    <li>Kebab</li>
                                </ul>
                            :
                            <></>
                        }
                    </div>
                </div> */}
                <section>
                    <div className={styles.searchfiltercontainer}>
                        <div className={styles.searchBar}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
                            </div>
                            <input type="search" id="searchF" name="searchF" placeholder="Recherchez..." />
                        </div>
                        {/* <button className={styles.btnprimary}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(255, 255, 255, 1)"}}><path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path></svg>
                            filtre
                        </button> */}
                        <div className={styles.sort}>
                            <span>Trier par :</span>
                            <select>
                                <option value={""}>Le plus récent</option>
                                <option value={""}>note</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.recepies}>
                            {
                                recepies.map((recepie,index)=>(
                                    <Recepiecard key={index} recepie={recepie} />
                                ))
                            }
                        </div>
                        {/* <button className={styles.btnprimary}>
                            Charger
                        </button> */}
                    </div>
                </section>
            </div>
        </main>
    )
}