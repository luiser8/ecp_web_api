import mongoose  from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

    let database = await mongoose.connect(process.env.DB, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then().catch(err => console.error(err));
    
export default database;