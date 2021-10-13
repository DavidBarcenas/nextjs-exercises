import { hashPassword } from "../../../helpers/auth";
import { connectToDB } from "../../../helpers/db-utils"

async function handler(req, res) {
  const { email, password } = req.body

  const invalidEmail = !email || !email.includes('@');
  const invalidPassword = !password || password.trim().length < 7;

  if (invalidEmail || invalidPassword) {
    res.status(422).json({
      message: 'Invalid input - password should also be at least 7 characters long.'
    })
    return
  }

  const hashedPassword = hashPassword(password)

  const client = await connectToDB()

  await client
    .db('nextjs')
    .collection('users')
    .insertOne({
      email,
      password: hashedPassword
    })

  res.status(201).json({ message: 'Created user!' })
}

export default handler