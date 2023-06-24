const express = require('express')

//创建路由对象
const order = express.Router()

//引入数据库
const pool = require('../../pool/pool')

const Joi = require('joi')
const Response = require('../../utils/Response')
const { number } = require('joi')


//查询订单请求 --uid
order.get('/querypetorder1',(req,res) => {
    const uid = req.query.uid
    // 从连接池中获取连接
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send("服务器错误");
      } else {
        // 执行 SQL 查询语句
        const sql = "SELECT * FROM pet_po WHERE uid=?";
        connection.query(sql, [uid], (err, data) => {
          // 释放连接
          connection.release();
          if (err) {
            console.log(err);
            res.status(500).send("服务器错误");
          } else if (data.length == 0) {
            res.status(404).send("宠物订单不存在");
          } else {
            res.status(200).send(data);
          }
        });
      }
    });
})


//查询订单请求 --pid
order.get('/querypetorder2',(req,res) => {
    const pid = req.query.pid
    // 从连接池中获取连接
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send("服务器错误");
      } else {
        // 执行 SQL 查询语句
        const sql = "SELECT * FROM pet_po WHERE pid=?";
        connection.query(sql, [pid], (err, data) => {
          // 释放连接
          connection.release();
          if (err) {
            console.log(err);
            res.status(500).send("服务器错误");
          } else if (data.length == 0) {
            res.status(404).send("宠物订单不存在");
          } else {
            res.status(200).json(data);
          }
        });
      }
    });
})



//添加订单请求
order.post('/addpetorder', (req, res) => {
	const { uid, pid, puid, price, petname, phone, postatu, recipientname, address,img } = req.query;

	const query = `
	INSERT INTO pet_po (uid, pid, puid, price, petname, phone, postatu, recipientname, address, date, img)
	VALUES (${uid}, ${pid}, ${puid}, '${price}', '${petname}', '${phone}', '0', '${recipientname}', '${address}', CURDATE(),'${img}')
	`;
  
	pool.query(query, (error, results) => {
	  if (error) {
		console.error(error);
		res.status(500).json({
		  flag: 0,
		  msg: '添加订单失败',
		});
	  } else {
		res.json({
		  flag: 1,
		  msg: '添加订单成功',
		});
	  }
	});
  });
  

//修改订单请求--完成
order.post('/updatepetorder1', (req, res) => {
	const { poid, postatu, pid, pk } = req.query
	pool.getConnection((err, connection) => {
	    if (err) {
			console.error('Error getting database connection', err)
			res.status(500).json({ error: 'Error getting database connection' })
			return
		}
		const sql = 'UPDATE pet_po SET postatu = ? WHERE poid = ? & pid = ?'
		connection.query(sql, [postatu, poid, pid], (error, results, fields) => {
			connection.release()
			if (error) {
				console.error('Error updating pet order', error)
				res.status(500).json({ error: '修改/更新失败' })
				return
			}
			res.json({ message: '修改/更新成功' })
		})
	})
})


//修改订单请求--取消
order.post('/updatepetorder2', (req, res) => {
	const { poid, postatu , pid} = req.query
	const sql = 'UPDATE pet_po SET postatu = ? WHERE poid = ? and pid = ?'

	pool.query(sql, [postatu, poid, pid], (error, results, fields) => {
	    if (error) {
			console.error('Error cancelling pet order', error)
			res.status(500).json({ error: '订单取消失败' })
			return
	    }
	    res.json('订单取消成功')
	})
})


//修改订单请求--修改
order.post('/updatepetorder3', (req, res) => {
	const { poid, newaddress, newphone, newrecipientname, postatu } = req.query
	const sql = 'UPDATE pet_po SET address = ?, phone = ?, recipientname = ?, postatu = ? WHERE poid = ?'
	const values = [newaddress, newphone, newrecipientname, postatu, poid]
	pool.query(sql, values, (error, results, fields) => {
	   if (error) {
		    console.error('订单修改失败', error)
		    res.status(500).json({ error: '订单修改失败' })
	    	return
	    }
	    res.json('订单修改成功')
	})
})



//删除订单请求
order.delete('/deletepetorder', (req, res) => {
	const poid = req.query
	const sql = 'DELETE FROM pet_po WHERE poid = ?'
	pool.query(sql, poid, (error, results, fields) => {
	  	if (error) {
			console.error('订单删除失败', error);
			res.status(500).json({ error: '订单删除失败' })
			return
	  	}
	  	res.json('订单删除成功')
	})
})










module.exports = order