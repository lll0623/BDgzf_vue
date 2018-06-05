<template>
    <!-- 第一步 -->
    <div class="" v-show="applyForTab==1" v-loading="loading">
        <el-form
            :inline="true"
            :model="step01_Form"
            :rules="stepfir_rules"
            ref="step01_Form"
            label-width="140px"
            class="step01-ruleForm">
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="step01_Form.sex" :disabled = "userInfo.State != 1001 && userInfo.State != 1002" >
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="民族" prop="nation">
                <el-select v-model="step01_Form.nation" placeholder="请选择民族" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option v-for="(item,index) in nationLists" :key="item.name"  :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文化程度" prop="culture">
                <el-select v-model="step01_Form.culture" placeholder="请选择文化程度" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option v-for="(item,index) in cultureLists" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="marriage">
                <el-select v-model="step01_Form.marriage" placeholder="请选择婚姻状况" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-option label="未婚" value="1"></el-option>
                    <el-option label="已婚" value="2"></el-option>
                    <el-option label="离异" value="3"></el-option>
                    <el-option label="丧偶" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="户籍地址" prop="censusRegister">
                <el-input v-model="step01_Form.censusRegister" placeholder="户籍地址请按照户口薄或户籍证明上面的地址填写" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="fixTel">
                <el-input v-model="step01_Form.fixTel"  placeholder="请输入固定电话" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址" prop="telAddr">
                <el-input v-model="step01_Form.telAddr" maxLength="11" placeholder="请输入通讯地址" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="postcode">
                <el-input v-model="step01_Form.postcode" maxLength="11" placeholder="请输入邮编" clearable :disabled="userInfo.State != 1001 && userInfo.State != 1002"> </el-input>
            </el-form-item>
            <el-form-item label="社保信息" prop="socialInfo">
                <el-checkbox-group v-model="step01_Form.socialInfo" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-checkbox label="已缴纳社保金" name="socialInfo"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="连续缴金是否满一年" prop="isOneYear" label-width="160">
                <el-radio-group v-model="step01_Form.isOneYear" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
                <em class="fs12 red block">递送资料当月起前12个月连续缴纳，不得补交及暂停</em>
            </el-form-item>
            <el-form-item label="公积金信息" prop="localMoney">
                <el-checkbox-group v-model="step01_Form.localMoney" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-checkbox label="已缴纳本市公积金" name="localMoney"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="公积金账号" prop="localMoneyAccount">
                <el-input v-model="step01_Form.localMoneyAccount" placeholder="请输入公积金账号" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="居住证信息" prop="dwellInfo">
                <el-checkbox-group v-model="step01_Form.dwellInfo" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-checkbox label="已办理本市居住证" name="dwellInfo"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="居住证号码" prop="dwellCode">
                <el-input v-model="step01_Form.dwellCode" placeholder="请输入居住证号码,多个居住证用逗号隔开" clearable :disabled = "userInfo.State != 1001 && userInfo.State != 1002"></el-input>
            </el-form-item>
            <el-form-item label="居住证信息满两年" prop="isTwoYear" :label-width="formLabelWidth">
                <el-radio-group v-model="step01_Form.isTwoYear" :disabled = "userInfo.State != 1001 && userInfo.State != 1002">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="上传身份证" pro="IDCardImg">
                <el-upload class="upload-demo"
                    :class="{disabled:uploadDisabled}"
                    ref="upload"
                    action="/api/api/Common/UploadFiles"
                    :limit="2"
                    list-type="picture-card"
                    :on-remove="handleRemove"
                    :file-list="step01_Form.IDCardImg"
                    :before-upload="beforeAvatarUpload"
                    :data="uploadIDCardImg"
                    :headers="headersData"
                    :on-success="uploadIDCardImgSuccess"
                    :disabled = "userInfo.State != 1001 && userInfo.State != 1002"
                    >
                    <i class="el-icon-plus"></i>

                    <div slot="tip" class="fs12 red">身份证必须上传正反面（2张），只能上传jpg/png文件，且不超过200kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传居住证" pro="dwellImg">
                <el-upload class="upload-demo"
                    :class="{disabled:uploadDisabled2}"
                    ref="upload"
                    action="/api/api/Common/UploadFiles"
                    list-type="picture-card"
                    :on-remove="handleRemove"
                    :file-list="step01_Form.dwellImg"
                    :before-upload="beforeAvatarUpload"
                    :headers="headersData"
                    :data="uploadIDCardImg"
                    :on-success="uploadDwellImgSuccess"
                    :disabled = "userInfo.State != 1001 && userInfo.State != 1002"
                    >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="fs12 red">注：《上海市居住证》持证年限包括之前持有《上海市临时居住证》年限（正反面），只能上传jpg/png文件，且不超过200kb</div>
                </el-upload>
            </el-form-item>
            <!-- 下一步 -->
            <el-form-item pro=agree v-show="userInfo.State ==1001 || userInfo.State==1002">
                <el-checkbox-group v-model="step01_Form.agree">
                    <el-checkbox label=""></el-checkbox>
                </el-checkbox-group>
                <span>我已了解并同意<a href="javascript:;" @click="serverDialogVisible=true">《申请须知》</a></span>
                <el-button type="primary" @click="nextStep_fir('step01_Form')">下一步</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="关于住房保障信用管理的告知"
            :visible.sync="dialogVisible"
            width="40%"
            >
            <div class="defined_dialog_content">
                <h4 class="tc c-3 marB20">关于住房保障信用管理的告知</h4>
                <p style="text-indent:2em;">为形成住房保障“一处失信”、相关领域“处处制约”的信用管理环境,依据《加强本市住房保障信用体系建设实施意见(试行)》(沪建保障[201611214号)的要求,违反诚信承诺相关规定,经住房保障机构査实存在失信行为的,将记录失信对象不良信用信息,并按照实施意见相关要求作出处理。</p>
                <p class="marT10" style="text-indent:2em;">特此告知</p>
                <p class="tr marT10">上海市浦东新区公共租赁住房投资运营有限公司</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="nextStep_fir_submit()">我知道了</el-button>
            </span>
        </el-dialog>
        <!-- 申请须知 -->
        <el-dialog
            title="服务条款"
            :visible.sync="serverDialogVisible"
            width="60%"
            >
            <div class="defined_server_content">
                <h4 class="bold c-3 marB10">根据《浦东新区公共租赁住房供应管理实施细则》浦府【2014】9号文件：</h4>
                <h4 class="bold c-3 marB10">公租房申请条件：</h4>
                <p>1. 具有本市常住户口，且与在浦东新区注册的单位签订一年以上（含一年）劳动合同；</p>
                <p>2. 持有《上海市居住证》达到二年以上，在沪连续缴纳社会保险金达到一年以上，且与在浦东新区注册的单位签订一年以上（含一年）劳动合同；</p>
                <p>3. 申请浦东新区公共租赁住房的单身申请人或申请家庭全体成员应当同时符合以下条件：</p>
                <p>1） 在本市人均住房建筑面积低于15平方米</p>
                <p>2） 未享受本市廉租房、共有产权保障住房政策</p>
                <p class="marB30">4. 陆家嘴金融贸易区（筹）、金桥经济技术开发区、张江高科技园区、中国（上海）自由贸易试验区、临港地区、国际旅游度假区等开发园区或区域内的青年职工、引进人才和来沪务工人员应当向所在园区内的公共租赁住房运营机构申请公共租赁住房（含单位租赁房）。</p>
                <h4 class="bold c-3 marB10">公租房申请所需材料：</h4>
                <p>1. 公租房准入资格申请表；（含单位初审意见，并盖公章）</p>
                <p>2. 单身申请人（申请家庭成员）的身份证复印件及原件；（身份证正反面复印在一页纸，一人一页）</p>
                <p>3. 单身申请人（申请家庭成员）的本市户籍证明复印件和原件；（本市户籍证明复印件复印至原件空白页）</p>
                <p>4. 《上海市居住证》复印件和所属派出所办理的收件收据；（仅限非本市户籍人员）</p>
                <p>5. 申请家庭成员的婚姻状态证明复印件及原件；（包括结婚证、离婚证、离婚判决书、离婚协议书、单身证明；其中单身证明须有申请人所在户籍地民政部门出具）</p>
                <p>6. 单身申请人（申请家庭成员）拥有本市产权住房的《房地产权证》复印件，承租本市共有住房的《租用居住公房凭证》。其中本市户籍人员，还需提供户籍地住房的相关证明材料；（出示原件）</p>
                <p>7. 持有《上海市居住证》的单身申请人（申请家庭主申请人）的社会保险缴纳证明；</p>
                <p>8. 单身申请人（申请家庭主申请人）的劳动合同（出示原件）</p>
                <p class="marB30">9. 本单位营业执照复印件（加盖公司公章）；若由于公司经营性质无营业执照，用组织机构代码证代替（加盖公司公章），所盖公章须与劳动合同上的公章一致。</p>
                <h5 class="red fs14">1. 以上所需申请材料皆可原件扫描后，作为附件上传，进行网上申请。</h5>
                <h5 class="red fs14">2. 请您详细阅读本申请说明书，本说明书最终解释权归上海市浦东新区公共租赁住房投资运营有限公司所有。</h5>
                <h5 class="red fs14">3. 如有疑问可前往上海市浦东新区公共租赁住房受理中心进行现场咨询和受理，（地址：浦东新区浦三路930弄1号，日常接待时间周一、周三至周六，上午9：00至16:00）或拨打电话021-68389100进行咨询。</h5>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { nationLists,cultureLists } from '../../../static/dataJson/dataJson'
    import { generateMixed } from '../../util'
    import { getApplyFor,getApplyForInfo } from '../../api/api.js'
    export default{
        data(){
            var validateTel = (rule, value, callback) => {
                let regPhoneNum = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
                if (value === '') {
                    callback(new Error('请输入固定电话'));
                }else if (!regPhoneNum.test(value)) {
                    callback(new Error('请输入正确格式的固定电话'));
                  } else {
                    callback();
                  }
            };
            return{
                uploadDisabled:false,
                uploadDisabled2:false,
                loading:false,
                //民族josn数据
                nationLists,
                //文化程度josn数据
                cultureLists,
                //第一步
                formLabelWidth:'140px',
                step01_Form: {
                    sex : '1',//性别
                    nation : '',//民族
                    culture:'',//文化程度
                    marriage:'',//婚姻状况
                    censusRegister:'',//户籍地址
                    fixTel:'',//固定电话
                    telAddr:'',//通讯地址
                    postcode:'',//邮编
                    socialInfo:[],//社保信息
                    isOneYear:'',//连续缴金是否满一年
                    localMoney:[],//公积金信息
                    localMoneyAccount:'',//公积金账号
                    dwellInfo:[],//居住证信息
                    dwellCode:'',//居住证号码
                    isTwoYear:'',//居住证信息满两年
                    IDCardImg:[],//身份证正反面
                    dwellImg:[],//居住证正反面
                    agree:'',//同意协议
                },
                uploadImg_all : [],
                //表单验证
                stepfir_rules : {
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    nation: [
                        { required: true, message: '请选择民族', trigger: 'change' }
                    ],
                    culture: [
                        { required: true, message: '请选择文化程度', trigger: 'change' }
                    ],
                    marriage: [
                        { required: true, message: '请选择婚姻状况', trigger: 'change' }
                    ],
                    censusRegister:[
                        { required: true, message: '请输入户籍地址', trigger: 'blur' },
                    ],
                    fixTel:[
                        { required: true,validator: validateTel, trigger: 'blur' },
                    ],
                    telAddr:[
                        { required: true, message: '请输入通讯地址', trigger: 'blur' },
                    ],
                    // socialInfo:[
                    //     { type: 'array',required: true, message: '请选择社保信息', trigger: 'change' }
                    // ],
                    // isOneYear:[
                    //     { required: true, message: '连续缴金是否满一年', trigger: 'change' }
                    // ],
                    // localMoney:[
                    //     { type: 'array',required: true, message: '是否已缴纳本市公积金', trigger: 'change' }
                    // ],
                    // localMoneyAccount:[
                    //     { required: true, message: '请输入公积金账号', trigger: 'blur' }
                    // ],
                    // dwellInfo:[
                    //     { type: 'array',required: true, message: '是否已办理本市居住证', trigger: 'change' }
                    // ],
                    // dwellCode:[
                    //     { required: true, message: '请输入公积金账号', trigger: 'blur' }
                    // ],
                    // isTwoYear:[
                    //     { required: true, message: '请选择居住证信息', trigger: 'change' }
                    // ],
                },
                dialogVisible:false,
                serverDialogVisible:false,
            }
        },
        computed:{
            ...mapGetters(['applyForTab','userInfo']),
            uploadIDCardImg(){
                return {
                    'IsZip' : '0',
                    'FileType' : '1'
                }
            },
            headersData(){
                return {
                    'token' : this.$store.state.userInfo.token.Token,
                    'timestamp':  generateMixed(32),
                    'nonce' : generateMixed(32),
                    'signature':  generateMixed(32)
                }
            },
            getApplyForCode(){
                return this.$store.getters.applyForCode
            },
        },
        watch:{
            getApplyForCode:function(val){
                this.getApplyForInfoFunc(val)
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_APPLYFORTAB',1)
            })
        },

        methods:{
            handleRemove(file, fileList) {

                this.step01_Form.IDCardImg = this.step01_Form.IDCardImg.filter(u => file.Id != u.Id)
                this.step01_Form.dwellImg = this.step01_Form.dwellImg.filter(u => file.Id != u.Id)
                if(this.step01_Form.IDCardImg.length <2){
                    this.uploadDisabled = false
                }
            },
            beforeAvatarUpload(file){

                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt200KB = file.size / 1024 < 200;
                if (!isJPG && !isPNG) {

                    this.$message.error('上传图片只能是 JPG 格式或者PNG格式!');
                }
                if (!isLt200KB) {
                    this.$message.error('上传图片大小不能超过 200KB!');
                }
                return ((isJPG&&!isPNG) || (!isJPG&&isPNG))&& isLt200KB;
            },
            uploadIDCardImgSuccess(file, fileList){//身份证上传成功之后
                if(this.step01_Form.IDCardImg.length == 0){
                    file.Data[0].FileName = '身份证正面'
                }else{
                    if(this.step01_Form.IDCardImg.length == 1){
                        if(this.step01_Form.IDCardImg[0].FileName == '身份证正面'){
                            file.Data[0].FileName = '身份证反面'
                        }else{
                            file.Data[0].FileName = '身份证正面'
                        }
                    }
                }
                for(var i =0;i<file.Data.length;i++){
                    file.Data[i].FileType = 1
                    file.Data[i].uid = fileList.uid
                    file.Data[i].url = fileList.url
                }
                this.step01_Form.IDCardImg.push(file.Data[0])
                if(this.step01_Form.IDCardImg.length >=2){
                    this.uploadDisabled = true
                }
            },
            uploadDwellImgSuccess(file,fileList){
                file.Data[0].FileName = '居住证'
                for(var i =0;i<file.Data.length;i++){
                    file.Data[i].FileType = 1
                    file.Data[i].uid = fileList.uid
                    file.Data[i].url = fileList.url
                }
                this.step01_Form.dwellImg.push(file.Data[0])
            },
            //第一步提交
            nextStep_fir(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(!this.step01_Form.agree){
                            this.$message.error('必须先同意申请须知')
                        }else{
                            //新增判断条件
                            if((this.step01_Form.socialInfo.length == 0&&this.step01_Form.isOneYear != '') || (this.step01_Form.socialInfo.length != 0 && this.step01_Form.isOneYear == '')){
                                this.$message.error('请完善社保信息')
                                return false
                            }
                            if((this.step01_Form.localMoney.length == 0&&this.step01_Form.localMoneyAccount!= '') || (this.step01_Form.localMoney.length != 0 && this.step01_Form.localMoneyAccount == '')){
                                this.$message.error('请完善公积金信息')
                                return false
                            }
                            if((this.step01_Form.dwellCode != ''&& this.step01_Form.isTwoYear =='' && this.step01_Form.dwellInfo.length == 0) || (this.step01_Form.dwellCode == ''&& this.step01_Form.isTwoYear !='' && this.step01_Form.dwellInfo.length == 0)){
                                this.$message.error('请完善居住证信息')
                                return false
                            }else if(this.step01_Form.dwellCode == ''&& this.step01_Form.isTwoYear =='' && this.step01_Form.dwellInfo.length != 0){
                                this.$message.error('请完善居住证信息')
                                return false
                            }else if(this.step01_Form.dwellCode != ''&& this.step01_Form.isTwoYear =='' && this.step01_Form.dwellInfo.length != 0){
                                this.$message.error('请完善居住证信息')
                                return false
                            }else if(this.step01_Form.dwellCode == ''&& this.step01_Form.isTwoYear !='' && this.step01_Form.dwellInfo.length != 0){
                                this.$message.error('请完善居住证信息')
                                return false
                            }else if(this.step01_Form.dwellCode != ''&& this.step01_Form.isTwoYear !='' && this.step01_Form.dwellInfo.length == 0){
                                this.$message.error('请完善居住证信息')
                                return false
                            }
                            if(this.step01_Form.IDCardImg.length<2){
                                this.$message.error('请上传身份证的正反两张！')
                                return false
                            }
                            if(this.step01_Form.dwellImg.length%2!=0){
                                this.$message.error('请上传居住证！')
                                return false
                            }
                            this.dialogVisible = true
                        }
                    } else {
                        this.$message.error('表单请填写完整！！！');
                        return false;
                    }
                });
            },
            nextStep_fir_submit(){
                this.dialogVisible = false
                this.uploadImg_all = this.step01_Form.IDCardImg.concat(this.step01_Form.dwellImg)
                for(var i =0;i<this.uploadImg_all.length;i++){
                    this.uploadImg_all[i].Sort = i
                }

                this.loading = true;
                //请求第一步接口
                var params = {
                    step : 1,
                    bill: {
                        SignType: '1',
                        code:this.$store.getters.applyForCode || '',
                        TelAddr:this.step01_Form.telAddr,
                        PostCode:this.step01_Form.postcode,
                    },
                    member:{
                        Id : this.$store.getters.userInfoForm.Id,
                        IDCard:this.$store.getters.userInfoForm.IDCard,
                        Name: this.$store.getters.userInfoForm.Name,
                        Sex: this.step01_Form.sex,
                        MarryInfo: this.step01_Form.marriage,
                        PhoneNum: this.step01_Form.fixTel,
                        Cultural:this.step01_Form.culture,
                        HouseholdAddress: this.step01_Form.censusRegister,
                        HouseholdPostalCode: this.step01_Form.postcode,
                        HasSocialSecurityFund: this.step01_Form.socialInfo = this.step01_Form.socialInfo.length==0?0:1,
                        SocialSecurityFullYear:this.step01_Form.isOneYear,
                        HasProvidentFund: this.step01_Form.localMoney = this.step01_Form.length==0?0:1,
                        ProvidentFundCard: this.step01_Form.localMoneyAccount,
                        HasLiveCard: this.step01_Form.dwellInfo = this.step01_Form.length==0?0:1,
                        Nation: this.step01_Form.nation,
                        LiveCard: this.step01_Form.dwellCode,
                        LiveCardFull2Year: this.step01_Form.isTwoYear,
                        Phone:this.$store.getters.userInfoForm.Phone,

                    },
                    filelist:this.uploadImg_all
                }
                var applyForData = {
                    member:params.member,
                    filelist:params.filelist
                }
                getApplyFor(params).then(response => {
                    switch (response.StatusCode) {
                        case 200:
                            this.loading = false;
                            this.$store.dispatch('SET_APPLYFORCODE',response.Data)
                            this.$store.dispatch('SET_APPLYFORDATA',applyForData)
                            this.$cookie.set('applyForData',JSON.stringify(applyForData))
                            if(this.step01_Form.marriage == 2){
                                this.$router.push({name:'共同申请人',query:{id:this.step01_Form.marriage}})
                            }else{
                                this.$router.push({path:'/applyFor/secondStep'})
                            }
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

                        if(response.StatusCode == 200) {
                            const member = JSON.parse(response.Data).member
                            const filelist = JSON.parse(response.Data).filelist
                            const bill = JSON.parse(response.Data).bill
                            for(var i =0;i<filelist.length;i++){
                                filelist[i].url = filelist[i]['FileUrl']
                            }
                            var dwellImg = filelist.slice(2)
                            this.step01_Form = {
                                sex: member.Sex== 1 ? '1':"0",
                                nation: member.Nation,
                                culture: member.Cultural,
                                marriage: member.MarryInfo,
                                censusRegister:member.HouseholdAddress,
                                fixTel:member.PhoneNum,
                                Phone:member.Phone,
                                telAddr:bill.Address,
                                postcode:bill.PostalCode,
                                socialInfo:member.HasSocialSecurityFund == 1?['已缴纳社保金']:[],
                                isOneYear:member.SocialSecurityFullYear == 1? '1':"0",
                                localMoney:member.HasProvidentFund == 1?['已缴纳本市公积金']:[],
                                localMoneyAccount:member.ProvidentFundCard,
                                dwellInfo:member.HasLiveCard == 1?['已办理本市居住证']:[],
                                dwellCode:member.LiveCard,
                                isTwoYear:member.LiveCardFull2Year == 1 ? '1':"0",
                                IDCardImg:[filelist[0],filelist[1]],
                                dwellImg:dwellImg,
                                agree:""
                            }

                            this.loading = false
                            //身份证按钮
                            this.uploadDisabled = true
                            if(this.$store.getters.userInfo.State>=1003){
                                this.uploadDisabled2 = true
                            }
                        }else if(response.StatusCode == 403){
                            this.$message.error(response.Info)
                        }else{
                            this.$message.error('提交申请数据请求失败'+response.Info)
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
<style lang="scss">
    .disabled .el-upload--picture-card {
        display: none;
    }
    .applyFor-wapper .applyFor-content ul.el-upload-list{
        display: inline-block;
        background: #fff;
    }
    .applyFor-wapper .applyFor-content ul.el-upload-list:after{
        visibility:hidden;
    	display:block;
    	height:0;
    	font-size:0;
    	content:"";
    	clear:both;
    }
</style>
