import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createCurrency } from "./modules/currency/resolvers/mutation/currency.mutation.js";
import { searchesQuery } from "./modules/currency/resolvers/query/searches.query.js";
import { SearchesMemoryRepository } from "./modules/currency/repositories/searches.implementation.repository.js";
import { createUser } from "./modules/users/resolvers/mutation/users.mutation.js";
export const searchesRepository = new SearchesMemoryRepository();
const typeDefs = `
type Currency {
  code: String
  name: String
  high: String
  low: String
  create_date: String
}

  type Query {
    searches:[Currency!]!
  }

  type Mutation {
    createCurrency(name: String): Currency
    createUser(name: String): String
  }
`;
const resolvers = {
    Query: searchesQuery,
    Mutation: { createCurrency, createUser },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
