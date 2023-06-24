<!--购买页面 提交订单-->
<template>
    <div class="purchase">
        <div class="title">
            <h1>
                <slot>提交订单</slot>
            </h1>
        </div>
        <div class="mainbar">
            <el-form :rules="rules" ref="ruleForm" label-width="80px" :model="form">
                <el-form-item label="收货地址" prop="address">
                     <el-input v-model="form.address" clearable placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="form.phone" clearable placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="收货人" prop="recipientname">
                    <el-input v-model="form.recipientname" clearable placeholder="请输入收件人"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="but">
                        <el-button type="primary" @click="request('ruleForm')">提交</el-button>
                        <el-tooltip effect="dark" content="该地址为新地址，添加到地址列表中" placement="bottom">
                            <el-button type="primary" @click="addaddress('ruleForm')">存入到新地址</el-button>
                        </el-tooltip>
                    </div>
                </el-form-item>
            </el-form>
            <div class="chooseaddress">已有地址（可点击选择）</div>
            <AddressItem @choose="choose"></AddressItem>
        </div>
    </div>
</template>

<script>
import {requestaddAddress} from '@/api/address.js'
import {requestaddpetorder,requestupdatepetorder3} from '@/api/order'
import bus from '@/store/bus'

import AddressItem from '@/pages/purchase/AddressItem.vue'
export default {
    name:'purchase',
    inject:['reload'],
    props:['orderform'],
    components:{AddressItem},
    data() {
        var checkphone = (rule, value, callback) => {
            if(!value) {
                return callback(new Error('手机号不能为空'))
            }else if(/^1\d{10}$/.test(value)) {
                callback();
            }else {
                callback(new Error('请输入11位手机号码，1xx xxxx xxxx'))
            }
        }
        return {
            form: {
                address: '',
                phone: '',
                recipientname: ''
            },
            rules:{
                address:[
                    {required:true,message:'地址不能为空',tigger:'blur'}
                ],
                phone:[
                    {required:true,validator:checkphone,tigger:'blur'}
                ],
                recipientname:[
                    {required:true,message:'收货人不能为空',tigger:'blur'}
                ]
            }
        }
    },
    methods:{
        //提交订单
        request(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(this.orderform){
                        //修改订单
                        requestupdatepetorder3({
                            poid:this.orderform.poid,      //表示要修改的订单的 ID，即 this.orderform.poid，是一个从父组件中传递过来的订单 ID
                            newaddress:this.form.address,    //表示修改后的收货地址
                            newphone:this.form.phone,
                            newrecipientname:this.form.recipientname,
                            postatu:3                 //表示修改后的订单状态，即 3，表示订单状态为已修改。
                        }).then(res => {
                            this.form.postatu = 3     //更新订单状态：将订单状态设置为已修改
                            this.$emit('successupdate',this.form)
                            let purchasemsg = {}
                            purchasemsg.type = 2
                            purchasemsg.msg = '我想要修改一个订单，点击前往查看'
                            purchasemsg.touid =this.orderform.touid
                            purchasemsg.pid = this.orderform.pid
                            bus.$emit('purchase',purchasemsg)        //触发自定义事件 purchase，并传递一个包含订单信息的对象postatu
                            this.$router.go(-1)
                            this.$notify({
                                title:'修改中',
                                message:res.msg,
                                type:'warning',
                                offset:100
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    }else{
                        //提交订单
                        requestaddpetorder({
                            pid: this.$route.query.pid,
                            uid: this.$store.state.uid,    //表示购买者的用户 ID
                            puid: this.$route.query.uid,      //示宠物的拥有者的用户ID
                            address: this.form.address,
                            phone: this.form.phone,
                            recipientname: this.form.recipientname,
                            postatu: 0,       //表示订单状态，即 0，表示订单状态为未提交
                            price: this.$route.query.price,
                            petname:this.$route.query.petname,
                            img:this.$route.query.img
                            
                        }).then(res => {
                            if(res.flag == 1){             //表示订单提交成功，执行下一步操作；否则，显示一个提示信息，提示信息的内容为请求返回的消息。
                                let purchasemsg = {}
                                purchasemsg.type = 1
                                purchasemsg.msg = '我申请购买你的宠物，点击前往查看'
                                purchasemsg.touid = this.$route.query.uid
                                purchasemsg.pid = this.$route.query.pid
                                bus.$emit('purchase',purchasemsg)
                                this.$router.go(-1)
                                this.$notify({
                                    title:'成功',
                                    message:res.msg,
                                    type:'success',
                                    offset:100
                                })
                            }else{
                                this.$notify({
                                    title:'失败',
                                    message:res.msg,
                                    type:'error'
                                })
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                }else{
                    return false
                }
            })
        },
        addaddress(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    requestaddAddress({
                        uid:this.$store.state.uid,
                        phone:this.form.phone,
                        username:this.form.recipientname,
                        address:this.form.address
                    }).then(res => {
                        this.$message({
                            message:res.msg,
                            type:'success',
                            center:true,
                            showClose:true
                        })
                        this.reload()
                    }).catch(err => {
                        console.log(err)
                    })
                }else{
                    console.log('error submit!!')
                    return false
                }
            })
        },
        //选择地址
        choose(item){
            // 清除表单验证状态
            this.$refs['ruleForm'].clearValidate()
            // 将选择的地址信息填充到表单数据中
            this.form.recipientname = item.username
            this.form.phone = item.phone
            this.form.address = item.address
            // 如果表单数据已经存在，触发一个自定义事件将页面滚动到顶部；否则，平滑滚动到顶部
            if(this.orderform){
                this.$emit('totop')
            }else{
                window.scrollTo({
                    top:0,
                    behavior:'smooth'
                })
            }
        },
        created() {
            if(this.orderform) {
                this.form.address = this.orderform.address
                this.form.phone = this.orderform.phone
                this.form.recipientname = this.orderform.recipientname
            }
        },
    }
}
</script>

<style scoped>

.title {
  text-align: center;
  margin-bottom: 1.5em;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  font-weight: 400;
}

.mainbar {
  width: 40em;
  margin: auto;
}

.but {
  display: flex;
  justify-content: space-between;
}

.chooseaddress {
  margin-top: 2em;
  color: rgb(140, 196, 253);
  font-size: 1.5em;
}
</style>