import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createCurrency } from "./modules/currency/resolvers/mutation/currency.mutation.js";
import { searches } from "./modules/currency/resolvers/query/searches.query.js";
import { SearchesMemoryRepository } from "./modules/currency/repositories/searches.implementation.repository.js";
import { createUser } from "./modules/users/resolvers/mutation/users.mutation.js";
import { users } from "./modules/users/resolvers/query/users.query.js";
import { UserMemoryRepository } from "./modules/users/repository/user.implementation.memory.js";

export const searchesRepository = new SearchesMemoryRepository();
export const usesrRepository = new UserMemoryRepository();

const typeDefs = `
type Currency {
  code: String!
  name: String!
  high: String!
  low: String!
  create_date: String!
}

type User {
  id: String!
  username: String!
  password: String!
  email: String!
}

input UserDTO {
  username: String!
  password: String!
  email: String!
}

  type Query {
    searches:[Currency!]!
    users:[User!]!
  }

  type Mutation {
    createCurrency(name: String): Currency
    createUser(data: UserDTO): User
  }
`;

const resolvers = {
  Query: { searches, users },
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
