const jtw = require('jsonwebtoken')
const { secretKey }= require('../config/config')
class Auth {
  static verifyToken(token){
    try{ 
      const decode = jtw.verify(token,secretKey)
      jtw.verify(token,secretKey)
      return true
    }
    catch(e){
      return false
    }
  }
}

module.exports=Auth