import mongoose from "mongoose"

export const EmailTokenSchema = new mongoose.Schema({
  token: String,
  userId: String,
})
