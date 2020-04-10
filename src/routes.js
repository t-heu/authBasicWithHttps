const { Router } = require('express')
const routes = Router()

const AuthMiddleware = require('./middlewares/auth')

routes.get('/', (req, res) => {
  console.log(req.headers)
  console.log(req.token)
  return res.json({msg: 'this is an secure server'})
});

routes.post('/', (req, res) => {
  console.log(req.headers)
  console.log(req.body)
  return res.json({ msg: 'this is' })
});

routes.use(AuthMiddleware)

routes.get('/login', (req, res) => {
  console.log(req.decoded)
  return res.json({ ok: true })
});

routes.post('/login', (req, res) => {
  console.log(req.headers)
  console.log(req.body)
  
  return res.json({ ok: true })
});

module.exports = routes
