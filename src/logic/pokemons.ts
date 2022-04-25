export interface PokemonsComponent {
  addPokemon: (pokemon: string) => void
  removePokemon: (pokemon: string) => void
  getPokemons: () => Set<string>
}

export function createPokemonsComponent(): PokemonsComponent {
  const savedPokemons = new Set<string>(["ditto", "charizard"])

  function addPokemon(pokemon: string) {
    savedPokemons.add(pokemon)
  }

  function removePokemon(pokemon: string) {
    savedPokemons.delete(pokemon)
  }

  function getPokemons() {
    return savedPokemons
  }

  return {
    addPokemon,
    removePokemon,
    getPokemons,
  }
}
