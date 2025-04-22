import { Db, MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is undefined");
}

if (!DB_NAME) {
  throw new Error("DB_NAME environment variable is undefined");
}

let client: MongoClient | null = null;

export default async function getDb(): Promise<Db> {
  if (!client) {
    client = new MongoClient(MONGO_URI!);
    await client.connect();
  }
  return client.db(DB_NAME);
}
