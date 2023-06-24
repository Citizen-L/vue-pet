import request from "./requests";

//查询订单请求 --uid
export function requestquerypetorder1(parameter) {
    return request({
        url: "/order/querypetorder1",
        params: parameter
    })
}

//查询订单请求 --pid
export function requestquerypetorder2(parameter) {
    return request({
        url: "/order/querypetorder2",
        params: parameter
    })
}


//修改订单请求--完成
export function requestupdatepetorder1(parameter) {
    return request({
        url: "/order/updatepetorder1",
        method: 'post',
        params: parameter
    })
}


//修改订单请求--取消
export function requestupdatepetorder2(parameter) {
    return request({
        url: "/order/updatepetorder2",
        method: 'post',
        params: parameter
    })
}

//修改订单请求--修改
export function requestupdatepetorder3(parameter) {
    return request({
        url: "/order/updatepetorder3",
        method: 'post',
        params: parameter
    })
}


//添加订单请求
export function requestaddpetorder(parameter) {
    return request({
        url: "/order/addpetorder",
        method: "post",
        params: parameter
    })
}

//删除订单请求
export function requestdeletepetorder(parameter) {
    return request({
        url: "/order/deletepetorder",
        params: parameter,
        method:'delete'
    })
}