const jwt = require("jsonwebtoken");
const { secretKey,expiresIn } = require('../config/config')
function generateToken(uid, scope) {
  //使用jtw的sign方法生成token
  const token = jwt.sign( {uid,scope}, secretKey,{expiresIn})
  return token
}

module.exports = {
  generateToken,
};
