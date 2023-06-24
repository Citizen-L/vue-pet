//统一管理项目的所有接口
import request from "./requests";



//在这里封装函数:复用这些接口
//将来这个函数可以在别的地方使用,需要对外暴露【分别暴露】

//查询登录用户名字
export const requestusername = (parameter) => request({url:'/pet/username',methods:'get',params: parameter,})

//查询所有宠物种类
export const requestqueryBKind = () => request({url:'/pet/queryBKind', methods:'get'})

//查询所有宠物种类以及对应品种
export const requestqueryBKindandSKind = () => request({url:'/pet/queryBKindandSKind',method:'get'})

//查询所有宠物品种
export const requestqueryallskind = () => request({url:'/pet/queryallskind',method:'get'})

//查询宠物最高价
export const requestqueryMaxPrice = () => request({url:'/pet/queryMaxPrice',method:'get'})

//查询所有宠物年龄
export const requestqueryage = () => request({url:'/pet/queryage',method:'get'})


//查询宠物总条目数
export const requestquerypetcount = (parameter)  => request({url:'/pet/querypetcount',parameter, method:'post' })


//分页查询宠物
export function requestquerypetpage(parameter) {
    return request({
        url: "/pet/querypetpage",
        params: parameter,
        method:'post'    })
}

//删除宠物信息
export function requestdeletePet(parameter) {
    return request({
        url: "/pet/deletePet",
        params: parameter,
        method:'delete'
    })
}


//根据pid查询宠物详情
export function requestquerypetbyid(parameter) {
    return request({
        url: "/pet/querypetbyid",
        params: parameter
    })
}


//查询所有宠物信息（可加uid）
export function requestqueryAllPet(parameter) {
    return request({
        url: "/pet/queryAllPet",
        params: parameter
    })
}

//添加宠物请求
export function requestaddpet(parameter) {
    return request({
        url: "/pet/addPet",
        method: "post",
       /*  headers:{'Content-Type': 'multipart/form-data'}, */
        data: parameter
    })
}

//修改宠物信息
export function requestupdatePet(parameter) {
    return request({
        url: "/pet/updatePet",
        method: 'post',
        data: parameter
    })
}
























/* //更新最近聊天-联系人的信息记录
export const requestUpdateContact = (parameter) => request({url:"/contact/updatecontact",method:'post',parameter})

//查询用户最近联系人
export const requestquerycontactuser = (parameter) => request({url:"/contact/querycontactuser",method:'get',parameter})


 //查找聊天记录
 export const requestqueryusernotice = (parameter) => request({url:"/contact/queryusernotice",method:'get',parameter}) 
 
//添加最近联系人
export function requestaddContact(parameter) {
    return request({
        url: "/contact/addContact",
        method: 'post',
        params: parameter
    })
}
/******************** */
 //查询单个用户信息
/* export const requestqueryuser = (parameter) => request({url:"/contact/queryuser",parameter})  */

