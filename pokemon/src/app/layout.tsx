import './globals.css'
import { Inter } from 'next/font/google'
import {Navbar} from "@/components/navbar";
import Image from "next/image";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokemon',
  description: 'Exercise with static props',
  authors: [{name: 'David Bárcenas'}],
  keywords: ['pokemon', 'pokedex', 'pokeapi'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className='flex justify-between items-center px-8 py-4'>
          <Image src="/pokemon-logo.png" alt="Pokémon" width={200} height={100}/>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
