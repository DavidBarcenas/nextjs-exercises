import { APIResponse, ShortPokemon } from '@/interfaces/api-response'
import { Pokemon } from '@/interfaces/pokemon'
import {
  API_ENDPOINT,
  FAIL_DATA_MESSAGE,
  POKEMON_IMAGE_URL,
} from '@/utils/constants'

export async function getPokemons(): Promise<ShortPokemon[]> {
  const res = await fetch(`${API_ENDPOINT}/pokemon?limit=151`)

  if (!res.ok) {
    throw new Error(FAIL_DATA_MESSAGE)
  }

  const data: APIResponse = await res.json()
  return data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      image: `${POKEMON_IMAGE_URL}/${index + 1}.svg`,
    }
  })
}

export async function getPokemonById(id: string): Promise<Pokemon> {
  const res = await fetch(`${API_ENDPOINT}/pokemon/${id}`)

  if (!res.ok) {
    throw new Error(FAIL_DATA_MESSAGE)
  }

  return await res.json()
}
