'use client';
import '../globals.css'
import Topnav from '../front/components/Topnav/Topnav';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GoodChef',
  description: 'Le plateforme Goodchef permet de trouver des recettes délicieuses',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="fr">
      <body style={{backgroundColor:"white"}} className={inter.className}>
        <Topnav />
        {children}
        <footer style={{backgroundColor:"#333333",height: "32.0625rem"}}>

        </footer>
      </body>
    </html>
  )
}
