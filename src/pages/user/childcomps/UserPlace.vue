<!--地址管理-->
<template>
    <div class="userplace">
        <el-table :data="data" style="width: 100%">
            <!-- 手机号 -->
            <el-table-column label="手机号" width="200">
                <template slot-scope="scope">     
                    <span v-if="show != scope.$index">{{scope.row.phone}}</span>
                    <el-input v-model="form.phone" clearable v-if="show === scope.$index" placeholder="请输入手机号">
                    </el-input>
                </template>
            </el-table-column>
            <!-- 收件人 -->
            <el-table-column label="收件人" width="200">
                <template slot-scope="scope">
                    <span v-if="show != scope.$index">{{scope.row.username}}</span>
                    <el-input v-model="form.username" clearable v-if="show === scope.$index" placeholder="请输入收件人">
                    </el-input>
                </template>
            </el-table-column>
            <!-- 地址 -->
            <el-table-column label="地址">
                <template slot-scope="scope">
                    <span v-if="show != scope.$index">{{scope.row.address}}</span>
                    <el-input v-model="form.address" clearable v-if="show === scope.$index" placeholder="请输入地址">
                    </el-input>
                </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button v-if="show === scope.$index" type="text" @click="change(scope.$index,scope.row)">修改
                    </el-button>
                    <span v-if="show != scope.$index">
                        <el-Popconfirm title="确定删除该地址吗？" @confirm="deleteaddress(scope.$index, scope.row)">
                            <el-button class="deletebut" slot="reference" type="text">删除</el-button>
                        </el-Popconfirm>
                    </span>
                    <el-button v-if="show === scope.$index && show != length" type="text" @click="update(scope.$index, scope.row)">确认</el-button>
                    <el-button v-if="show === scope.$index && show === length" type="text" @click="update(scope.$index, scope.row)">增加</el-button>
                    <el-button v-if="show === scope.$index" type="text" @click="cancel(scope.$index, scope.row)">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 增加按钮 -->
        <div class="addplace" @click="add">
            <div class="add">
                <img src="../../../assets/img/user/add.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import {requestaddAddress,requestdeleteAddress,requestupdateAddress,requestqueryAddressbyuid} from "@/api/address.js"
export default {
    name:'UserPlace',
    data(){
        return{
            show:null,
            phone:null,
            username:null,
            address:null,
            data:[],           //存储用户的地址列表，初始值为一个空数组
            count:0,           //用于记录用户的地址数量，初始值为 0
            length:null,       //用于记录用户的地址列表长度，初始值为 null。
            form:{}            //存储当前正在编辑的地址的表单数据，初始值为空对象
        }
    },
    methods:{
        //按修改按钮
        change(index,row){         //如果当前地址数量 count 等于 1，就说明已经有一个地址正在被编辑，此时需要将该地址从地址列表中删除，并将地址数量 count 减 1。
            if(this.count === 1){
                this.data.pop()
                this.count--
            }
            this.phone = row.phone
            this.username = row.username
            this.address = row.address
            this.form = row
            this.show = index
        },
        //按取消按钮
        cancel(index, row) {      //当前地址在列表中的索引等于地址列表的长度 length，则说明用户点击了“增加”按钮后又点击了“取消”按钮，
            if (index === this.length) {
                this.data.pop()
                this.count--
            } else {
                row.phone = this.phone
                row.username = this.username
                row.address = this.address
                this.form = {}
                this.show = null
            }
        },
        // 按确认/增加按钮
        update(index, row) {
            if (this.form.phone === "") {
                this.$message({
                    message: "手机号不能为空",
                    type: "error",
                    center: true,
                    showClose: true,
                })
            } else if (this.form.username === "") {
                this.$message({
                    message: "收件人不能为空",
                    type: "error",
                    center: true,
                    showClose: true,
                });
            } else if (this.form.address === "") {
                this.$message({
                    message: "地址不能为空",
                    type: "error",
                    center: true,
                    showClose: true,
                })
            }else if (/^1\d{10}$/.test(this.form.phone)) {
                if (index === this.length) {
                    // 增加地址
                    this.addAddress(index, row)
                } else {
                    // 修改地址
                    this.updateAddress()
                }
            } else {
                this.$message({
                    message: "请输入11位手机号码，1xx xxxx xxxx",
                    type: "error",
                    center: true,
                    showClose: true,
                })
            }
        },
        // 按删除按钮
        deleteaddress(index, row) {
            if (this.count === 1) {      //当前地址数量 count 等于 1，就说明已经有一个地址正在被编辑
                this.data.pop()
                this.count--
            }
            requestdeleteAddress({
                aid:row.aid
            }).then((res) => {
                this.$message({
                    message:res,
                    type:'success',
                    center:true,
                    showClose:true
                })
                this.data.splice(index,1)
                this.length--
            }).catcch((err) => {
                console.log(err)
            })
        },
        //点击+号
        add(){
            if (this.count === 0) {
                let newform = new Object()
                newform.aid = ""
                newform.phone = ""
                newform.username = ""
                newform.address = ""
                this.form = newform
                this.data.push(newform)
                this.show = this.length
                this.count++
            }
        },
        //添加地址
        addAddress(index,row){
            requestaddAddress({
                uid:this.$store.state.uid,
                phone:this.form.phone,
                username:this.form.username,
                address:this.form.address,
            }).then((res) => {
                this.$message({
                    message:res.msg,
                    type:'success',
                    center:true,
                    showClose:true
                })
                row.aid = res.aid
                this.show = null
                this.length++
                this.count--
            }).catch((err) => {
                console.log(err)
            })
        },
        // 修改地址
        updateAddress(){
            requestupdateAddress({
                aid:this.form.aid,
                phone:this.form.phone,
                username:this.username,
                address:this.form.address
            }).then((res) => {
                this.$message({
                    message:res.msg,
                    type:'success',
                    center:true,
                    showClose:true
                })
                this.show = null
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    created(){
        requestqueryAddressbyuid({
            uid: this.$store.state.uid,
        }).then((res) => {
            this.data = res
            this.length = res.length
        }).catch((err) => {
            console.log(err)
        })
    }
}
</script>

<style scoped>
.addplace {
  width: 100%;
  height: 4em;
  background: rgba(145, 167, 240, 0.7);
  cursor: pointer;
}

.addplace :hover {
  background: rgb(145, 167, 240);
}

.deletebut {
  margin-left: 1em;
}

.add {
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>