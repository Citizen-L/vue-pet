const express = require('express')
const mysql = require('mysql')
const pool = mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password: '123456',
    database:'petboard',
    connectTimeout:20,
})


// 为pool新增一个方法,返回一个promise
pool.querySync = (sql, params) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }
  module.exports = pool;
  