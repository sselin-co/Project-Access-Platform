import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Admin from "../utils/Admin";
import Student from '../utils/Student';

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
        let user;
        if (credentials.email.length === 0 || credentials.password.length === 0){
            user = null;
        } else{
            let admin = await Admin.checkAuthentication(credentials.email, credentials.password);
            let student = await Student.checkAuthentication(credentials.email, credentials.password);
            if (admin){
                user = {email: credentials.email, name: "admin"};
            } else if (student){
                user = {email: credentials.email, name: "student"};
            } else{
                user = null;
            }
        }
        console.log(user);
        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }
    })
    ],

    //database: process.env.DATABASE_URL,

    session: {
        jwt: true,
    }
}

export default (req, res) => NextAuth(req, res, options)