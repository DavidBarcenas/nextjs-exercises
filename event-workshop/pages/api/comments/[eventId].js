import { MongoClient } from 'mongodb'

async function handler(req, res) {
  const eventId = req.query.eventId
  const { email, name, comment } = req.body

  const client = await MongoClient.connect(process.env.MONGO_CONNECT)
  const db = client.db('nextjs')

  if (req.method === 'POST') {
    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !comment ||
      comment.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' })
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      comment
    }

    const result = await db.collection('comments').insertOne(newComment)

    newComment.id = result.insertedId

    res.status(201).json({
      message: 'success',
      comment: newComment
    })
  }

  if (req.method === 'GET') {
    const result = await db.collection('comments').find().sort({ _id: -1 }).toArray()
    res.status(200).json({ message: 'success', comments: result })
  }

  client.close()
}

export default handler;