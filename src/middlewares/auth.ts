import { Buffer } from 'buffer'//Buffer
import { Request, Response } from "express";

export default async (req: Request, res: Response, next: any) => {
  const auth = {login: 'yourlogin', password: 'yourpassword'} // change this

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  // Verify login and password are set and correct
  if (login && password && login === auth.login && password === auth.password) {
    // Access granted...
    return next()
  }

  // Access denied...
  res.set('WWW-Authenticate', 'Basic realm="401"') // change this
  res.status(401).send('Authentication required.') // custom message
}

// const auth = {
//   user: 'goo',
//   pass: '123'
// }

// export default async (req: Request, res: Response, next: any) => {
//   function error() {
//     res.header('WWW-Authenticate', 'Basic')
//     return res.status(401).json({ error: 'not authenticate' })
//   }
  
//   const authHeader = req.headers.authorization;
  
//   if (!authHeader) {
//     return error()
//   }
  
//   const [, token] = authHeader.split(' ');
  
//   try {
//     const decoded = Buffer.from(token, 'base64').toString('ascii');
    
//     const decode = decoded.split(':')
    
//     if(decode[0] !== auth.user || decode[1] !== auth.pass) {
//       return error()
//     }
    
//     req.userId = decode
    
//     return next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Token Invalid' });
//   }
// };

/* Basic
base64: ZnVsYW5vOjEyMzQ=
fulano:1234
*/
