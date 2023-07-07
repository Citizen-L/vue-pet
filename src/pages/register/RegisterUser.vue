<!--用户名密码页面-->
<template>
    <div class="registeruser">
        <div>
            <!-- 手机号 -->
            <div class="inp">
                <img src="../../assets/img/user/phone.png" alt class="img-bg"/>
                <input type="text" placeholder="手机号码" v-model="form.telphone" @blur="checktelphone" :class="{redboder:check.telphone.flag}"/>
                <p v-show="check.telphone.flag">{{check.telphone.val}}</p>
            </div>
            <!--用户名-->
            <div class="inp">
                <img src="../../assets/img/user/user.png" alt class="img-bg" />
                <input type="text" placeholder="用户名" v-model="form.username" @blur="checkusername"
                    :class="{ redborder: check.username.flag }" />
                <p v-show="check.username.flag">{{ check.username.val }}</p>
            </div>
            <!-- 密码 -->
            <div class="inp">
                <img src="../../assets/img/password/password.png" alt class="img-bg" />
                <input type="text" placeholder="密码" :type="types[0].type" @blur="checkPassword" v-model="form.password" :class="{ redborder: check.password.flag }" />
                <img v-if="form.password != ''" @click="changetype(0)" :src="types[0].img" alt class="img-bg-right" />
                <p v-show="check.password.flag">{{check.password.val}}</p>
            </div>
            <!-- 确认密码 -->
            <div class="inp">
                <img src="~assets/img/password/password.png" alt class="img-bg" />
                <input :type="types[1].type" placeholder="再次输入密码" v-model="form.secondpassword" @blur="checksecondpassword" :class="{ redborder: check.secondpassword.flag }" />
                <img v-if="form.secondpassword != ''" @click="changetype(1)" :src="types[1].img" alt class="img-bg-right" />
                <p v-show="check.secondpassword.flag">{{check.secondpassword.val}}</p>
            </div>
            <div class="but">
                <el-tooltip effect="light" content="已有账号？去登录" placement="bottom-start">
                <el-button round type="primary" @click="tologin">登录</el-button>
                </el-tooltip>
                <el-button round type="primary" @click="next">下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { validatePhone } from "@/utils/utils.js";
import { requestcheckuser } from "@/api/log_reg";
export default {
    name: 'RegisterUser',
    props: ['form'],
    data() {
        return {
            types:[
                {
                    type:'password',
                    img:require('@/assets/img/password/close.png')
                },
                {
                    type:'password',
                    img:require('@/assets/img/password/close.png')
                }
            ],
            // 验证flag和val
            check:{
                password:{
                    flag:false,
                    val:''
                },
                secondpassword:{
                    flag:false,
                    val:''
                },
                telphone:{
                    flag:false,
                    val:''
                },
                username: {
                    flag: false,
                    val: ''
                }
            }
        }
    },
    methods:{
       //改变密码框状态
        changetype(index){
            if(this.types[index].type === 'text'){
                this.types[index].img = require('@/assets/img/password/close.png')
                this.types[index].type = 'password'
            }else{
                this.types[index].img = require('@/assets/img/password/open.png')
                this.types[index].type = 'text'
            }
        },
        //验证密码
        checkPassword(){
            if(this.form.password === ''){
                this.check.password.flag = true
                this.check.password.val = '密码不能为空'
            }else if(this.form.secondpassword != ''){
                this.checksecondpassword()
                this.check.password.flag = false
            }else{
                this.check.password.flag = false
            }        
        },
        // 验证确认密码
        checksecondpassword() {
            if (this.form.secondpassword === '') {
                this.check.secondpassword.flag = true
                this.check.secondpassword.val = '确认密码不能为空'
            } else if (this.form.secondpassword != this.form.password) {
                this.check.secondpassword.flag = true
                this.check.secondpassword.val = '两次密码不一致'
            } else {
                this.check.secondpassword.flag = false
            }
        },
        // 验证手机号
        checktelphone(){
            if(this.form.telphone === ''){
                this.check.telphone.val = '手机号不能为空'
                this.check.telphone.flag = true
            } else if (validatePhone(this.form.telphone)) {
                this.check.telphone.flag = false
            } else {
                this.check.telphone.val = "*请输入11位手机号码，1xx xxxx xxxx"
                this.check.telphone.flag = true
            }
        },
        // 验证用户名
        checkusername() {
            if (this.form.username === '') {
                this.check.username.val = '用户名不能为空'
                this.check.username.flag = true
            } else {
                this.check.username.flag = false
            }
        },
        //跳转到登录
        tologin(){
            if(this.$store.state.show === true){
                this.$store.state.logshow = true
                this.$store.state.regshow = false
            }else{
                this.$router.push('/login')
            }
        },
        next(){
            this.checkPassword()
            this.checksecondpassword()
            this.checktelphone()
            this.checkusername()
            if (this.check.password.flag !== true && this.check.secondpassword.flag !== true && this.check.telphone.flag !== true && this.check.username.flag !== true) {
                requestcheckuser({
                    username:this.username,
                    telphone:this.telphone
                }).then(res => {
                    if(res.flag === 0){
                        this.$message({
                            showClose:true,
                            message:res.msg,
                            type:'error',
                            center:true
                        })
                        this.$emit('next',0)
                    }else{
                        this.$emit('next',1)
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