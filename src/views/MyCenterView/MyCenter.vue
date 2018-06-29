<template>
    <div class="myCenter-wrap clearfix container">
        <div class="fl myCenter-nav-wrap" ref="myCenterNav">
            <div class="myCenter-info tc">
                <img src="../../assets/images/UserCenter_default.png" class="marB10">
                <p class="c-3">欢迎你,{{ Name }}</p>
                <a class="text-primary xiugai" @click="updatePwdForm_DP = true">修改密码</a>
            </div>
            <ul class="myCenter-nav marT30">
                <li class="rel" :class="myCenterNav==1?'active':''">
                    <span class="baged abs white fs12 block tc" v-if="userInfo && this.$store.getters.isReadOrNot > 0">{{ this.$store.getters.isReadOrNot }}</span>
                    <router-link to="/myCenter">我的消息</router-link>
                </li>
                <li :class="myCenterNav==2?'active':''">
                    <router-link to="/myCenter/userApplyFor">我的申请</router-link>
                </li>
                <li :class="myCenterNav==6?'active':''">
                    <router-link to="/myCenter/favourRooms">我的关注房间</router-link>
                </li>
                <li :class="myCenterNav==4?'active':''">
                    <router-link to="/myCenter/seeRoomList">我的看房申请</router-link>
                </li>
                <li :class="myCenterNav==3?'active':''">
                    <router-link to="/myCenter/selectedRooms">我的选房</router-link>
                </li>
                <!-- <li :class="myCenterNav==5?'active':''">
                    <router-link to="/myCenter/signedRooms">已签约房间列表</router-link>
                </li> -->
                <li :class="myCenterNav==7?'active':''">
                    <router-link to="/myCenter/userContract">我的合同</router-link>
                </li>
                <li :class="myCenterNav==8?'active':''">
                    <router-link to="/myCenter/userCenter">个人信息管理</router-link>
                </li>
            </ul>
        </div>
        <div class="fl myCenter-cont" ref="myCenterCont">
            <keep-alive>
                <router-view v-if='$route.meta.keepAlive'/>
            </keep-alive>
            <router-view v-if='!$route.meta.keepAlive'/>
        </div>
        <!-- ###############修改密码 开始################## -->
        <!-- 手机方式 修改密码 -->
        <el-dialog
            v-loading="loadingPassword"
            element-loading-text="密码修改中。。。"
            element-loading-spinner="el-icon-loading"
            title="修改密码"
            :visible.sync="updatePwdForm_DP"
            width="435px"
            >
            <el-form :model="updatePwd_phoneForm" label-position="right" :rules="updatePwd_phoneRules" ref="updatePwd_phoneForm" label-width="120px" class="demo-updatePwd_phoneForm">
                <el-form-item label="原密码" prop="OldPassword">
                    <el-input :type="this.ispassword3" @keyup.32.native="inputFunc(1)" placeholder="请输入原密码" v-model="updatePwd_phoneForm.OldPassword" auto-complete="off"></el-input>
                    <i :class="fa_eyes3" aria-hidden="true" @click="changeType3()" class="open_close"></i>
                </el-form-item>
                <el-form-item label="新密码" prop="Password">
                    <el-input :type="this.ispassword" @keyup.32.native="inputFunc(2)" placeholder="请输入新密码" v-model="updatePwd_phoneForm.Password" auto-complete="off"></el-input>
                    <i :class="fa_eyes" aria-hidden="true" @click="changeType()" class="open_close"></i>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirm_pass">
                    <el-input :type="this.ispassword2" @keyup.32.native="inputFunc(3)" placeholder="请确认新密码" v-model="updatePwd_phoneForm.confirm_pass" auto-complete="off"></el-input>
                    <i :class="fa_eyes2" aria-hidden="true" @click="changeType2()" class="open_close"></i>
                </el-form-item>
                <el-form-item label="验证码" prop="VerifyCode">
                    <el-input type="text" placeholder="请输入验证码" class="yanzhengma_input" v-model="updatePwd_phoneForm.VerifyCode" auto-complete="off"></el-input>
                    <input type="button"  @click="createCode" class="verification" v-model="checkCode" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updatePwd_phoneSub('updatePwd_phoneForm')">确定</el-button>
                <el-button @click="updatePwdForm_DP = false;resetForm('updatePwd_phoneForm')">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script type="es6">
    import { mapGetters } from 'vuex'
    import { getUpdatePwd,getUserInfo } from '../../api/api.js'
    import { getCookie } from '../../util/index.js'
    import md5 from 'js-md5';
    var code; //在全局定义验证码
    export default{
        data() {
            // //确认密码 手机校验
            // var validateConfirm_pass_phone = (rule, value, callback) => {
            //   if (value === '') {
            //     callback(new Error('请输入确认密码'));
            //   } else if (value !== this.updatePwd_phoneForm.Password) {
            //     callback(new Error('两次输入密码不一致!'))
            //   } else {
            //     callback()
            //   }
            // };
            //原密码 校验
            var validateOldPassword = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('密码不能为空'));
            }
            // else if(value.length <6 ){
            //  callback(new Error('密码长度不能小于六位'));
            // }
            else {
                callback();
              }
            };
            //新密码 校验
            var validatePassword = (rule, value, callback) => {
                let reg=/^[1-9]\d*$|^0$/;
              if (value === '') {
                callback(new Error('密码不能为空'));
            } else if(value.length <6 ){
                callback(new Error('密码长度不能小于六位'));
            } else if (reg.test(value)==true) {
				callback(new Error("密码不能为纯数字！"));
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
                Name:'',
                loadingPassword:false,
                updatePwdForm_DP:false, //修改密码的弹框 手机方式
                ispassword: "password",
                fa_eyes: 'fa fa-eye-slash',
                ispassword2: "password",
                fa_eyes2: 'fa fa-eye-slash',
                ispassword3: "password",
                fa_eyes3: 'fa fa-eye-slash',
                PersonalInformation:{
                    Phone:'',
                    EMail:''
                },
                checkCode: '',
                //#######修改密码 内容 开始#############
                    updatePwd_phoneForm:{
                        OldPassword:"",//原密码
                        Password:"", //新密码
                        confirm_pass:"", //确认新密码
                        VerifyCode:""
                    },
                    updatePwd_phoneRules: {
                        OldPassword:[{
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
                }
        },
        computed:{
            ...mapGetters(['myCenterNav','userInfo'])
        },
        methods:{
            inputFunc(type) {
                switch (type) {
                    case 1:
                        this.updatePwd_phoneForm.OldPassword = this.updatePwd_phoneForm.OldPassword.replace(/[\u4e00-\u9fa5]/g, '');
                        break;
                    case 2:
                        this.updatePwd_phoneForm.Password = this.updatePwd_phoneForm.Password.replace(/[\u4e00-\u9fa5]/g, '');
                        break;
                    case 3:
                        this.updatePwd_phoneForm.confirm_pass = this.updatePwd_phoneForm.confirm_pass.replace(/[\u4e00-\u9fa5]/g, '');
                        break;
                    default:
                }

    		},
            //手机-修改密码-提交
            updatePwd_phoneSub(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {
                            // PhoneNum: this.PersonalInformation.Phone,
                            // Email: this.PersonalInformation.EMail,
                            // VerifyCode: this.updatePwd_phoneForm.VerifyCode,
                            AccountId: this.$store.getters.userInfo.AccountId,
                            OldPassword: md5(this.updatePwd_phoneForm.OldPassword),
                            Password: md5(this.updatePwd_phoneForm.Password)
                        }
                        getUpdatePwd(params).then((response) => {
                            this.loadingPassword = true;
                            var errorText = response.Info;
                            switch (response.StatusCode) {
                                case 200:
                                    this.$message({
                                        type: 'success',
                                        message: '密码修改成功！'
                                    });
                                    this.updatePwdForm_DP = false;
                                    this.loadingPassword = false;
                                    //退出登录操作
                                    break;
                                case 500:
                                    this.$message({
                                        type: 'error',
                                        message: errorText
                                    });
                                    this.loadingPassword = false;
                                    break;
                                default:
                                this.$message({
                                    type: 'error',
                                    message: '密码修改失败！'
                                });
                                    this.loadingPassword = false;
                            }
                        })
                    } else {
                        this.$message({
                           type: 'error',
                           message: '密码修改失败！'
                       });
                    this.loadingPassword = false;
                    return false;
                    }
                });
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
            getUserInfoMessage(params) {
				//个人信息显示接口
				getUserInfo(params).then((response) =>{
					this.PersonalInformation = response.Data;
                    this.$store.dispatch('SET_USERINFOFORM',response.Data);
				})
			}
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                document.body.style.backgroundColor = '#eee'
            })
        },
        beforeRouteLeave(to,from,next){
            document.body.style.backgroundColor = '#fff'
            next()
        },
        mounted(){
            this.$nextTick(() =>{
                this.$refs.myCenterNav.style.minHeight = (document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight-120) +'px'
                this.$refs.myCenterCont.style.minHeight = (document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight-90) +'px'
            })
        },
        created(){
            if(this.$store.getters.userInfo){
                this.Name = JSON.parse(getCookie('userInfo')).Name
                this.createCode();
                var params = {
                    AccountId:this.$store.getters.userInfo.AccountId
                }
    			this.getUserInfoMessage(params);
            }
        }
    }
</script>
<style lang="scss">
.myCenter-wrap{
    padding:30px 0;
    .myCenter-nav-wrap{
        background: #fff;
        padding:15px;
        width:230px;
        margin-right:30px;
        box-shadow: 0px 3px 10px #999;
        .myCenter-info{
            .c-3{
                margin-bottom: 5px;
            }
            img{
                width:75px;
                height:75px;
                border-radius:50%;
            }
            .xiugai{
                color: #009688;
                cursor: pointer;
            }
        }
        ul.myCenter-nav{
            li{
                a{
                    color:#333;
                    display: block;
                    width:210px;
                    height:40px;
                    line-height: 40px;
                    padding:0 10px;
                }
                &:hover{
                    background: #eee;
                }
                &.active{
                    background: #009688;
                    a{
                        color:#fff;
                    }
                }
                .baged{
                    width:20px;
                    height:20px;
                    line-height: 20px;
                    background: #f44336;
                    border-radius: 50%;
                    top:-8px;
                    left:-8px;
                }
            }
        }
    }
    .myCenter-cont{
        background: #fff;
        box-shadow: 0px 3px 10px #999;
        width:850px;
        border-radius: 2px;
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
    .yanzhengma_input {
        width: 145px;
    }
    .verification {
        font-size: 18px;
        letter-spacing: 3px;
        color: #053d84;
        background: #f2f2f5 !important;
        margin-left: 30px;
        line-height: 37px;
        height: 40px;
        float: right;
        border-radius: 3px;
        vertical-align: middle;
        transform: translate(-15px,0);
        width: 100px;
    }
}

</style>
