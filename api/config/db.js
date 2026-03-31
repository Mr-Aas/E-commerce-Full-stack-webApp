import mongoose from "mongoose"

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected : ${conn.connection.host}`);

    } catch (err) {
        console.error("database connection error ", err.message);
        process.exit(1);

    }
};

export default connectdb;