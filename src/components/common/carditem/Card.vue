<!--宠物卡片-->
<template>
    <div class="card" @click="todetail">
        <div class="listimg">
            <img :src="'http://localhost:3001/'+ item.img" alt="">
        </div>
        <div class="cardbar">
            <div style="height:40px;width:100%">
                <span class="petname">{{item.petname}}</span>
                <span class="price">{{item.p_price}}￥</span>
            </div>
            <div>类型：{{item.bkindname}}</div>
            <div>品种：{{item.skindname}}</div>
            <div v-if="item.p_year === null">年龄：不详</div>
            <div v-if="item.p_year != null">年龄：{{item.p_year}}个月</div>
            <div>发布人：{{item.username}}</div>
            <div class="time">
                <span>{{item.date}}</span>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name:'Card',
    props:{item:Object},
    data() {
        return {}
    },
    methods:{
        todetail(){
            this.$router.push({
                path:'/detail',
                query:{
                    pid:this.item.pid
                }
            })
        }
    }
}
</script>

<style scoped>

.card {
  width: 18.8em;
  height: 26em;
  cursor: pointer;
  margin-top: 1em;
  margin-left: 1em;
  border-radius: 0.5em;
  overflow: hidden;
  background: rgb(255, 255, 255);
  border: 1px solid orange; 

  transition: transform 0.5s, box-shadow 0.5s;
  -moz-transition: transform 0.5s, box-shadow 0.5s;
  -webkit-transition: transform 0.5s, box-shadow 0.5s;
  -o-transition: transform 0.5s, box-shadow 0.5s;
}

.card:hover {
  transform: translateY(-0.5em);
  box-shadow: 5px 15px 15px rgb(206, 205, 205), -5px -0.5px 15px rgb(206, 205, 205);
}

.listimg {
  height: 15em;
  overflow: hidden;
  border-bottom:1px solid black ;
}

.listimg img {
  width: 100%;
  height: 100%;
}

.cardbar {
  display: flex;
  flex-wrap: wrap;
}

.cardbar .petname {
  color: orange;
  width: 100%;
  text-align: center;
  font-size: 2.0em;
  height: 1.6em;
  line-height: 1.6em;
  font-weight: 600;
  padding-right: 1em;
}

.cardbar div {
  width: 50%;
  height: 2em;
  line-height: 2em;
  padding-left: 1em;
  overflow: hidden;
}

.cardbar .time {
  width: 100%;
  text-align: center;
  padding-right: 1em;
  color: rgb(183, 183, 183);
}
.price{
  display: block;
  float: right;
  top: 0;
  left: 100px;
  font-size: 16px;
  color: orange;
  margin-top: 10px;
  margin-right: 20px;
}
</style>