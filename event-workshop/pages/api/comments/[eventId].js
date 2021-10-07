import { connectDB } from '../../../helpers/db-util'

async function handler(req, res) {
  const eventId = req.query.eventId
  const { email, name, comment } = req.body

  let client;

  try {
    client = await connectDB()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' })
    client.close()
    return
  }

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

    try {
      const result = await insertDocument(client, 'comments', newComment)
      client.close()

      newComment._id = result.insertedId

      res.status(201).json({
        message: 'success',
        comment: newComment
      })
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' })
    }
  }

  if (req.method === 'GET') {
    const result = await client.db('nextjs').collection('comments').find({ eventId }).sort({ _id: -1 }).toArray()
    res.status(200).json({ message: 'success', comments: result })
  }

  client.close()
}

export default handler;