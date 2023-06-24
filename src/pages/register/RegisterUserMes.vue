<!--实名验证页面-->
<template>
    <div class="registerusermes">
        <div>
            <!-- 真实姓名 -->
            <div class="inp">
                <img src="~assets/img/user/user.png" alt class="img-bg" />
                <input type="text" placeholder="真实姓名" v-model="form.realname" @blur="checkrealname"
                :class="{ redborder: check.realname.flag }" />
                <p v-show="check.realname.flag">{{ check.realname.val }}</p>
            </div>
            <!-- 身份证号 -->
            <div class="inp">
                <img src="~assets/img/user/idcard.png" alt class="img-bg" />
                <input type="text" placeholder="身份证号" v-model="form.idcard" @blur="checkidcard"
                :class="{ redborder: check.idcard.flag }" />
                <p v-show="check.idcard.flag">{{ check.idcard.val }}</p>
            </div>
            <div class="but">
                <el-button round type="primary" @click="previous">上一步</el-button>
                <el-button round type="primary" @click="next">下一步</el-button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { requestcheckrealname } from "@/api/log_reg"
export default {
    name: 'RegisterUserMes',
    props: ['form'],
    data() {
        return {
            check:{
                realname:{
                    flag:false,
                    val:''
                },
                idcard:{
                    flag:false,
                    val:''
                }
            }
        }
    },
    methods:{
        //检验真实姓名
        checkrealname(){
            if (this.form.realname === "") {
                this.check.realname.val = "真实姓名不能为空"
                this.check.realname.flag = true
            } else {
                this.check.realname.flag = false
            }
        },
        //检验身份证号
        checkidcard() {
            if (this.form.idcard === "") {
                this.check.idcard.val = "身份证号不能为空"
                this.check.idcard.flag = true
            } else if (
                /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
                this.form.idcard
                )
            ) {
                this.check.idcard.flag = false
            } else {
                this.check.idcard.val = "*请正确输入18位身份证号"
                this.check.idcard.flag = true
            }
        },
        previous(){
            this.$emit('previous')       //父组件监听
        },
        next(){
            if (this.check.realname.flag != true && this.check.idcard.flag != true) {
                requestcheckrealname({
                    realname: this.form.realname,
                    idcard: this.form.idcard
                }).then(res => {
                    if (res.flag === 0) {          //返回的 res.flag 为 0，则表示用户身份验证失败
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                            center: true
                        })
                        this.$emit('next', 0)      //将参数设置为 0，表示用户身份验证失败
                    }else {
                        this.$emit('next', 1)         //参数设置为 1，表示用户身份验证成功
                        this.$emit('register')     //执行注册操作
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
}
</script>

<style scoped>
.inp {
  position: relative;
  width: 270px;
  height: 36px;
  margin: 20px auto;
  /* border: 1px solid red; */
}

.img-bg {
  position: absolute;
  top: 9px;
  left: 13px;
}

.img-bg-right {
  position: absolute;
  top: 9px;
  right: 15px;
  cursor: pointer;
}

input {
  height: 36px;
  width: 270px;
  border-radius: 18px;
  border: 0.5px solid rgb(221, 221, 226);
}

.inp input {
  padding-left: 35px;
}

.inp input:focus {
  border: 0.5px solid rgb(64, 158, 255);
}

.inp p {
  position: absolute;
  bottom: -32px;
  text-align: left;
  padding-left: 2em;
  font-size: 12px;
  color: rgba(255, 13, 13, 0.733);
}

.redborder {
  border: 0.5px solid rgb(245, 108, 108);
}

.but {
  display: flex;
  justify-content: space-around;
}
</style>