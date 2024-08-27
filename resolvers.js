import { users, quotes } from './data.js'
import crypto from 'crypto'
let resolvers = {
    Query: {
      users: () => users,
      user:(_,{id})=>users.find(e=>e.id==id),
      quote:(_,{userId})=>quotes.filter(e=>e.userId==userId),
      quotes: () => quotes,
    },
    Users:{
      quotes:(parent)=>quotes.filter(e=>e.userId==parent.id)
    },
    Mutation:{
        saveUser:(_,{newUser})=>{
            let id=crypto.randomBytes(5).toString('hex')
             users.push({
                id,...newUser
            })
            return users.find(e=>e.id==id)
        }

    }
  }

 export default resolvers 