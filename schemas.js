import {  gql } from 'apollo-server'
let typeDefs = gql`
  type Query {
    users: [Users]
    user(id:ID!):Users
    quotes: [Quotes]
    quote(userId:ID!):[Quotes]
  }

  type Users {
    id: String
    name: String
    email: String
    password: String
    quotes: [Quotes]
  }

  type Quotes {
    id: String
    title: String
    description: String
    userId: String
  }

  type Mutation{
  saveUser(newUser:InputUser):Users
  }

  input InputUser{
  name:String!
  email:String!
  password:String!
  }

`
export default typeDefs