async function getData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <div className='px-8 py-4 grid grid-cols-5'>
      {
      data.results.map((pokemon: any) => (<h1 key={pokemon.id}>{pokemon.name}</h1>))
    }
    </div>
  )
}
