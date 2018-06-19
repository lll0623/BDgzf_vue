<template>
    <!-- 第二步 -->
    <div class="" v-show="applyForTab==2" v-loading="loading">
        <el-form
            :inline="true"
            :model="step02_Form01"
            label-width="140px"
            class="step02-ruleForm rel"
            :rules="rules"
            ref="step02_Form01">
            <el-form-item label="1" class="abs"></el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="step02_Form01.Name" placeholder="请输入姓名" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="IDCard">
                <el-input v-model="step02_Form01.IDCard	" placeholder="请输入身份证号码" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况">
                <el-select v-model="step02_Form01.MarryInfo" placeholder="请选择婚姻状况" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option label="未婚" value="1"></el-option>
                    <el-option label="已婚" value="2"></el-option>
                    <el-option label="离异" value="3"></el-option>
                    <el-option label="丧偶" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="与申请人关系">
                <el-select v-model="step02_Form01.Relation" placeholder="请选择" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option label="子女" value="子女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="本市常住人口">
                <el-radio-group v-model="step02_Form01.IsPermanent" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="step02_Form01.Sex" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-form
            :inline="true"
            :model="step02_Form02"
            label-width="140px"
            class="step02-ruleForm rel"
            :rules="rules"
            ref="step02_Form02">
            <el-form-item label="2" class="abs"></el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="step02_Form02.Name" placeholder="请输入姓名" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="IDCard">
                <el-input v-model="step02_Form02.IDCard" placeholder="请输入身份证号码" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况">
                <el-select v-model="step02_Form02.MarryInfo" placeholder="请选择婚姻状况" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option label="未婚" value="1"></el-option>
                    <el-option label="已婚" value="2"></el-option>
                    <el-option label="离异" value="3"></el-option>
                    <el-option label="丧偶" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="与申请人关系">
                <el-select v-model="step02_Form02.Relation" placeholder="请选择" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option label="子女" value="子女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="本市常住人口">
                <el-radio-group v-model="step02_Form02.IsPermanent" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="step02_Form02.Sex" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-form
            :inline="true"
            :model="step02_Form03"
            label-width="140px"
            class="step02-ruleForm rel"
            :rules="rules"
            ref="step02_Form03">
            <el-form-item label="3" class="abs"></el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="step02_Form03.Name" placeholder="请输入姓名" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="IDCard">
                <el-input v-model="step02_Form03.IDCard" placeholder="请输入身份证号码" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况">
                <el-select v-model="step02_Form03.MarryInfo" placeholder="请选择婚姻状况" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option label="未婚" value="1"></el-option>
                    <el-option label="已婚" value="2"></el-option>
                    <el-option label="离异" value="3"></el-option>
                    <el-option label="丧偶" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="与申请人关系">
                <el-select v-model="step02_Form03.Relation" placeholder="请选择" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option label="子女" value="子女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="本市常住人口">
                <el-radio-group v-model="step02_Form03.IsPermanent" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="step02_Form03.Sex" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-form
            :inline="true"
            :model="step02_Form04"
            label-width="140px"
            class="step02-ruleForm rel"
            :rules="rules"
            ref="step02_Form04">
            <el-form-item label="4" class="abs"></el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="step02_Form04.Name" placeholder="请输入姓名" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="IDCard">
                <el-input v-model="step02_Form04.IDCard" placeholder="请输入身份证号码" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况">
                <el-select v-model="step02_Form04.MarryInfo" placeholder="请选择婚姻状况" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option label="未婚" value="1"></el-option>
                    <el-option label="已婚" value="2"></el-option>
                    <el-option label="离异" value="3"></el-option>
                    <el-option label="丧偶" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="与申请人关系">
                <el-select v-model="step02_Form04.Relation" placeholder="请选择" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option label="子女" value="子女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="本市常住人口">
                <el-radio-group v-model="step02_Form04.IsPermanent" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="step02_Form04.Sex" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <p class="marT20 marB20">注： 16周岁以下不持有居民身份证的共同申请人，身份证号码按《居民户口簿》内的身份证编号填写。</p>
        <div class="step02_btn_wrap tc padT10 padB20" v-show = "userInfo.State == 1001 || userInfo.State == 1002">
            <el-button @click="step02_prev()">上一步</el-button>
            <el-button type="primary" @click="step02_next('rules')">下一步</el-button>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getApplyFor,getApplyForInfo } from '../../api/api.js'
    import { getCookie,setCookie } from '../../util/index.js'
    export default{
        data(){
            var validateIDCard = (rule, value, callback) => {
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的身份证号'));
                } else {
                    callback();
                }
            };
            return{
                loading:false,
                //第二步
                step02_Form01:{
                    Name : '',
                    IDCard: '',
                    MarryInfo:'',
                    Relation:'',
                    IsPermanent:'',
                    Sex:''
                },
                step02_Form02:{
                    Name : '',
                    IDCard: '',
                    MarryInfo:'',
                    Relation:'',
                    IsPermanent:'',
                    Sex:''
                },
                step02_Form03:{
                    Name : '',
                    IDCard: '',
                    MarryInfo:'',
                    Relation:'',
                    IsPermanent:'',
                    Sex:''
                },
                step02_Form04:{
                    Name : '',
                    IDCard: '',
                    MarryInfo:'',
                    Relation:'',
                    IsPermanent:'',
                    Sex:''
                },
                residentlist:[],
                rules: {
                    IDCard: [{
                        validator: validateIDCard,
                        trigger: 'blur'
                    }],
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
                vm.$store.commit('SET_APPLYFORTAB',2)
            })
        },
        methods:{
            //第二步提交
            step02_prev(){
                this.loading =true;
                setTimeout(()=>{
                    this.loading = false;
                    this.$router.push({path:'/applyFor'})
                },2000)
            },
            step02_next(){
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(this.$route.query.id && this.$route.query.id ==2){
                    if(this.step02_Form01.Name == '' && this.step02_Form02.Name == '' && this.step02_Form03.Name == '' && this.step02_Form04.Name == ''){
                        this.$message.warning('您是已婚人士，请填写共同申请人')
                        return false
                    }
                }
                //1
                if(this.step02_Form01.IDCard != ''){
                    if(!reg.test(this.step02_Form01.IDCard)){
                        this.$message.warning('请输入正确的身份证号')
                        return false
                    }
                }
                //2
                if(this.step02_Form02.IDCard != ''){
                    if(!reg.test(this.step02_Form02.IDCard)){
                        this.$message.warning('请输入正确的身份证号')
                        return false
                    }
                }
                //3
                if(this.step02_Form03.IDCard != ''){
                    if(!reg.test(this.step02_Form03.IDCard)){
                        this.$message.warning('请输入正确的身份证号')
                        return false
                    }
                }
                //4
                if(this.step02_Form04.IDCard != ''){
                    if(!reg.test(this.step02_Form04.IDCard)){
                        this.$message.warning('请输入正确的身份证号')
                        return false
                    }
                }
                if(this.step02_Form01.Name != ''){
                    this.residentlist.push(this.step02_Form01)
                }
                if(this.step02_Form02.Name != ''){
                    this.residentlist.push(this.step02_Form02)
                }
                if(this.step02_Form03.Name != ''){
                    this.residentlist.push(this.step02_Form03)
                }
                if(this.step02_Form04.Name != ''){
                    this.residentlist.push(this.step02_Form04)
                }
                this.loading = true;
                var params = {
                    step : 2,
                    bill: {
                        SignType: '1',
                        code:this.$store.getters.applyForCode,
                        TelAddr:this.$store.getters.applyForData.bill.TelAddr,
                        PostCode:this.$store.getters.applyForData.bill.PostCode,
                    },
                    member:this.$store.getters.applyForData.member,
                    filelist:this.$store.getters.applyForData.filelist,
                    residentlist:this.residentlist,
                }
                var applyForData = {
                    bill:params.bill,
                    member:params.member,
                    filelist:params.filelist,
                    residentlist:params.residentlist,
                }
                getApplyFor(params).then(response => {
                    switch (response.StatusCode) {
                        case 200:
                            this.loading = false
                            this.$store.dispatch('SET_APPLYFORDATA',applyForData)
                            setCookie('applyForData',JSON.stringify(applyForData))
                            this.$router.push({path:'/applyFor/ThirdStep'})
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
                    this.$message.error(error)
                })
            },
            getApplyForInfoFunc(val){
                this.loading = true
                getApplyForInfo({Id:val}).then((response) =>{
                    var residentlist = JSON.parse(response.Data).residentlist
                    switch (response.StatusCode) {
                        case 200:
                        if(residentlist.length){
                            for(var i =0;i<residentlist.length;i++){
                                residentlist[i].Sex = residentlist[i].Sex==1? "1" : "0"
                                residentlist[i].IsPermanent = residentlist[i].IsPermanent  == 1?"1":"0"
                            }

                            if(residentlist.length==1){
                                this.step02_Form01= residentlist[0]
                            }else if(residentlist.length==2){
                                this.step02_Form01= residentlist[0]
                                this.step02_Form02= residentlist[1]
                            }else if(residentlist.length==3){
                                this.step02_Form01= residentlist[0]
                                this.step02_Form02= residentlist[1]
                                this.step02_Form03= residentlist[2]
                            }else{
                                this.step02_Form01= residentlist[0]
                                this.step02_Form02= residentlist[1]
                                this.step02_Form03= residentlist[2]
                                this.step02_Form04= residentlist[3]
                            }
                        }
                        this.loading = false;
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
            }
        },
        created(){
            if(this.$store.getters.applyForCode){
                this.getApplyForInfoFunc(this.$store.getters.applyForCode)
            }
        }
    }
</script>
<style lang="scss"></style>
