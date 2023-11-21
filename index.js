const { ApolloServer } = require("apollo-server"); 
// Import ApolloServer from apollo-server

const { importSchema } = require("graphql-import");
// Import importSchema from graphql-import to load schema

const EtherDataSource = require("./datasource/ethDatasource");
// Import EtherDataSource class 

const typeDefs = importSchema("./schema.graphql");
// Load schema from schema.graphql file

require("dotenv").config(); 
// Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Resolvers for Query fields

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }), 
});

// Create ApolloServer instance

server.timeout = 0;

server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Start ApolloServer on port 9000
