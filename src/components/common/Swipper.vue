<template>
    <div class="swipper">
        <div class="window">
            <!--搜索框-->
            <div class="search">
                <div class="inp">
                    <el-tooltip class="item" placement="top-start" effect="dark" :content="content">
						<div :class="{ left: true, leftturn: turnback }" @click="turn">
                        	<img class="leftimg" src="../../assets/img/search/turn.png" alt="">
						</div>
                    </el-tooltip>
                    <input @keyup.enter="request" v-model="petname" type="text" :placeholder="placeholder" :class="{elinp:true,elinpturn:turnback}">
                    <div :class="{right:true,rightturn:turnback}" @click="request">
                        <img  class="rightimg" src="../../assets/img/search/search.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Swipper',
    inject:['reload'],
    data() {
        return {
			petname:'',
            content:'切换到查询求购',  //content: 表示搜索框左侧的提示内容
            turnback:false,           //表示是否切换到查询出售的模式
            placeholder:'请输入要购买的宠物名称',
            pk : 0,   //示查询模式的标识符，0 表示查询求购，1 表示查询出售
            
        } 
    },

	methods:{
		//点击搜索按钮或按下 Enter 键时触发
		request(){
			if(this.pk === 0){
				this.$router.push({
					path:'/presell',
					query:{
						petname:this.petname
					}
				})
			}
			if(this.pk === 1){
				this.$router.push({
					path:'/buying',
					query:{
						petname:this.petname
					}
				})
			}
			this.reload()
		},
		//切换查询模式
		turn(){
			this.turnback = !this.turnback
			if(this.turnback === true){
				this.content = '切换到查询出售'
				this.placeholder = '请输入想查询的求购区的宠物名称'
				this.pk = 1
			}else {
				this.content = '切换到查询求购'
				this.placeholder = '请输入想要购买的宠物名称'
				this.pk = 0
			}
		}

	}

}
</script>

<style scoped>
.window{
    position: relative;
    width: 100%;
    height: 100px;
}

.search{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index:2;
}

.inp{
    display: flex;
    width: 30%;
    min-width:25em;
    height: 3.6em;
    padding: -5px;
    margin: auto;
    margin-top: calc(64px - 2em);
    text-align: center;
}

.left {
  width: 4em;
  height: 3.6em;
  border-radius: 1.8em 0 0 1.8em;
  background: rgb(64, 158, 255);
  cursor: pointer;
}

.leftturn {
  background: rgb(255, 144, 1);
}

.leftimg {
  width: 60%;
  margin-left: 0.6em;
  margin-top: 0.7em;
}

.right {
  width: 4em;
  height: 3.6em;
  border-radius: 0 1.8em 1.8em 0;
  background: rgb(64, 158, 255);
  cursor: pointer;
}

.rightturn {
  background: rgb(255, 144, 1);
}

.rightimg {
  width: 60%;
  margin-right: 0.6em;
  margin-top: 0.7em;
}

.elinp {
  width: calc(100% - 3em);
  /* height: 2.5em; */
  padding-left: 1em;
  font-size: 1.5em;
  border: 2px solid rgb(64, 158, 255);
  transition: border 1s;
  -moz-transition: border 1s;
  /* Firefox 4 */
  -webkit-transition: border 1s;
  /* Safari 和 Chrome */
  -o-transition: border 1s;
  /* Opera */
}

.elinpturn {
  border: 2px solid rgb(255, 144, 1);
}

.window span {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: default;
}

.slider-enter-active,
.slider-leave-active {
  transition: opacity 2s;
}

.slider-enter,
.slider-leave-to {
  opacity: 0;
}

.slider-enter-to,
.slider-leave {
  opacity: 1;
}

/*在屏幕宽度大于等于 1200 像素时，将所有具有 "window" 类的元素的最小高度设置为 100 像素。*/
@media (min-width: 1200px) {
  .window {
    min-height: 100px;
  }
}
</style>