import { getSession } from 'next-auth/client'

import { connectToDB } from '../../../helpers/db-utils';
import { hashPassword, verifyPassword } from '../../../helpers/auth';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' })
    return
  }

  const email = session.user.email
  const { oldPassword, newPassword } = req.body

  const client = await connectToDB()
  const usersCollection = client.db('nextjs').collection('users')
  const user = await usersCollection.findOne({ email })

  if (!user) {
    res.status(404).json({ message: 'User not found.' })
    client.close()
    return
  }

  const currentPassword = user.password
  const passwordsAreEqual = verifyPassword(oldPassword, currentPassword)

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' })
    client.close()
    return;
  }

  const hashedPassword = await hashPassword(newPassword)

  await usersCollection.updateOne({ email }, {
    $set: {
      password: hashedPassword
    }
  })

  client.close()
  res.status(403).json({ message: 'Password updated!' })
}

export default handler;