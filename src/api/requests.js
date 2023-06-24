import axios from 'axios'
export default function request(config){
    const instance = axios.create({
        baseURL:"http://localhost:3001/",
        timeout:5000
    })
    instance.interceptors.response.use((res) => {
        return res.data
    },(err) => {
        return Promise.reject(err)
    })
    return instance(config)
}

// 在请求拦截器中添加 Token 到请求头
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

/*
这段代码是一个封装了axios的请求方法，它用于向后端服务器发送HTTP请求，并返回响应数据。具体来说，这个方法接受一个参数 config，这个参数是一个包含请求相关配置的对象，例如请求的URL、请求方法、请求参数等等。然后，这个方法会创建一个axios实例 instance，并调用 instance 的方法来发送HTTP请求。在发送请求的过程中，这个方法还对响应数据进行了拦截处理，使得返回的响应数据只包含后端服务器返回的data字段，而不是整个响应对象。最后，这个方法返回一个Promise对象，当请求成功时，Promise对象的状态会变为fulfilled，并将响应数据传递给下一个then()方法；当请求失败时，Promise对象的状态会变为rejected，并将错误信息传递给下一个catch()方法。

这个方法的作用是为了简化在Vue.js应用程序中发送HTTP请求的过程，并且提高代码的可重用性和可维护性。通过封装axios请求方法，我们可以在整个应用程序中使用同样的HTTP请求配置，而不必在每个组件中都编写一遍相同的请求代码。此外，这个方法还可以方便地进行请求拦截和响应拦截，从而对请求过程进行全局控制和统一处理。

 */