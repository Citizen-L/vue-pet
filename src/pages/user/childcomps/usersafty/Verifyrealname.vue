<!--安全中心 实名-->
<template>
    <div class='verifyrealname'>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="真实姓名">
                <el-input :disabled="true" v-model="form.realname"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input :disabled="true" v-model="form.idcard"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {requestqueryuser} from '@/api/user.js'
  

    export default {
        name: 'Verifyrealname',
        data () {
            return {
                form: {
                    realname: '',
                    idcard: ''
                }
            }
        },
        created() {
            requestqueryuser({
                uid: this.$store.state.uid
            }).then(res => {
                const user = res[0]
                this.form.realname = user.realname
                this.form.idcard = user.idcard
            }).catch(err =>{
                console.log(err)
            })
        },
    }
</script>
<style scoped>
.verifyrealname {
  width: 22em;
  margin: 0 auto;
}
</style>