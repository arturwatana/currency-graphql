import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createCurrency } from "./modules/currency/resolvers/mutation/currency.mutation.js";
import { searches } from "./modules/currency/resolvers/query/searches.query.js";
import { SearchesMemoryRepository } from "./modules/currency/repositories/searches.implementation.repository.js";
import { createUser } from "./modules/users/resolvers/mutation/users.mutation.js";
import { users } from "./modules/users/resolvers/query/users.query.js";
import { login } from "./modules/users/resolvers/mutation/login.mutation.js";
import { UserMongooseRepository } from "./modules/users/repository/user.implementation.mongoose.js";
import { main } from "./utils/db/mongoose.start.js";
import { authService } from "./utils/auth/index.js";
import { GraphQLError } from "graphql";

export const searchesRepository = new SearchesMemoryRepository();
export const usersRepository = new UserMongooseRepository();

const typeDefs = `
type Currency {
  code: String!
  name: String!
  high: String!
  low: String!
  create_date: String!
  user: User!
}

type User {
  id: String!
  username: String!
  password: String!
  email: String!
  searches: [Currency!]!
}

input UserDTO {
  username: String!
  password: String!
  email: String!
}

type LoginResDTO {
  id: String!
  username: String!
  token: String!
}

input LoginUserDTO{
  username: String!
  password: String!
}

  type Query {
    searches:[Currency!]!
    users:[User!]!
  }
  type Mutation {
    createCurrency(name: String): Currency
    createUser(data: UserDTO): User
    login(data: LoginUserDTO): LoginResDTO!
  }
`;

const resolvers = {
  Query: { searches, users },
  Mutation: { createCurrency, createUser, login },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
main().catch((err) => console.log(err));

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    if (!req.headers.authorization) {
      return;
    }
    const token = req.headers.authorization.split(" ")[1] || "";
    const tokenIsValid = authService.verify(token, process.env.JWT_SECRET);
    if (!tokenIsValid) {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
    const user =
      (await usersRepository.getUserByUsername(tokenIsValid)) || null;

    return { user };
  },
});

console.log(`🚀  Server ready at: ${url}`);
