import './globals.css'
import { Inter } from 'next/font/google'
import {Navbar} from "@/components/navbar";

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
        <header>
          <h1>Pokemon</h1>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
