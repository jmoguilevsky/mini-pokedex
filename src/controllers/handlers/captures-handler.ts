import { HandlerContextWithPath } from "../../types"

interface PokemonProperties {
  picture: string
  id: number
  height: number
  weight: number
  types: Array<{ slot: number; type: { name: string; url: string } }>
  name: string
}

// handlers arguments only type what they need, to make unit testing easier
export async function capturesHandler(
  context: Pick<HandlerContextWithPath<"metrics" | "pokemons" | "fetch", "/captured">, "url" | "components">
) {
  const {
    components: { pokemons, fetch },
  } = context

  const body = await Promise.all(
    [...pokemons.getPokemons()].map(async (item) => {
      const response = await (await fetch.fetch(`https://pokeapi.co/api/v2/pokemon/${item}`)).json()
      return {
        name: item,
        height: response.height,
        weight: response.weight,
        picture: response.sprites.front_default,
        types: response.types,
        id: response.id,
      } as PokemonProperties
    })
  )

  return {
    body,
  }
}

// handlers arguments only type what they need, to make unit testing easier
export async function captureHandler(
  context: Pick<HandlerContextWithPath<"metrics" | "pokemons", "/captured">, "url" | "components" | "request">
) {
  const {
    components: { pokemons },
  } = context

  const pokemon = (await context.request.clone().json()).pokemon

  pokemons.addPokemon(pokemon)

  return {
    body: {},
  }
}

// handlers arguments only type what they need, to make unit testing easier
export async function unCaptureHandler(
  context: Pick<HandlerContextWithPath<"metrics" | "pokemons", "/captured">, "url" | "components" | "request">
) {
  const {
    components: { pokemons },
  } = context

  const pokemon = (await context.request.clone().json()).pokemon

  pokemons.removePokemon(pokemon)

  return {
    body: {},
  }
}
