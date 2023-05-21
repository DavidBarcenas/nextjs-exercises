import {APIResponse} from "@/interfaces/api-response";

async function getData(): Promise<APIResponse> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}

export default async function Home() {
  const {results} = await getData()

  return (
    <div className='px-8 py-4 grid grid-cols-5'>
      {
        results.map((pokemon) => (<h1 key={pokemon.name}>{pokemon.name}</h1>))
      }
    </div>
  )
}
