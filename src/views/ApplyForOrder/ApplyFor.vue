<template>
    <div class="container applyFor-wapper" v-loading="loading">
        <div class="applyFor-header bg-white marT30 marB20">
            <h4 class="c-3 fs28">提交公租房租房申请</h4>
            <ul class="clearfix marT10">
                <li class="fl">
                    <label>姓名：</label>
                    <span>{{Name}}</span>
                </li>
                <li class="fl">
                    <label>身份证号码：</label>
                    <span>{{IDCard}}</span>
                </li>
                <li class="fl">
                    <label>手机号码：</label>
                    <span>{{PhoneNum}}</span>
                </li>
            </ul>
        </div>
        <div class="applyFor-content bg-white marB20">
            <div v-show="userInfo.State == '1001'||userInfo.State=='1002'">
                <ul class="clearfix">
                    <li :class="applyForTab>=1?'active':''">1.完善申请人信息</li>
                    <li :class="applyForTab>=2?'active':''">2.共同申请人</li>
                    <li :class="applyForTab>=3?'active':''">3.申请人现有住房</li>
                    <li :class="applyForTab>=4?'active':''">4.申请人单位信息</li>
                </ul>
            </div>
            <div v-show="userInfo.State != '1001' && userInfo.State !='1002'">
                <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content="请点击切换浏览单据内容，数据已提交，无法再次修改">
                    <ul class="clearfix new_applyFor_nav" slot="reference">
                        <li style="cursor:pointer;" :class="applyForTab == 1? 'active' : ''" @click="tabCheck('1')">
                            <router-link to="/applyFor">1.完善申请人信息</router-link>
                        </li>
                        <li style="cursor:pointer;" :class="applyForTab == 2? 'active' : ''" @click="tabCheck('2')">
                            <router-link to="/applyFor/SecondStep">2.共同申请人</router-link>
                        </li>
                        <li style="cursor:pointer;" :class="applyForTab == 3? 'active' : ''" @click="tabCheck('3')">
                            <router-link to="/applyFor/ThirdStep">3.申请人现有住房</router-link>
                        </li>
                        <li style="cursor:pointer;" :class="applyForTab == 4? 'active' : ''" @click="tabCheck('4')">
                            <router-link to="/applyFor/FourthStep">4.申请人单位信息</router-link>
                        </li>
                    </ul>
                </el-popover>
            </div>
            <keep-alive>
                <router-view v-if='$route.meta.keepAlive'/>
            </keep-alive>
            <router-view v-if='!$route.meta.keepAlive'/>
        </div>
    </div>
</template>
<script type="es6">
    import { mapGetters } from 'vuex'
    import { getUserInfo,getApplyForCurrentCode } from '../../api/api.js'
    export default{
        data(){
            return {
                loading:true,
                Name:'',
                IDCard:'',
                PhoneNum:''
            }
        },
        computed:{
            ...mapGetters(['applyForTab','userInfo'])
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_HEADTOGGLE',1)
                document.body.style.backgroundColor = '#eee'
            })
        },
        beforeRouteLeave(to,from,next){
            this.$store.commit('SET_HEADTOGGLE',0)
            document.body.style.backgroundColor = '#fff'
            this.$store.commit('SET_APPLYFORCODE','')
            this.$cookie.delete('applyForCode')
            this.$store.commit('SET_ISUSERENTER','')
            this.$cookie.delete('isUserEnter')
            next()
        },
        methods:{
            tabCheck(index){
                this.$store.commit('SET_APPLYFORTAB',index)
            },
        },
        created(){
            getUserInfo({AccountId:this.$store.getters.userInfo.AccountId}).then((response) =>{
                switch(response.StatusCode){
                    case 500 :
                        this.$message.error('个人信息请求失败'+response.Info)
                        break;
                    case 200:
                    this.$store.dispatch('SET_USERINFOFORM',response.Data);
                    this.Name=response.Data.Name,
                    this.IDCard=response.Data.IDCard,
                    this.PhoneNum=response.Data.Phone,
                    this.loading = false
                }
            }).catch(error => {
                this.$message.error(error)
            })
            if(!this.$cookie.get('applyForCode')){
                getApplyForCurrentCode({QueryJson:{AccountId:this.$store.getters.userInfo.AccountId}}).then(response =>{
                    switch(response.StatusCode){
                        case 500 :
                            this.$message.error('获取当前code请求失败'+response.Info)
                            break;
                        case 200:
                            if(response.Data != ''){
                                this.$store.dispatch('SET_APPLYFORCODE',JSON.parse(response.Data).bill.Code)
                                this.loading = false
                            }
                        break;
                    }


                })
            }else{
                this.$store.dispatch('SET_APPLYFORCODE',this.$cookie.get('applyForCode'))
            }
        }
    }
</script>
<style lang="scss">
.applyFor-wapper{
    .applyFor-header{
        padding:20px;
        box-shadow: 0px 4px 8px #ddd;
        border-radius:2px;
        ul{
            li{
                width:33.33333%;
                color:#666;
            }
        }
    }
    .applyFor-content{
        box-shadow: 0px 4px 8px #ddd;
        padding:15px;
        ul{
            background: #f0f0f0;
            li{
                float:left;
                width:25%;
                text-align: center;
                color:#333;
                height:50px;
                line-height: 50px;
                position: relative;
                &.active{
                    color:#fff;
                    background: #009688;
                    &:after{
                        content:'';
                        display: block;
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-top: 25px solid transparent;
                        border-left: 25px solid #009688;
                        border-bottom: 25px solid transparent;
                        position: absolute;
                        right: -25px;
                        top: 0;
                    }
                }
                &:nth-of-type(4).active:after{
                    display: none;
                }

            }
        }
        .el-form{
            padding:30px 0 0;
            &.step01-ruleForm{
                .el-form-item{
                    padding-bottom: 10px;
                    &:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3),&:nth-of-type(4){
                        width:265px;
                        .el-form-item__content{
                            width:155px;
                        }
                    }
                    &:nth-of-type(1) .el-form-item__content{
                        width:108px;
                    }
                    &:nth-of-type(2),&:nth-of-type(3),&:nth-of-type(4){
                        label{
                            width:110px!important;
                        }
                    }
                    &:nth-of-type(5),&:nth-of-type(7){
                        width:817px;
                        .el-form-item__content{
                            width:676px;
                        }
                    }
                    &:nth-of-type(6),&:nth-of-type(8){
                        width:265px;
                        .el-form-item__content{
                            width:155px;
                        }
                        label{
                            width:110px!important;
                        }
                    }
                    &:nth-of-type(9),&:nth-of-type(11),&:nth-of-type(13),&:nth-of-type(15){
                        width:450px;
                    }
                    &:nth-of-type(10),&:nth-of-type(12),&:nth-of-type(14){
                        width:660px;
                        .el-form-item__content{
                            width:495px;
                        }
                    }
                    &:nth-of-type(16),&:nth-of-type(17){
                        width:100%;
                        .el-form-item__content{
                            width:900px;
                        }
                    }
                    &:nth-of-type(18){
                        width:100%;
                        text-align: center;
                        .el-checkbox-group{
                            display: inline-block;
                            margin-right:10px;
                        }
                        a:hover{
                            color:#009688;
                        }
                    }
                }
                ul.el-upload-list{
                    li{
                        width:248px;
                        height:132px;
                    }
                }
                .el-upload--picture-card{
                    height:133px;
                    width:133px;
                    margin-bottom:8px;
                }
                .el-upload--picture-card:hover, .el-upload:focus{
                color:#009688;
                border-color:#009688;
            }
            }
            &.step02-ruleForm{
                border-bottom:1px solid #ddd;
                .el-form-item{
                    width:560px;
                    &:nth-of-type(1){
                        left:10px;
                        top:90px;
                        label{
                            font-size: 30px;
                            color:#333;
                            text-align: left;
                        }
                    }
                    .el-form-item__content{
                        width:420px;
                        .el-select{
                            width:100%;
                        }
                    }
                }
            }
            &.step03-ruleForm{
                .step03-ruleForm-01{
                    padding:0 0 0 60px;
                    margin-bottom:20px;
                    border-bottom:1px solid #ddd;
                    >h4{
                        position: relative;
                        left:-60px;
                    }
                    >span{
                        left:15px;
                        top:100px;
                    }
                    .el-form-item{
                        width:525px;
                        .el-form-item__content{
                            .el-input{
                                width:355px;
                            }
                        }
                        &:nth-of-type(2){
                            .el-form-item__content{
                                width:100%;
                                >div{
                                    display: inline-block;
                                    &.el-input{
                                        margin-left:30px;
                                        width:275px;
                                    }
                                }
                            }
                        }
                    }
                }
                .step03-ruleForm-02{
                    .el-form-item{
                        &:nth-of-type(2){
                            .el-form-item__content{
                                width:auto;
                                .el-input{
                                    margin-left: 0!important;
                                    width:355px!important;
                                }
                            }
                        }
                    }
                }
            }
            &.step04-ruleForm{
                border-bottom:1px solid #ddd;
                .el-form-item{
                    &:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3){
                        width:100%;
                        .el-form-item__content{
                            width:970px;
                        }
                    }
                    &:nth-of-type(7){
                        width:920px;
                    }
                    &:nth-of-type(4),&:nth-of-type(5),&:nth-of-type(6){
                        width:365px;
                        .el-form-item__content{
                            width:220px;
                        }
                    }
                }
            }
        }
        .stpe03_tip{
            padding:10px 30px 20px;
            p{
                padding-bottom: 5px;
            }
        }
        .el-dialog{
            .el-dialog__header{
                background: #009f95;
                .el-dialog__title{
                    color:#fff;
                }
                .el-dialog__headerbtn .el-dialog__close{
                    color:#fff!important;
                }
            }
        }
    }
}
ul.new_applyFor_nav{
    li{
        a{
            display: block;
            width:100%;
            height:100%;
        }
        &.active{
            a{
                color:#fff;
            }
        }
        &.active:after{
            display:none!important;
        }
    }
}
.el-popover.el-popper.el-popover--plain{
    color:#009688;
}
</style>
