<template>
    <div class="presell">
        <swipper></swipper>
        <breadcrumb>宠物出售</breadcrumb>
        <div class="container">
            <div class="mainsell">
                <!--左侧查询框 通过插槽传入一个按钮-->
                <selector @query="query"></selector>
                <div class="rightcard">
                    <div v-if="lists.length === 0 && show === true" class="nolists">没有你搜索的宠物</div>
                    <!--宠物卡片-->
                    <Carditem :lists="lists"></Carditem>
                </div>
            </div>
            <!-- 分页按钮 -->
            <!-- <div class="paging">
                <el-pagination @current-change="newpetpage" background :hide-on-single-page="true" :pager-count="pagercount"
                    :page-size="pagesize" layout="prev, pager, next, jumper">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb.vue"
import Carditem from "@/components/common/carditem/Carditem.vue"
import Selector from "@/components/content/selector/Selector.vue"
import Swipper from "@/components/common/Swipper.vue"
import {requestquerypetpage} from "@/api/index"
export default {
    name: 'Presell',
    components: {Breadcrumb,Carditem,Selector,Swipper},
    data() {
        return {
            show: false,      //控制弹出层的显示与隐藏，初始值为 false；        
            pk: 0, 
            lists: [],  //当前页的宠物数据         
            pagercount: 5,  //页码最大按钮数量          
            pagesize: 8, //每页显示的条目个数         
            currentpage: 1, //当前页数
            form: {
                sort: null,
                bkid: null,
                skid: null,
                age: null,
                maxprice: null,
                petname: null
            }
        }
    },
    methods:{
        query(form){
            this.currentpage = 1
            this.form = form
            //查询符合条件的宠物数据
            requestquerypetpage({
                page: this.currentpage,
                count: this.pagesize,
                pk: this.pk,
                bkid: this.form.bkid,
                skid: this.form.skid,
                age: this.form.age,
                maxprice: this.form.maxprice,
                petname: this.form.petname,
                sort: this.form.sort
            }).then(res => {
                /* console.log('查询符合条件的宠物数据',res); */
                this.lists = res
            }).catch(err => {
                console(err)
            })
        }

    },
    created(){
        if (this.$route.query.bkid) {
            this.form.bkid = this.$route.query.bkid
        }
        if (this.$route.query.petname) {
            this.form.petname = this.$route.query.petname
        }
        //首次进入查询数据
        requestquerypetpage({
            page: this.currentpage,
            count: this.pagesize,
            pk: this.pk,

        }).then(res => {
            /* console.log(res); */
                this.lists = res,
                this.show = true
            }).catch(err => {
                console.log(err)
            });
    }
}
</script>

<style scoped>
@import "../../assets/css/mediacss.css";

.nolists {
  width: 100%;
  font-size: 4em;
  line-height: 10em;
  color: rgba(143, 138, 138, 0.5);
  text-align: center;
}

.mainsell {
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  margin-top: calc(38px + 0.5em);
  min-height: 54em;
  margin-left: 5%;
}

.rightcard {
  width: 100%;
}

.paging {
  display: flex;
  justify-content: center;
  margin-top: 1em;
  width: 100%;
}
</style>