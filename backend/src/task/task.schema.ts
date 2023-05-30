import mongoose from "mongoose"

export const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  title: String,
  createdAt: Date,
  finished: Boolean,
  finishedAt: Date,
})
