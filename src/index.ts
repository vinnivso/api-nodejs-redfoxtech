import { app } from "./app"
import { EndpointGetPokemon } from "./endpoints/EndpointGetPokemon"

app.get("/pokemons", new EndpointGetPokemon().getPokemons)