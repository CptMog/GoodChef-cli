'use client';
import '../globals.css'
import { Inter } from 'next/font/google'
import styles from "./layout.module.css";
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  
  return (
    <html lang="fr">
      <title>Goodchef : Manager</title>
        <meta name="description" content="La plateforme Goodchef permet de trouver des recettes délicieuses"/>
        <meta name="keywords" content="recette,chef" />
        <meta property="og:title" content="GoodChef" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/" />
        <meta property="og:description" content="La plateforme Goodchef permet de trouver des recettes délicieuses" />
      <body style={{backgroundColor:"white"}} className={inter.className}>
        <header className={styles.head}>
            <nav>
                <Link href={"/"}><img src="http://localhost:3000/logowhite.svg" alt="profile" /></Link>
            </nav>
        </header>
        <main>
            {children}
        </main>
        <footer style={{backgroundColor:"#333333",height: "32.0625rem"}}>

        </footer>
      </body>
    </html>
  )
}
