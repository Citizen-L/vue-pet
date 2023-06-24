<!--网页头部-->
<template>
	<div class="headtab">
		<div class="headmain container">
            <div class="logo" @click="tohome()">宠物领养平台</div>
			<!-- 当前路由的路径与列表中某个路径匹配，则会添加active类，否则不添加。 -->
            <div class="list" v-for="(item,index) in lists" :key="index" :class="{active: $route.path === lists[index].path}" @click="torouter(index)">{{item.title}}</div>
			<div class="right">
                <div v-if="$store.state.uid === null">
					<span class="loginBut" @click="showLogin">登录</span>
					<span @click="showRegister">注册</span>
				</div>
				<div v-if="$store.state.uid != null" class="last">
                    <div @mouseover="showdropdown = true" @mouseleave="showdropdown = false">
						<div class="wid">
							<div class="avatar" @click="$router.push('/usercenters')">
								<img :src="$store.state.avatar" alt="">
							</div>
							<transition name="showdrop">
                                <div v-if="showdropdown">
									<div class="triangle"></div>
									<div class="useraction">
										<div class="blank"></div>
										<div @click="$router.push('/usercenters')">个人中心</div>
										<div @click="$router.push('/usercenters/petorder')">我的订单</div>
										<div @click="$router.push('/usercenters/pet')">我的宠物</div>
										<div @click="tologout">注销</div>
									</div>
								</div>
							</transition>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import bus from '@/store/bus'
export default {
    name:'HeadTab',
    data(){
        return{
			lists:[
				{
					title:'首页',
					path:'/home'
				},
				{
					title:'买卖专区',
					path:'/presell'
				},
				{
					title:'关于',
					path:'/about'
				}
			],
			showdropdown:false,  //用于控制下拉菜单是否显示。
		}
	},
	/*
		purchase：用于处理购买宠物相关的逻辑。
	*/
	mounted(){
		/*对于 purchase 事件，当该事件被触发时，会调用 sendpet 方法，该方法用于向服务器发送购买宠物的请求。 */
		/* bus.$on('purchase',data => {
			this.sendpet(data)
		}) */
		
	},

	methods:{
		//跳转到home首页
		tohome(){
			this.$router.push('/home')
		},
		torouter(index){
			this.$router.push(this.lists[index].path)
		},
		/* tip:这段代码是一个Vue.js组件中的方法，作用是在用户点击"注册"按钮时显示注册界面。具体来说，它首先检查当前路由路径是否为"/login"或"/register"，如果不是，则将store中的show和regshow状态设为true，显示注册界面。如果当前路由路径已经是"/register"，则不需要再次跳转到注册页面，直接显示注册界面即可。
		这样写的原因可能是为了避免在已经处于"/register"路径的情况下重复跳转到这个路径，从而提高应用程序的性能和用户体验。此外，通过使用Vuex中的状态管理，可以方便地在组件之间共享数据，使得应用程序更加可维护和可扩展。 */
		showLogin(){
            if(this.$route.path != '/login' && this.$route.path != '/register'){
				this.$router.push('/login')
			}else{
				this.$router.push('/login')
			}
		},
		showRegister(){
            if(this.$route.path != '/login' && this.$route.path != '/register'){
				this.$store.state.show = true;
                this.$store.state.regshow = true;
			}else{
				this.$router.push('/register')
			}
		},

		//注销
		/*这样做的目的是为了保证用户退出登录后，系统能够正确地清理用户数据和资源，避免因为遗留数据而导致系统出现异常或安全问题。同时，这样做还可以提升用户体验，让用户在退出登录时能够清晰地知道自己正在做什么，并避免误操作。 */
		tologout(){
			this.$confirm('确定要退出登录？','注销',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'warning',
				center:true
			}).then(() => {
				/*indexOf() 方法返回 -1 时表示字符串中没有查找的子字符串。在这个表达式中，如果 indexOf() 方法返回的值等于 -1，则说明当前路由路径中不包含指定的子字符串。 */
				if(this.$route.path.indexOf('/home') == -1 || this.$route.path.indexOf('/presell') == -1 || this.$route.path.indexOf('/buying') == -1){
					this.$router.push('/home')
				}
				this.$store.commit('setuid',null)
				window.sessionStorage.removeItem('uid')
				this.$store.commit('setavatar',null)
				window.sessionStorage.removeItem('avatar')
				this.destroywebsocket()
			}).catch(() => {})
		},
	},
}
</script>

<style scoped>
@import "../../../assets/css/mediacss.css";

.headtab{
  background: orange;
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 64px;
  line-height: 64px;
  font-size: 1.6em;
}

.headmain {
  display: flex;
  justify-content: space-between;
}

.logo {
  font-size: 1.5em;
  margin-left: 1em;
  cursor: pointer;
  height: 64px;
  overflow: hidden;
}

.list {
  height: 64px;
  overflow: hidden;
  cursor: pointer;
}

.list:hover {
  color: white;
}

.active {
  color: white;
}

.right {
  cursor: pointer;
  /* width: 5em; */
  text-align: center;
  margin-right: 1em;
}

.right span:hover {
  color: white;
}

.loginBut {
  margin-right: 0.5em;
}

.wid {
  width: 5em;
}

.avatar {
  margin: auto;
  margin-top: 11px;
  width: 41px;
  height: 41px;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
}

.avatar img {
  width: 100%;
  height: 100%;
}

.triangle {
  width: 0;
  height: 0;
  margin: auto;
  margin-top: 0.2em;
  border-left: 5px solid rgb(184, 183, 188);
  border-right: 5px solid rgb(184, 183, 188);
  border-bottom: 6px solid rgb(215, 214, 216);
}

.useraction {
  width: 5em;
  border-radius: 5px;
  overflow: hidden;
}

.useraction .blank {
  height: 0.5em;
}

.useraction .blank:hover {
  background: rgb(203, 204, 206);
}

.useraction div{
  height: 2.4em;
  line-height: 2.4em;
  background: rgb(203, 204, 206);
}

.useraction div:hover{
  background: rgb(184, 183, 188);
  color: rgb(92, 109, 204);
}

.showdrop-enter-active,
.showdrop-leave-active {
  transition: all 1s ease;
}

.showdrop-enter,
.showdrop-leave-to {
  opacity: 0;
}

.last {
  display: flex;
}

.notice {
  width: 1.3em;
  height: 1.3em;
  margin-right: 1em;
}

.notice img {
  width: 100%;
}

.notimg {
  line-height: 1.3em;
}
</style>