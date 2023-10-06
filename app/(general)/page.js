'use client';
import Link from 'next/link';
import styles from './page.module.css';
import Dayrecepie from '@/app/front/components/Dayrecepie/Dayrecepie';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Trend from '@/app/front/components/Trend/Trend';
import Testimonial from '@/app/front/components/Testimonial/Testimonial.js';
import { useEffect, useState } from 'react';
import Bigrecepiecard from '../front/components/BigRecepieCard/Bigrecepiecard';

export default function Home() {
  const [datas,setDatas] = useState(0)
  const [recepies,setRecepies] =useState([])
  useEffect(()=>{
    async function getData(){
     await fetch('http://localhost:8080/getCategories')
     .then(data => data.json())
     .then(data =>setDatas(data.categories))
    }

    async function getData(){
      await fetch('http://localhost:8080/getRecepies')
      .then(data => data.json())
      .then(datas => setRecepies(datas.recepies))
     }

    getData()
  },[])
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1>Explorez. Partagez. Savourez.</h1>
        <Swiper
          navigation={true}
          loop={true}
          autoplay={{
            delay: 1800,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween:16,
              loop:true
            },
            768: {
              slidesPerView: 2,
              loop:true
            },
            1024: {
              slidesPerView: 5,
              spaceBetween:16,
              loop:true

            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className={styles.swiperContainer}
        >
          { 
            recepies.map((value,index)=>(
              <SwiperSlide key={index}>
                  <Bigrecepiecard recepie={value} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <div className={styles.align}>
         <Dayrecepie />
         <div className={styles.trendcontainer}>
            <h2>Tendance</h2>
            {/* <Link href={"/recettes#trendring"}>
                voir tout
            </Link> */}
         </div>
         <Trend />
         <div className={styles.categorycontainer}>
            <h2>Nos categories</h2>
         </div>
         <Swiper
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              426: {
                slidesPerView: 5,
                spaceBetween: 16,
                
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 56,
              },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className={styles.swipercategory}
         >{ 
            datas != 0?
              datas.catagories.map((value,index)=>(
                <SwiperSlide key={index} className={styles.slideCircle}><img src={'http://localhost:8080/uploads/'+value.image} alt='img' /><Link href={"/recettes?idc="+value.id}>{value.name}</Link></SwiperSlide>
              ))
            :<></>
          }
          </Swiper>
      </div>
      <section className={styles.containernewsletter}>
        <div>
          <h3>Abonnez vous à notre Newsletter</h3>
          <form>
              <input type="email" id="mail" placeholder='exemple : email@gmail.com' />
              <button type='submit' className={styles.btnPrimary}>abonnez vous</button>
          </form>
        </div>
      </section>
      <div className={styles.align}>
        <div className={styles.testimonails}>
            <h2>Témoignages</h2>
        </div>
        <Testimonial />
      </div>
    </main>
  )
}
