/* const express = require('express')

//创建路由对象
const contact = express.Router()

//引入数据库
const pool = require('../../pool/pool')

const Joi = require('joi')
const Response = require('../../utils/Response')
const { number } = require('joi')

// 定义 Joi 验证规则
const schema = Joi.object({
    cid: Joi.number().required(),
    noread: Joi.number().required()
  })

// 更新最近联系人列表中某个联系人的未读消息数量
contact.post('/updatecontact', (req, res) => {

}); */