import * as fs from 'fs'
import * as path from 'path'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as express from 'express'
import * as https from 'https'

import routes from './routes'

const app = express();
const PORT = 3001

const server = https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, 'cert','server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert','server.crt'))
}, app)

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
//app.use(express.json())
app.use(routes)

server.listen(PORT, () => { 
  console.log(`🚀 listening on ${PORT}`) 
});

