import { Buffer } from 'buffer'//Buffer
import { Request, Response } from "express";

const auth = {
  user: 'goo',
  pass: '123'
}

export default async (req: Request, res: Response, next: any) => {
  function error() {
    res.header('WWW-Authenticate', 'Basic')
    return res.status(401).json({ error: 'not authenticate' })
  }
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return error()
  }
  
  const [, token] = authHeader.split(' ');
  
  try {
    const decoded = Buffer.from(token, 'base64').toString('ascii');
    
    const decode = decoded.split(':')
    
    if(decode[0] !== auth.user || decode[1] !== auth.pass) {
      return error()
    }
    
    req.userId = decode
    
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};

/* Basic
base64: ZnVsYW5vOjEyMzQ=
fulano:1234
*/
