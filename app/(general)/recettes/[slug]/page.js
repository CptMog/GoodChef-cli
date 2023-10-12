'use client';
import styles from "./page.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState,useEffect } from "react";
import Comments from "@/app/front/components/Comments/Comments";
import Link from "next/link";

export default function RecepieView({params}){
    const [portion,setPortion] = useState(1);
    const [recepie,setRecepie] = useState(0);
    const [recepies,setRecepies] = useState([]);
    const [steps,setSteps] = useState([]);
    const [ingredients,setIngredients] = useState([]);
    const [clientInfo,setClientInfo] = useState(0);
    const [comments,setComments] = useState([]);
    const [timeP,setTimeP] = useState([])
    const [timeR,setTimeR] = useState([])
    const [timeC,setTimeC] = useState([])
    const getTotalTime = ()=>{
        let hours = parseInt(timeP[0])+parseInt(timeR[0])+parseInt(timeC[0])
        let minutes = parseInt(timeP[1])+parseInt(timeR[1])+parseInt(timeC[1])

        if(minutes >= 60){
            minutes -= 60;
            hours++;
        }

        return `${hours}h${minutes}min`
           
    }
    
    useEffect(()=>{
        async function getComments(){
            const req = await fetch('http://localhost:8080/getRecepieComment',{
                method:'POST', 
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id_recepie:recepie.id})
            });
            const res = await req.json();
            return res;
        }
        if(recepie != 0)
            getComments().then(data=>setComments(data.comments))
    },[recepie])
    const addPortion = ()=>{
        setPortion(portion+1);
    }
    const removePortion = ()=>{
        if(portion <= 1){
            setPortion(1)
        }else{
            setPortion(portion-1)
        }
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
        if(localStorage.getItem('sessionID') != null) 
            getSession()
     },[])
    
    useEffect(()=>{
        if(recepie !=0){
            setTimeP(recepie.time_prepare.split(/\h|\min/))
            setTimeR(recepie.time_rest.split(/\h|\min/))
            setTimeC(recepie.time_cooking.split(/\h|\min/))
        }
        
    },[recepie])

    useEffect(()=>{
        
        async function getARecepie(){
            const req = await fetch('http://localhost:8080/getARecepie',{
                method:'POST',
                headers: {'content-type':'application/json'},
                body:JSON.stringify({url:params.slug})
            });
            const res = await req.json();
            return res;
        }

        async function getRecepies(){
            const req = await fetch('http://localhost:8080/getRecepies');
            const res = await req.json();
            return res;
        }
        getRecepies()
        .then(data=>setRecepies(data.recepies))
        
        getARecepie()
        .then(data=>setRecepie(data.recepie))


    },[])

    useEffect(()=>{
        if(recepie != 0){
            setIngredients(JSON.parse(recepie.ingredients))
            setSteps(JSON.parse(recepie.steps))
        }
    },[recepie])

    return(
        <main className={styles.container}>
            <aside className={styles.visual}>
                <Swiper
                    className={styles.assets}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                      }}
                      spaceBetween={10}
                      modules={[Autoplay, Pagination, Navigation]}
                    loop={true}
                >
                    {
                        // [1,2,3,4,5].map((photo,index)=>(
                            <SwiperSlide ><img src={recepie.image?"http://localhost:8080/uploads/"+recepie.image:"http://localhost:3000/imgbase.png"} alt="imag" /></SwiperSlide>
                        // ))
                    }
                </Swiper>
                <div className={styles.ingredients}>
                    <h2>Ingredients</h2>
                    {/* <div className={styles.portions}>
                        <div onClick={removePortion}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <g clipPath="url(#clip0_350_345)">
                                <path d="M16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32ZM24 14.4H8V17.6H24V14.4Z" fill="#A3A3A3"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_350_345">
                                <rect width="32" height="32" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        </div>
                        <span>
                        {
                            portion == 1 ? portion+" portion" : portion+" portions"
                        }
                        </span>
                        <div onClick={addPortion}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <g clipPath="url(#clip0_350_348)">
                                <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#E87C30"/>
                                <path d="M14 9.3335H18V22.6668H14V9.3335Z" fill="white"/>
                                <path d="M9.33325 14H22.6666V18H9.33325V14Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_350_348">
                                <rect width="32" height="32" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        </div>
                    </div> */}
                    <ul className={styles.composnant}>
                        {
                            ingredients.map((value,index)=>(
                                <li key={index}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 1.5C14.7848 1.5 17.4555 2.60625 19.4246 4.57538C21.3938 6.54451 22.5 9.21523 22.5 12C22.5 14.7848 21.3938 17.4555 19.4246 19.4246C17.4555 21.3938 14.7848 22.5 12 22.5C9.21523 22.5 6.54451 21.3938 4.57538 19.4246C2.60625 17.4555 1.5 14.7848 1.5 12C1.5 9.21523 2.60625 6.54451 4.57538 4.57538C6.54451 2.60625 9.21523 1.5 12 1.5ZM10.692 14.0715L8.3595 11.7375C8.27588 11.6539 8.17661 11.5876 8.06736 11.5423C7.9581 11.497 7.84101 11.4737 7.72275 11.4737C7.60449 11.4737 7.4874 11.497 7.37814 11.5423C7.26889 11.5876 7.16962 11.6539 7.086 11.7375C6.91712 11.9064 6.82225 12.1354 6.82225 12.3743C6.82225 12.6131 6.91712 12.8421 7.086 13.011L10.056 15.981C10.1394 16.065 10.2386 16.1317 10.3479 16.1773C10.4571 16.2228 10.5744 16.2462 10.6927 16.2462C10.8111 16.2462 10.9284 16.2228 11.0376 16.1773C11.1469 16.1317 11.2461 16.065 11.3295 15.981L17.4795 9.8295C17.5642 9.74623 17.6316 9.647 17.6778 9.53755C17.724 9.42809 17.7481 9.31057 17.7487 9.19177C17.7492 9.07297 17.7262 8.95523 17.6811 8.84535C17.6359 8.73547 17.5694 8.63562 17.4854 8.55156C17.4015 8.46751 17.3017 8.4009 17.1919 8.3556C17.0821 8.31029 16.9644 8.28718 16.8455 8.28759C16.7267 8.288 16.6092 8.31193 16.4997 8.358C16.3902 8.40407 16.2909 8.47136 16.2075 8.556L10.692 14.0715Z" fill="#E87C30"/>
                                    </svg>
                                    <span>{value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </aside>
            <section className={styles.infocontainer}>
                <h1>{recepie.title}</h1>
                <div className={styles.details}>
                    <div className={styles.timedetails}>
                        <div>
                            <span>total</span>
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                               { recepie != 0&&
                                    <>
                                        {getTotalTime()}
                                    </>
                               }
                            </span>
                        </div>
                        <div>
                            <span>préparation</span>
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                                {recepie.time_prepare}
                            </span>
                        </div>
                        <div>
                            <span>repos</span>
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                            {recepie.time_rest}
                            </span>
                        </div>
                        <div>
                            <span>cuisson</span>
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                            {recepie.time_cooking}
                            </span>
                        </div>
                    </div>
                    <div className={styles.time}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                        <span>{getTotalTime()}</span>
                    </div>
                    <div>
                        <a href="#comments">{comments.length} reviews</a>
                        <Image src={"/assets/4_star.png"} alt="notation" title="4 star dish" width={80} height={15}  />
                    </div>
                    <div className={styles.optioncontainer}>
                        <div className={styles.options}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <circle cx="14" cy="14" r="14" fill="#E87C30"/>
                                <path d="M17.8438 21.125C17.2969 21.125 16.832 20.9336 16.4492 20.5508C16.0664 20.168 15.875 19.7031 15.875 19.1562C15.875 19.0797 15.8805 19.0003 15.8914 18.918C15.9023 18.8358 15.9188 18.7621 15.9406 18.6969L11.3141 16.0062C11.1281 16.1703 10.9203 16.2989 10.6906 16.3921C10.4609 16.4853 10.2203 16.5317 9.96875 16.5312C9.42188 16.5312 8.95703 16.3398 8.57422 15.957C8.19141 15.5742 8 15.1094 8 14.5625C8 14.0156 8.19141 13.5508 8.57422 13.168C8.95703 12.7852 9.42188 12.5938 9.96875 12.5938C10.2203 12.5938 10.4609 12.6403 10.6906 12.7335C10.9203 12.8267 11.1281 12.9551 11.3141 13.1188L15.9406 10.4281C15.9188 10.3625 15.9023 10.2888 15.8914 10.207C15.8805 10.1252 15.875 10.0457 15.875 9.96875C15.875 9.42188 16.0664 8.95703 16.4492 8.57422C16.832 8.19141 17.2969 8 17.8438 8C18.3906 8 18.8555 8.19141 19.2383 8.57422C19.6211 8.95703 19.8125 9.42188 19.8125 9.96875C19.8125 10.5156 19.6211 10.9805 19.2383 11.3633C18.8555 11.7461 18.3906 11.9375 17.8438 11.9375C17.5922 11.9375 17.3516 11.8911 17.1219 11.7984C16.8922 11.7056 16.6844 11.577 16.4984 11.4125L11.8719 14.1031C11.8937 14.1688 11.9102 14.2427 11.9211 14.3249C11.932 14.4072 11.9375 14.4864 11.9375 14.5625C11.9375 14.6391 11.932 14.7185 11.9211 14.8007C11.9102 14.883 11.8937 14.9567 11.8719 15.0219L16.4984 17.7125C16.6844 17.5484 16.8922 17.42 17.1219 17.3273C17.3516 17.2345 17.5922 17.1879 17.8438 17.1875C18.3906 17.1875 18.8555 17.3789 19.2383 17.7617C19.6211 18.1445 19.8125 18.6094 19.8125 19.1562C19.8125 19.7031 19.6211 20.168 19.2383 20.5508C18.8555 20.9336 18.3906 21.125 17.8438 21.125Z" fill="#333333"/>
                            </svg>
                            <span>Partager</span>
                        </div>
                        <div className={styles.options}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <circle cx="14" cy="14" r="14" fill="#E87C30"/>
                                <path d="M19 9.4291H8.5V6H19V9.4291ZM19 14.1441C19.2479 14.1441 19.4559 14.0618 19.6239 13.8972C19.7919 13.7326 19.8756 13.5292 19.875 13.2868C19.875 13.0439 19.791 12.8402 19.623 12.6756C19.455 12.511 19.2473 12.429 19 12.4296C18.7521 12.4296 18.5441 12.5119 18.3761 12.6764C18.2081 12.841 18.1244 13.0445 18.125 13.2868C18.125 13.5297 18.209 13.7335 18.377 13.8981C18.545 14.0627 18.7527 14.1447 19 14.1441ZM17.25 19.7164V16.2873H10.25V19.7164H17.25ZM19 21.4309H8.5V18.0018H5V12.8582C5 12.1295 5.25521 11.5186 5.76562 11.0253C6.27604 10.5321 6.89583 10.2858 7.625 10.2864H19.875C20.6187 10.2864 21.2423 10.533 21.7458 11.0262C22.2492 11.5194 22.5006 12.1301 22.5 12.8582V18.0018H19V21.4309Z" fill="#333333"/>
                            </svg>
                            <span>Imprimer</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.preparation}>
                <h2>Description</h2>
                {/* <div className={styles.nutrition}>
                    {
                        ["Calories","Protein","Fats","Fibre"].map((value,index)=>(
                            <div className={styles.card} key={index}>
                                <span>
                                    {value}
                                </span>
                                <span>
                                    #00{index}
                                </span>
                            </div>
                        ))
                    }
                </div> */}
                <div className={styles.description}>
                    <i>{recepie.description}</i>
                </div>
                <h2>Préparation de la recette</h2>
                <ul className={styles.steps}>
                    {
                        steps.map((step,index)=>(
                            <li key={index}>
                                <span className={styles.circle}>
                                    {index}
                                </span>
                                <span> 
                                    {step}    
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section className={styles.recommandation}>
                <h2>Recommandation de recettes</h2>
                <Swiper
                    className={styles.recepieslider}
                    
                      modules={[Autoplay, Pagination, Navigation]}
                    loop={true}
                    autoplay={{
                        delay:1000,
                        disableOnInteraction:false
                    }}
                    breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween:20
                        },
                        768: {
                          slidesPerView: 4,
                          spaceBetween:16,
                        },
                        1024: {
                          slidesPerView: 7,
                          spaceBetween:32,
                        },
                      }}
                >
                    {
                        recepies.map((recepie,index)=>(
                            <SwiperSlide key={index}><Link href={recepie.url}><img src={recepie.image?"http://localhost:8080/uploads/"+recepie.image:"http://localhost:3000/imgbase.png"} alt="imag" /></Link></SwiperSlide>
                        ))
                    }
                </Swiper>
            </section>
            <section id="comments" className={styles.comments}>
                {
                    recepie != 0 && recepie.moderation_state ==1 ?<Comments recepie={recepie} id_client={clientInfo.id} /> :<></>
                }
                
            </section>
        </main>
    )
}