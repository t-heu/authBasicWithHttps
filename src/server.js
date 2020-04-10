const fs = require('fs');
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express');
const https = require('https');

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
app.use(require('./routes'))

server.listen(PORT, () => { 
  console.log(`🚀 listening on ${PORT}`) 
});

