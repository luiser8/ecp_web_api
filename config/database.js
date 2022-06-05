import mongoose  from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
    const env = process.env.NODE_ENV === "development" ? process.env.MONGO_URI_LOCAL : process.env.MONGO_URI;
    const database = await mongoose.connect(env, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then().catch(err => console.error(err));
    
export default database;