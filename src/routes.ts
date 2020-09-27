import { Router, Request, Response } from "express";
const AuthMiddleware = require('./middlewares/auth')

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  console.log(req.headers)
  return res.json({msg: 'this is an secure server'})
});

routes.post('/', (req: Request, res: Response) => {
  console.log(req.headers)
  console.log(req.body)
  return res.json({ msg: 'this is' })
});

routes.use(AuthMiddleware)

routes.get('/login', (req: Request, res: Response) => {
  //console.log(req.userId)
  return res.json({ ok: true })
});

routes.post('/login', (req: Request, res: Response) => {
  console.log(req.body)
  
  return res.json({ ok: true })
});

export default routes

