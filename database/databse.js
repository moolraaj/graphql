import mongoose from "mongoose";

let MONGODB_URI = "mongodb+srv://raaj73906:raaj6230097248@cluster0.fsyzvmn.mongodb.net/graphql_tuts?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;  

export const dbconnect = async () => {
    if (isConnected) {
        console.log('Already connected to the database');
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI);

        isConnected = true;  
        console.log('Database connected');
        
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to the database');
        });

        mongoose.connection.on('disconnected', (err) => {
            console.log('Database disconnected: ' + err);
            isConnected = false;  
            process.exit(1);
        });

    } catch (error) {
        console.error('Error connecting to the database: ', error);
        process.exit(1);
    }
};
