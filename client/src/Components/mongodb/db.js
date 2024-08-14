// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://duquejimson:ZTrjM0Q4sOKTbZi0@cluster0.zj8ia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

const connectToDb = async () => {
    try {
        await client.connect();
        dbConnection = client.db('record'); // Use your actual database name
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

const getDb = () => {
    if (!dbConnection) {
        throw new Error('No DB connection');
    }
    return dbConnection;
};

module.exports = { connectToDb, getDb };
