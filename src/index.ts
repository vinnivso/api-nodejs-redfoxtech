import { app } from "./app"
import { EndpointGetPokemons } from "./endpoints/EndPointGetPokemons"

app.get("/pokemons", new EndpointGetPokemons().getPokemons)