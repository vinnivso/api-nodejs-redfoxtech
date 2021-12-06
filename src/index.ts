import { app } from "./app"
import { EndpointGetPokemons } from "./endpoints/EndpointGetPokemons"

app.get("/pokemons", new EndpointGetPokemons().getPokemons)