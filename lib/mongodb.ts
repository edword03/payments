import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environmental variable');
}

if (!MONGODB_DB) {
  throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  let client = new MongoClient(String(MONGODB_URI));
  await client.connect();
  let db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}