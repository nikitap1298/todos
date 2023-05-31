/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
  login: String,
  password: String,
})
