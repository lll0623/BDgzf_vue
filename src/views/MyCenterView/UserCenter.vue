<template>
<section>
	<div class="panel-heading">
		<h3>个人信息</h3>
		<el-button type="primary fr" style="margin-top: -26px;padding: 7px;" @click="dialoGrcode = true">显示公众号二维码</el-button>
	</div>
	<div class="panel-body" v-loading="allMessage">
		<el-form :model="PersonalInformation" label-width="120px" ref="SeeRoomListViewForm">
			<el-form-item label="用户姓名：" prop="Name" class="fl50">
				<span class="span">{{ PersonalInformation.Name }}</span>
			</el-form-item>
			<el-form-item label="身份证号码：" prop="IDCard" class="fl50">
				<span class="span">{{ (PersonalInformation.IDCard == '' || PersonalInformation.IDCard == null) ? "-" : PersonalInformation.IDCard }}</span>
			</el-form-item>
			<el-form-item label="手机号码：" prop="Phone" class="fl50">
				<span class="span">{{ (PersonalInformation.Phone == '' || PersonalInformation.Phone == null) ? "-" : PersonalInformation.Phone }}</span>
				<a class="text-primary xiugai" @click="updatePhone('updatePhone')">修改</a>
			</el-form-item>
			<el-form-item label="电子邮箱：" prop="EMail" class="fl50">
				<span class="span">{{ (PersonalInformation.EMail == '' || PersonalInformation.EMail == null) ? "-" : PersonalInformation.EMail }}</span>
				<a class="text-primary xiugai" @click="updateEmail('updateEmail')">修改</a>
			</el-form-item>
			<el-form-item label="" style="margin: 15px 15px 20px -85px;clear: both;">
				<el-button v-show="isShowView" :disabled="this.$store.getters.stepTip == 0" type="primary" @click="isShowEditBtn()">修改</el-button>
				<el-button v-show="isShowEdit" type="primary" @click="isShowViewBtn()">保存</el-button>
				<span style="color:#f44336;" v-if="this.$store.getters.stepTip == 0">身份证信息未补全，不能修改</span>
				<span style="color:#f44336;" v-else>（点击修改以下内容）</span>
			</el-form-item>
			<div class="boder999" v-loading = "mostMessage" style="display:inline-block">
				<el-form-item label="性别：" prop="Sex" class="fl50">
					<span v-show="isShowView" v-if="PersonalInformation.Sex == 1" class="span">男</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.Sex == 2" class="span">女</span>
					<span v-show="isShowView" v-else class="span">-</span>
					<el-select v-show="isShowEdit" v-model="valueSex" @change="choosenSex()" placeholder="请选择">
						<el-option v-for="item in Sexs" :label="item.label" :value="item.value" :key="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="名族：" prop="Nation" class="fl50">
					<span v-show="isShowView" class="span">{{ (PersonalInformation.Nation == '' || PersonalInformation.Nation == null) ? "-" : PersonalInformation.Nation }}</span>
					<el-input v-show="isShowEdit" type="text" v-model="PersonalInformation.Nation" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="学历：" prop="Cultural" class="fl50">
					<span v-show="isShowView" v-if="PersonalInformation.Cultural == 0" class="span">博士</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.Cultural == 1" class="span">硕士</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.Cultural == 2" class="span">本科</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.Cultural == 3" class="span">大专、高职</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.Cultural == 4" class="span">高中</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.Cultural == 5" class="span">中专、职校</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.Cultural == 6" class="span">初中</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.Cultural == 7" class="span">小学</span>
					<span v-show="isShowView" v-else class="span">-</span>
					<el-select v-show="isShowEdit" v-model="valueCultural" @change="choosenCultural()" placeholder="请选择">
						<el-option v-for="item in Culturals" :label="item.label" :value="item.value" :key="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="婚姻状况：" prop="MarryInfo" class="fl50">
					<span v-show="isShowView" v-if="PersonalInformation.MarryInfo == 1" class="span">未婚</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.MarryInfo == 2" class="span">已婚</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.MarryInfo == 3" class="span">离婚、离异</span>
					<span v-show="isShowView" v-else-if="PersonalInformation.MarryInfo == 4" class="span">丧偶</span>
					<span v-show="isShowView" v-else class="span">-</span>
					<el-select v-show="isShowEdit" v-model="valueMarryInfo" @change="choosenMarryInfo()" placeholder="请选择">
						<el-option v-for="item in MarryInfos" :label="item.label" :value="item.value" :key="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="联系人：" prop="LinkMan" class="fl50">
					<span v-show="isShowView" class="span">{{ (PersonalInformation.LinkMan == '' || PersonalInformation.LinkMan == null) ? "-" : PersonalInformation.LinkMan }}</span>
					<el-input v-show="isShowEdit" type="text" v-model="PersonalInformation.LinkMan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系人电话：" prop="LinkPhone" class="fl50">
					<span v-show="isShowView" class="span">{{ (PersonalInformation.LinkPhone == '' || PersonalInformation.LinkPhone == null) ? "-" : PersonalInformation.LinkPhone }}</span>
					<el-input v-show="isShowEdit" type="text" v-model="PersonalInformation.LinkPhone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="户籍地址：" prop="HouseholdAddress" class="fl50">
					<span v-show="isShowView" class="span">{{ (PersonalInformation.HouseholdAddress == '' || PersonalInformation.HouseholdAddress == null) ? "-" : PersonalInformation.HouseholdAddress }}</span>
					<el-input v-show="isShowEdit" type="text" v-model="PersonalInformation.HouseholdAddress" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="户籍邮编：" prop="HouseholdPostalCode" class="fl50">
					<span v-show="isShowView" class="span">{{ (PersonalInformation.HouseholdPostalCode == '' || PersonalInformation.HouseholdPostalCode == null) ? "-" : PersonalInformation.HouseholdPostalCode }}</span>
					<el-input v-show="isShowEdit" type="text" v-model="PersonalInformation.HouseholdPostalCode" auto-complete="off"></el-input>
				</el-form-item>
			</div>
		</el-form>

	</div>

	<!-- 微信二维码 -->
	<el-dialog id="noHead" :visible.sync="dialoGrcode" :show-close="false" width="300px" center>
		<div class="qrcode">
			<div class="qrcode-img">
				<p class="text-center">浦东公租房服务公众号</p>
				<img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHZ8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyYUk5ZllXcFZmRjExMDAwMHcwN3MAAgTyNvBaAwQAAAAA" alt="">
			</div>
			<div class="qrcode-content">
				<div class="mb20">
					<h3 class="clearfix">
	                      <span class="pull-left">
	                          <img src="http://webres.pdgzf.com/menber/Contents/images/wechat.png" alt="">
	                      </span>微信关注即可获得
	                  </h3>
					<p>实时获取资格申请最新状态通知</p>
				</div>
				<div class="mb20">
					<h3 class="clearfix">
	                      <span class="pull-left">
	                          <img src="http://webres.pdgzf.com/menber/Contents/images/notic.png" alt="">
	                      </span>各类业务办理提醒
	                  </h3>
					<p>在线支付租金等各类费用</p>
				</div>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
	            <el-button type="primary" @click="dialoGrcode = false">我已关注</el-button>
	            <el-button @click="dialoGrcode = false">稍后再说</el-button>
	      </span>

	</el-dialog>

	<!-- 手机邮箱选项 -->
	<el-dialog title="提示信息" :visible.sync="dialogPhoneOrEmail" width="30%">
		<span>请选择接收验证码的方式</span>
		<span slot="footer" class="dialog-footer">
  	            <el-button type="primary" @click="changePhone()">手机</el-button>
  	            <el-button @click="changeEmail()">Email</el-button>
  	        </span>
	</el-dialog>

	<!-- ###############修改手机号码 开始################## -->
	<!-- 手机方式 修改手机号码 -->
	<el-dialog title="修改手机号码" :visible.sync="updatePhoneForm_DP" width="60%">
		<el-form :model="updatePhone_phoneForm" label-position="right" :rules="updatePhone_phoneRules" ref="updatePhone_phoneForm" label-width="120px" class="demo-updatePhone_phoneForm">
			<el-form-item label="短信验证码：" prop="ValidateCode_phone">
				<el-input style="width:120px;" placeholder="请输入短信验证码" type="text" v-model="updatePhone_phoneForm.ValidateCode_phone" auto-complete="off"></el-input>
				<el-button style="margin-left:20px;" :disabled="disabled_phone" @click="sendcodePhone">{{ getBtnTxt_p }}</el-button>
			</el-form-item>
			<el-form-item label="新手机号码" prop="NewPhoneNum">
				<el-input placeholder="请输入新手机号码" v-model="updatePhone_phoneForm.NewPhoneNum" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="updatePhone_phoneSub('updatePhone_phoneForm')">确定</el-button>
				<el-button @click="updatePhoneForm_DP = false;resetForm('updatePhone_phoneForm')">取消</el-button>
			</span>
	</el-dialog>

	<!-- 邮箱方式 修改手机号码 -->
	<el-dialog title="修改手机号码" :visible.sync="updatePhoneForm_DE" width="60%">
		<el-form :model="updatePhone_emailForm" label-position="right" :rules="updatePhone_emailRules" ref="updatePhone_emailForm" label-width="120px" class="demo-updatePhone_emailForm">
			<el-form-item label="邮箱验证码：" prop="ValidateCode_email">
				<el-input style="width:120px;" placeholder="请输入邮箱验证码" type="text" v-model="updatePhone_emailForm.ValidateCode_email" auto-complete="off"></el-input>
				<el-button style="margin-left:20px;" :disabled="disabled_email" @click="sendcodeEmail">{{ getBtnTxt_e }}</el-button>
			</el-form-item>
			<el-form-item label="新手机号码" prop="NewPhoneNum">
				<el-input placeholder="请输入新手机号码" v-model="updatePhone_emailForm.NewPhoneNum" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="updatePhone_emailSub('updatePhone_emailForm')">确定</el-button>
				<el-button @click="updatePhoneForm_DE = false;resetForm('updatePhone_emailForm')">取消</el-button>
			</span>
	</el-dialog>
	<!-- ###############修改手机号码 结束################## -->


	<!-- ###############修改邮箱 开始################## -->
	<!-- 修改邮箱-手机方式 -->
	<el-dialog title="修改电子邮箱" :visible.sync="updateEmailForm_DP" width="60%">
		<el-form :model="updateEmail_phoneForm" label-position="right" :rules="updateEmail_phoneRules" ref="updateEmail_phoneForm" label-width="120px" class="demo-updateEmail_phoneForm">
			<el-form-item label="短信验证码：" prop="ValidateCode_phone">
				<el-input style="width:120px;" placeholder="请输入短信验证码" type="text" v-model="updateEmail_phoneForm.ValidateCode_phone" auto-complete="off"></el-input>
				<el-button style="margin-left:20px;" :disabled="disabled_phone" @click="sendcodePhone">{{ getBtnTxt_p }}</el-button>
			</el-form-item>
			<el-form-item label="新电子邮箱" prop="NewEmailNum">
				<el-input placeholder="请输入新电子邮箱" v-model="updateEmail_phoneForm.NewEmailNum" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="updateEmail_phoneSub('updateEmail_phoneForm')">确定</el-button>
				<el-button @click="updateEmailForm_DP = false;resetForm('updateEmail_phoneForm')">取消</el-button>
			</span>
	</el-dialog>

	<!-- 修改邮箱 邮箱方式 -->
	<el-dialog title="修改电子邮箱" :visible.sync="updateEmailForm_DE" width="60%">
		<el-form :model="updateEmail_emailForm" label-position="right" :rules="updateEmail_emailRules" ref="updateEmail_emailForm" label-width="120px" class="demo-updateEmail_emailForm">
			<el-form-item label="邮箱验证码：" prop="ValidateCode_email">
				<el-input style="width:120px;" placeholder="请输入邮箱验证码" type="text" v-model="updateEmail_emailForm.ValidateCode_email" auto-complete="off"></el-input>
				<el-button style="margin-left:20px;" :disabled="disabled_email" @click="sendcodeEmail">{{ getBtnTxt_e }}</el-button>
			</el-form-item>
			<el-form-item label="新电子邮箱" prop="NewEmailNum">
				<el-input placeholder="请输入新电子邮箱" v-model="updateEmail_emailForm.NewEmailNum" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="updateEmail_emailSub('updateEmail_emailForm')">确定</el-button>
				<el-button @click="updateEmailForm_DE = false;resetForm('updateEmail_emailForm')">取消</el-button>
			</span>
	</el-dialog>
	<!-- ###############修改邮箱 结束################## -->
</section>
</template>
<script>
import { getUserInfo,getUpdatePwd,getUserCenterUpdate,getSMSHelper } from '../../api/api.js'
import { mapGetters } from 'vuex'
import md5 from 'js-md5';
var code; //在全局定义验证码
export default {
	data() {
		//短信验证码校验
		var validateValidateCode_phone = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('短信验证码不能为空'));
			} else if (md5(value) !== this.SMCode_phone) {
				callback(new Error('短信验证码不正确'));
			} else {
				callback();
			}
		};
		//邮箱验证码校验
		var validateValidateCode_email = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('邮箱证码不能为空'));
			} else {
				callback();
			}
		};
		//原密码 校验
		var validateOldPassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('密码不能为空'));
			}
			// else if(value.length <6 ){
			// 	callback(new Error('密码长度不能小于六位'));
			// }
			else {
				callback();
			}
		};
		//新密码 校验
		var validatePassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('密码不能为空'));
			} else if (value.length < 6) {
				callback(new Error('密码长度不能小于六位'));
			} else {
				callback();
			}
		};
		//确认密码 手机校验
		var validateConfirm_pass_phone = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value !== this.updatePwd_phoneForm.Password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		};
		//确认密码 邮箱校验
		var validateConfirm_pass_email = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value !== this.updatePwd_emailForm.Password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		};
		// 手机号验证
		var validatePhoneNum = (rule, value, callback) => {
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机号码不能为空'));
			} else if (!reg.test(value)) {
				callback(new Error('请输入正确的手机号码'));
			} else {
				callback();
			}
		};
		// 邮箱验证
		var validateEmail = (rule, value, callback) => {
			let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (value == '') {
				callback(new Error('电子邮箱不能为空'));
			} else if (!reg.test(value)) {
				callback(new Error('请输入正确格式的邮箱'));
			} else {
				callback();
			}
		};
		// 图形验证码校验
		var validateVerifyCode = (rule, value, callback) => {
			value.toUpperCase(); //取得输入的验证码并转化为大写
			if (value === '') {
				callback(new Error('请输入验证码'));
			} else if (value.toUpperCase() != this.checkCode) { //若输入的验证码与产生的验证码不一致时
				callback(new Error('验证码不正确'));
				this.isD = false;
				this.createCode(); //刷新验证码
			} else {
				callback();
			}
		};
		return {
			loadingPassword: false,
			PersonalInformation: { //个人信息展示
				Name: '',
				IDCard: '',
				Phone: '',
				EMail: '',
				Sex: '',
				Nation: '',
				Cultural: '',
				MarryInfo: '',
				LinkMan: '',
				LinkPhone: '',
				HouseholdAddress: '',
				HouseholdPostalCode: ''
			},
			mostMessage: false, // 个人信息loading
			allMessage: false, // 全部个人信息loading
			Sexs: [{
				value: 1,
				label: '男'
			}, {
				value: 2,
				label: '女'
			}],
			valueSex: '',
			Culturals: [{
				value: 0,
				label: '博士'
			}, {
				value: 1,
				label: '硕士'
			}, {
				value: 2,
				label: '本科'
			}, {
				value: 3,
				label: '大专、高职'
			}, {
				value: 4,
				label: '高中'
			}, {
				value: 5,
				label: '中专、职校'
			}, {
				value: 6,
				label: '初中'
			}, {
				value: 7,
				label: '小学'
			}],
			valueCultural: '',
			MarryInfos: [{
				value: 0,
				label: '请选择'
			},{
				value: 1,
				label: '未婚'
			}, {
				value: 2,
				label: '已婚'
			}, {
				value: 3,
				label: '离婚、离异'
			}, {
				value: 4,
				label: '丧偶'
			}],
			valueMarryInfo: '',
			isShowEdit: false,
			isShowView: true,
			disabled_phone: false,
			disabled_email: false,
			getBtnTxt_p: "免费获取短信验证码",
			SMCode_phone: '', //手机短信验证码
			SMCode_email: '',
			getBtnTxt_e: "免费获取邮箱验证码",
			time: 0,
			checkCode: '',
			ispassword: "password",
			fa_eyes: 'fa fa-eye-slash',
			ispassword2: "password",
			fa_eyes2: 'fa fa-eye-slash',
			ispassword3: "password",
			fa_eyes3: 'fa fa-eye-slash',
			dialoGrcode: false, //微信二维码
			dialogPhoneOrEmail: false, //手机或者邮箱验证的弹框
			updateType: "", //判断谁要修改
			updatePhoneForm_DP: false, //修改手机号码的弹框 手机方式
			updatePhoneForm_DE: false, //修改手机号码的弹框 邮箱方式
			updateEmailForm_DP: false, //修改邮箱的弹框 手机方式
			updateEmailForm_DE: false, //修改邮箱的弹框 邮箱方式

			//#######修改密码 内容 开始#############
			updatePwd_phoneForm: {
				OldPassword: "", //原密码
				Password: "", //新密码
				confirm_pass: "", //确认新密码
				VerifyCode: ""
			},
			updatePwd_phoneRules: {
				OldPassword: [{
					validator: validateOldPassword,
					trigger: 'blur'
				}],
				VerifyCode: [{
					validator: validateVerifyCode,
					trigger: 'blur'
				}],
				Password: [{
					validator: validatePassword,
					trigger: 'blur'
				}],
				confirm_pass: [{
					validator: validateConfirm_pass_phone,
					trigger: 'blur'
				}]
			},
			updatePwd_emailForm: {
				OldPassword: "", //原密码
				Password: "", //新密码
				confirm_pass: "", //确认新密码
				VerifyCode: ""
			},
			updatePwd_emailRules: {
				OldPassword: [{
					validator: validateOldPassword,
					trigger: 'blur'
				}],
				VerifyCode: [{
					validator: validateVerifyCode,
					trigger: 'blur'
				}],
				Password: [{
					validator: validatePassword,
					trigger: 'blur'
				}],
				confirm_pass: [{
					validator: validateConfirm_pass_email,
					trigger: 'blur'
				}]
			},
			//#######修改密码 内容 结束#############


			//#######修改手机号码 内容 开始#############
			updatePhone_phoneForm: {
				ValidateCode_phone: "", //手机号验证
				NewPhoneNum: "" // 新手机号码
			},
			updatePhone_phoneRules: {
				ValidateCode_phone: [{
					validator: validateValidateCode_phone,
					trigger: 'blur'
				}],
				NewPhoneNum: [{
					validator: validatePhoneNum,
					trigger: 'blur'
				}]
			},

			updatePhone_emailForm: {
				ValidateCode_email: "", //邮箱验证
				NewPhoneNum: "" // 新手机号码
			},
			updatePhone_emailRules: {
				ValidateCode_email: [{
					validator: validateValidateCode_email,
					trigger: 'blur'
				}],
				NewPhoneNum: [{
					validator: validatePhoneNum,
					trigger: 'blur'
				}]
			},
			//#######修改手机号码 内容 结束#############



			//#######修改电子邮箱 内容 开始#############
			//修改电子邮箱 手机方式
			updateEmail_phoneForm: {
				ValidateCode_phone: "", //手机号验证
				NewEmailNum: "" // 新电子邮箱
			},
			updateEmail_phoneRules: {
				ValidateCode_phone: [{
					validator: validateValidateCode_phone,
					trigger: 'blur'
				}],
				NewEmailNum: [{
					validator: validateEmail,
					trigger: 'blur'
				}]
			},
			//修改电子邮箱 邮箱方式
			updateEmail_emailForm: {
				ValidateCode_email: "", //邮箱验证
				NewEmailNum: "" // 新电子邮箱
			},
			updateEmail_emailRules: {
				ValidateCode_email: [{
					validator: validateValidateCode_email,
					trigger: 'blur'
				}],
				NewEmailNum: [{
					validator: validateEmail,
					trigger: 'blur'
				}]
			},
			//#######修改电子邮箱 内容 结束#############

		}
	},

	methods: {
		//密码修改按钮
		updatePwd(type) {
			this.dialogPhoneOrEmail = true;
			this.updateType = type;
		},
		//手机号码修改按钮
		updatePhone(type) {
			this.dialogPhoneOrEmail = true;
			this.updateType = type;
		},
		//邮箱修改按钮
		updateEmail(type) {
			this.dialogPhoneOrEmail = true;
			this.updateType = type;
		},
		//手机方式验证-修改密码
		changePhone() {
			switch (this.updateType) {
				case "updatePhone":
					this.updatePhoneForm_DP = true;
					this.dialogPhoneOrEmail = false;
					break;
				case "updateEmail":
					this.updateEmailForm_DP = true;
					this.dialogPhoneOrEmail = false;
					break;
				default:

			}
		},
		//邮箱方式验证-修改密码
		changeEmail() {
			switch (this.updateType) {
				case "updatePhone":
					this.updatePhoneForm_DE = true;
					this.dialogPhoneOrEmail = false;
					break;
				case "updateEmail":
					this.updateEmailForm_DE = true;
					this.dialogPhoneOrEmail = false;
					break;
				default:

			}
		},
		//修改手机号 -手机方式 - -提交
		updatePhone_phoneSub(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = {
						AccountId: this.$store.getters.userInfo.AccountId,
						Name: this.PersonalInformation.Name,
						Sex: this.PersonalInformation.Sex,
						MarryInfo: this.PersonalInformation.MarryInfo,
						IDCard: this.PersonalInformation.IDCard,
						EMail: this.PersonalInformation.EMail,
						Phone: this.updatePhone_phoneForm.NewPhoneNum,
						Cultural: this.PersonalInformation.Cultural,
						Nation: this.PersonalInformation.Nation,
						LinkMan: this.PersonalInformation.LinkMan,
						LinkPhone: this.PersonalInformation.LinkPhone,
						HouseholdAddress: this.PersonalInformation.HouseholdAddress,
						HouseholdPostalCode: this.PersonalInformation.HouseholdPostalCode
					}
					//修改个人信息接口
					getUserCenterUpdate(params).then((response) => {
						var errorText = response.Info;
						switch (response.StatusCode) {
							case 200:
								this.$message({
									type: 'success',
									message: '修改成功！'
								});
								this.updatePhoneForm_DP = false;
								let params = {
									AccountId: this.$store.getters.userInfo.AccountId
								}
								this.getUserInfoMessage(params);
								break;
							case 500:
								this.$message({
									type: 'error',
									message: errorText
								});
								break;
							default:
								this.$message({
									type: 'error',
									message: '修改失败！'
								});
						}
					})
				} else {
					this.$message({
						type: 'error',
						message: '修改失败！'
					});
					return false;
				}
			});
		},
		//修改手机号 - 邮箱方式-提交
		updatePhone_emailSub(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = {
						AccountId: this.$store.getters.userInfo.AccountId,
						Name: this.PersonalInformation.Name,
						Sex: this.PersonalInformation.Sex,
						MarryInfo: this.PersonalInformation.MarryInfo,
						IDCard: this.PersonalInformation.IDCard,
						EMail: this.PersonalInformation.EMail,
						Phone: this.updatePhone_emailForm.NewPhoneNum,
						Cultural: this.PersonalInformation.Cultural,
						Nation: this.PersonalInformation.Nation,
						LinkMan: this.PersonalInformation.LinkMan,
						LinkPhone: this.PersonalInformation.LinkPhone,
						HouseholdAddress: this.PersonalInformation.HouseholdAddress,
						HouseholdPostalCode: this.PersonalInformation.HouseholdPostalCode,
					}
					//修改个人信息接口
					getUserCenterUpdate(params).then((response) => {
						var errorText = response.Info;
						switch (response.StatusCode) {
							case 200:
								this.$message({
									type: 'success',
									message: '修改成功！'
								});
								this.updatePhoneForm_DE = false;
								let params = {
									AccountId: this.$store.getters.userInfo.AccountId
								}
								this.getUserInfoMessage(params);
								break;
							case 500:
								this.$message({
									type: 'error',
									message: errorText
								});
								break;
							default:
								this.$message({
									type: 'error',
									message: '修改失败！'
								});
						}
					})
				} else {
					this.$message({
						type: 'error',
						message: '修改失败！'
					});
					return false;
				}
			});
		},
		//修改电子邮箱 - 手机号方式-提交
		updateEmail_phoneSub(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = {
						AccountId: this.$store.getters.userInfo.AccountId,
						Name: this.PersonalInformation.Name,
						Sex: this.PersonalInformation.Sex,
						MarryInfo: this.PersonalInformation.MarryInfo,
						IDCard: this.PersonalInformation.IDCard,
						EMail: this.updateEmail_phoneForm.NewEmailNum,
						Phone: this.PersonalInformation.Phone,
						Cultural: this.PersonalInformation.Cultural,
						Nation: this.PersonalInformation.Nation,
						LinkMan: this.PersonalInformation.LinkMan,
						LinkPhone: this.PersonalInformation.LinkPhone,
						HouseholdAddress: this.PersonalInformation.HouseholdAddress,
						HouseholdPostalCode: this.PersonalInformation.HouseholdPostalCode,
					}
					//修改个人信息接口
					getUserCenterUpdate(params).then((response) => {
						var errorText = response.Info;
						switch (response.StatusCode) {
							case 200:
								this.$message({
									type: 'success',
									message: '修改成功！'
								});
								this.updateEmailForm_DP = false;
								var params = {
									AccountId: this.$store.getters.userInfo.AccountId
								}
								this.getUserInfoMessage(params);
								break;
							case 500:
								this.$message({
									type: 'error',
									message: errorText
								});
								break;
							default:
								this.$message({
									type: 'error',
									message: '修改失败！'
								});
						}
					})
				} else {
					this.$message({
						type: 'error',
						message: '修改失败！'
					});
					return false;
				}
			});
		},
		//修改电子邮箱 - 邮箱方式-提交
		updateEmail_emailSub(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = {
						AccountId: this.$store.getters.userInfo.AccountId,
						Name: this.PersonalInformation.Name,
						Sex: this.PersonalInformation.Sex,
						MarryInfo: this.PersonalInformation.MarryInfo,
						IDCard: this.PersonalInformation.IDCard,
						EMail: this.updateEmail_emailForm.NewEmailNum,
						Phone: this.PersonalInformation.Phone,
						Cultural: this.PersonalInformation.Cultural,
						Nation: this.PersonalInformation.Nation,
						LinkMan: this.PersonalInformation.LinkMan,
						LinkPhone: this.PersonalInformation.LinkPhone,
						HouseholdAddress: this.PersonalInformation.HouseholdAddress,
						HouseholdPostalCode: this.PersonalInformation.HouseholdPostalCode,
					}
					//修改个人信息接口
					getUserCenterUpdate(params).then((response) => {
						var errorText = response.Info;
						switch (response.StatusCode) {
							case 200:
								this.$message({
									type: 'success',
									message: '修改成功！'
								});
								this.updateEmailForm_DE = false;
								var params = {
									AccountId: this.$store.getters.userInfo.AccountId
								}
								this.getUserInfoMessage(params);
								break;
							case 500:
								this.$message({
									type: 'error',
									message: errorText
								});
								break;
							default:
								this.$message({
									type: 'error',
									message: '修改失败！'
								});
						}
					})
				} else {
					this.$message({
						type: 'error',
						message: '修改失败！'
					});
					return false;
				}
			});
		},
		sendcodePhone() {
			let params = {
				Type: 4, //修改手机号
				PhoneNum: this.PersonalInformation.Phone
			}
			getSMSHelper(params).then((response) => {
				var errorText = response.Info;
				switch (response.StatusCode) {
					case 200:
						this.$message({
							type: 'success',
							message: '短信验证码发送成功，请注意查收！'
						});
						this.SMCode_phone = response.Data.RegisterCode.toLowerCase();
						this.time = 60;
						this.disabled_phone = true;
						this.timer_phone();
						break;
					case 500:
						this.$message({
							type: 'error',
							message: errorText
						});
						this.time = 0;
						this.getBtnTxt_p = "获取验证码";
						this.disabled_phone = false;
						break;
					default:
						this.$message({
							type: 'error',
							message: '短信验证码发送失败！'
						});
						this.time = 0;
						this.getBtnTxt_p = "获取验证码";
						this.disabled_phone = false;
				}
			})
			// this.time = 60;
			// this.disabled_phone = true;
			// this.timer_phone();
		},
		sendcodeEmail() {
			this.time = 60;
			this.disabled_email = true;
			this.timer_email();
		},
		timer_phone() {
			if (this.time > 0) {
				this.time--;
				this.getBtnTxt_p = this.time + "s后重新获取";
				setTimeout(this.timer_phone, 1000);
			} else {
				this.time = 0;
				this.getBtnTxt_p = "获取验证码";
				this.disabled_phone = false;
			}
		},
		timer_email() {
			if (this.time > 0) {
				this.time--;
				this.getBtnTxt_e = this.time + "s后重新获取";
				setTimeout(this.timer_email, 1000);
			} else {
				this.time = 0;
				this.getBtnTxt_e = "获取验证码";
				this.disabled_email = false;
			}
		},
		changeType() {
			this.ispassword = this.ispassword === 'password' ? 'text' : 'password';
			this.fa_eyes = this.fa_eyes == "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
		},
		changeType2() {
			this.ispassword2 = this.ispassword2 === 'password' ? 'text' : 'password';
			this.fa_eyes2 = this.fa_eyes2 == "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
		},
		changeType3() {
			this.ispassword3 = this.ispassword3 === 'password' ? 'text' : 'password';
			this.fa_eyes3 = this.fa_eyes3 == "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
		},
		// 图片验证码
		createCode() {
			code = "";
			var codeLength = 4; //验证码的长度
			var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
				'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
			for (var i = 0; i < codeLength; i++) { //循环操作
				var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
				code += random[index]; //根据索引取得随机数加到code上
			}
			this.checkCode = code; //把code值赋给验证码
		},
		resetForm(formName) { //表单重置
			this.$refs[formName].resetFields();
		},
		//个人信息整体修改-点击修改
		isShowEditBtn() {
			this.isShowView = false;
			this.isShowEdit = true;
			this.valueSex = this.PersonalInformation.Sex; //性别多选框 特殊处理
			this.valueCultural = parseInt((this.PersonalInformation.Cultural == '' || this.PersonalInformation.Cultural == 0) ? 0 : this.PersonalInformation.Cultural);
			console.log(parseInt(this.PersonalInformation.MarryInfo));
			this.valueMarryInfo = parseInt((this.PersonalInformation.MarryInfo == '' || this.PersonalInformation.MarryInfo == 0) ? 0 : this.PersonalInformation.MarryInfo);
		},
		choosenSex() {
			this.PersonalInformation.Sex = this.valueSex;
		},
		choosenCultural() {
			this.PersonalInformation.Cultural = this.valueCultural;
		},
		choosenMarryInfo() {
			this.PersonalInformation.MarryInfo = this.valueMarryInfo;
		},
		//个人信息整体修改-保存
		isShowViewBtn() {
			this.mostMessage = true;
			let params = {
				AccountId: this.$store.getters.userInfo.AccountId,
				Name: this.PersonalInformation.Name,
				Sex: this.PersonalInformation.Sex,
				MarryInfo: parseInt(this.PersonalInformation.MarryInfo),
				IDCard: this.PersonalInformation.IDCard,
				EMail: this.PersonalInformation.EMail,
				Phone: this.PersonalInformation.Phone,
				Cultural: parseInt(this.PersonalInformation.Cultural),
				Nation: this.PersonalInformation.Nation,
				LinkMan: this.PersonalInformation.LinkMan,
				LinkPhone: this.PersonalInformation.LinkPhone,
				HouseholdAddress: this.PersonalInformation.HouseholdAddress,
				HouseholdPostalCode: this.PersonalInformation.HouseholdPostalCode,
			}
			getUserCenterUpdate(params).then((response) => {
				var errorText = response.Info;
				switch (response.StatusCode) {
					case 200:
						this.$message({
							type: 'success',
							message: '修改成功！'
						});
						this.mostMessage = false;
						this.isShowView = true;
						this.isShowEdit = false;
						var params = {
							AccountId: this.$store.getters.userInfo.AccountId
						}
						this.getUserInfoMessage(params);
						break;
					case 500:
						this.$message({
							type: 'error',
							message: errorText
						});
						this.mostMessage = false;
						break;
					default:
						this.$message({
							type: 'error',
							message: '修改失败！'
						});
						this.mostMessage = false;
				}
			})
		},
		getUserInfoMessage(params) {
			this.allMessage = true;
			//个人信息显示接口
			getUserInfo(params).then((response) => {
				this.PersonalInformation = response.Data;
				this.allMessage = false;
			})
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.commit('SET_MYCENTERNAV', 8)
		})
	},
	created() {
		this.createCode();
		if(this.$store.getters.userInfo){
			var params = {
				AccountId: this.$store.getters.userInfo.AccountId
			}
			this.getUserInfoMessage(params);
		}
	}
}
</script>
<style lang="scss">
.panel-heading {
    background-color: #eeeeee;
    padding: 10px 20px;
    h3 {
        color: #666;
    }
}
.panel-body {
    padding: 10px 20px;
    strong {
        color: #333;
    }
    .span {
        color: #959795;
    }
    .xiugai {
        margin-left: 30px;
        color: #009688;
        cursor: pointer;
    }
    #liShowQrCode a:hover {
        color: #009688 !important;
        cursor: pointer;
    }
}
.yanzhengma_input {
    width: 190px;
}
.verification {
    font-size: 18px;
    letter-spacing: 3px;
    color: #053d84;
    background: #f2f2f5 !important;
    margin-left: 30px;
    line-height: 37px;
    height: 40px;
    margin-top: -3px;
    width: 100px;
    border-radius: 3px;
    vertical-align: middle;
    transform: translate(-15px,0);
    width: 102px;
}
.qrcode-img {
    height: auto;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #3988ed !important;
    p {
        margin-bottom: 10px;
        color: #3988ed !important;
    }
    img {
        width: 160px;
        height: 160px;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
}
.qrcode {
    margin: -30px 0 0;
    text-align: center;
}
.qrcode-content {
    width: 240px;
    height: auto;
    background: #3988ed;
    color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 30px 30px 20px;
    margin-left: -25px;
    .mb20P {
        margin-bottom: 20px;
    }
    h3 {
        font-size: 18px;
        margin-top: 0;
        text-align: left;
        span {
            margin-right: 10px;
            img {
                width: 20px;
                height: 20px;
            }
        }
    }
    p {
        margin-left: 30px;
        color: white;
        font-size: 15px;
        margin-top: 7px;
        text-align: left;
    }
}
#noHead .el-dialog .el-dialog__header {
    background: white !important;
}
.myCenter-wrap {
    .el-dialog .el-dialog__header {
        background: #009f95;
    }
    .el-dialog .el-dialog__header .el-dialog__title {
        color: #fff;
    }
    .el-dialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
        color: #fff !important;
    }
}
.open_close {
    position: absolute;
    right: -3px;
    top: 9px;
    width: 30px;
    height: 20px;
    cursor: pointer;
    font-size: 20px;
}
.fl50 {
    float: left;
    width: 50%;
}
.boder999 {
    border: 1px solid #009688;
    padding-top: 20px;
    input,
    select {
        width: 260px !important;
    }
}
</style>
