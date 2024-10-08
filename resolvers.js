
import jwt from 'jsonwebtoken' 
import UserModel from './model/userModel.js'
import bcryptjs from 'bcryptjs'
import QuoteModel from './model/quoteModel.js'
let resolvers = {
    Query: {
      users: async() => {
        let user=await UserModel.find({})
        return user
      },
      user:async(_,{_id})=>{
        let user=await UserModel.findOne({_id})
        return user
      },
      quote: async (_, { userId }) => {
        let quotes = await QuoteModel.find({ userId });
        return quotes;
      },

      quotes: async() => {
        let quotes=await QuoteModel.find({})
        return quotes
      },
    },
    Users:{
      quotes:async(parent)=>{
        let data=await QuoteModel.find({userId:parent._id})
        return data
      }
    },
    Mutation:{
        saveUser:async(_,{newUser})=>{
            let user=await UserModel.findOne({email:newUser.email})
            if(user){
              throw new Error('user already exist')
            }
            let hash=await bcryptjs.genSalt(10)
            let hashedPassword=await bcryptjs.hash(newUser.password,hash)

            let createUser=new UserModel({
              ...newUser,
              password:hashedPassword
            })
             
            return await createUser.save()
        },
        signinUser:async(_,{signin})=>{
            let user=await UserModel.findOne({email:signin.email})
            if(!user){
              throw new Error('please provide valid credentials')
            }
            let comparePassword=await bcryptjs.compare(signin.password,user.password)
           if(!comparePassword){
            throw new Error('please provide valid credentials')
           }

           let token =jwt.sign({userId:user._id},'TSHSHHSHSHHSHSHHSH',{expiresIn:"1d"})
           return {token}  
        },
        createQuote:async(_,{newQuote},{userId})=>{
          
          if(!userId){
            throw new Error('404 please logged in first to create new quote')
          }
          let quote=new QuoteModel({
            ...newQuote,
            userId:userId
          })
          let result=await quote.save()
          return result

        }

    }
  }

 export default resolvers 