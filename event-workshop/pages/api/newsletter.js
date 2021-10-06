import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@')
    ) {
      res.status(422).json({ message: 'Invalid email address' })
      return
    }

    const client = await MongoClient.connect(process.env.MONGO_CONNECT)
    const db = client.db('nextjs')

    await db.collection('newsletter').insertOne({ email })
    client.close()

    res.status(201).json({
      message: 'Success!',
      email
    })
  }
}

export default handler;