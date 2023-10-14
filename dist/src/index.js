import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { main } from "./utils/db/mongoose.start.js";
import { typeDefs } from "./schemas.gql.js";
import { passwordHash } from "./utils/hash/index.js";
import { getTokenAndSetUser } from "./utils/context/index.js";
import { resolvers } from "./resolvers.gql.js";
import { usersRepository } from "./modules/users/repository/index.js";
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
main().catch((err) => console.log(err));
const services = {
    usersRepository,
    passwordHash
};
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const user = getTokenAndSetUser(req.headers.authorization);
        return { user, services };
    },
});
console.log(`🚀  Server ready at: ${url}`);
