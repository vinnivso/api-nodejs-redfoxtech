import BaseDatabase from "../data/BaseDatabase"
import pokemons from "./PokemonGo.json"

async function createPokemonTable():Promise<boolean> {
  try {
    await BaseDatabase.connection.raw(`
      CREATE TABLE IF NOT EXISTS redfoxtech_challenge_pokemongo (
        ID INT(11) NOT NULL,
        Name VARCHAR(255) DEFAULT NULL,
        Pokedex_Number INT(11) DEFAULT NULL,
        Img_name VARCHAR(255) DEFAULT NULL,
        Generation INT(11) DEFAULT NULL,
        Evolution_Stage VARCHAR(255) DEFAULT NULL,
        Evolved INT(11) DEFAULT NULL,
        FamilyID INT(11) DEFAULT NULL,
        Cross_Gen INT(11) DEFAULT NULL,
        Type1 VARCHAR(255) DEFAULT NULL,
        Type2 VARCHAR(255) DEFAULT NULL,
        Weather1 VARCHAR(255) DEFAULT NULL,
        Weather2 VARCHAR(255) DEFAULT NULL,
        STAT_TOTAL INT(11) DEFAULT NULL,
        ATK INT(11) DEFAULT NULL,
        DEF INT(11) DEFAULT NULL,
        STA INT(11) DEFAULT NULL,
        Legendary INT(11) DEFAULT NULL,
        Aquireable INT(11) DEFAULT NULL,
        Spawns INT(11) DEFAULT NULL,
        Regional INT(11) DEFAULT NULL,
        Raidable INT(11) DEFAULT NULL,
        Hatchable float DEFAULT NULL,
        Shiny INT(11) DEFAULT NULL,
        Nest INT(11) DEFAULT NULL,
        New INT(11) DEFAULT NULL,
        NotGettable INT(11) DEFAULT NULL,
        Future_Evolve INT(11) DEFAULT NULL,
        CP40 INT(11) DEFAULT NULL,
        CP39 INT(11) DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `)
    console.log(`Tabela criada com sucesso`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

async function insertPokemonsOnTable():Promise<boolean> {
  try {
    await BaseDatabase.connection("redfoxtech_challenge_pokemongo")
      .insert(pokemons)
    console.log(`Pokemons inseridos na tabela com sucesso`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

createPokemonTable()
  .then(insertPokemonsOnTable)
  .finally(() => BaseDatabase.connection.destroy())