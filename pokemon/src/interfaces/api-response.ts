export interface APIResponse {
  count: number
  next?: string
  previous?: string
  results: ShortPokemon[]
}

export interface ShortPokemon {
  name: string
  url: string
  id: number
  image: string
}
