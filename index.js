import { ApolloServer, gql } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { dbconnect } from './database/databse.js'
import jwt from 'jsonwebtoken'
dbconnect()

import typeDefs from './schemas.js'
import resolvers from './resolvers.js' 


let server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({req})=>{
    let {authorization}=req.headers
    if(authorization){
      let{userId}=jwt.verify(authorization,'TSHSHHSHSHHSHSHHSH',{expiresIn:"1d"})
      return {userId}
    }

  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
})

server.listen(4500).then((e) => {
  console.log(`port is listining on the port`)
})
