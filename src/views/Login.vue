<template>
<div class="loginBackground" @keyup.enter="submitForm('ruleForm')" ref='loginBox' id="loginhEAD">
	<el-card class="box-card" style='height:400px;'>
		<div slot="header" class="clearfix">
			<span style="font-size:28px">登录</span>
			<router-link :to="`/register`">
				<el-button class="linkBtn" type="text">注册账号</el-button>
			</router-link>
		</div>
		<el-form :model="ruleForm" label-position="right" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
			<el-form-item label="账户" prop="Account">
				<el-input type="tel" maxlength="11" placeholder="请输入手机号或邮箱号" v-model="ruleForm.Account" auto-complete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="Password">
				<el-input :type="this.ispassword" placeholder="请输入密码" v-model="ruleForm.Password" @keyup.32.native="inputFunc" auto-complete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
				<i :class="fa_eyes" aria-hidden="true" @keyup.enter.native="submitForm('ruleForm')" @click="changeType()" class="open_close"></i>
			</el-form-item>
			<el-form-item label="验证码" prop="VerifyCode" class="clearfix">
				<el-input style="width:190px;" type="text" placeholder="请输入验证码" class="yanzhengma_input" v-model="ruleForm.VerifyCode" auto-complete="off"></el-input>
				<input type="button" id="code" @click="createCode" class="verification fr" v-model="checkCode" />
			</el-form-item>
			<el-form-item>
				<router-link :to="`/findPassword`">
					<el-button class="linkBtn" type="text">忘记密码</el-button>
				</router-link>
			</el-form-item>

			<el-button class="loginBtn" @click="submitForm('ruleForm')" :loading="btnLoading">登录</el-button>
		</el-form>
	</el-card>
	<el-dialog :visible.sync="dialogVisible" :show-close="false" width="300px" :close-on-click-modal="false" center>
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
            <el-button type="primary" @click="submitFunc()">我已关注</el-button>
            <el-button @click="submitFunc()">稍后再说</el-button>
        </span>
	</el-dialog>
</div>
</template>
<script type="es6">
import {
	mapGetters
} from 'vuex'
import {
	getLogin
} from '../api/api.js'
import md5 from 'js-md5';
import { setCookie } from '../util/index.js'

var code; //在全局定义验证码
export default {
	data() {
		var validatePassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
		};
		var validateAccount = (rule, value, callback) => {
			let regPhoneNum = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			let regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (value === '') {
				callback(new Error('请输入用户名'));
			} else if (!regPhoneNum.test(value) && !regEmail.test(value)) {
				callback(new Error('请输入正确格式的邮箱或手机号'));
			} else {
				callback();
			}
		};
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
			btnLoading: false,
			dialogVisible: false,
			ruleForm: {
				Password: '',
				Account: '',
				VerifyCode: ''
			},
			rules: {
				Password: [{
					validator: validatePassword,
					trigger: 'blur'
				}],
				Account: [{
					validator: validateAccount,
					trigger: 'blur'
				}],
				VerifyCode: [{
					validator: validateVerifyCode,
					trigger: 'blur'
				}]
			},
			checkCode: '',
			ispassword: "password",
			fa_eyes: 'fa fa-eye-slash',
			fullPasd:''
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
	mounted() {
		this.$refs.loginBox.style.minHeight = (document.documentElement.clientHeight - document.getElementById('header').offsetHeight) + 'px'
	},
	methods: {
		inputFunc() {
			this.ruleForm.Password = this.ruleForm.Password.replace(/[\u4e00-\u9fa5]/g, '');
			console.log(this.ruleForm.Password);
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let dataArry = {
						Account: this.ruleForm.Account,
						// Password: this.ruleForm.Password,
						Password: md5(this.ruleForm.Password),
						VerifyCode: this.ruleForm.VerifyCode
					}
					this.btnLoading = true

					getLogin(dataArry).then((response) => {
						switch (response.StatusCode) {
							case 200:
								this.$message({
									type: 'success',
									message: '登录成功！'
								});
								// console.log(response.Data)
								if(response.Data.OpenId == null || response.Data.OpenId == ''){
									this.dialogVisible = true;
								}else{
									this.dialogVisible = false;
								}
								setCookie('userInfo',JSON.stringify(response.Data))
								// this.$cookie.set('userInfo', JSON.stringify(response.Data))
								this.$store.dispatch('SET_USERINFO', response.Data);
								this.$store.commit('SET_STEPTIP', response.Data.State);

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
									message: '登录失败！'
								});
						}
						this.btnLoading = false
					})

				} else {
					return false;
				}
			});
		},
		submitFunc() {
			this.dialogVisible = false
			this.$router.push({
				path: '/'
			})
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
		changeType() {
			this.ispassword = this.ispassword === 'password' ? 'text' : 'password';
			this.fa_eyes = this.fa_eyes == "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash"; //密码的显示和隐藏 眼睛图标
		}
	},
	created() {
		this.createCode();
	}
}
</script>
<style lang="scss">
.loginBackground {
    display: flex;
    background: url("http://tstres.lesoft.cn/menber/contents/images/userbg.jpg") no-repeat center;
	background-size:cover;
}
#loginhEAD {
    .el-dialog__header {
        background: white !important;
    }

.box-card {
    width: 480px;
    margin: 60px auto;
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
#code {
    font-size: 18px;
    letter-spacing: 3px;
    color: #053d84;
    background: #f2f2f5;
    margin-left: 30px;
    line-height: 37px;
    height: 40px;

    width: 100px;
    border-radius: 3px;
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
.loginBtn {
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
.qrcode-img {
    height: auto;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #3988ed !important;
}
.qrcode {
    margin: -30px 0 0;
    text-align: center;
}
.qrcode-img p {
    margin-bottom: 10px;
    color: #3988ed !important;
}
.qrcode-img > img {
    width: 160px;
    height: 160px;
    margin-left: auto;
    margin-right: auto;
    display: block;
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
}
.qrcode-content .mb20 {
    margin-bottom: 20px;
}
.qrcode-content h3 {
    font-size: 18px;
    margin-top: 0;
    text-align: left;
}
.qrcode-content p {
    margin-left: 30px;
    color: white;
    font-size: 15px;
    margin-top: 7px;
    text-align: left;
}
.qrcode-content h3 > span {
    margin-right: 10px;
}
.qrcode-content h3 > span > img {
    width: 20px;
    height: 20px;
}
.wapper {
    padding-bottom: 0!important;
}
}
</style>
