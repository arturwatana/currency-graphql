import mongoose from "mongoose";
export async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`),
        (err) => {
            if (err) {
                console.log(err);
            }
            return console.log("mongodb conectado");
        };
}
