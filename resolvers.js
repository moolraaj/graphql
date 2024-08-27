import { users, quotes } from './data.js'
import jwt from 'jsonwebtoken' 
import UserModel from './model/userModel.js'
import bcryptjs from 'bcryptjs'
let resolvers = {
    Query: {
      users: () => users,
      user:(_,{_id})=>users.find(e=>e._id==_id),
      quote:(_,{userId})=>quotes.filter(e=>e.userId==userId),
      quotes: () => quotes,
    },
    Users:{
      quotes:(parent)=>quotes.filter(e=>e.userId==parent._id)
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
        }

    }
  }

 export default resolvers 