import mongoose from "mongoose";

const cartColl="cart"
const cartEsquema=new mongoose.Schema(
    {
        id:{type:String, required:true},
        code:{type:[], required:true}
    },
    {
        timestamps:true
    }
)

export const cartModelo=mongoose.model(cartColl, cartEsquema)
