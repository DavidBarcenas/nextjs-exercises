import { MongoClient } from 'mongodb'

export async function connectDB() {
  const client = await MongoClient.connect(process.env.MONGO_CONNECT)
  return client
}

export async function insertDocument(client, collection, document) {
  const db = client.db('nextjs')
  const result = await db.collection(collection).insertOne(document)

  return result
}
