import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import { typeDefs } from "./graphql/schema.js";
// import { resolvers } from "./graphql/resolvers.js";

const typeDefs = `#graphql
    type Query {
      activityRankings(location: String!): ActivityRankingsResponse!
    }
`;

const resolvers = {
  Query: {
    activityRankings: async (_: any, { location }: { location: string }) => {
      return { location: location };
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at ${url}`);
