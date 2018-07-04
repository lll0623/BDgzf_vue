<template>
<div class="registerBackground" id="registerBox" ref='loginBox'>
	<el-card class="box-card" v-show="card1">
		<div slot="header" class="clearfix">
			<span style="font-size:28px">注册账号</span>
			<router-link :to="`/login`">
				<el-button class="linkBtn" type="text">已有账号，立即登录</el-button>
			</router-link>
		</div>
		<el-form :model="registerForm" label-position="right" :rules="rules" ref="registerForm" label-width="120px" class="demo-registerForm">
			<el-form-item label="手机号码" prop="PhoneNum">
				<el-input type="tel" maxlength="11" v-on:input="funcSendcode" v-model="registerForm.PhoneNum" auto-complete="off" placeholder="请输入您的手机号码"></el-input>
			</el-form-item>
			<el-form-item label="手机验证码" prop="ValidateCode">
				<el-input style="width:120px;" type="text" v-model="registerForm.ValidateCode" auto-complete="off" placeholder="请输入验证码"></el-input>
				<el-button style="margin-left:20px;" :disabled="disabled" @click="sendcode">{{ getBtnTxt }}</el-button>
			</el-form-item>
			<el-button class="loginBtn" @click="submitForm('registerForm')">下一步</el-button>
		</el-form>
	</el-card>
	<el-card class="box-card" v-show="card2">
		<div slot="header" class="clearfix">
			<span style="font-size:28px">注册账号</span>
		</div>
		<el-form :model="registerForm2" label-position="right" :rules="rules2" ref="registerForm2" label-width="120px" class="demo-registerForm">
			<el-form-item label="真实姓名" prop="RealName">
				<el-input type="text" v-model="registerForm2.RealName" auto-complete="off" placeholder="请输入您的真实姓名"></el-input>
			</el-form-item>
			<el-form-item label="身份证号码" prop="IDCard">
				<el-input type="text" v-model="registerForm2.IDCard" auto-complete="off" placeholder="请输入您的身份证号码"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="Email">
				<el-input type="text" v-model="registerForm2.Email" auto-complete="off" placeholder="请输您的邮箱"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="Password">
				<el-input :type="this.ispassword" @keyup.32.native="inputFunc(1)" v-model="registerForm2.Password" auto-complete="off" placeholder="请输入您的密码"></el-input>
				<i :class="fa_eyes" aria-hidden="true" @click="changeType()" class="open_close"></i>
			</el-form-item>
			<el-form-item label="确定密码" prop="confirm_pass">
				<el-input :type="this.ispassword2" @keyup.32.native="inputFunc(2)" v-model="registerForm2.confirm_pass" auto-complete="off" placeholder="请确认密码"></el-input>
				<i :class="fa_eyes2" aria-hidden="true" @click="changeType2()" class="open_close"></i>
			</el-form-item>
			<el-form-item prop="agree" label-width="40px">
				<el-checkbox v-model="registerForm2.type" label="agree" @change="handType()">
					我已经阅读并同意
					<a @click="serverDialogVisible = true" class="linkBtn" style="padding:0px;">《公租房注册用户条款与声明》
					</a>
				</el-checkbox>
				<div class="tishixiaoxi" v-show="this.showCheckbox">请接受我们的声明</div>
			</el-form-item>

			<el-button class="loginBtn" @click="submitForm2('registerForm2')">注册</el-button>
		</el-form>
	</el-card>
	<!-- 申请须知 -->
	<el-dialog title="浦东新区公共租赁住房申请须知" :visible.sync="serverDialogVisible" width="60%">
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
import {
	getRegister,
	getSMSHelper,
	getIsExistPhone,
	getIsExistEmail,
	getIsExistIDCard
} from '../api/api.js'
import md5 from 'js-md5';

var code; //在全局定义验证码
export default {
	layout: 'nolayout',
	data() {
		var validateRealName = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('真实姓名不能为空'));
			} else {
				callback();
			}
		};
		var validateIDCard = (rule, value, callback) => {
			let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
			let params = {
				IDCard :value
			}
			getIsExistIDCard(params).then((response) => {
				var errorText = response.Info;
				switch (response.StatusCode) {
					case 200:
						if (response.Data == true) {
							this.isIDCard = true;
						}else if(response.Data == false){
							this.isIDCard = false;
						}
						break;
					case 500:
						break;
					default:
						break;

				}
				if (value === '') {
					callback(new Error('身份证号码必须填写'));
				} else if (reg.test(value) === false) {
					callback(new Error('请输入正确的身份证号'));
				} else if (this.isIDCard) {
					callback(new Error('该身份证号已注册'));
				} else {
					callback();
				}
			})
		};
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
		var validateValidateCode = (rule, value, callback) => {
			let PhoneNum = this.registerForm.PhoneNum
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机验证码不能为空'));
			} else if (!reg.test(PhoneNum)) {
				callback(new Error('请输入正确的手机号码'));
			} else if (md5(value) !== this.SMCode) {
				callback(new Error('短信验证码不正确'));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			let params = {
				Email :value
			}
			getIsExistEmail(params).then((response) => {
				var errorText = response.Info;
				switch (response.StatusCode) {
					case 200:
						if (response.Data == true) {
							this.isEmail = true;
						}else if(response.Data == false){
							this.isEmail = false;
						}
						break;
					case 500:
						break;
					default:
						break;

				}
				if (value !== '') {
					if (!reg.test(value)) {
						callback(new Error('请输入正确格式的邮箱'));
					} else if (this.isEmail) {
						callback(new Error('该邮箱已注册'));
					}else {
						callback();
					}
				} else {
					callback();
				}
			})

		};
		var validatePassword = (rule, value, callback) => {
			let reg = /^[1-9]\d*$|^0$/;
			let patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if (value.length < 6) {
				callback(new Error("密码长度必须大于六位！"));
			} else if (reg.test(value) == true) {
				callback(new Error("密码不能为纯数字！"));
			} else if (patrn.exec(value)) {
				callback(new Error("密码不能有汉字！！"));
			} else {
				callback();
			}
		};
		var validateConfirm_pass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value !== this.registerForm2.Password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		};
		return {
			card1: true,
			card2: false,
			disabled: true,
			serverDialogVisible: false,
			time: 0,
			getBtnTxt: "免费获取验证码",
			SMCode: '', //短信接口返回的验证码
			checkCode: '',
			ispassword: "password",
			fa_eyes: 'fa fa-eye-slash',
			ispassword2: "password",
			fa_eyes2: 'fa fa-eye-slash',
			sidePhone: '',
			registerForm: {
				PhoneNum: '',
				ValidateCode: '',
			},
			rules: {
				PhoneNum: [{
					validator: validatePhoneNum,
					trigger: 'blur'
				}],
				ValidateCode: [{
					validator: validateValidateCode,
					trigger: 'blur'
				}],
			},
			registerForm2: {
				RealName: '',
				IDCard: '',
				Email: '',
				Password: '',
				confirm_pass: '',
				type: []
			},
			rules2: {
				RealName: [{
					validator: validateRealName,
					trigger: 'blur'
				}],
				IDCard: [{
					validator: validateIDCard,
					trigger: 'blur'
				}],
				Email: [{
					validator: validateEmail,
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
			showCheckbox: false,
			isPhone: false,
			isEmail: false,
			isIDCard: false

		};
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			// console.log(vm.$store)
			vm.$store.commit('SET_HEADTOGGLE', 1)
		})
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit('SET_HEADTOGGLE', 0)
		next()
	},
	methods: {
		funcSendcode() {
			if (this.registerForm.PhoneNum == '') {
				this.disabled = true;
			} else {
				this.disabled = false;
			}
		},
		inputFunc(type) {
			switch (type) {
				case 1:
					this.registerForm2.Password = this.registerForm2.Password.replace(/[\u4e00-\u9fa5]/g, '');
					break;
				case 2:
					this.registerForm2.confirm_pass = this.registerForm2.confirm_pass.replace(/[\u4e00-\u9fa5]/g, '');
					break;
				default:
			}
		},
		sendcode() {
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (this.registerForm.PhoneNum === '') {
				return;
			}
			if (!reg.test(this.registerForm.PhoneNum)) {
				return
			}
			let params = {
				PhoneNum: this.registerForm.PhoneNum
			}
			getIsExistPhone(params).then((response) => {
				var errorText = response.Info;
				switch (response.StatusCode) {
					case 200:
						if (response.Data == true) {
							this.isPhone = true;
						} else if (response.Data == false) {
							this.isPhone = false;
						}
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
			setTimeout(() => {
				if (this.isPhone) {
					this.$message({
						type: 'error',
						message: '该手机号已注册！'
					});
					this.registerForm.PhoneNum = "";
					return;
				}
				let paramss = {
					Type: 1, //注册类型
					PhoneNum: this.registerForm.PhoneNum
				}
				getSMSHelper(paramss).then((response) => {
					var errorText = response.Info;
					switch (response.StatusCode) {
						case 200:
							this.$message({
								type: 'success',
								message: '短信验证码发送成功，请注意查收！'
							});
							this.SMCode = response.Data.RegisterCode.toLowerCase();
							this.sidePhone = response.Data.PhoneNum;
							this.time = 60;
							this.disabled = true;
							this.timer();
							break;
						case 500:
							this.$message({
								type: 'error',
								message: errorText
							});
							this.time = 0;
							this.getBtnTxt = "获取验证码";
							this.disabled = false;
							break;
						default:
							this.$message({
								type: 'error',
								message: '短信验证码发送失败！'
							});
							this.time = 0;
							this.getBtnTxt = "获取验证码";
							this.disabled = false;
					}
				})
			}, 1000)
		},
		timer() {
			if (this.time > 0) {
				this.time--;
				this.getBtnTxt = this.time + "s后重新获取";
				setTimeout(this.timer, 1000);
			} else {
				this.time = 0;
				this.getBtnTxt = "获取验证码";
				this.disabled = false;
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.card1 = false;
					this.card2 = true;
				} else {
					return false;
				}
			});

		},
		submitForm2(formName) {

			let checkBoxLength = this.registerForm2.type.length;
			if (checkBoxLength < 1) {
				this.showCheckbox = true;
			} else {
				this.$refs[formName].validate((valid) => {
					// console.log(valid);
					if (valid) {
						let dataArry = {
							"RealName": this.registerForm2.RealName,
							"IDCard": this.registerForm2.IDCard,
							"PhoneNum": this.registerForm.PhoneNum,
							"Email": this.registerForm2.Email,
							"Password": md5(this.registerForm2.Password),
							"Type": '2',
						}
						getRegister(dataArry)
							.then((response) => {
								var errorText = response.Info;
								switch (response.StatusCode) {
									case 200:
										this.$message({
											type: 'success',
											message: '注册成功！'
										});
										setTimeout(() => {
											this.$router.push("/login");
										}, 2000)
										break;
									case 500:
										this.$message({
											type: 'error',
											message: errorText
										});
										// setTimeout(() => {
										// 	this.$router.push({
										// 		path: `/login`,
										// 	})
										// }, 1000)
										break;
									default:
										this.$message({
											type: 'error',
											message: '注册失败！'
										});
										// setTimeout(() => {
										// 	this.$router.push("/login");
										// }, 1000)
								}
							})
					} else {
						return false;
					}
				});
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
		handType() {
			this.showCheckbox = false;
		}
	},
	mounted() {
		this.$refs.loginBox.style.minHeight = (document.documentElement.clientHeight - document.getElementById('header').offsetHeight) + 'px'
	},
	created() {}
}
</script>

<style lang="scss">
.registerBackground {
    display: flex;
    background: url("http://tstres.lesoft.cn/menber/contents/images/userbg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}
#registerBox {
    .box-card {
        width: 480px;
        margin: 60px auto;
        display: inline-table;
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
        margin-top: -3px;
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
    .tishixiaoxi {
        margin-top: -7px;
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        position: absolute;
        top: 100%;
        left: 0;
        font-weight: 500;
    }
    .defined_server_content h5,
    .defined_server_content p {
        line-height: 26px;
        text-indent: 2em;
    }
}
</style>
