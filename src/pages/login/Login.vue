<template>
    <div class="login">
        <div class="loginhead">登录</div>
		<div>
			<!--用户名-->
			<div class="inp">
				<img src="../../assets/img/user/user.png" alt class="img-bg"/>
				<input 
					type="text"
					@blur="checkUsername"
					:class="{redboder:check.username.flag}"
					autofocus="autofocus"
					placeholder="用户名/手机号"       
					required="required"
					v-model="form.username"
				/>
				<p v-show="check.username.flag">{{check.username.val}}</p>
			</div>
			<!--密码-->
			<div class="inp">
                <img src="../../assets/img/password/password.png" alt class="img-bg"/>
				<input 
					@blur="checkPassword"
					:class="{redborder:check.password.flag}"
					:type="types.type"
					placeholder="密码"
					required="required"
					v-model="form.password"
					@keyup.enter="request"
				/>
				<img v-if="form.password != ''" @click="changetype" :src="types.img" alt class="img-bg-right"/>
				<p v-show="check.password.flag">{{check.password.val}}</p>
			</div>
			<div class="but">
				<el-button type="primary" round @click="request">登录</el-button>
				<el-tooltip effect="light" content="没有账号？去注册" placement="bottom-start">
					<el-button round type="primary" @click="toregister">注册</el-button>
		  	    </el-tooltip>
			</div>
		</div>
    </div>
</template>

<script>
import { requestLogin } from "@/api/log_reg"
export default {
    name: 'Loginitem',
	data() {
		return {
	    //验证信息
		    check:{
				username:{
					flag:false,
					val:''
				},
				password:{
					flag:false,
					val:''
				}
			},
			//输入密码款类型，改变眼睛开闭
			types:{
				type:'password',
				img:require('@/assets/img/password/close.png')
			},
			//表单数据
			form:{
				username:'',
				password:''
			}
		}
	},
	methods:{
		changetype(){
			//检查当前密码输入框的类型是否为 "text"。如果是，则表示当前密码框是明文展示状态，需要切换为密文展示状态；否则，表示当前密码框是密文展示状态，需要切换为明文展示状态。
			if(this.types.type === 'text'){
				this.types.img = require('@/assets/img/password/close.png')
				this.types.type = 'password'
			}else{
				this.types.img = require('@/assets/img/password/open.png')
				this.types.type = 'text'
			}
		},
		//验证用户名
		checkUsername(){
			if(this.form.username === ''){
				this.check.username.flag = true   //true表示用户名为空
				this.check.username.val = '用户名不能为空'
			}else{
				this.check.username.flag = false  //false表示用户名不为空
			}
		},
		//验证密码
		checkPassword(){
			if(this.form.password === ''){
				this.check.password.flag =true
				this.check.password.val = '密码不能为空'
			}else {
                this.check.password.flag = false
            }
		},
		//登录
		/*
		这段代码中的逻辑比较复杂，主要用于处理用户的登录请求和响应，同时也包括了一些跳转和状态更新的操作，以及错误提示框的显示。 */
		request(){
			this.checkUsername()
			this.checkPassword()
			//如果用户名和密码不为空，则发登录请求
			if(this.check.username.flag === false && this.check.password.flag === false){
				requestLogin({
					username:this.form.username,
					password:this.form.password
				}).then(res => {
					//如果登录成功（即 res.flag 为 1）则将用户的 ID 和头像等信息提交给mutations，以更新 Vuex 的 state。
					if(res.flag === 1){
						const token = res.token;
    					localStorage.setItem('token', token); // 保存 Token
						
						//提交给mutations 修改store中的state
						this.$store.commit('setuid',res.uid)
						this.$store.commit('setavatar','http://localhost:3001/'+res.avatar)
						//如果用户的type为1 则是用户 跳转至主页 显示欢迎提示框
						if(res.type === 1){
							if(this.$route.path == '/login'){
								this.$router.push('/home')
							}
							this.$message({
								message:res.msg,
								type:'success',   //显示一个成功类型的提示消息
								center:true,
								showClose:true    //在这里，将其设置为 true，表示要显示关闭按钮
							})
							this.$store.state.show = false      //控制用户菜单的显示和隐藏
							this.$store.state.logshow = false   //控制登录框的显示和隐藏
							//如果用户的type为0 则是管理员 跳转至后台管理
						}else if(res.type === 0){
							this.$router.push('/backstage')
							this.$store.state.show = false
							this.$store.state.logshow = false
						}
					}else{
						this.$message({
							message:res.msg,
							type:'error',
							center:true,
							showClose:true
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		//注册
		toregister(){
			if(this.$store.state.show === true){
				this.$store.state.logshow = false;
				this.$store.state.regshow = true;
            }else{
                this.$router.push('/register');
            }
		}
	}
}
</script>

<style scoped>

.login {
  width: 25em;
  text-align: center;
  margin: auto;
  padding-bottom: 30em;
}

.loginhead {
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  font-weight: 400;
  font-size: 2.5em;
  padding-bottom: 0.5em;
  color: rgb(23, 155, 254);
  /* letter-spacing: 50px; */
}

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
  justify-content:space-around;
}
</style>