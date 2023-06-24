<template>
    <div class='wantsell'>
        <breadcrumb>
            <span slot="second" @click="topresell">买卖专区</span> > 发布出售
        </breadcrumb>
        <div class="title">
            <h1>发布出售信息</h1>
        </div>
        <div class="sell">
            <el-form label-width="80px" ref="ruleForm" :model="form" :rules="rules">
                <el-form-item label="宠物名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入宠物名称"></el-input>
                </el-form-item>

                <el-form-item label="宠物类型" prop="bkid">
                    <el-select style="width: 100%" v-model="form.bkid" clearable filterable placeholder="请选择宠物类型" @change="bkindchange">
                        <el-option v-for="item in bkind" :key="item.bkid" :label="item.bkindname" :value="item.bkid"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="宠物品种" prop="skid">
                    <el-select style="width: 100%" v-model="form.skid" clearable filterable placeholder="请选择宠物品种" @change="skindchange">
                        <el-option v-for="item in fskind" :key="item.skid" :label="item.skindname" :value="item.skid"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="宠物年龄" prop="age">
                    <el-input v-model.number="form.age" placeholder="请输入宠物年龄(单位月)" clearable></el-input>
                </el-form-item>

                <el-form-item label="宠物价格" prop="price">
                    <el-input v-model="form.price" placeholder="请输入出售的价格（单位元）" clearable></el-input>
                </el-form-item>
                <!--
                    on-preview点击文件列表中已上传的文件时的钩子
                    on-remove文件列表移除文件时的钩子
                    on-change文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
                    on-exceed文件超出个数限制时的钩子
                    file-list上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                    auto-upload	是否在选取文件后立即进行上传
                -->
                <el-form-item label="宠物照片" prop="img">
                    <el-upload class="upload-demo" ref="upload" action multiple accept="image/*" list-type="picture-card"
                        :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange" :on-exceed="handleExceed"
                        :file-list="form.img" :auto-upload="false">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">最多上传5张图片,且每张图片不得超过10m</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="!$route.query.form" type="primary" @click="request('ruleForm')">立即创建</el-button>
                    <el-button v-if="$route.query.form" type="primary" @click="updatepet('ruleForm')">确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb.vue"
import bus from "@/store/bus.js"
import { requestqueryBKindandSKind,requestqueryallskind,requestaddpet, requestupdatePet} from "@/api/index.js"

export default {
    name:'Wantsell',
    components:{Breadcrumb},
    data() {
        //验证年龄
        var checkage = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空（单位月）'))
            }
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值（单位月）'))
            } else {
                callback()
            }
        }
        //验证价格
        var checkprice = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('价格不能为空'))
            }
            if (/^\d+(\.\d+)?$/.test(this.form.price)) {
                callback()
            } else {
                callback(new Error('请输入数字值'))
            }
        }
        //验证图片
        var checkphoto = (rule, value, callback) => {
            if (value.length === 0) {
                return callback(new Error('请选择上传的图片'));
            } else if (value.length > 5) {
                return callback(new Error('最多上传5张'));
            } else {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].size / 1024 / 1024 > 10) {
                        return callback(new Error('每张图片不可超过10m'));
                    }
                }
                callback();
            }
        }
        return{
            pk: 0,
            dialogImageUrl: '',
            dialogVisible: false,  //于指示图片预览对话框是否可见。
            bkind: [],        //存储所有宠物种类的数据
            skind: [],        //存储当前选中宠物种类下的所有宠物品种的数据
            fskind: [],        //存储当前选中宠物品种下的所有宠物具体品种的数据
            //判断表单是否完整
            falg: false,
            form: {
                pid: '',
                name: '',
                bkid: '',
                bkindname:'',
                skid: '',
                skindname:'',
                age: '',
                price: '',
                img: [],
                username:'',
            },
            rules: {
                name: [
                    { required: true, message: '请输入宠物名称', trigger: 'blur' }
                ],
                bkid: [
                    { required: true, message: '请选择宠物类型', trigger: 'change' }
                ],
                skid: [
                    { required: true, message: '请选择宠物品种', trigger: 'change' }
                ],
                age: [
                    { required: true, validator: checkage, trigger: 'blur' }
                ],
                price: [
                    { required: true, validator: checkprice, trigger: 'blur' }
                ],
                img: [
                    { required: true, validator: checkphoto, trigger: 'change' }
                ]
            }
        }
        
    },

    methods:{
        //选中类型时，筛选出对应品种
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
        //选中品种时，选中对应类型
        skindchange() {
            if (this.form.skid != "") {
                let sbk = this.fskind.find(n => {
                    return n.skid === this.form.skid
                })
                this.form.bkid = sbk.bkid
            }
        },
        handleChange(file, fileList) {
            this.form.img = fileList
        },
        handleRemove(file, fileList) {
            this.form.img = fileList
        },
        handlePreview(file) {     //预览已上传的文件时被调用，其中 file 参数表示当前要预览的文件对象。
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        //图片超过限制执行
        handleExceed(files, fileList) {
            // this.$message.warning(`最多选择5个文件`);
        },
        request(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let formData = new FormData()
                formData.append('petname', this.form.name)
                formData.append('pk', this.pk)
                formData.append('bkid', this.form.bkid)
                formData.append('bkindname',this.form.bkindname)
                formData.append('skid', this.form.skid)
                formData.append('skindname',this.form.skindname)
                formData.append('uid', this.$store.state.uid)
                formData.append('username',this.$route.query.username)
                formData.append('p_year', this.form.age)
                formData.append('p_price', this.form.price)
                  for (let i = 0; i < this.form.img.length; i++) {
                        formData.append('files', this.form.img[i].raw)
                    }
                requestaddpet(
                    formData  
                ).then(res => {
                        this.$notify({
                        title: '成功',
                        message: res,
                        type: 'success',
                        offset: 100
                    })
                // this.$refs.upload.submit();
                this.$router.go(-1)
                }).catch(err => {
                    console.log(err)
                    
                    })
                } else {
                    this.$notify({
                        title: '失败',
                        message: '请输入正确的宠物信息',
                        type: 'error',
                        offset: 100
                    })
                    return false
                }
            })
        },
        updatepet(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let formData = new FormData()
                    formData.append('pid', this.form.pid)
                    formData.append('bkid', this.form.bkid)
                    formData.append('bkindname',this.form.bkindname)
                    formData.append('skid', this.form.skid)
                    formData.append('skindname',this.form.skindname)
                    formData.append('uid', this.$store.state.uid)
                    formData.append('username',this.form.username)
                    formData.append('p_year', this.form.age)
                    formData.append('p_price', this.form.price)
                    for (var i = 0; i < this.form.img.length; i++) {
                        if (this.form.img[i].raw) {
                            formData.append('files', this.form.img[i].raw)
                        }
                    }
                    requestupdatePet(
                        formData
                    ).then(res => {
                        this.$notify({
                            title: '成功',
                            message: res,
                            type: 'success',
                            offset: 100
                        })
                        this.$router.go(-1)
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$notify({
                        title: '失败',
                        message: '请输入正确的宠物信息',
                        type: 'error',
                        offset: 100
                    })
                    return false
                }
            })
        },
        topresell() {
            this.$router.push('/presell')
        }
    },
    created() {
        this.username = this.$route.query.username
        const form = JSON.parse(this.$route.query.form)
        this.form = form

        //这里把对象形式img转化为数组形式
        let imgArray = [];
        if (typeof form === 'string') { // 检查 form 是否是一个字符串
            const imgStrings = form.match(/img\d+/g); // 从 form 字符串中匹配所有形如 "img1" 的字符串
            imgArray = imgStrings.map(imgString => form[imgString]); // 将匹配到的字符串转成数组
        }
            form.img = imgArray; // 将数组赋值给 form 对象的 img 属性

        /* console.log('@@@',form) */

        //查询所有宠物类型及对应品种
        requestqueryBKindandSKind().then(res => {
            this.bkind = res
                .map(item => ({ bkid: item.bkid, bkindname: item.bkindname ,skid: item.skid}))
                .filter((item, index, array) => array.findIndex(t => t.bkindname === item.bkindname) === index)
               /*  console.log('卖的-收到响应数据：', res); */
        }).catch(err => {
            console.log(err)
        })
        //查询所有宠物品种
        requestqueryallskind().then(res => {
            this.skind = res.map(item => ({ skid: item.skid, bkid: item.bkid, skindname: item.skindname}))
               /*  console.log('卖的-收到响应数据：', res); */
            
            this.fskind = this.skind.filter(n => {
                return n.skindname != "其他"
            })
        }).catch(err => {
            console.log(err)
        })
    }, 

}
</script>

<style scoped>
.wantsell {
  margin-top: 50px;
}

.title {
  text-align: center;
  margin-bottom: 1.5em;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  font-weight: 400;
}

.sell {
  width: 45.7em;
  margin: auto;
}
</style>