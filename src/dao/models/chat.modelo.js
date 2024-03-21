import mongoose from "mongoose";

const chatColl="messages"
const messageSchema = new mongoose.Schema({
    user: [String],
    message: [String],
  });
  
  export const chatModelo = mongoose.model(chatColl, messageSchema);
  