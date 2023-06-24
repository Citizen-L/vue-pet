<!--安全中心-->
<template>
    <div class='usersafety'>
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <div class="collapsetitle">修改密码</div>
                </template>
                <changepwd></changepwd>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <div class="collapsetitle">
                        实名认证
                        <span class="done"> (已认证)</span>
                    </div>
                </template>
                <verifyrealname></verifyrealname>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <div class="collapsetitle">
                        绑定手机号
                        <span class="done">(已绑定)</span>
                    </div>
                </template>
                <change-phone></change-phone>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import Changepwd from "@/pages/user/childcomps/usersafty/Changepwd.vue"
    import Verifyrealname from "@/pages/user/childcomps/usersafty/Verifyrealname.vue"
    import ChangePhone from "@/pages/user/childcomps/usersafty/ChangePhone.vue"

    export default {
        name: 'UserSafety',
        data () {
            return {}
        },
        components: {Changepwd, Verifyrealname, ChangePhone}
    }
</script>
<style scoped>
.usersafety {
  padding-left: 1em;
}

.collapsetitle {
  font-size: 1.1em;
  padding-left: 1em;
}

.done {
  color: rgb(33, 209, 9);
}
</style>