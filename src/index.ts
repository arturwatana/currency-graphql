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
import { typeDefs } from "./schemas.gql.js";

export const searchesRepository = new SearchesMemoryRepository();
export const usersRepository = new UserMongooseRepository();

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
    const token = await authService.extractTokenFromHeader(req);
    const tokenIsValid = authService.verify(token, process.env.JWT_SECRET);
    const user = await usersRepository.getUserByUsername(tokenIsValid);
    return { user };
  },
});

console.log(`🚀  Server ready at: ${url}`);
