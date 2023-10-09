import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('cred - ', credentials)
        return { id: '1', name: 'Admin', email: 'admin@admin.com', role: 'admin' }
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user }) {
      console.log('cb jwt account - ', account)
      console.log('cb jwt token - ', token)
      console.log('cb jwt user - ', user)
      if (account) {
        token.role = user.role
      }

      return token
    },
    async session({ session, token }) {
      console.log('cb session token - ', token)
      session.user.role = token.role

      return session
    },
  },
}
