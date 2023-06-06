import mongoose from "mongoose"

export const ConfirmationTokenSchema = new mongoose.Schema({
  token: String,
  userId: String,
})
