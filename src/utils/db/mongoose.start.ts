import mongoose from "mongoose";

export async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`
  ).then(()=> console.log("MongoDB Connected")).catch(err=> console.log("MongoDB failed"))
}
