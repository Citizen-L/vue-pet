const express = require('express')

//创建路由对象
const pet = express.Router()

//引入数据库
const pool = require('../../pool/pool')

// 引入multer中间件
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const Joi = require('joi')
const Response = require('../../utils/Response')
const { number } = require('joi')

pet.get('/username',(req,res) => {
	let uid = req.query.uid
	let sql = 'select username from user where uid = ? '
	pool.query(sql,[uid],(err,data) => {
		if (err) {
		    // 处理错误
			console.error('查询用户名失败：', err)
			return res.status(500).send({ message: '查询用户名失败' })
		}
		// 返回查询结果
		res.send(data)
	})
})



pet.get('/queryBKind',(req,res) => {
    let sql = `select * from pet_bkind`
    // 执行 SQL 查询
    pool.query(sql,(err, data) => {
        if (err) {
        // 处理错误
        console.error('查询宠物类别失败：', err);
        return res.status(500).send({ message: '查询宠物类别失败' })
        }
        // 返回查询结果
        res.send(data)
    })
})

//查询所有宠物种类以及对应品种
pet.get('/queryBKindandSKind',(req,res) => {
    let sql = `SELECT * FROM pet_skind`;
    // 执行 SQL 查询
    pool.query(sql,(err, data) => {
        if (err) {
        // 处理错误
        console.error('查询宠物类别失败：', err);
        return res.status(500).send({ message: '查询宠物类别失败' })
        }
        // 返回查询结果
        res.send(data)
    })
})

//查询所有宠物品种
pet.get('/queryallskind',(req,res) => {
    let sql = `select skid,bkid,skindname from pet_skind`
    pool.query(sql,(err,data) => {
        if(err){
            console.error('查询宠物品种失败:',err)
            return res.status(500).send({message:'查询宠物品种失败'})
        }
        res.send(data)
    })
})

//查询宠物最高价
pet.get('/queryMaxPrice',(req,res) => {
    let sql = 'SELECT MAX(p_price) AS maxprice FROM pet'
    pool.query(sql, (err, data) => {
        if (err) {
          console.error('查询宠物最高价失败:', err)
          return res.status(500).send({ message: '查询宠物最高价失败' })
        }
        // 将查询结果发送给客户端
        res.send(data)
      })
})

//查询所有宠物的年龄
pet.get('/queryage',(req,res) => {
    let sql = 'SELECT p_year AS age FROM pet'
    pool.query(sql, (err, data) => {
        if (err) {
          console.error('查询所有宠物年龄失败:', err)
          return res.status(500).send({ message: '查询所有宠物年龄失败' })
        }
        // 将查询结果发送给客户端
        res.send(data)
    })
})


//分页查询宠物 
pet.post('/querypetpage', (req, res) => {
    let {page, count, sort, pk, bkid, skid, petname, maxprice } = req.query
    let p_year = req.query.age
    let petnameValue = `%${petname}%`
    let offset = (page - 1) * count
    let limit = Number(count)
    let orderByClause = ''

    if (sort === 'p_price ASC') {
      orderByClause = 'ORDER BY p_price ASC'
    } else if (sort === 'p_price DESC') {
      orderByClause = 'ORDER BY p_price DESC'
    }

    let sql = `SELECT * FROM pet WHERE pk = ? AND bkid = ? AND skid = ? AND petname LIKE ? AND p_year <= ? AND p_price <= ? ${orderByClause} LIMIT ?, ?`

    pool.query(sql, [pk, bkid, skid, petnameValue, p_year, maxprice, offset, limit], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send('Server Error')
        } else {
            res.send(data)
        }
    })
})

// 根据宠物 ID 查询宠物详情
pet.get("/querypetbyid", (req, res) => {
    const pid = req.query.pid
    // 从连接池中获取连接
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err)
        res.status(500).send("服务器错误")
      } else {
        // 执行 SQL 查询语句
        const sql = "SELECT * FROM pet WHERE pid=?"
        connection.query(sql, [pid], (err, results) => {
          // 释放连接
          connection.release()
          if (err) {
            console.log(err)
            res.status(500).send("服务器错误")
          } else if (results.length == 0) {
            res.status(404).send("宠物不存在")
          } else {
            res.status(200).json(results[0])
          }
        })
      }
    })
  })


// 处理删除宠物的请求
pet.delete('/deletePet', (req, res) => {
    const pid = req.query.pid // 从请求参数中获取宠物 ID
     // 从连接池中获取一个连接对象
     pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).send("Database error")
        } else {
            // 执行 SQL 查询
            connection.query(
                "DELETE FROM pet WHERE pid = ?",
                [pid],
                (error, results) => {
                    // 释放连接
                    connection.release()
                    if (error) {
                        console.error(error)
                        res.status(500).send("Database error")
                    } else {
                        res.send("success")
                    }
                }
            )
        }
    })
})



//查询所有宠物信息（可加uid）
pet.get('/queryAllPet', (req, res) => {
	const { uid} = req.query
	let sql = 'SELECT * FROM pet WHERE uid = ?'
	pool.query(sql,[uid],(error, data, fields) => {
		if (error) {
		    console.error(error)
		  	res.status(500).json({ error: 'Internal server error' })
		} else {
		  	res.json(data)
		}
	})
})




// 处理添加宠物信息的请求
pet.post('/addpet', upload.array('files'), (req, res) => {
    const petData = req.body
    const files = req.files
    // TODO: 将文件信息保存到数据库中
    // 将上传的图片数据存储到 img 字段中
    if (!req.files || !Array.isArray(req.files)) {
      	return res.status(400).send('No files uploaded')
    }
    petData.img = files.map(file => file.path)
    // TODO: 将宠物信息保存到数据库中
    // 将宠物信息保存到数据库中
    pool.query('INSERT INTO pet SET ?', petData, (error, results, fields) => {
    if (error) {
    	res.status(500).send(error.message)
    } else {
    	res.send('添加成功')
    }
    })
})



// 处理更新宠物信息的请求
pet.post('/updatePet',upload.array('files'), (req, res) => {
    const petData = req.body
    const files = req.files
    // TODO: 将文件信息保存到数据库中
    // 将上传的图片数据存储到 img 字段中
    if (!req.files || !Array.isArray(req.files)) {
      	return res.status(400).send('No files uploaded')
    }
    petData.img = files.map(file => file.path)
    // TODO: 将宠物信息保存到数据库中
    // 将宠物信息保存到数据库中
    const { pid, ...updateData } = petData;
  pool.query('UPDATE pet SET ? WHERE pid = ?', [updateData, pid], (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.send('修改成功');
    }
  });
});





module.exports = pet;
