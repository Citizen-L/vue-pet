<template>
  <div id="app">
    <!--根据当前路由判断 进入后台管理-->
    <div v-if="$route.path.indexOf('/backstage') == -1">
        <head-tab></head-tab>
        <div class="scrool">
            <router-view v-if="isRouterAlive"></router-view>
        </div>
        <Footer></Footer>
        <el-backtop>
            <div class="backtop">UP</div>
        </el-backtop>
    </div>
	<!--根据当前路由判断 进入主页-->
	<div v-if="$route.path.indexOf('/backstage') != -1">
        <router-view v-if="isRouterAlive"></router-view>
	</div>
  </div>
</template>

<script>
    import HeadTab from "./components/common/head/HeadTab.vue"
    import Footer from "./components/common/footer/Footer.vue"
    export default {
		name: 'app',
		//向其他组件提供reload方法
		provide(){
			return{
				reload:this.reload
			}
		},
		data(){
			return{
				isRouterAlive:true
			}
		},
		components: {HeadTab,Footer},
		methods:{
			reload(){
			this.isRouterAlive = false
			this.$nextTick(function(){
				this.isRouterAlive = true
			})
			}
		}
    }
</script>

<style>
@import "./assets/css/base.css";

.backtop {
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 35px;
}
.scrool {
  margin-top: 108px;
  min-height: 55em;
  /* margin-top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto; */
}
</style>
