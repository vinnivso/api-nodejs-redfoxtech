export interface InterfacePokemonDB {
  getAllPokemons(query: object): Promise<object[] | boolean>
  getPokemonsById(id: number): Promise<object | boolean>
  getPokemonsByName(name: string, query: object): Promise<object | boolean>
  getPokemonsByType(type: string, query: object): Promise<object[] | boolean>
}
