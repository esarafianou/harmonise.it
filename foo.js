const jwt = require('jsonwebtoken')

let token = jwt.sign({
  data: 'foobar'
}, 'secret', { expiresIn: 60 * 60 });

var decoded = jwt.decode(token);
