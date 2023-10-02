import mongoose from "mongoose";

export async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.007qruh.mongodb.net/?retryWrites=true&w=majority"
  ),
    (err) => {
      if (err) {
        console.log(err);
      }
      return console.log("mongodb conectado");
    };
}
