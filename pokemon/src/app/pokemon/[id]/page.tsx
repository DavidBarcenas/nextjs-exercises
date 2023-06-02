import { getPokemonById } from '@/services/pokemon-service'

interface Props {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const pokemonIds = [...Array(151)].map((_, index) => index + 1)
  return pokemonIds.map((id) => ({ id: id.toString() }))
}

export default async function Pokemon({ params }: Props) {
  const { id } = params
  const pokemonData = await getPokemonById(id)

  return (
    <div className='text-center relative bg-red-500 py-7'>
        <h1 className='absolute -bottom-36 text-[200px] uppercase font-black left-1/2 -translate-x-1/2 text-white/100'>{pokemonData.name}</h1>
        <img src={pokemonData.sprites.other?.dream_world.front_default} alt={pokemonData.name} className='m-auto mb-5' />
    </div>
  )
}
