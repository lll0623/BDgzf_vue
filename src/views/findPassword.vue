<template>
<div class="findPassWordBackground" ref='loginBox'>
	<!-- 手机验证方式 -->
	<el-card class="box-card" v-show="card5">
		<div slot="header" class="clearfix">
			<span style="font-size:28px">填写新密码（手机验证方式）</span>
		</div>
		<el-form :model="fiveForm" label-position="right" :rules="fiveRules" ref="fiveForm" label-width="120px" class="demo-ruleForm">
			<el-form-item label="新密码：" prop="Password">
				<el-input :type="this.ispassword" v-model="fiveForm.Password" auto-complete="off"></el-input>
				<i :class="fa_eyes" aria-hidden="true" @click="changeType()" class="open_close"></i>
			</el-form-item>
			<el-form-item label="确定密码：" prop="confirm_pass">
				<el-input :type="this.ispassword2" v-model="fiveForm.confirm_pass" auto-complete="off"></el-input>
				<i :class="fa_eyes2" aria-hidden="true" @click="changeType2()" class="open_close"></i>
			</el-form-item>
			<el-form-item label="图形验证码：" prop="yzm">
				<el-input style="width:170px;" type="text" placeholder="请输入验证码" class="yanzhengma_input" v-model="fiveForm.yzm" auto-complete="off"></el-input>
				<input type="button" @click="createCode" class="verification code" v-model="checkCode" />
			</el-form-item>
			<el-button class="nextBtn tc" @click="submitForm5('fiveForm')">提交</el-button>
		</el-form>
	</el-card>

	<!-- 第二个card -->
	<el-card class="box-card" v-show="card2">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane name="first">
				<span slot="label" style="font-size:28px">手机找回密码</span>
				<el-form :model="twoForm" label-position="right" :rules="twoRules" ref="twoForm" label-width="120px" class="demo-ruleForm">
					<el-form-item label="手机号码：" prop="inputTel">
						<el-input type="text" v-model="twoForm.inputTel" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="手机验证码：" prop="ValidateCode">
						<el-input style="width:125px;" type="text" v-model="twoForm.ValidateCode" auto-complete="off"></el-input>
						<el-button style="margin-left:20px;" v-loading="load_p" :disabled="disabled" @click="sendcode">{{ getBtnTxt }}</el-button>
					</el-form-item>
					<el-button class="nextBtn tc" @click="submitForm2('twoForm')">下一步</el-button>
				</el-form>
			</el-tab-pane>
			<el-tab-pane name="second">
				<span slot="label" style="font-size:28px">邮箱找回密码</span>
				<el-form :model="threeForm" label-position="right" :rules="threeRules" ref="threeForm" label-width="120px">
					<el-form-item label="邮箱：" prop="email">
						<el-input type="text" v-model="threeForm.email" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="邮箱验证码：" prop="ValidateCode_E">
						<el-input style="width:125px;" type="text" v-model="threeForm.ValidateCode_E" auto-complete="off"></el-input>
						<el-button style="margin-left:20px;" v-loading="load_e" :disabled="disabled2" @click="sendcode_E">{{ getBtnTxt_E }}</el-button>
					</el-form-item>
					<el-button class="nextBtn tc" @click="submitForm3('threeForm')">下一步</el-button>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</el-card>
	<!-- 邮箱验证方式 -->
	<el-card class="box-card" v-show="card6">
		<div slot="header" class="clearfix">
			<span style="font-size:28px">填写新密码（邮箱验证方式）</span>
		</div>
		<el-form :model="sixForm" label-position="right" :rules="sixRules" ref="sixForm" label-width="120px" class="demo-ruleForm">
			<el-form-item label="新密码：" prop="Password2">
				<el-input :type="this.ispassword3" v-model="sixForm.Password2" auto-complete="off"></el-input>
				<i :class="fa_eyes3" aria-hidden="true" @click="changeType3()" class="open_close"></i>
			</el-form-item>
			<el-form-item label="确定密码：" prop="confirm_pass2">
				<el-input :type="this.ispassword4" v-model="sixForm.confirm_pass2" auto-complete="off"></el-input>
				<i :class="fa_eyes4" aria-hidden="true" @click="changeType4()" class="open_close"></i>
			</el-form-item>
			<el-form-item label="图形验证码：" prop="yzm2">
				<el-input style="width:170px;" type="text" placeholder="请输入验证码" class="yanzhengma_input" v-model="sixForm.yzm2" auto-complete="off"></el-input>
				<input type="button" @click="createCode" class="verification code" v-model="checkCode" />
			</el-form-item>
			<el-button class="nextBtn tc" @click="submitForm6('sixForm')">提交</el-button>
		</el-form>
	</el-card>

	<!-- 通过手机号修改成功 -->
	<el-card class="box-card" v-show="card3">
		<div style="font-size:28px;margin: 20px 0px 15px 0;">手机验证找回密码成功！！！</div>
		<router-link :to="`/login`">
			<el-button class="linkBtn" style="float:left;margin-bottom:30px;" type="text">点这里返回登录页面>>></el-button>
		</router-link>
	</el-card>

	<!-- 通过邮箱修改成功 -->
	<el-card class="box-card" v-show="card4">
		<div style="font-size:28px;margin: 20px 0px 15px 0;">邮箱验证找回密码成功！！！</div>
		<router-link :to="`/login`">
			<el-button class="linkBtn" style="float:left;margin-bottom:30px;" type="text">点这里返回登录页面>>></el-button>
		</router-link>
	</el-card>
</div>
</template>

<script>
import {
	getSMSHelper,
	getFindPassword,
	getEmailUtil
} from '../api/api.js'
import md5 from 'js-md5';
var code; //在全局定义验证码
export default {
	data() {
		var validatePhoneNum = (rule, value, callback) => {
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机号码不能为空'));
			} else if (!reg.test(value)) {
				callback(new Error('请输入正确的手机号码'));
			} else if (this.sidePhone != '' && value != this.sidePhone) {
				callback(new Error('请输入正确的手机号码'));
			} else {
				callback();
			}
		};
		var validatePassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if (value.length < 6) {
				callback(new Error("密码长度必须大于六位！"));
			} else {
				callback();
			}
		};
		var validateConfirm_pass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value !== this.fiveForm.Password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		};
		var validateValidateCode = (rule, value, callback) => {
			let PhoneNum = this.twoForm.inputTel
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机验证码不能为空'));
			} else if (!reg.test(PhoneNum)) {
				callback(new Error('请输入正确的手机号码'));
			} else if (md5(value) != this.SMCode_phone) {
				callback(new Error('短信验证码不正确'));
			} else {
				callback();
			}
		};
		var validateYzm = (rule, value, callback) => {
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
		var validateEmail = (rule, value, callback) => {
			let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (value === '') {
				callback(new Error('邮箱不能为空'));
			} else if (!reg.test(value)) {
				callback(new Error('请输入正确格式的邮箱'));
			} else if (this.sideEmail != '' && value != this.sideEmail) {
				callback(new Error('请输入正确格式的邮箱'));
			} else {
				callback();
			}
		};
		var validateValidateCode_E = (rule, value, callback) => {
			let EmailNum = this.threeForm.email
			let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (value === '') {
				callback(new Error('邮箱验证码不能为空'));
			} else if (!reg.test(EmailNum)) {
				callback(new Error('请输入正确的邮箱号'));
			} else if (md5(value) != this.SMCode_email) {
				callback(new Error('邮箱验证码不正确'));
			} else {
				callback();
			}
		};
		var validatePassword2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if (value.length < 6) {
				callback(new Error("密码长度必须大于六位！"));
			} else {
				callback();
			}
		};
		var validateConfirm_pass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value !== this.sixForm.Password2) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		};
		var validateYzm2 = (rule, value, callback) => {
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
			card1: true,
			card2: true,
			card3: false,
			card4: false,
			card5: false,
			card6: false,
			activeName: 'first',
			checkCode: '', //验证码value值
			disabled: false,
			disabled2: false,
			time: 0,
			time2: 0,
			getBtnTxt: "免费获取验证码",
			getBtnTxt_E: "免费获取验证码",
			SMCode_phone: '', //短信接口返回的验证码
			SMCode_email: '', //短信接口返回的验证码
			load_p: false,
			load_e: false,
			sidePhone: '',
			sideEmail: '',
			ispassword: "password",
			fa_eyes: 'fa fa-eye-slash',
			ispassword2: "password",
			fa_eyes2: 'fa fa-eye-slash',
			ispassword3: "password",
			fa_eyes3: 'fa fa-eye-slash',
			ispassword4: "password",
			fa_eyes4: 'fa fa-eye-slash',
			// IdcardArr: [{
			// 		id: 1,
			// 		CardNum: "341182199605231010"
			// 	},
			// 	{
			// 		id: 2,
			// 		CardNum: "341182199605231011"
			// 	},
			// 	{
			// 		id: 3,
			// 		CardNum: "341182199605231012"
			// 	}
			// ],
			// oneForm: {
			// 	IDCard: ''
			// },
			// oneRules: {
			// 	IDCard: [{
			// 		validator: validateIDCard,
			// 		trigger: 'blur'
			// 	}]
			// },
			twoForm: {
				inputTel: '',
				ValidateCode: ''
			},
			twoRules: {
				inputTel: [{
					validator: validatePhoneNum,
					trigger: 'blur'
				}],
				ValidateCode: [{
					validator: validateValidateCode,
					trigger: 'blur'
				}]
			},
			fiveForm: {
				Password: '',
				confirm_pass: '',
				yzm: ''
			},
			fiveRules: {
				yzm: [{
					validator: validateYzm,
					trigger: 'blur'
				}],
				Password: [{
					validator: validatePassword,
					trigger: 'blur'
				}],
				confirm_pass: [{
					validator: validateConfirm_pass,
					trigger: 'blur'
				}]
			},
			threeForm: {
				yzm2: '',
				email: '',
				ValidateCode_E: '',
				Password2: '',
				confirm_pass2: ''
			},
			threeRules: {
				email: [{
					validator: validateEmail,
					trigger: 'blur'
				}],
				ValidateCode_E: [{
					validator: validateValidateCode_E,
					trigger: 'blur'
				}],
			},
			sixForm: {
				email: '',
				ValidateCode_E: ''
			},
			sixRules: {
				yzm2: [{
					validator: validateYzm2,
					trigger: 'blur'
				}],
				Password2: [{
					validator: validatePassword2,
					trigger: 'blur'
				}],
				confirm_pass2: [{
					validator: validateConfirm_pass2,
					trigger: 'blur'
				}]
			}
		};
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.commit('SET_HEADTOGGLE', 1)
		})
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit('SET_HEADTOGGLE', 0)
		next()
	},
	methods: {
		handleClick(tab, event) {
			// console.log(tab, event);
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
		sendcode() {
			if (this.twoForm.inputTel == '') {
				this.$message({
					type: 'error',
					message: '请输入手机号！'
				});
				retur;
			}
			this.load_p = true;
			let params = {
				Type: 2, //找回密码
				PhoneNum: this.twoForm.inputTel
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
						this.sidePhone = response.Data.PhoneNum;
						this.load_p = false;
						this.time = 60;
						this.disabled = true;
						this.timer();
						break;
					case 500:
						this.$message({
							type: 'error',
							message: errorText
						});
						this.load_p = false;
						this.time = 0;
						this.getBtnTxt = "免费获取验证码";
						this.disabled = false;
						break;
					default:
						this.$message({
							type: 'error',
							message: '短信验证码发送失败！'
						});
						this.load_p = false;
						this.time = 0;
						this.getBtnTxt = "免费获取验证码";
						this.disabled = false;
				}
			})
		},
		sendcode_E() {
			if (this.threeForm.email == '') {
				this.$message({
					type: 'error',
					message: '请输入邮箱！'
				});
				retur;
			}
			this.load_e = true;
			let params = {
				Type: 2, //找回密码
				Email: this.threeForm.email
			}
			getEmailUtil(params).then((response) => {
				var errorText = response.Info;
				switch (response.StatusCode) {
					case 200:
						this.$message({
							type: 'success',
							message: '邮箱验证码发送成功，请注意查收！'
						});
						this.SMCode_email = response.Data.RegisterCode.toLowerCase();
						this.sideEmail = response.Data.Email;
						this.load_e = false;
						this.time2 = 60;
						this.disabled2 = true;
						this.timer2();
						break;
					case 500:
						this.$message({
							type: 'error',
							message: errorText
						});
						this.time2 = 0;
						this.getBtnTxt_E = "免费获取验证码";
						this.disabled2 = false;
						this.load_e = false;
						break;
					default:
						this.$message({
							type: 'error',
							message: '邮箱验证码发送失败！'
						});
						this.time2 = 0;
						this.getBtnTxt_E = "免费获取验证码";
						this.disabled2 = false;
						this.load_e = false;
				}
			})
		},
		timer() {
			if (this.time > 0) {
				this.time--;
				this.getBtnTxt = this.time + "s后重新获取";
				setTimeout(this.timer, 1000);
			} else {
				this.time = 0;
				this.getBtnTxt = "免费获取验证码";
				this.disabled = false;
			}
		},
		timer2() {
			if (this.time2 > 0) {
				this.time2--;
				this.getBtnTxt_E = this.time2 + "s后重新获取";
				setTimeout(this.timer2, 1000);
			} else {
				this.time2 = 0;
				this.getBtnTxt_E = "免费获取验证码";
				this.disabled2 = false;
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
		changeType4() {
			this.ispassword4 = this.ispassword4 === 'password' ? 'text' : 'password';
			this.fa_eyes4 = this.fa_eyes4 == "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
		},
		submitForm2(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.card2 = false;
					this.card5 = true;
				} else {
					return false;
				}
			});
		},
		submitForm5(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = {
						Type: 1,
						PhoneNum: this.twoForm.inputTel,
						Email: '',
						Password: md5(this.fiveForm.Password)
					}
					getFindPassword(params).then((response) => {
						var errorText = response.Info;
						switch (response.StatusCode) {
							case 200:
								this.card2 = false;
								this.card3 = true;
								this.card5 = false;
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
									message: errorText
								});
								break;

						}
					})
				} else {
					return false;
				}
			});
		},
		submitForm6(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = {
						Type: 2,
						Email: this.threeForm.email,
						Password: md5(this.sixForm.Password2)
					}
					getFindPassword(params).then((response) => {
						var errorText = response.Info;
						switch (response.StatusCode) {
							case 200:
								this.card2 = false;
								this.card3 = false;
								this.card6 = false;
								this.card4 = true;
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
									message: errorText
								});
								break;

						}
					})
					this.card2 = false;
					this.card3 = false;
					this.card4 = true;
				} else {
					return false;
				}
			});
		},
		submitForm3(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.card2 = false;
					this.card6 = true;
				} else {
					return false;
				}
			});
		},
	},
	mounted() {
		this.$refs.loginBox.style.minHeight = (document.documentElement.clientHeight - document.getElementById('header').offsetHeight) + 'px'
	},
	created() {
		this.createCode();
	}
}
</script>

<style lang="scss">
.box-card {
    width: 480px;
    margin: 60px auto;
    display: inline-table;
}
.el-tabs__item.is-active {
    color: #009688 !important;
}
.el-tabs__item:hover {
    color: #009688 !important;
    cursor: pointer;
}
.el-tabs__active-bar {
    background-color: white;
}
.el-tabs__nav-wrap::after {
    height: 0;
}
.yanzhengma_input {
    width: 190px;
}
.disappear {
    visibility: hidden;
}
.verification {
    vertical-align: middle;
    transform: translate(-15px,0);
    width: 102px;
}
.code {
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
}
.nextBtn {
    background: #009688 !important;
    border-color: #009688 !important;
    color: white !important;
    width: 100%;
    &:hover {
        background: #18ab9d !important;
        border-color: #18ab9d !important;
        color: white !important;
    }
}
.findPassWordBackground {
    display: flex;
    background: url("http://tstres.lesoft.cn/menber/contents/images/userbg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}
.linkBtn {
    float: right;
    padding: 3px 0;
    color: #009688 !important;
    &:hover {
        text-decoration: underline;
        color: #009688;
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
    color: #009688;
}
</style>
