import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { main } from "./utils/db/mongoose.start.js";
import { typeDefs } from "./schemas.gql.js";
import { passwordHash } from "./utils/hash/index.js";
import { getTokenAndSetUser } from "./utils/context/index.js";
import { resolvers } from "./resolvers.gql.js";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import http from "http";
import express from "express";
import cors from "cors";
import { usersRepository } from "./modules/users/repository/index.js";
const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
main().catch((err) => console.log(err));
const services = {
    usersRepository,
    passwordHash
};
await server.start();
app.use('/graphql', cors(), expressMiddleware(server, {
    context: async ({ req }) => {
        const user = await getTokenAndSetUser(req.headers.authorization);
        return { user, BaseContext: services, oi: " oi" };
    }
}));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀  Server ready at: 4000`);
