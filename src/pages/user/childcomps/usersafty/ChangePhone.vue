<!--安全中心 修改手机号-->
<template>
    <div class='ChangePhone'>
        <el-input :disabled="disabled" v-model="phone" clearable placeholder="请输入要绑定的手机号" ref="inputphone" ></el-input>
            <div class="but" v-if="ischange === false">
                <el-button type="primary" @click="tochange">去修改</el-button>
           </div>
            <div class="but" v-if="ischange === true">
                <el-button type="primary" @click="request">确认</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </div>
    </div>
</template>

<script>
    import {requestqueryuser,requestupdateuser} from '@/api/user.js'
    import { validatePhone } from "@/utils/utils.js";
    export default {
        name: 'ChangePhone',
        data () {
            return {
                oldphone: '',
                phone: '',
                disabled: true,
                ischange: false,
                flag: false
            }
        },
        methods: {
            // 验证手机号
            checktelphone() {
                if (this.phone === "") {
                    this.$message({
                        message: "手机号不能为空",
                        type: "error",
                        showClose: true
                    })
                } else if (validatePhone(this.phone)){
                    this.flag = true
                } else {
                    this.$message({
                        message: "请输入11位手机号码，1xx xxxx xxxx",
                        type: "error",
                        showClose: true
                    })
                }
            },
            tochange() {
                this.ischange = true
                this.disabled = false
            },
            cancel() {
                this.phone = this.oldphone
                this.ischange = false
                this.disabled = true
            },
            request() {
                this.checktelphone()
                if(this.flag == true) {
                    let formData = new FormData()
                    formData.append("uid",this.$store.state.uid)
                    formData.append("telphone",this.phone)

                    requestupdateuser(
                        formData
                    ).then(res => {
                        if(res.flag === 1) {
                            this.$notify({
                                title: '成功',
                                message: res.msg,
                                type: 'success'
                            })
                            this.oldphone = this.phone
                            this.disabled = true
                            this.ischange = false
                        }else {
                            this.$notify({
                                title: '失败',
                                message: res.msg,
                                type: 'error'
                            })
                        }                       
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        },
        created() {
            requestqueryuser({
                uid: this.$store.state.uid
            }).then(res => {
                /* console.log('##',res) */
                const user = res[0]
                this.phone = user.telphone
                this.oldphone = user.telphone
            }).catch(err =>{
                console.log(err)
            })
        },
    }
</script>

<style scoped>
.ChangePhone {
  width: 22em;
  margin: 0 auto;
}

.but {
  display: flex;
  margin: 1em;
  justify-content: space-around;
}

</style>