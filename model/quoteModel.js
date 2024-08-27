import mongoose from "mongoose";


let quoteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
})

let QuoteModel=mongoose.model('quotes',quoteSchema)
export default QuoteModel