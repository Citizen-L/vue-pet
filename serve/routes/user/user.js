const express = require('express')

//创建路由对象
const user = express.Router()

//引入数据库
const pool = require('../../pool/pool')
const nodemailer = require('nodemailer');
const { generateToken } = require('../../core/utils');
// 引入multer中间件
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
/* const Joi = require('joi')
const Response = require('../../utils/Response')
const { number } = require('joi') */

//登录
user.post('/login',(req,res) => {
    let username = req.query.username
    let password = req.query.password
    let sql = ` SELECT * FROM user WHERE username = ? AND password = ?`;         

    pool.query(sql,[username,password],(err,data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: '服务器错误' });
        } 
        
        if (data.length == 0) {
            res.status(401).send({ code: '201', msg: '登录失败，用户信息不存在！' });
        } else {
            const token = generateToken(data[0].uid, 2);
                res.send({
                    code: 200,
                    msg: '登录成功!',
                    flag: 1,
                    type: 1, // 假设 type 字段存储用户类型
                    token: token,
                    uid: data[0].uid,
                    avatar: data[0].avatar,    //头像这里数据库还没有，要完善
            })
        }
    })
})

// 注册前验证账号是否已被注册
user.get('/checkuser', (req, res) => {
    // 从 URL 参数中获取要检查的用户名和电话号码
    const { username, telphone } = req.query;

    // 从数据库连接池中获取一个连接
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: '服务器内部错误' });
        } else {
            // 执行 SQL 查询，查找是否已经存在相同用户名或电话号码的用户
            const sql = 'SELECT * FROM user WHERE username = ? OR telphone = ?'
            connection.query(sql, [username, telphone], (err, results) => {
                // 释放连接
                connection.release()

                if (err) {
                    console.log(err)
                    res.status(500).send({ msg: '服务器内部错误' })
                } else {
                    // 如果存在相同的用户，则返回 flag=0 和错误消息
                    if (results.length > 0) {
                        res.send({ flag: 0, msg: '该用户名或电话号码已被注册' })
                    } else {
                        res.send({ flag: 1, msg: '该用户名和电话号码可用' })
                    }
                }
            })
        }
    })
})

//实名验证
user.get('/checkrealname', async (req, res) => {
    try {
        // 从 URL 参数中获取要验证的真实姓名和身份证号码
        const { realname, idcard } = req.query;
        
        // 在 user 表中查找是否已经存在相同真实姓名和身份证号码的用户
        const sql = 'SELECT * FROM `user` WHERE `realname`=? AND `idcard`=?';

        pool.query(sql, [realname, idcard], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send({ msg: '服务器内部错误' });
            } else {
                // 如果存在相同的用户，则返回 flag=0 和错误消息
                if (results.length > 0) {
                    res.send({ flag: 0, msg: '该身份证号码已被注册' });
                } else {
                    res.send({ flag: 1, msg: '该身份证号码可用' });
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: '服务器内部错误' });
    }
});


//注册
user.post('/register', (req, res, next) => {
    let obj = req.query;
    let username = obj.username;
    let password = obj.password
    let telphone = obj.telphone
    let realname = obj.realname
    let idcard = obj.idcard
  
    let sql = 'INSERT INTO user (username, password, telphone, realname, idcard) VALUES (?, ?, ?, ?, ?)'
    const values = [username, password, telphone, realname, idcard];

    // 从连接池中获取连接并执行SQL查询
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err)
            return res.status(500).send({ msg: '服务器错误' })
        }
        connection.query(sql, values, (err, results) => {
            connection.release() // 释放连接
            if (err) {
                console.error(err)
                return res.status(500).send({ msg: '服务器错误' })
            }
            return res.send({ msg: '注册成功' })
        })
    })
})




//查找单个用户信息
user.get('/queryuser', (req, res) => {
    let uid = req.query.uid
    let sql = 'select * from user where uid = ?'

    pool.query(sql,[uid],(err,data) => {
        if(err){
            console.log(err)
            res.status(500).send({ msg: '服务器内部错误' })
        }else{
            res.send(data)
        }
    })

})


//更改用户信息
user.post('/updateuser', upload.single('file'), (req, res) => {
    const userData = req.body
    const file = req.file
  
    const { uid, ...updateData } = userData
    if (file) {
        updateData.avatar = file.filename
    }
  
    pool.query('UPDATE user SET ? WHERE uid = ?', [updateData, uid], (error, results, fields) => {
        if (error) {
            res.status(500).send({ flag: 0, msg: error.message })
        } else {
            res.send({ flag: 1, msg: '修改成功', avatar: updateData.avatar })
        }
    })
})


  
// 修改密码
user.post('/changepassword', (req, res) => {
    const { uid, oldpassword, password } = req.query
  
   // 查询数据库，获取用户密码
    const sql = 'SELECT password FROM user WHERE uid = ?'
    pool.query(sql, [uid], (err, results) => {
    if (err) {
        console.log(err)
        res.status(500).send({ msg: '服务器内部错误' })
    } else if (results.length === 0) {
        res.send({ flag: 0, msg: '用户不存在' })
    } else {
        const user = results[0];
        if(user.password != oldpassword){
            res.status(500).send({ msg: '旧密码错误' })
        }else{
            const password = req.query.password
            const updateSql = 'UPDATE user SET password = ? WHERE uid = ?';
            pool.query(updateSql, [password, uid], (err, results) => {
            if (err) {
                console.log(err);
                res.send({ flag: 0, msg: '修改失败' })
                res.status(500).send({ msg: '服务器内部错误' });
                return;
            }

            res.send({ flag: 1, msg: '密码修改成功' });
            })
        }
    }
    })
})
module.exports = user