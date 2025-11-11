import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = parseInt(process.env.PORT || "4000", 10);

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`Server ready at ${url}`);
