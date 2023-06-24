<!--左侧查询框-->
<template>
    <div class="selector" :class="{reduceindex:$store.state.show}">
        <div class="form">
            <div class="title">排序方式</div>
            <el-select v-model="form.sort" filterable placeholder="请选择排序方式">
                <el-option
                    v-for="item in sort"
                    :key="item.value"
                    :label="item.value"    
                    :value="item.sort">
                </el-option>
            </el-select>
            <div class="title">宠物名称</div>
            <el-input clearable v-model="form.petname" @keyup.enter.native="query" placeholder="请输入宠物名称"></el-input>

            
            <div class="title">宠物类型</div>
            <el-select v-model="form.bkid" clearable filterable placeholder="请选择宠物类型" @change="bkindchange">
                <el-option
                    v-for="item in bkind"
                    :key="item.bkid"
                    :label="item.bkindname"
                    :value="item.bkid">
                </el-option>
            </el-select>


            <div class="title">宠物品种</div>
            <el-select v-model="form.skid" clearable filterable placeholder="请选择宠物品种">
                <el-option
                    v-for="item in fskind"
                    :key="item.skid"
                    :label="item.skindname"
                    :value="item.skid">
                </el-option>
            </el-select>




            <div class="title">宠物年龄</div>
            <el-select v-model="form.age" clearable filterable placeholder="请选择宠物年龄">
                <el-option
                    v-for="item in age"
                    :key="item.age"
                    :label="item.age"
                    :value="item.age">
                </el-option>
            </el-select>



            <div class="title">宠物价格</div>
            <el-slider :max="maxprice" v-model="form.maxprice"></el-slider>
            
            <div class="but">
                <el-tooltip class="item" effect="dark" content="根据上诉条件查询" placement="bottom">
                    <el-button type="primary" @click="query" style="background-color:orange;boder:none;">查询</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="我也要出售" placement="bottom">
                    <el-button type="primary" @click="towantsell" style="background-color:orange;boder:none;">出售</el-button>
                </el-tooltip>

            </div>

        </div>
    </div> 
</template>

<script>
import { requestqueryBKindandSKind,requestqueryallskind,requestqueryMaxPrice,requestqueryage,requestusername} from '@/api/index'
    export default {
       name:'Selector',
       data(){
           return{
                sort:[{
                   value:'默认排序',
                   sort:null
                },
                {
                   value:'价格最低',
                   sort:'p_price ASC'
                },
                {
                   value:'价格最高',
                   sort:'p_price DESC'
                }],

                username:'',  //这里我先获取登录的用户名，方便后面出售宠物页面，携带我的username过去
                bkind:[],      //存储宠物类型
                skind:[],         //品种
                fskind:[],      //筛选后的品种
                age:[],
                maxprice:5000,
                form:{
                   sort:null,
                   bkid:null,
                   skid:null,
                   age:null,
                   maxprice:null,
                   petname:null
                }
            }
        },
        created(){      //这里是本项目目前最难理解的

        /*
        我使用 map() 方法将查询到的所有宠物类型数据的 bkid、bkindname 和 skid 字段提取出来，并将结果保存到 this.bkind 数组中。然后，我使用 filter() 方法和 findIndex() 方法来去除重复的宠物类型。具体来说，filter() 方法用于过滤数组中的元素，findIndex() 方法用于查找数组中第一个满足条件的元素，并返回其索引。在这里，我通过比较当前元素的 bkindname 字段在数组中第一次出现的索引和当前元素的索引来去除重复的宠物类型。
         */
            //查询宠物类型
            requestqueryBKindandSKind().then(res => { 
                this.bkind = res
                .map(item => ({ bkid: item.bkid, bkindname: item.bkindname ,skid: item.skid}))
                .filter((item, index, array) => array.findIndex(t => t.bkindname === item.bkindname) === index);

                /* console.log('收到响应数据：', res); */
            }).catch(err => {
                console.log(err)
            })
            if(this.$route.query.patname){
                this.form.petname = this.$route.query.petname
            }

            //查询所有宠物品种
            requestqueryallskind().then(res => {
                this.skind = res.map(item => ({ skid: item.skid, bkid: item.bkid, skindname: item.skindname}))
               
                /* console.log('收到响应数据：', res); */
                //如果当前路由的查询参数中包含 bkid
                if(this.$route.query.bkid){
                    this.form.bkid = this.$route.query.bkid
                    this.fskind = this.skind.filter(n => {
                        return n.bkid === this.form.bkid
                    })
                }else{
                    this.fskind = this.skind.filter(n => {
                        return n.skindname != "其他"
                    })
                    
                }
            }).catch(err => {
                console.log(err)
            })

            //查询宠物最高价
            requestqueryMaxPrice().then(res => {
                /* console.log('收到响应数据：', res); */
                
                this.form.maxprice = res
            }).catch(err => {
                console.log(err)
            })

            //查询宠物所有年龄
            requestqueryage().then(res => {
               /*  console.log('收到响应数据：', res) */
                // 使用 Set 对象对年龄进行去重
                 const uniqueAges = [...new Set(res.map(pet => pet.age))]

                // 将去重后的年龄转换成下拉列表的选项格式
                const ageOptions = uniqueAges.map(age => ({ age })).sort((a, b) => a.age - b.age)

                this.age = ageOptions;
                            }).catch(err => {
                                console.log(err)
                            })
            
            requestusername({
                uid:this.$store.state.uid
            }).then(res => {
                let data = res
              let username = data[0].username

                this.username = username
               /*  console.log('看看有没有名字：',res); */
            }).catch(err => {
                console.log(err)
            })
        },
            

/*
    当用户没有选择宠物类型时，即 this.form.bkid 为空字符串时，将 this.skind 数组中 skindname 不等于“其他”的元素筛选出来，得到一个新的数组，并将其赋值给 this.fskind 属性。这样做是避免下拉菜单中出现 “其他” 选项，因为“其他”选项并不属于任何宠物类型。
    当用户选择宠物类型时，即 this.form.bkid 不为空字符串时，将 this.skind 数组中 bkid 等于 this.form.bkid 的元素筛选出来，得到一个新的数组，并将其赋值给 this.fskind 属性。这样做是根据当前选择的宠物类型，动态筛选出对应的宠物品种。
    在更新下拉菜单选项之后，还需要检查当前选中的宠物品种是否属于该宠物类型。如果不属于，则将宠物品种清空，避免出现不合理的组合。具体来说，首先在 this.fskind 数组中筛选出 skid 等于 this.form.skid 的元素，得到一个新的数组 bsk。如果 bsk 数组的长度为 0，说明当前选中的宠物品种不属于该宠物类型，此时将 this.form.skid 属性清空即可。
*/
       methods:{
            //用于在选择宠物类型时，根据类型筛选出对应的宠物品种，并更新下拉菜单中的选项。
            bkindchange(){
                //当用户没有选择宠物类型时
                if(this.form.bkid === ""){
                    this.fskind = this.skind.filter(n => {
                        return n.skindname != "其他"
                    })
                }else{
                    this.fskind = this.skind.filter(n => {
                        return n.bkid === this.form.bkid
                    })
                    let bsk = this.fskind.filter(n => {
                        return n.skid === this.form.skid
                    })
                    if(bsk.length === 0){
                        this.form.skid = ""
                    }
                }
            },
            //用于查询符合条件的宠物信息。
            query(){
                this.$emit('query',this.form)
            },

            towantsell(){
                //首先检查用户是否已登录
                if(this.$store.state.uid === null){
                    this.$store.state.show = true
                    this.$store.state.logshow = true
                }else {
                    this.$router.push({
                        path:'/wantsell',
                        query:{
                            username:this.username
                        }
                    })
                }
            }
       }
    }
</script>

<style scoped>
.selector {
  width: 25em;
  margin-top: 1em;
  background: rgb(255, 255, 255);
}

.reduceindex {
  z-index: -1;
}

.form {
  margin: auto;
  width: 15em;
  padding: 0.5em;
}

.title {
  font-size: 1.5em;
  margin: 0.5em 0;
}

.but {
  margin-top: 1em;
  display: flex;
}
.el-slider__runway {
  background-color: orange; /* 更改滑动条轨道的颜色 */
}

.el-slider__button {
  background-color: #00bcd4; /* 更改滑块按钮的颜色 */
}
</style>