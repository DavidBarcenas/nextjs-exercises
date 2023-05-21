import {APIResponse, ShortPokemon} from "@/interfaces/api-response";

export async function getPokemons(): Promise<ShortPokemon[]> {
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