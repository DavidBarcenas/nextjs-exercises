import { connectDB, insertDocument } from "../../helpers/db-util";


async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || email.trim() === '' || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' })
      return
    }

    let client;

    try {
      client = await connectDB()
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' })
      return
    }

    try {
      await insertDocument(client, 'newsletter', { email })
      client.close()
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' })
      return
    }

    res.status(201).json({
      message: 'success',
      email
    })
  }
}
export default handler;