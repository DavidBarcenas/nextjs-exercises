import NextAuth from 'next-auth'
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../helpers/auth';

import { connectToDB } from '../../../helpers/db-utils';

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDB()

        const usersCollection = await client.db('nextjs').collection('users')
        const user = await usersCollection.findOne({ email: credentials.email })

        if (!user) {
          client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(credentials.password, user.password)

        if (!isValid) {
          client.close()
          throw new Error('Could not log you in!')
        }

        client.close()

        return {
          email: user.email
        }
      }
    })
  ]
});