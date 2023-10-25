import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  searches: {
    type: Array,
    required: true,
  },
  interests: {
    type: Array,
    required: true,
  },
  notifications: {
    type: Array,
    required: true,
  },
});

export const UserMongo = mongoose.model("User", userSchema);
