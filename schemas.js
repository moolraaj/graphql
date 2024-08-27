import {  gql } from 'apollo-server'
let typeDefs = gql`
  type Query {
    users: [Users]
    user(_id:ID!):Users
    quotes: [Quotes]
    quote(userId:ID!):[Quotes]
  }

  type Users {
    _id: String
    name: String
    email: String
    password: String
    quotes: [Quotes]
  }

  type Quotes {
    _id: String
    title: String
    description: String
    userId: String
  }

  type Mutation{
  saveUser(newUser:InputUser):Users
  signinUser(signin:signInInput):token
  }

  type token{
  token:String
  }

  input signInInput{
  email:String,
  password:String
  }

  input InputUser{
  name:String!
  email:String!
  password:String!
  }

`
export default typeDefs