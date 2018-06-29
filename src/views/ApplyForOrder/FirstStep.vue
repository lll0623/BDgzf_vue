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
                <el-radio-group v-model="step01_Form.sex" :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1" >
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="民族" prop="nation">
                <el-select v-model="step01_Form.nation" placeholder="请选择民族" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                    <el-option v-for="(item,index) in nationLists" :key="item.name"  :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文化程度" prop="culture">
                <el-select v-model="step01_Form.culture" placeholder="请选择文化程度" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                    <el-option v-for="(item,index) in cultureLists" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="marriage">
                <el-select v-model="step01_Form.marriage" placeholder="请选择婚姻状况" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                    <el-option label="未婚" value="1"></el-option>
                    <el-option label="已婚" value="2"></el-option>
                    <el-option label="离异" value="3"></el-option>
                    <el-option label="丧偶" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="户籍地址" prop="censusRegister">
                <el-input v-model="step01_Form.censusRegister" maxLength="50" placeholder="户籍地址请按照户口薄或户籍证明上面的地址填写" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="fixTel">
                <el-input v-model="step01_Form.fixTel"  placeholder="请输入固定电话" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址" prop="telAddr">
                <el-input v-model="step01_Form.telAddr" maxLength="50" placeholder="请输入通讯地址" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="postcode">
                <el-input v-model="step01_Form.postcode" maxLength="11" placeholder="请输入邮编" clearable :disabled="userInfo.State != 1001 && userInfo.State != 1002"> </el-input>
            </el-form-item>
            <el-form-item label="社保信息" prop="socialInfo">
                <el-checkbox-group v-model="step01_Form.socialInfo" :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                    <el-checkbox label="已缴纳社保金" name="socialInfo"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="连续缴金是否满一年" prop="isOneYear" label-width="160">
                <el-radio-group v-model="step01_Form.isOneYear" :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1" @change="isOneYearChange">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
                <em class="fs12 red block">递送资料当月起前12个月连续缴纳，不得补交及暂停</em>
            </el-form-item>
            <el-form-item label="公积金信息" prop="localMoney">
                <el-checkbox-group v-model="step01_Form.localMoney" :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                    <el-checkbox label="已缴纳本市公积金" name="localMoney"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="公积金账号" prop="localMoneyAccount">
                <el-input v-model="step01_Form.localMoneyAccount" placeholder="请输入公积金账号" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1" @keyup.native="localMoneyAccountChange"></el-input>
            </el-form-item>
            <el-form-item label="居住证信息" prop="dwellInfo">
                <el-checkbox-group v-model="step01_Form.dwellInfo" :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                    <el-checkbox label="已办理本市居住证" name="dwellInfo"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="居住证号码" prop="dwellCode">
                <el-input v-model="step01_Form.dwellCode" placeholder="请输入居住证号码,多个居住证用逗号隔开" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1" @keyup.native="dwellCodeChange"></el-input>
            </el-form-item>
            <el-form-item label="居住证信息满两年" prop="isTwoYear" :label-width="formLabelWidth">
                <el-radio-group v-model="step01_Form.isTwoYear" :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1" @change="isisTwoYearChange">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="上传身份证" pro="IDCardImg">
                <el-upload class="upload-demo"
                    :class="{disabled:uploadDisabled}"
                    ref="upload"
                    action="http://112.124.110.11:8044/api/Common/UploadFiles"
                    :limit="2"
                    list-type="picture-card"
                    :on-remove="handleRemove"
                    :file-list="step01_Form.IDCardImg"
                    :before-upload="beforeAvatarUpload"
                    :data="uploadIDCardImg"
                    :headers="headersData"
                    :on-success="uploadIDCardImgSuccess"
                    :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"
                    >
                    <i class="el-icon-plus"></i>

                    <div slot="tip" class="fs12 red">身份证必须上传正反面（2张），只能上传jpg/png文件，且不超过200kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传居住证" pro="dwellImg">
                <el-upload class="upload-demo"
                    :class="{disabled:uploadDisabled2}"
                    ref="upload"
                    action="http://112.124.110.11:8044/api/Common/UploadFiles"
                    list-type="picture-card"
                    :on-remove="handleRemove"
                    :file-list="step01_Form.dwellImg"
                    :before-upload="beforeAvatarUpload"
                    :headers="headersData"
                    :data="uploadIDCardImg"
                    :on-success="uploadDwellImgSuccess"
                    :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"
                    >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="fs12 red">注：《上海市居住证》持证年限包括之前持有《上海市临时居住证》年限（正反面），只能上传jpg/png文件，且不超过200kb</div>
                </el-upload>
            </el-form-item>
            <!-- 下一步 -->
            <el-form-item pro= 'agree' v-show="(userInfo.State ==1001 || userInfo.State==1002) && isUserEnter !=1">
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
            title="浦东新区公共租赁住房申请须知"
            :visible.sync="serverDialogVisible"
            width="60%"
            >
            <div class="defined_server_content">
                <h4 class="bold c-3 marB10">《须知》以《浦府<2014>9号文》为依据，未尽事宜，按市、区公租房相关文件执行：</h4>
                <h4 class="bold c-3 marB10">一、申请地点、接待时间：</h4>
                <p>我司受理中心试行一周七天工作制，每周二、日仅受理材料递交、政策咨询、材料申领业务，合同签订及收费工作等请在每周一、三、四、五、六前来办理。请广大申请人、租户予以配合，感谢大家长期以来的支持。</p>
                <p class="marB20">受理中心工作时间：9:00-11:30  13:00-16:00（国定假日除外）</p>

                <h4 class="bold c-3 marB10">二、在线网站申请、申请接待电话：</h4>
                <p>http://webzf.pdgzf.com</p>
                <p>咨询热线：021-68389100</p>
                <p class='marB20'>投诉热线：021-50591069</p>

                <h4 class="bold c-3 marB10">三、供应对象：</h4>
                <p class="marB20">浦东新区公共租赁房供应对象为本区青年职工、引进人才和来沪务工人员（浦东新区开发园区或区域除外），及其他常住户籍人口。</p>

                <h4 class="bold c-3 marB10">四、申请方式：</h4>
                <p>1、单身申请人（申请家庭）可以到受理中心提出申请，集中办理登记、初审等工作</p>
                <p>2、初审合格后，由浦东新区住宅发展和保障中心核查住房状况并出具核查结果报告。通过审核后，由浦东新区公共租赁住房投资运营有限公司出具浦东新区公共租赁住房准入资格确认书。</p>
                <p>3、单身申请人（申请家庭）凭准入资格确认书及相关材料到受理中心办理轮候、选房、签约、登记入住等相关手续。</p>
                <p>4、单身申请人限申请一居室；申请家庭可申请一居室或二居室。</p>
                <p class='marB20'>5、我司实行网上选房，获得准入的申请人在网上业务平台选取意向房源后可签约入住。</p>
                <h4 class="bold c-3 marB10">五、申请条件：</h4>
                <p>1、具有本市常住户口，且与在浦东新区注册的单位签订一年以上（含一年）劳动合同；</p>
                <p>2、持有《上海市居住证》达到二年以上，在沪连续缴纳社会保险金达到一年以上，且与在浦东新区注册的单位签订一年以上（含一年）劳动合同；</p>
                <p class='marB20'>3、持有《上海市居住证》，但未满二年，在沪缴纳社会保险金，与在浦东新区注册的单位签订二年以上（含二年）劳动合同，且单位同意由单位承租公共租赁住房的。</p>
                <h4 class="bold c-3 marB10">申请浦东新区公共租赁住房的单身申请人或申请家庭全体成员应当同时符合以下条件：</h4>
                <h5 class="red fs14">1）在本市人均住房建筑面积低于15平方米；</h5>
                <h5 class="red fs14 marB20">2）未享受本市廉租住房、经济适用房、共有产权保障住房政策。</h5>
                <h4 class="bold c-3 marB10">六、提交材料：</h4>
                <p>单身申请人（申请家庭）应当如实填报申请表，作出书面诚信承诺，并提交以下申请材料：</p>
                <p>1、公共租赁房准入资格申请表（含单位初审意见：负责人签字、单位盖公章），如是网上下载的A4版本，需加盖骑缝章；（表格中单位名称、地址需根据营业执照信息填写）</p>
                <p>2、单身申请人（申请家庭成员）的身份证复印件（正反面复印在一张纸上）及原件；</p>
                <p>3、单身申请人（申请家庭成员）的本市户籍证明原件；本市户口本复印件（复印至空白页）及原件，或《上海市居住证》复印件（正反面复印在一张纸上）；</p>
                <p>4、申请家庭成员的婚姻状态证明复印件及原件；（夫妻双方结婚证/离婚的需提供离婚证、协议书或法院判决书证明/单身承诺书）</p>
                <p>5、单身申请人（申请家庭成员）拥有本市产权住房的《房地产权证》复印件（出示原件），承租本市公有住房的《租用居住公房凭证》复印件（出示原件）。其中本市户籍人员，还需提供户籍地住房的相关证明材料（出示原件）；</p>
                <p>6、单身申请人（申请家庭主申请人）的社会保险正常缴纳近一年（自申请之日向前追溯连续缴纳12个月）证明（以社保中心、街道事务中心机器打印为准）；</p>
                <p>7、单身申请人（申请家庭主申请人）的劳动合同复印件（出示原件）；</p>
                <p>8、如有未成年子女的申请人，必须提供未成年出生证明复印件（出示原件）；（子女户口页）</p>
                <p class="marB20">9、其他相关材料；</p>
                <h4 class="bold red marB10" style="text-indent:2em;">个人申请需提供或单位集体申请需提交以下申请材料:</h4>
                <p class="red">1、本单位营业执照复印件；</p>
                <p class="red">2、本单位组织机构代码证复印件；（仅限无营业执照的机构）</p>
                <p class="red">3、本单位税务登记证复印件；</p>
                <p class="red">4、换新证本单位提供三证合一复印件；</p>
                <p class="red marB20">以上材料必须加盖本单位公章。</p>
                <h4 class="bold c-3 marB10">七、住房面积的计算：</h4>
                <p>申请人人均住房建筑面积按以下办法计算：</p>
                <p>（一）单身申请人或者申请家庭全体成员均为本市常住户籍人员的，参照《上海市共有产权保障（经济适用住房）申请对象住房面积核查办法》的相关规定核定人均住房建筑面积。</p>
                <p>（二）单身申请人或者申请家庭任一成员为非本市户籍人员的，根据单身申请人或者申请家庭成员在本市拥有产权住房、承租公有住房的情况核定人均住房建筑面积。核定方式为：在本市拥有产权住房的，按照《房地产权证》记载建筑面积以及该处房屋常住人口分摊计算建筑面积；承租公有住房并持有《租用居住公房凭证》的，按该处住房内常住人口数分摊计算面积；在此基础上，核定单身申请人或者申请家庭成员的人均住房建筑面积。</p>
                <p class="marB20">（三）最终住房面积核查结果以市住房保障部门的系统审核结果为准。</p>
                <h4 class="bold c-3 marB10">八、房源供应情况：</h4>
                <p class="marB20"> 房源详情请登陆浦东新区公租房公司网址查询。</p>
                <h4 class="bold c-3 marB10">九、申请人隐瞒虚报的处理：</h4>
                <p class="marB20"> 申请人（申请家庭）弄虚作假，隐瞒本人、家庭人口、住房等状况或伪造相关证明申请公共租赁住房的，除取消申请人已取得的申请资格外，区公租房运营机构应当向区住保中心通告，由区住保中心按照以下规定对单身申请人(申请家庭主申请人）予以处理：在适当范围公开通报其隐瞒虚报行为；记录其不良信用信息，并按规定纳入上海市个人信用联合征信系统，供有关社会主体依法查询使用；取消其五年内再次申请本市各类保障性住房的资格；涉嫌犯罪的，移送司法机关处理。</p>
                <h4 class="bold c-3 marB10">十、申请单位隐瞒虚报的处理：</h4>
                <p class="marB20"> 申请单位或居住使用人弄虚作假，隐瞒事实、提供虚假证明材料等方式骗租公共租赁住房的，除取消该申请单位已取得的申请资格外，区公租房运营机构应当向区住保中心通告，由区主保中心按照以下规定对申请单位予以处理：在适当范围公开通报其隐瞒虚报行为；记录其不良信用信息，供有关社会主体依法查询使用；取消其再次申请本区公共租赁住房的资格；涉嫌犯罪的，移送司法机关处理。</p>
                <h4 class="bold c-3 marB10">十一、出具虚假证明的主体的处理：</h4>
                <p class="marB20"> 个人或单位为他人申请公共租赁住房出具虚假证明材料的，按规定记录个人或者单位的不良信用信息，并按规定纳入上海市个人或者企业信用联合征信系统，供有关社会主体依法查询使用；向税务、工商等部门通报出具虚假证明材料的单位，建议相关部门及时检查该单位的劳动工资，财务管理等情况；涉嫌犯罪的，移送司法机关处理。</p>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { nationLists,cultureLists } from '../../../static/dataJson/dataJson'
    import { generateMixed,setCookie,getCookie } from '../../util'
    import { getApplyFor,getApplyForInfo } from '../../api/api.js'
    export default{
        data(){
            var validateTel = (rule, value, callback) => {
                let regPhoneNum = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
                // if (value === '') {
                    // callback(new Error('请输入固定电话'));
                // }else
                if (!regPhoneNum.test(value) && (value != '' && value != null)) {
                    debugger
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
                        {validator: validateTel, trigger: 'blur' },
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
            ...mapGetters(['applyForTab','userInfo','isUserEnter']),
            uploadIDCardImg(){
                return {
                    'IsZip' : '0',
                    'FileType' : '1'
                }
            },
            headersData(){
                return {
                    'token' : this.$store.state.userInfo.Token,
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
                if(val != ''){
                    this.getApplyForInfoFunc(val)
                }
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_APPLYFORTAB',1)
            })
        },

        methods:{
            //连续缴金是否满一年联动
            isOneYearChange(){
                this.step01_Form.socialInfo = ['已缴纳社保金']
            },
            //输入公积金联动
            localMoneyAccountChange(){
                if(this.step01_Form.localMoneyAccount != ''){
                    this.step01_Form.localMoney = ['已缴纳本市公积金']
                }
                else{
                    this.step01_Form.localMoney = []
                }
            },
            //居住证信息联动
            dwellCodeChange(){
                if(this.step01_Form.dwellCode != ''){
                    this.step01_Form.dwellInfo = ['已办理本市居住证']
                    if(this.step01_Form.isTwoYear == '1'){
                        this.step01_Form.isTwoYear = '1'
                    }else{
                        this.step01_Form.isTwoYear = '0'
                    }

                }else{
                    this.step01_Form.dwellInfo = ['']
                    this.step01_Form.isTwoYear = ''
                }
            },
            isisTwoYearChange(){
                this.step01_Form.dwellInfo = ['已办理本市居住证']
            },
            handleRemove(file, fileList) {
                this.step01_Form.IDCardImg = this.step01_Form.IDCardImg.filter(u => file.uid != u.uid)
                this.step01_Form.dwellImg = this.step01_Form.dwellImg.filter(u => file.uid != u.uid)
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
                            //新增判断条件
                            if((this.step01_Form.socialInfo.length == 0&&(this.step01_Form.isOneYear != '' && this.step01_Form.isOneYear != 0)) || (this.step01_Form.socialInfo.length != 0 && (this.step01_Form.isOneYear == ''))){
                                this.$message.error('请完善社保信息')
                                return false
                            }
                            if((this.step01_Form.localMoney.length == 0&&(this.step01_Form.localMoneyAccount!= '' && this.step01_Form.localMoneyAccount != null)) || (this.step01_Form.localMoney.length != 0 && (this.step01_Form.localMoneyAccount == '' || this.step01_Form.localMoneyAccount == null))){
                                this.$message.error('请完善公积金信息')
                                return false
                            }
                            if(this.step01_Form.censusRegister != '' && this.step01_Form.censusRegister.indexOf('上海') == -1){
                                if(this.step01_Form.dwellCode == '' || this.step01_Form.isTwoYear =='' || this.step01_Form.dwellInfo.length == 0){
                                    this.$message.error('请完善居住证信息')
                                   return false
                                }
                            }
                            // if((this.step01_Form.dwellCode != ''&& this.step01_Form.isTwoYear =='' && this.step01_Form.dwellInfo.length == 0) || (this.step01_Form.dwellCode == ''&& this.step01_Form.isTwoYear !='' && this.step01_Form.dwellInfo.length == 0)){
                            //     this.$message.error('请完善居住证信息')
                            //     return false
                            // }else if(this.step01_Form.dwellCode == ''&& this.step01_Form.isTwoYear =='' && this.step01_Form.dwellInfo.length != 0){
                            //     this.$message.error('请完善居住证信息')
                            //     return false
                            // }else if(this.step01_Form.dwellCode != ''&& this.step01_Form.isTwoYear =='' && this.step01_Form.dwellInfo.length != 0){
                            //     this.$message.error('请完善居住证信息')
                            //     return false
                            // }else if(this.step01_Form.dwellCode == ''&& this.step01_Form.isTwoYear !='' && this.step01_Form.dwellInfo.length != 0){
                            //     this.$message.error('请完善居住证信息')
                            //     return false
                            // }else if(this.step01_Form.dwellCode != ''&& this.step01_Form.isTwoYear !='' && this.step01_Form.dwellInfo.length == 0){
                            //     this.$message.error('请完善居住证信息')
                            //     return false
                            // }
                            if(this.step01_Form.IDCardImg.length<2){
                                this.$message.error('请上传身份证的正反两张！')
                                return false
                            }
                            if(this.step01_Form.dwellImg.length%2!=0 || (this.step01_Form.censusRegister != '' && this.step01_Form.censusRegister.indexOf('上海') == -1 && this.step01_Form.dwellImg.length == 0)){
                                this.$message.error('请上传居住证！')
                                return false
                            }
                            if(!this.step01_Form.agree){
                                this.$message.error('请了解并同意申请须知')
                                return false
                            }
                            this.dialogVisible = true

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
                        SignType: (this.step01_Form.isOneYear == 1 || this.step01_Form.censusRegister.indexOf('上海') != -1) ? '2' : '1',//按单位默认单位 （1单位，2个人）（1、上海户籍  2、居住证卡面上到申请之日已满2年，社保从申请当月倒推连续满12个月（补缴不算））,
                        code:this.$store.getters.applyForCode || '',
                        TelAddr:this.step01_Form.telAddr,
                        PostCode:this.step01_Form.postcode,
                    },
                    member:{
                        AccountId : this.$store.getters.userInfoForm.AccountId,
                        IDCard:this.$store.getters.userInfoForm.IDCard,
                        Name: this.$store.getters.userInfoForm.Name,
                        Sex: this.step01_Form.sex,
                        MarryInfo: this.step01_Form.marriage,
                        PhoneNum: this.step01_Form.fixTel,
                        Cultural:this.step01_Form.culture,
                        HouseholdAddress: this.step01_Form.censusRegister,
                        HouseholdPostalCode: this.step01_Form.postcode,
                        HasSocialSecurityFund: this.step01_Form.socialInfo.length==0?0:1,
                        SocialSecurityFullYear:this.step01_Form.isOneYear,
                        HasProvidentFund: this.step01_Form.localMoney.length==0?0:1,
                        ProvidentFundCard: this.step01_Form.localMoneyAccount,
                        HasLiveCard: this.step01_Form.dwellInfo.length==0?0:1,
                        Nation: this.step01_Form.nation,
                        LiveCard: this.step01_Form.dwellCode,
                        LiveCardFull2Year: this.step01_Form.isTwoYear,
                        Phone:this.$store.getters.userInfoForm.Phone,

                    },
                    filelist:this.uploadImg_all
                }
                var applyForData = {
                    bill:params.bill,
                    member:params.member,
                    filelist:params.filelist
                }
                // console.log(applyForData)
                getApplyFor(params).then(response => {
                    switch (response.StatusCode) {
                        case 200:
                            this.loading = false;
                            this.$store.dispatch('SET_APPLYFORCODE',response.Data)
                            this.$store.dispatch('SET_APPLYFORDATA',applyForData)
                            setCookie('applyForData',JSON.stringify(applyForData))
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
                            if(this.$store.getters.userInfo.State>=1003 || this.$store.getters.isUserEnter ==1){
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
        display: block;
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
    .defined_server_content p,.defined_server_content h5{
        line-height:26px;
        text-indent: 2em;
    }
</style>
