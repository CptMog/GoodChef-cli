'use client';
import '../globals.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
          <body style={{backgroundColor:"white"}} className={inter.className}>
            {children}
            <footer style={{backgroundColor:"#333333",height: "32.0625rem"}}>
    
            </footer>
          </body>
        </html>
      )
}