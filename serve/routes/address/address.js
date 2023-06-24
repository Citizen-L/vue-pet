const express = require('express')

//创建路由对象
const address = express.Router()

//引入数据库
const pool = require('../../pool/pool')

const Joi = require('joi')
const Response = require('../../utils/Response')
const { number } = require('joi')

//通过uid查找地址
address.get('/queryAddressbyuid', (req, res) => {
    const { uid } = req.query
    const sql = `SELECT * FROM address WHERE uid = ?`
    pool.query(sql, [uid], (error, data) => {
      if (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(data)
      }
    })
  })



//添加地址
address.post('/addAddress', (req, res) => {
    const { uid, phone, username, address } = req.query
    const sql = `INSERT INTO address (uid, phone, username, address) VALUES (?, ?, ?, ?)`
    pool.query(sql, [uid, phone, username, address], (error, results, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        } else {
            res.status(200).json({ msg: '新增地址成功' })
        }
    })
})



//删除地址
address.delete('/deleteAddress',(req,res) => {
	const {aid} = req.query
	const sql = `DELETE FROM address WHERE aid = ${aid}`
	pool.query(sql,(err,results) => {
		if(err){
			console.error(err)
			res.status(500).send('Server Error')
		} else {
			res.send('Success')
		}
	})
})


//修改地址
address.post('/updateAddress',(req,res) => {
	const { aid, phone, username, address } = req.query
	const sql = `UPDATE address SET phone='${phone}', username='${username}', address='${address}' WHERE aid=${aid}` 
	pool.query(sql, (err, result) => {
	  	if (err) {
			console.error(err)
			res.status(500).send('Server Error')
	  	} else {
			res.send({ msg: '地址修改成功' })
	  	}
	})
})


module.exports = address