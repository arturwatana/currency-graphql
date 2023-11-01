import dotenv from "dotenv";
dotenv.config();
import { ApolloServer, BaseContext } from "@apollo/server";
import { main } from "./utils/db/mongoose.start.js";
import { typeDefs } from "./schemas.gql.js";
import { passwordHash } from "./utils/hash/index.js";
import { getTokenAndSetUser } from "./utils/context/index.js";
import { resolvers } from "./resolvers.gql.js";
import { User } from "./modules/users/model/user.model.js";
import { IUserRepository } from "./modules/users/repository/user.repository.js";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { IHashPassword } from "./utils/hash/hash.interface.js";
import { expressMiddleware } from '@apollo/server/express4';
import http from "http";
import express from "express";
import cors from "cors";
import { usersRepository } from "./modules/users/repository/index.js";
import "./utils/cron/notification.cron.js"

type ServicesProps = {
  usersRepository: IUserRepository
  passwordHash: IHashPassword
}

export interface ContextProps {
  user?: User
  BaseContext: ServicesProps 
}

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

main().catch((err) => console.log(err));

const services = {
  usersRepository,
  passwordHash
}

await server.start();
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  expressMiddleware(server, {
    context: async ({ req }) => {
        const user = await getTokenAndSetUser(req.headers.authorization)
        return { user, BaseContext: services };
    }
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀  Server ready at: 4000`);
