import Link from 'next/link'
import { getPokemons } from '@/services/pokemon-service'

export default async function Home() {
  const pokemons = await getPokemons()

  return (
    <ul className="px-8 py-4 grid grid-cols-5 gap-4">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <Link href={`/pokemon/${pokemon.id}`}>
            <span className="bg-yellow-400 text-black px-4 py-1 rounded-full">
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
            <figure className="w-36 h-36 m-auto">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-36 h-36 m-auto"
              />
            </figure>
            <h2 className="bg-red-500 text-white px-4 py-1 rounded-sm font-bold text-xl capitalize text-center">
              {pokemon.name}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  )
}
