<!--我的订单-->
<template>
    <div class='petorder'>
       <breadcrumb>我的订单</breadcrumb>
        <div class="meun">
            <div class="container">
                <el-menu :default-active="activeIndex" mode="horizontal" background-color="#f2f2f2" @select="handleSelect">
                    <el-menu-item class="el-menu-item" index="-1">全部</el-menu-item>
                    <el-menu-item class="el-menu-item" index="0">进行中</el-menu-item>
                    <el-menu-item class="el-menu-item" index="1">已完成</el-menu-item>
                    <el-menu-item class="el-menu-item" index="2">已取消</el-menu-item>
                    <el-menu-item class="el-menu-item" index="3">修改中</el-menu-item>
                    <el-menu-item class="el-menu-item" index="4">取消中</el-menu-item>
                </el-menu>
            </div>
        </div>
        <div class="order container">
           <!--  :item="item" 表示将当前遍历到的订单对象传递给 ordercard 组件的 item 属性，:statu.sync="item.postatu" 表示将订单的状态值传递给 ordercard 组件，并使用 sync 修饰符实现双向绑定，@deleteorder="deleteorder(item)" 表示监听 ordercard 组件中 deleteorder 事件，并在事件触发时执行当前组件的 deleteorder 方法。 -->
            <div v-for="(item,index) in petorder" :key="index">   
                <ordercard :item="item" :statu.sync="item.postatu" @deleteorder="deleteorder(item)"></ordercard>
            </div>
            <div class="nolists" v-if="petorder.length == 0">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
import {requestquerypetorder1} from '@/api/order'
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb.vue'
import Ordercard from '@/pages/petorder/Ordercard.vue'


export default {
    name:'PetOrder',
    components:{Breadcrumb,Ordercard},
    data() {
        return {
            activeIndex:'-1',      //表示当前选中的标签页的索引，初始值为 -1，表示选中全部标签页。
            petorder:[],           //表示当前用户的所有订单信息，初始值为空数组
            allpetorder:[],        //表示所有用户的订单信息，初始值为空数组。这个属性可能没有被使用，或者被用于存储所有用户的订单信息以供管理人员查看。
            form:{}               //表示当前用户提交订单时的表单数据，初始值为空对象
        }
    },
    methods:{
        handleSelect(key,keyPath){
            if(key == -1){     //首先判断当前选中的标签页的索引是否为 -1，如果是，则将当前用户的所有订单信息赋值给 petorder 数组
                this.petorder = this.allpetorder
            }else{
                this.petorder = this.allpetorder.filter(n => {  //过滤出状态值为 key 的订单信息
                    return n.postau == key       //********************************************* */
                })
            }
        },
        deleteorder(item){
            this.allpetorder.splice(this.allpetorder.indexOf(item),1)      //allpetorder 数组中删除指定的订单信息 item，
            if(this.index == 1 || this.index == 2){
                this.petorder.splice(this.petorder.indexOf(item),1)        //则使用 splice 方法从 petorder 数组中删除此订单信息
            }
        }
    },
    creat(){
        requestquerypetorder1({
            uid:this.$store.state.uid
        }).then(res => {
            console.log(res)
            this.allpetorder = res
            this.petorder = res
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

<style scoped>
@import "../../assets/css/mediacss.css";

.petorder {
  margin-top: -3em;
}

.el-menu-item:hover {
  background: #f2f2f2 !important;
}

.order {
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
}

.title {
  width: 100%;
  font-size: 2.2em;
}

.nolists {
  width: 100%;
  font-size: 4em;
  line-height: 10em;
  color: rgba(143, 138, 138, 0.5);
  text-align: center;
}

.changepetorder {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0,0.3);
}

.purchasebar {
  /* margin: 10em auto; */
  position: fixed;
  top: 0;
  margin-top: 10em;
  margin-left: 50%;
  transform: translate(-30em,0);
  padding-top: 1em;
  width: 60em;
  /* min-width: 60em; */
  height: 60em;
  overflow-y: auto;
  background: #f2f2f2;
}
</style>