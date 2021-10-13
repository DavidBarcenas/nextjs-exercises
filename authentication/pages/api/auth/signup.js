import { hashPassword } from "../../../helpers/auth";
import { connectToDB } from "../../../helpers/db-utils"

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    const invalidEmail = !email || !email.includes('@');
    const invalidPassword = !password || password.trim().length < 7;

    if (invalidEmail || invalidPassword) {
      res.status(422).json({
        message: 'Invalid input - password should also be at least 7 characters long.'
      })
      return
    }

    const client = await connectToDB()
    const db = await client.db('nextjs').collection('users')

    const existingUser = await db.findOne({ email })

    if (existingUser) {
      res.status(422).json({ message: 'User exists already!' })
      client.close()
      return
    }

    const hashedPassword = await hashPassword(password)

    await db.insertOne({
      email,
      password: hashedPassword
    })

    res.status(201).json({ message: 'Created user!' })
    client.close()
  }
}

export default handler