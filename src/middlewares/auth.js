const Buffer = require('buffer').Buffer

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.header('WWW-Authenticate', 'Basic')
    return res.status(401).json({ error: 'not authenticate' })
  }

  const [, token] = authHeader.split(' ');
  
  try {
    const decoded = Buffer.from(token, 'base64').toString('ascii');
    
    req.userId = decoded;
    
    return next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: 'Token Invalid' });
  }
};

/* Basic
base64: ZnVsYW5vOjEyMzQ=
fulano:1234
*/
