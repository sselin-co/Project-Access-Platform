import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Admin from "../utils/Admin";

const options = {
  // Configure one or more authentication providers
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = (credentials) => {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          if (credentials.email.length === 0 || credentials.password.length === 0){
            res.status(400).json({error: `Please enter email and password`});
        } else{
            if(Admin.checkAuthentication(credentials.email, credentials.password)){
                //req.session.username=req.body.email;
                user = {email: credentials.email, type: "admin"};
              }else{
                res.status(400).json({error: `Credentials incorrect`});
              }
          }
          return null
        }
        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }
    })
    ],

    database: process.env.DATABASE_URL,

    session: {
        jwt: true,
    }
  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)