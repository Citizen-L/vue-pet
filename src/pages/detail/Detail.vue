
<template>
    <div class="detail">
        <Breadcrumb>
        宠物详情
        </Breadcrumb>
        <div v-if="nopet == true">
            <div class="notexixtpet">该宠物不存在</div>
        </div>
        <div v-if="nopet == false">
            <div class="maindetail container" v-if="img.length > 0">
                <div class="photo">
                    <div class="img">
                        <img :src="'http://localhost:3001/'+ img" alt="">
                    </div>
                 
                </div>

                <div class="message">
                    <div class="mbar">
                        <div class="title">宠物名称：</div>
                        <div class="val">{{pet.petname}}</div>
                    </div>
                    <div class="mbar">
                        <div class="title" v-if="pet.pk != 3">价格：</div>
                        <div class="title" v-if="pet.pk == 3">最高价格：</div>
                        <div class="val" v-if="pet.p_price != -1">{{ pet.p_price }}￥</div>
                        <div class="val" v-if="pet.p_price == -1">不限</div>
                    </div>
                    <div class="mbar">
                        <div class="title">类型：</div>
                        <div class="val">{{ bkindname }}</div>
                    </div>
                    <div class="mbar">
                        <div class="title">品种：</div>
                        <div class="val">{{ skindname }}</div>
                    </div>
                    <div class="mbar">
                        <div class="title">年龄：</div>
                        <div class="val" v-if="pet.p_year != -1">{{ pet.p_year}}个月</div>
                        <div class="val" v-if="pet.p_year== -1">不限</div>
                    </div>
                    <div class="mbar">
                        <div class="title">发布人：</div>
                        <div class="val">
                            <div>{{ user.username }}</div>
                        </div>
                    </div>
                    <div class="mbar">
                        <div class="title">发布时间：</div>
                        <div class="val">{{ pet.date }}</div>
                    </div>
                    <div class="but">
                        <div v-if="user.uid != $store.state.uid && pet.pk == 0">
                            <el-button type="primary" @click="topurchase">立即购买</el-button>
                        </div>
                        <div v-if="user.uid != $store.state.uid && pet.pk == 3">
                            <el-button type="primary" @click="selectmypet">我这里有</el-button>
                        </div>

                        <!-- 判断当前用户是否为该宠物的主人，并且该宠物是否处于可以修改信息的状态。 -->
                        <div v-if="user.uid == $store.state.uid && (pet.pk == 0 || pet.pk == 3)">
                            <el-button type="primary" @click="updatepet">修改宠物信息</el-button>
                        </div>



                        <div v-if="user.uid == $store.state.uid && pet.pk != 1">
                            <el-popover placement="top" width="160" v-model="visible">
                                <p>删除后将无法恢复，确定删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="deletepet">确定</el-button>
                                </div>
                                    <el-button type="danger" slot="reference">删除该宠物</el-button>
                            </el-popover>
                        </div>



                        <div>
                            <!-- 表示如果宠物已经被售出，且当前用户不是宠物主人也不是购买者，则显示“已出售”标签 -->
                            <div v-if="petorder.uid != $store.state.uid && user.uid != $store.state.uid && pet.pk != 0 && pet.pk != 3">
                                <div class="done">已出售</div>
                            </div>
                            <!-- 表示如果宠物还未被发布出售信息，且当前用户是宠物主人，则显示“出售中”标签 -->
                            <div v-if="user.uid == $store.state.uid && pet.pk == 0">
                                <div class="doing">出售中</div>
                            </div>
                           <!--  表示如果宠物已经被发布出售信息，且当前用户是宠物主人或购买者，则显示“已出售”标签 -->
                            <div v-if=" (petorder.uid == $store.state.uid || user.uid == $store.state.uid) && pet.pk == 1">
                                <div class="done">已出售</div>
                            </div>
                           <!--  表示如果宠物已经被购买并交付，且当前用户是宠物主人或购买者，则显示“已完成”标签 -->
                            <div v-if="(petorder.uid == $store.state.uid || user.uid == $store.state.uid) && pet.pk == 2">
                                <div class="success">已完成</div>
                            </div>
                            <!-- 表示如果宠物已经被购买但还未交付，且当前用户是宠物主人或购买者，则显示“求购中”标签 -->
                            <div v-if="(petorder.uid == $store.state.uid || user.uid == $store.state.uid) && pet.pk == 3">
                                <div class="wantbuy">求购中</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 订单信息 -->
            <div class="container" v-if="(petorder.uid == $store.state.uid || user.uid == $store.state.uid) && pet.pk != 0 && pet.pk != 3 && petorder.postatu != 2">
                <mypetdetail @agreecancelpetorder="agreecancelpetorder"></mypetdetail>
            </div>
        </div>
        <div v-if="showmypet">
            <div class="mypet container">
                <mypet :touid="user.uid"></mypet>
            </div>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb.vue'
import mypet from '@/pages/detail/mypet.vue'
import mypetdetail from '@/pages/detail/mypetdetail.vue'
import Pet from '@/pages/pet/Pet.vue'
import {requestquerypetbyid, requestdeletePet} from '@/api/index'
import {requestquerypetorder2} from '@/api/order'
import bus from '@/store/bus'

export default {
    name:'Detail',
    data() {
        return {
            visible:false,    //用来标记当前界面是否可见
            pet: {},          //用来存储当前宠物的信息
            bkindname: {},
            skindname: {},
            user: {},         //存储当前宠物的主人信息
            img: {},        //用来存储当前宠物的照片信息。每个元素包含一张照片的 URL 地址
            active: 0,        //用来标记当前选中的照片的索引
            date: "",         //用来存储当前宠物的发布时间
            petorder: {},     //用来存储当前宠物的订单信息
            showmypet: false,    //用来标记当前用户是否能够查看当前宠物的详细信息
            nopet: false,    //用来标记当前用户是否拥有宠物

        }
    },
    components:{Breadcrumb,mypetdetail,mypet,Pet},

    methods:{   
        changeactive(index){
            this.active = index
        },
        //购买
        topurchase(){
            if(this.$store.state.uid === null){
                this.$store.state.show = true
                this.$store.state.logshow = true
            } else {
                this.$router.push({
                    path:'/purchase',
                    query:{
                        pid:this.$route.query.pid,
                        uid:this.user.uid,
                        price:this.pet.p_price,
                        petname:this.pet.petname,
                        img:this.img
                    }
                })
            }
        },
        selectmypet(){
            if(this.$store.state.uid === null){
                this.$store.state.show = true
                this.$store.state.logshow = true
            }else{
                this.showmypet = true
            }
        },
        //修改宠物信息
        updatepet(){
            let form = {}
            form.pid = this.pet.pid
            form.name = this.pet.petname
            form.bkid = this.pet.bkid
            form.bkindname = this.bkindname
            form.skid = this.pet.skid
            form.skindname = this.skindname
            form.age = this.pet.p_year
            form.price = this.pet.p_price
            form.img = this.pet.img
            form.username = this.user.username
            if(this.pet.pk == 0){       //pk=0 说明该宠物还未发布出售信息，应该跳转到 /wantsell 路由页面，即卖家发布出售信息的页面
                this.$router.push({
                    path:'/wantsell',
                        query: {
                            form: JSON.stringify(form),
                        },
                })
            }else{
                this.$router.push({
                    path:'/wantbuy',     //pk=3，则说明该宠物已经被购买，但还未交付，应该跳转到 /wantbuy 路由页面，即买家确认交付的页面
                    query: {
                        form: JSON.stringify(form),
                    },
                })
            }
        },
        deletepet(){
            requestdeletePet({
                pid:this.pet.pid
            }).then((res) => {
                this.$router.go(-1)
                this.$notify({
                    title:'成功',
                    message:res,
                    type:'success',
                    offset:100
                })
            }).catch((err) => {
                console.log(err)
            })
        },
        agreecancelpetorder() {
            this.pet.pk = 0;
        },
    },
    created() {
        requestquerypetbyid({
            pid: this.$route.query.pid,
        })
        .then((res) => {
            if (res == "") {
                this.nopet = true   //表示当前宠物不存在
            } else {
                this.pet = res
                // console.log(res);
                const {bkindname,skindname,img,username,uid} = res
                this.bkindname = bkindname
                this.skindname = skindname
                this.img = img
                this.user ={ username,uid}
                
                //临时加这个进去是为了把数据库返回的时间格式改一下变成‘xxxx-xx-xx’
                const dateString = res.date
                const date1 = new Date(dateString);
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                const date = date1.toLocaleDateString('zh-CN', options);
                // console.log(date);
                this.pet.date = date

                if (this.pet.pk != 0 && this.pet.pk != 3) {
                    requestquerypetorder2({
                        pid: this.$route.query.pid,
                    })
                    .then((res) => {
                        // console.log('订单',res);
                        this.petorder = res[0];
                        if (this.petorder.uid == this.$store.state.uid) {
                            this.showchatimg = true;
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                } else {
                    if (this.user.uid != this.$store.state.uid) {
                        this.showchatimg = true
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },
}

</script>

<style scoped>
@import "../../assets/css/mediacss.css";

.mypet {
  margin-top: 1em;
  background: rgb(255, 255, 255);
  border-radius: 8px;
}

.notexixtpet {
  display: flex;
  justify-content: center;
  margin-top: 5em;
  color: rgb(192, 190, 190);
  font-size: 5em;
  font-style: oblique;
}

.chat {
  position: relative;
  cursor: pointer;
  height: 2.5em;
}

.banimg {
  position: absolute;
  height: 100%;
}

.success {
  font-size: 1.3em;
  font-style: oblique;
  text-shadow: 1px 1px 2px rgb(33, 213, 168);
  color: rgb(33, 213, 168);
}

.doing {
  font-size: 1.3em;
  font-style: oblique;
  text-shadow: 1px 1px 2px rgb(255, 194, 8);
  color: rgb(255, 194, 8);
}

.done {
  font-size: 1.3em;
  font-style: oblique;
  text-shadow: 1px 1px 2px rgb(102, 177, 255);
  color: rgb(102, 177, 255);
}

.wantbuy {
  font-size: 1.3em;
  font-style: oblique;
  text-shadow: 1px 1px 2px pink;
  color: pink;
}

.maindetail {
  display: flex;
  margin-top: 12em;
}

.photo {
  width: 50%;
  padding-bottom: 50%;
  height: 0;
}

.img {
  width: 80%;
  padding-bottom: 60%;
  height: 0;
  margin: auto;
  border-radius: 5px;
  cursor: pointer;
}



.list {
  margin-top: 2em;
  width: 15%;
  height: 7em;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}

.listactive {
  border: 1px solid rgb(255, 93, 35, 0.4);
}

.photo img {
  width: 100%;
}

.message {
  width: 50%;
  font-size: 1.7em;
}

.mbar {
  width: 100%;
  display: flex;
}

.message .title {
  width: 25%;
  height: 2em;
  text-align: center;
  overflow: hidden;
}

.message .val {
  width: 70%;
  height: 2em;
  color: rgb(120, 120, 120);
  overflow: hidden;
}

.message .desc {
  width: 300px;
  height: 10em;
  word-wrap: break-word;
  color: rgb(120, 120, 120);
  overflow-y: auto;
  white-space: pre-wrap;
}

.but {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2em;
}
</style>