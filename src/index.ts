import dotenv from "dotenv";
dotenv.config();
import { ApolloServer, BaseContext } from "@apollo/server";
import {  StartStandaloneServerOptions, startStandaloneServer } from "@apollo/server/standalone";
import { main } from "./utils/db/mongoose.start.js";
import { typeDefs } from "./schemas.gql.js";
import { passwordHash } from "./utils/hash/index.js";
import { getTokenAndSetUser } from "./utils/context/index.js";
import { resolvers } from "./resolvers.gql.js";
import { usersRepository } from "./modules/users/repository/index.js";
import { User } from "./modules/users/model/user.model.js";
import { IUserRepository } from "./modules/users/repository/user.repository.js";
import { IHashPassword } from "./utils/hash/hash.interface.js";

type ServicesProps = {
  userRepository: IUserRepository
  passwordHash: IHashPassword
}

export interface ContextProps {
  user?: User
  BaseContext: ServicesProps
}

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

main().catch((err) => console.log(err));

const services = {
  usersRepository,
  passwordHash
}

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const user = getTokenAndSetUser(req.headers.authorization)
    return { user, BaseContext: services };
  }
});
console.log(`🚀  Server ready at: ${url}`);
