'use client';
import '../globals.css';
import styles from "./layoute.module.css";
import { Inter } from 'next/font/google'
import Dashboardmenu from "@/app/front/components/DashboardMenu/Dashboardmenu";
import { useState } from "react";
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

    const [isMenuOpen,setIsMenuOpen] = useState(0);

    return (
        <html lang="fr">
          <body style={{backgroundColor:"white"}} className={inter.className}>
                  <div className={styles.menuopener}>
                      {
                          isMenuOpen == 0?
                              <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setIsMenuOpen(1)} width="32" height="32" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                          :
                              <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setIsMenuOpen(0)} width="32" height="32" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                      }
                  </div>
                  <div className={isMenuOpen == 1?styles.menuopen:styles.menu}>
                      <Dashboardmenu />
                  </div>
              <main className={styles.container}>
              <div className={styles.bigmenu}>
                    <Dashboardmenu /> 
                  </div>
                {children}
              </main>
            <footer style={{backgroundColor:"#333333",height: "32.0625rem"}}>
    
            </footer>
          </body>
        </html>
      )
}