'use client';
import '../globals.css'
import { Inter } from 'next/font/google'
import styles from "./layout.module.css";
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Administrator page',
  description: 'This is the administration page',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="fr">
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
