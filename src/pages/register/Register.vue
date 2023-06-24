<!--注册主页面-->
<template>
    <div class="register">
        <el-steps :active="active" align-center :process-status="process" finish-status="success">
            <el-step title="注册验证"></el-step>
            <el-step title="实名验证"></el-step>
            <el-step title="完成验证"></el-step>
        </el-steps>
        <div v-if="active === 0">
            <register-user
            @next="next" 
            :form.sync="form"
            ></register-user>
        </div>
        <div v-if="active === 1">
            <register-user-mes 
            :form.sync="form" 
            @next="next" 
            @previous="previous" 
            @register="register"
            ></register-user-mes>
        </div>
        <div v-if="active === 2">
            <registersuccess></registersuccess>
        </div>
    </div>
</template>

<script>
import Registersuccess from './Registersuccess.vue'
import RegisterUser from './RegisterUser.vue'
import RegisterUserMes from './RegisterUserMes.vue'
import {requestregister} from '@/api/log_reg'

    export default {
        name:'Register',
        components:{RegisterUser,RegisterUserMes,Registersuccess},
        data(){
            return{
                active:0,          //表示当前处于第几个步骤，初始值为0，即第一个步骤
                process:'finish',        // 表示当前的注册状态
                form:{
                    username:'',
                    password:'',
                    secondpassword:'',
                    telphone:'',
                    realname:'',
                    idcard:''
                }
            }
        },
        methods:{
            next(flag){
                if(flag === 0){
                    this.process = 'error'
                }else{
                    if(this.active === 0){
                        this.process = 'finish'
                    }else{
                        this.process = 'success'
                    }
                    this.active++
                }
            },
            previous(){
                this.process = 'finish'
                this.active--
            },
            register(){
                requestregister({
                    username:this.form.username,
                    password:this.form.password,
                    telphone:this.form.telphone,
                    realname:this.form.realname,
                    idcard:this.form.idcard
                }).then(res => {
                    this.$message({
                        showClose:true,
                        message:res.msg,
                        type:'success',
                        center:true
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
.register {
  width: 25em;
  /* width: 30em; */
  /* text-align: center; */
  margin: auto;
  padding-bottom: 20em;
}


</style>