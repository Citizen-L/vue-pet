import request from "./requests";

//查找单个用户信息
export function requestqueryuser(parameter) {
    return request({
        url: "/user/queryuser",
        params: parameter
    })
}

//更改用户信息
export function requestupdateuser(parameter) {
    return request({
        url: "/user/updateuser",
        method: "post",
        data: parameter,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}



// 修改密码
export function requestchangepassword(parameter) {
    return request({
        url: "/user/changepassword",
        method: "post",
        params: parameter
    })
}