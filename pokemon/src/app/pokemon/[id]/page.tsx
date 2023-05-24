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
  const {id} = params
  const pokemonData = await getPokemonById(id)

  return (
    <div>
      <h1>{pokemonData.name}</h1>
    </div>
  )
}
