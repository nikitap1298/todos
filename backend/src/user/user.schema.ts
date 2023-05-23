/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose"
import bcrypt from "bcrypt"

export const UserSchema = new mongoose.Schema({
  login: String,
  password: String,
})

// Encrypt user password
UserSchema.pre("save", async function (next) {
  const user = this
  if (!user.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
  } catch (error) {
    return console.error(error)
  }
})
