import express from "express"
import { PokemonDatabase } from "../data/PokemonDatabase"

/**
 * https://www.w3schools.com/tags/ref_httpmessages.asp
 */

export class EndpointGetPokemons {
  async getPokemons(request:express.Request, response:express.Response):Promise<void> {
    try {
      let {name, type, sort, order} = request.query
      let id = Number(request.query.id)
      let page = Number(request.query.page)
      let limit = Number(request.query.limit)

      let result
      let query = {}

      if(id && name && type) {
        response.status(406).json({message:"Não é possível filtrar um item com ID e NAME ou TYPE ao mesmo tempo"})
      } else if (id && name) {
        response.status(406).json({message:"Não é possível filtrar por ID e NAME ao mesmo tempo"})
      } else if (id && type) {
        response.status(406).json({message:"Não é possível filtrar por ID e TYPE ao mesmo tempo"})
      } else if (name && type) {
        response.status(406).json({message:"Não é possível filtrar por NAME e TYPE ao mesmo tempo"})
      }

      //Será utilizado Number.isNan() para forçar uma conversão.
      if(!page || page < 1 || Number.isNaN(page)) {
        page = 1
      }

      //Setting padrão p/ SORT
      if(!sort) {
        sort = "ID"
      }

      //Setting padrão p/ ORDER
      if(!order) {
        order = "ASC"
      }

      //Setting padrão p/ LIMIT
      if(!limit || limit < 1 || Number.isNaN(limit)) {
        limit = 10
      }

      const offset = page? (page - 1) * limit:(1-1) * limit

      query = {sort, order, limit, offset}

      if(id && !Number.isNaN(id) && id > 0) {
        if(isNaN(id)) {
          response.status(406).json({message:`Não é aceitável input de ID no tipo STRING`})
        } else {
          result = await new PokemonDatabase().getPokemonsById(id)
        }

      } else if(name) {
        result = await new PokemonDatabase().getPokemonsByName(name as string, query)
      } else if(type) {
        result = await new PokemonDatabase().getPokemonsByType(type as string, query)
      } else {
        result = await new PokemonDatabase().getAllPokemons(query)
      }
      response.send(result)
    } catch (error) {
      response.status(500).json({message:`Algo deu errado. Para mais informações, por favor veja em: https://documenter.getpostman.com/view/16818323/UVJigE3b`})
    }
  }
}