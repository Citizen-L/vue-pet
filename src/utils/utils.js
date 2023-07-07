// 身份证号正则表达式
export function checkIdCard(idCard) {
    return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idCard)
}


//手机验证
export function validatePhone(phone) {
    const reg = /^1\d{10}$/;
    return reg.test(phone);
  }


//验证用户名
export function validateUsername(username) {
    const reg = /^[A-Za-z0-9_\u4e00-\u9fa5]{2,16}$/;
    return reg.test(username);
  }