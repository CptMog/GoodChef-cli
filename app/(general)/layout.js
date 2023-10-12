'use client';
import '../globals.css'
import Topnav from '../front/components/Topnav/Topnav';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GoodChef',
  description: 'La plateforme Goodchef permet de trouver des recettes délicieuses',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="fr">
      <title>GoodChef</title>
      <meta name="description" content="La plateforme Goodchef permet de trouver des recettes délicieuses"/>
      <meta name="keywords" content="recette,chef" />
      <meta property="og:title" content="GoodChef" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://localhost:3000/" />
      <meta property="og:description" content="La plateforme Goodchef permet de trouver des recettes délicieuses" />
      <body style={{backgroundColor:"white"}} className={inter.className}>
        <Topnav />
        {children}
        <footer style={{backgroundColor:"#333333",height: "32.0625rem"}}>

        </footer>
      </body>
    </html>
  )
}
