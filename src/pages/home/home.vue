<template>
    <div class="home">
        <div class="bgimg">首页</div>
    </div>
</template>

<script>
import { requestqueryBKind } from "@/api/index";
    export default {
        name:'home',
        data(){
            return {
                bkind:[],
                other:[]
            }          
        },
        //用于向后端发送 HTTP 请求，并获取数据
        created(){
            requestqueryBKind().then(res => {
                this.bkind = res.filter(n => {
                    return n.bkindname != "其他"
                })
                this.other = res.filter(n => {
                    return n.bkindname === "其他"
                })
            }).catch(err => {
                console.log(err)
            })
        }

    }
</script>

<style scoped>
.bgimg {
  width: 100%;
  margin-left: 50%;
}
</style>