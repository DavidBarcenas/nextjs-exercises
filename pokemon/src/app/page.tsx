import {APIResponse, ShortPokemon} from "@/interfaces/api-response";
import Image from "next/image";

async function getData(): Promise<ShortPokemon[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: APIResponse = await res.json()
  return data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`
    }
  })
}

export default async function Home() {
  const pokemons = await getData()

  return (
    <ul className='px-8 py-4 grid grid-cols-5 gap-4'>
      {
        pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <span className='bg-yellow-400 text-black px-4 py-1 rounded-full'>#{pokemon.id.toString().padStart(3, '0')}</span>
            <figure className='w-36 h-36 m-auto'>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className='w-36 h-36 m-auto'
              />
            </figure>
            <h2 className='bg-red-500 text-white  px-4 py-1 rounded-sm font-bold text-xl capitalize text-center'>{pokemon.name}</h2>
          </li>
        ))
      }
    </ul>
  )
}
