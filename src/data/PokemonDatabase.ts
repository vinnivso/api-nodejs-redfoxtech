import BaseDatabase from "./BaseDatabase"
import { InterfacePokemonDB } from "../entities/interfacePokemonDB"

export class PokemonDatabase extends BaseDatabase implements InterfacePokemonDB {
  private static tableName = "redfoxtech_challenge_pokemongo"

  async getAllPokemons(query:any):Promise<object[] | boolean> {
    try {
      const result = await BaseDatabase.connection(PokemonDatabase.tableName)
        .orderBy(query.sort, query.order)
        .limit(query.limit)
        .offset(query.offset)
      return result
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getPokemonsById(id:number):Promise<object | boolean> {
    try {
      const result = await BaseDatabase.connection(PokemonDatabase.tableName)
        .where({id})
        return result
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getPokemonsByName(name:string, query:any):Promise<object[] | boolean> {
    try {
      const result = await BaseDatabase.connection(PokemonDatabase.tableName)
        .orderBy(query.sort, query.order)
        .where("Name", "LIKE", `%${name}%`)
        .limit(query.limit)
        .offset(query.offset)
      return result
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getPokemonsByType(type:string, query:any):Promise<object[] | boolean> {
    try {
      const result = await BaseDatabase.connection(PokemonDatabase.tableName)
        .orderBy(query.sort, query.order)
        .where("Type1", "LIKE", `%${type}%`)
        .orWhere("Type2", "LIKE", `%${type}%`)
        .limit(query.limit)
        .offset(query.offset)
      return result
    } catch (error) {
      console.log(error)
      return false
    }
  }

}