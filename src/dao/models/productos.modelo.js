import mongoose from "mongoose"

const prodCollection="productos"
const prodSchema=new mongoose.Schema(
    {
            title: String,
            description: String,
            price: Number,
            thumbnail: String,
            code: String,
            status: Boolean,
            stock: Number,
            category: String
    },
    {
            timestamps: true
    }
)

export const modeloUsuarios=mongoose.model(prodCollection, prodSchema)