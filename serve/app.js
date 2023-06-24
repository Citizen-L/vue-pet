const express = require('express');
const cors = require('cors')
const path = require('path');
/* const cookieParser = require('cookie-parser');
const logger = require('morgan'); */

const app = express();



//启动服务器
app.listen(3001,err =>  {
  if(err) console.log('error:',err)
  else console.log('3001端口开启')
})


//使用中间件
app.use(
  cors({
    // 允许跨域的服务器地址,可以写多个
    origin: [
      'http://localhost:8081',
      'http://127.0.0.1:8081',
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3001',
      'http://localhost:3001',
    ],
  })
);

//导入各个路由模块
const pet = require('./routes/pet/pet.js')
const user = require('./routes/user/user')
const order = require('./routes/order/order')
const address = require('./routes/address/address')
//配置路由
app.use('/pet', pet);
app.use('/user',user)
app.use('/order',order)
app.use('/address',address)

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
});
 */
// 使用错误处理中间件,拦截所有路由中抛出的错误
app.use((err, req, res, next) => {
  //err 得到的中间件传递过来的错误
  console.log(err);
  //设置http响应的状态码
  res.status(500).send({ code: 500, msg: '服务器端错误' });
});


// 必须在指定静态文件夹之前书写
const history = require('connect-history-api-fallback');
app.use(history());

// 托管静态资源文件夹
app.use(express.static('./static'));
app.use(express.static(path.join(__dirname, 'static')));

