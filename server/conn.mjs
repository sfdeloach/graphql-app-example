import { MongoClient, ServerApiVersion } from 'mongodb';
import { uri as connectionString } from './atlasURI.js';

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

let conn;

try {
  conn = await client.connect();
  console.log(`[${new Date().toLocaleTimeString()}] database connected`);
} catch (e) {
  console.error(e);
}

let db = conn.db('bookstore');

export default db;
