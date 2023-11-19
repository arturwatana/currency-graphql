import { ApolloServer } from "@apollo/server";
import { describe, it, beforeEach } from "@jest/globals";
import { typeDefs } from "../../../../../graphql/schema";
import { resolvers } from "../../../../../graphql/resolvers";
describe("Create Interest Unit Tests", () => {
    let server;
    let token;
    beforeEach(async () => {
        server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        const res = await server.executeOperation({
            mutation: 'mutation login($data: LoginUserDTO) {token}',
            variables: { email: "test@test", password: "kdoadkasopd" }
        });
        console.log(res);
    });
    it("Should be able", () => {
    });
});
