const express = require('express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// const routes = require('./routes');
const {authMiddleware} = require ('./utils/auth')
const mongoose = require("mongoose");
const { ApolloServer } = require('apollo-server-express');

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer(typeDef, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers
   
  });

  await server.start();
  const app = express();
  server.applyMiddleware({
    app,

    path: '/'
  });
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



// db.once('open', () => {
//   app.listen(PORT, () =>{ 
//     console.log(`API server running on port ${PORT}`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

// });

// });
