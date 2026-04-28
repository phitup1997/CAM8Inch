import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: (limit = 20) => `/pokemon?limit=${limit}`,
    }),
    getPokemonByName: builder.query({
      query: (name) => `/pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery, useGetPokemonListQuery, useLazyGetPokemonByNameQuery } = pokemonApi