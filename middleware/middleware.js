import jwt from 'jsonwebtoken'

export const context=({req})=>{
    let {authorization}=req.headers
    if(authorization){
      let{userId}=jwt.verify(authorization,'TSHSHHSHSHHSHSHHSH',{expiresIn:"1d"})
      return {userId}
    }
  }