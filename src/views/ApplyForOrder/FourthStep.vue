<template>
    <!-- 第四步 -->
    <div class="" v-show="applyForTab==4" v-loading="loading">
        <el-form :inline="true"
        :model="step04_Form"
        label-width="140px"
        :rules="stepFor_rules"
        ref="step04_Form"
        class="step04-ruleForm">
            <el-form-item label="单位名称" prop="CompanyName">
                <el-input v-model="step04_Form.CompanyName" placeholder="请填写营业执照上的单位名称全称" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="单位电话" prop="CompanyPhone">
                <el-input v-model="step04_Form.CompanyPhone" placeholder="请输入单位电话（输入固定电话号码时请在区号与号码之间加 ‘  -  ’）" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="单位地址" prop="CompanyAddress">
                <el-input v-model="step04_Form.CompanyAddress" placeholder="请填写营业执照上的注册地址" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="单位类型" prop="CompanyType">
                <el-select v-model="step04_Form.CompanyType" placeholder="请选择单位类型" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option v-for="(item,index) in unitType" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="注册区域" prop="Region">
                <el-select v-model="step04_Form.Region" placeholder="请选择注册区域" clearable disabled>
                    <el-option v-for="(item,index) in AreaCode" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="USCCode">
                <el-input v-model="step04_Form.USCCode" placeholder="或组织机构代码证" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="CompanyPostalCode">
                <el-input v-model="step04_Form.CompanyPostalCode" placeholder="请输入邮政编码" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="申请人与该单位已签订" label-width="190px" prop="SignYear">
                <el-radio-group v-model="step04_Form.SignYear" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">一年</el-radio>
                    <el-radio label="2">两年以上劳动合同</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="申请类型" prop="applyType">
                <el-radio-group v-model="step04_Form.applyType" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="0">按单位</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="step02_btn_wrap tc marT30 padB20" v-show="userInfo.State ==1001 || userInfo.State==1002">
            <el-button @click="step04_prev()">上一步</el-button>
            <el-button type="primary" @click="complete('step04_Form')">完成</el-button>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { unitType,AreaCode } from '../../../static/dataJson/dataJson'
    import { getApplyFor,getApplyForInfo } from '../../api/api.js'
    import { setCookie } from '../../util/index.js'
    export default{
        data(){
            var validatePhoneNum = (rule, value, callback) => {
                let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                let fixTel = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
                // let fixTel = ^0\d{2,3}[- ]?\d{7,8};
                if (!reg.test(value) && value.length == 11) {
                    callback(new Error('请输入正确的手机号码或固话电话号码'));
                }else if(!fixTel.test(value) && value.length != 11){
                    callback(new Error('请输入正确的手机号码或固话电话号码'));
                } else {
                    callback();
                }
            };
            return{
                loading:false,
                //单位类型
                unitType,
                //注册区域
                AreaCode,
                //第四步
                step04_Form:{
                    CompanyName:'',
                    CompanyPhone:'',
                    CompanyAddress:'',
                    CompanyType:'',
                    USCCode:'',
                    CompanyPostalCode:'',
                    SignYear:'',
                    applyType:'0',
                    Region:'310115',
                },

                //表单验证
                stepFor_rules : {
                    CompanyName:[
                        { required: true, message: '请输入单位名称', trigger: 'blur' },
                    ],
                    CompanyPhone:[
                        { required: true, message: '请输入单位电话', trigger: 'blur' },
                        {
                            validator: validatePhoneNum,
                            trigger: 'blur'
                        },
                    ],
                    CompanyAddress:[
                        { required: true, message: '请输入单位名称', trigger: 'blur' },
                    ],
                    CompanyType: [
                        { required: true, message: '请选择单位类型', trigger: 'change' }
                    ],
                    USCCode:[
                        { required: true, message: '请输入单位名称', trigger: 'blur' },
                    ],
                    CompanyPostalCode:[
                        { required: true, message: '请输入单位名称', trigger: 'blur' },
                    ],
                    SignYear:[
                        { required: true, message: '请选择申请人与该单位签署已签订年限', trigger: 'change' }
                    ],
                    Region:[
                        { required: true, message: '请选择注册区域', trigger: 'change' }
                    ],
                },
            }
        },
        computed:{
            ...mapGetters(['applyForTab','userInfo']),
            getApplyForCode(){
                return this.$store.getters.applyForCode
            },
        },
        watch:{
            getApplyForCode:function(val){
                if(val !=''){
                    this.getApplyForInfoFunc(val)
                }
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_APPLYFORTAB',4)
            })
        },
        methods:{
            //第四步完成
            step04_prev(){
                this.loading =true;
                setTimeout(()=>{
                    this.loading = false;
                    this.$router.push({path:'/applyFor/thirdStep'})
                },2000)
            },
            complete(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        var params ={
                            step : 4,
                            bill: {
                                SignType: '1',
                                code:this.$store.getters.applyForCode,
                                TelAddr:this.$store.getters.applyForData.bill.TelAddr,
                                PostCode:this.$store.getters.applyForData.bill.PostCode,
                            },
                            member:this.$store.getters.applyForData.member,
                            filelist:this.$store.getters.applyForData.filelist,
                            residentlist:this.$store.getters.applyForData.residentlist,
                            roomlist:this.$store.getters.applyForData.roomlist,
                            companyinfo:this.step04_Form
                        }
                        var applyForData = {
                            member:params.member,
                            filelist:params.filelist,
                            residentlist:params.residentlist,
                            roomlist:params.roomlist,
                        }
                        getApplyFor(params).then(response => {
                            switch (response.StatusCode) {
                                case 200:
                                    // this.$alert('申请资格提交中，请等待。。。', '提示', {
                                    //     confirmButtonText: '确定',
                                    //     callback: action => {
                                    //
                                    //     }
                                    // });
                                    this.$message.success('申请资格提交成功，请稍等！')
                                    //更新个人数据
                                    //重置cookie userinfo
                                    var userInfo = JSON.parse(this.$cookie.get('userInfo'))
                                    userInfo.State = '1003'
                                    this.$store.dispatch('SET_USERINFO',userInfo)
                                    this.$store.dispatch('SET_APPLYFORDATA',applyForData)
                                    this.$store.commit('SET_STEPTIP','1003');
                                    setCookie('userInfo',JSON.stringify(userInfo))
                                    setCookie('applyForData',JSON.stringify(applyForData))
                                    setTimeout(()=>{
                                        this.loading = false;
                                        this.$router.push({path:'/'})
                                    },800)

                                break;
                                case 500:
                                    this.loading = false;
                                    this.$message({
                                        type: 'error',
                                        message: response.Info
                                    });
                                    break;
                                default:
                                    this.loading = false;
                                    this.$message({
                                        type: 'error',
                                        message: response.Info
                                    });
                            }
                        }).catch(error=> {
                            this.$message({
                                type: 'error',
                                message: error
                            });
                        })


                    } else {
                        this.$message.error('表单请填写完整！！！');
                        return false;
                    }
                });
            },
            getApplyForInfoFunc(val){
                this.loading = true
                getApplyForInfo({Id:val}).then((response) =>{
                    switch (response.StatusCode) {
                        case 200:
                            if(JSON.parse(response.Data).company){
                                this.step04_Form = JSON.parse(response.Data).company
                                this.step04_Form.applyType = '0'
                            }
                            this.loading = false
                        break;
                        case 500:
                            this.$message({
                                type: 'error',
                                message: response.Info
                            });
                        break;
                        default:
                            this.$message({
                                type: 'error',
                                message: response.Info
                            });
                    }
                }).catch(error=> {
                    this.$message.error(error)
                })
            },
        },
        created(){
            if(this.$store.getters.applyForCode){
                this.getApplyForInfoFunc(this.$store.getters.applyForCode)
            }
        }
    }
</script>
<style lang='scss'>
</style>
