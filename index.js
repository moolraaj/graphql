import { ApolloServer, gql } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { dbconnect } from './database/databse.js'

dbconnect()

import typeDefs from './schemas.js'
import resolvers from './resolvers.js' 


let server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
})

server.listen(4500).then((e) => {
  console.log(`port is listining on the port`)
})
