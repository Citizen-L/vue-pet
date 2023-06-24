import request from "./requests"

//登录
export function requestLogin(parameter){
    return request({
        url:'/user/login',
        method:'post',
        params:parameter
    })
}

// 注册前验证账号是否已被注册
export function requestcheckuser(parameter) {
    return request({
        url: "/user/checkuser",
        params: parameter
    })
}

//实名验证
export function requestcheckrealname(parameter) {
    return request({
        url: "/user/checkrealname",
        params: parameter
    })
}


// 注册
export function requestregister(parameter) {
    return request({
        url: "/user/register",
        method: "post",
        params: parameter
    })
}
