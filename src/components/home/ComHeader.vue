<template>
    <div id="header" ref="header">
        <!-- 身份证补全 -->
        <el-dialog
            title="请补全身份证"
            :visible.sync="dialogVisible"
            append-to-body
            width="40%">
            <el-input v-model="input_IDCard" placeholder="请输入您的身份证号码"></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit_IDCard" :loading="btnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <div class="header" v-if="head.toggle===0">
            <div class="container clearfix rel">
                <span class="abs step_tip" v-if='getStepTip && userInfo'>{{getStepTip}}</span>
                <router-link to="/" class="fl block">
                    <img src="../../assets/images/nlogo.png" class="nlogo vm marR15">
                    <div class="inline">
                        <img src="../../assets/images/logo.png" class="logo vm marR10">
                        <span class="tit c-f0f0f0 fs20">上海浦东新区公租房网上业务平台</span>
                    </div>
                </router-link>
                <el-menu class="el-menu-demo index_nav fr" mode="horizontal">
                    <template v-for= "(item,index) in $router.options.routes">
                        <el-submenu :index= "index+''" v-if="item.leaf && !item.hidden">
                            <template slot="title">
                                <i :class="item.iconCls"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="child.path != '' && child.name !='提交申请' && child.name !='续租申请' && child.name !='退租申请'&& child.name !='个人中心' && child.name !='我的进度'">
                                <router-link :to="child.path">
                                    <i :class="child.iconCls"></i>
                                    <span>{{child.name}}</span>
                                </router-link>
                            </el-menu-item>
                            <el-menu-item :index="child.path" :key="child.path" v-else-if="child.path != '' && child.name =='续租申请'">
                                <a href="javascript:;" class='block' @click="hasRelet('/relet')">
                                    <span>{{child.name}}</span>
                                </a>
                            </el-menu-item>
                            <el-menu-item :index="child.path" :key="child.path" v-else-if="child.path != '' && child.name =='退租申请'">
                                <a href="javascript:;" class='block' @click="hasRetreat('/retreat')">
                                    <span>{{child.name}}</span>
                                </a>
                            </el-menu-item>
                            <el-menu-item :index="child.path" :key="child.path" v-else-if="child.path != '' && child.name =='提交申请'">
                                <a href="javascript:;" class='block' @click="hasIDCard('/applyFor')">
                                    <span>{{child.name}}</span>
                                </a>
                            </el-menu-item>
                            <el-menu-item :index="child.path" :key="child.path" v-else-if="child.path != '' && child.name =='我的进度'">
                                <a href="javascript:;" class='block' @click="hasIDCard('/myProcess')">
                                    <span>{{child.name}}</span>
                                </a>
                            </el-menu-item>
                            <el-menu-item :index="child.path" :key="child.path" v-else-if="child.path != '' && child.name =='个人中心'">
                                <a href="javascript:;" class='block' @click="hasIDCard('/myCenter')">
                                    <span>{{child.name}}</span>
                                </a>
                            </el-menu-item>
                            <el-menu-item :index="child.path" :key="child.path" v-else>
                                <a href="javascript:;" class='block' @click="logOut()">
                                    <span>{{child.name}}</span>
                                </a>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item  :index="item.path" :key="item.path" v-if="!item.leaf&&!item.hidden">
                            <router-link :to="item.path">
                                <i :class="item.iconCls"></i>
                                {{item.name}}
                            </router-link>
                        </el-menu-item>
                    </template>
                </el-menu>
            </div>
        </div>
        <div class="login-header header clearfix" v-if="head.toggle===1" style="background:#fff;">
            <router-link to="/" class="fl block">
                <img src="../../assets/images/logo.png" class="logo vm marR10 marL20">
                <span class="tit green fs20">上海浦东新区公租房网上业务平台</span>
            </router-link>
            <div v-if="isUserEnter == 0">
                <router-link to="/" class="fr block marR20">
                    <span class="tit green fs16 marR15">返回首页</span>
                    <i class="fa fa-chevron-right green"></i>
                </router-link>
            </div>
            <div v-else>
                <router-link to="/myCenter/userApplyFor" class="fr block marR20">
                    <span class="tit green fs16 marR15">返回个人中心</span>
                    <i class="fa fa-chevron-right green"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    import { mapGetters } from 'vuex'
    import { getContractDetail,getIDCard } from '../../api/api.js'
    import { getCookie,setCookie } from '../../util/index.js'
    import moment from 'moment'
    export default{
        data(){
            return {
                dialogVisible :false,
                input_IDCard:'',
                btnLoading:false,
                relet_s:'',
                relet_e:'',
            }
        },
        computed : {
			...mapGetters(['head','isUserEnter','userInfo']),
            getUserInfo(){
                return this.$store.getters.userInfo
            },
            getStepTip() {
                var val =this.$store.getters.stepTip
                if(val == 0){
                    return '身份证信息未补全'
                }else if(val == 1001 || val == 1002){
                    return '提交申请'
                }else if(val == 1003){
                    return '待初审'
                }else if(val == 1004){
                    return '提交材料'
                }else if(val == 1005){
                    return '待市局审批'
                }else if(val == 1006){
                    return '待复审'
                }else if(val == 1007){
                    return '待选房'
                }else if(val == 1008 ){
                    return '待网签'
                }else if(val == 1009){
                    return '待面签'
                }else if(val == 1010){
                    return '已签约'
                }else if(val == 1011){
                    return '续租中'
                }else if(val == 1012){
                    return '退租中'
                }
            },
		},
        watch: {
            getUserInfo(val) {
                if(val){
                    this.$router.options.routes[8].hidden = true
                    this.$router.options.routes[9].hidden = true
                    this.$router.options.routes[10].hidden = false
                    this.$router.options.routes[10].name = '您好，'+JSON.parse(getCookie('userInfo')).Name
                }else{
                    this.$router.options.routes[8].hidden = false
                    this.$router.options.routes[9].hidden = false
                    this.$router.options.routes[10].hidden = true
                    this.$router.options.routes[10].name = ''
                }
            },
            getStepTip(val){},
            '$route' (to, from) {
                if(to.path == "/uploadContract"){
                    this.$router.push({path:'/myCenter/userContract'})
                }
            }
        },
        mounted(){
            //获取进度
            if(this.$store.getters.userInfo){
                this.$store.dispatch('SET_STEPTIP', {AccountId:this.$store.getters.userInfo.AccountId})
            }
        },
        methods:{
            //判断身份证是否补全
            hasIDCard(path){
                if(this.$store.getters.userInfo.HasIDCard != 0){
                    this.$router.push({path:path})
                }else{
                    this.dialogVisible = true
                }
            },
            //判断续租申请页面
            hasRelet(path) {
                let State = this.$store.getters.userInfo.State;
                if(State == 1011) {
                    this.$alert('当前正在退租中，等待管理员审核！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                      }
                    });
                    return;
                }
                if(State == 1012) {
                    this.$alert('当前正在续租中，等待管理员审核！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                      }
                    });
                    return;
                }
                let params = {
                    Id:this.$store.getters.userInfo.AccountId
                }
                // 获取合同详情接口
                let contractData;
                getContractDetail(params).then((response) => {
                    contractData =  response.Data; // 合同数据
                })
                // 判断否有合同
                if(contractData == null || contractData == "") {
                    this.$alert('当前暂无租赁合同', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                      }
                    });
                    return;
                }

                // 判断时间范围
                let diffMonth = this.monthDiff (JSON.parse(contractData).cdw.EndDate);
                moment.locale('zh-cn'); //日期格式汉化
                this.relet_s = moment(new Date(JSON.parse(contractData).cdw.EndDate)).subtract(4, 'months').format("LL");
                this.relet_e = moment(new Date(JSON.parse(contractData).cdw.EndDate)).subtract(2, 'months').format("LL");
                if(diffMonth >4 || diffMonth<2){  //relet昨34完改成4
                    this.$alert('只能在 '+this.relet_s+' 和 '+this.relet_e+' 之间才能申请续租！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                      }
                    });
                    return;
                }
                this.$router.push({path:'/relet'})
            },
            // //判断退租申请页面
            hasRetreat(path) {
                let State = this.$store.getters.userInfo.State;
                if(State == 1011) {
                    this.$alert('当前正在退租中，等待管理员审核！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                      }
                    });
                    return;
                }
                if(State == 1012) {
                    this.$alert('当前正在续租中，等待管理员审核！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                      }
                    });
                    return;
                }
                let params = {
                    Id:this.$store.getters.userInfo.AccountId
                }
                // 获取合同详情接口
                let contractData;
                getContractDetail(params).then((response) => {
                    contractData = response.Data; // 合同数据
                })
                // 判断否有合同
                if(contractData == null || contractData == "") {
                    this.$alert('当前暂无租赁合同', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                      }
                    });
                    return;
                }
                this.$router.push({path:'/retreat'})
            },
            dateDiff (sDate1) {
                var date2 = new Date();
                var date1 = new Date(Date.parse(sDate1.replace(/-/g,   "/")));
                var iDays = parseInt(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24);
                return iDays;
            },
            monthDiff (sDate1) {
                var date2 = new Date();
                var date1 = new Date(Date.parse(sDate1.replace(/-/g,   "/")));
                var iMonths = parseInt(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24/30);
                return iMonths;
            },
            //身份证补全
            submit_IDCard(){
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(this.input_IDCard == ''){
                    this.$message.warning('请输入您的身份证号码！')
                    return false
                }
                if(!reg.test(this.input_IDCard)){
                    this.$message.warning('请输入正确的身份证号码！')
                    return false
                }
                var params = {
                    AccountId:this.$store.getters.userInfo.AccountId,
                    IDCard : this.input_IDCard
                }
                this.btnLoading = true
                getIDCard(params).then(response => {
                    switch(response.StatusCode){
                        case 200 :
                            this.$message.success('提交成功')
                            var userInfo = JSON.parse(getCookie('userInfo'))
                            userInfo.HasIDCard = '1'
                            userInfo.State = '1001'
                            this.$store.commit('SET_USERINFO',userInfo)
                            this.$store.commit('SET_STEPTIP','1001')
                            setCookie('userInfo',JSON.stringify(userInfo))
                            this.btnLoading = false
                            this.dialogVisible = false
                            this.$router.push({path:'/applyFor'})
                        break;
                        default:
                            this.btnLoading =false
                            this.$message.error(response.Info)
                    }
                }).catch(error => {
                    this.$message({
                        type:'error',
                        message:error
                    })
                })
            },
            //登出
            logOut(){
                this.$confirm('是否退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                        type: 'warning'
                }).then(() => {
                    // setCookie('userInfo','', -1)
                    // setCookie('applyForData','',-1)
                    this.$cookie.delete('userInfo')
                    this.$cookie.delete('applyForData')
                    this.$store.commit('SET_USERINFO','')
                    this.$store.commit('SET_USERINFOFORM','')
                    this.$store.commit('SET_APPLYFORCODE','')
                    this.$store.commit('SET_APPLYFORDATA','')
                    this.$router.options.routes[8].hidden = false
                    this.$router.options.routes[9].hidden = false
                    this.$router.options.routes[10].hidden = true
                    this.$router.options.routes[10].name = ''
                    this.$message({
                        type: 'success',
                        message: '已退出登录'
                    });
                    this.$router.push("/login");
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            dateDiff (sDate1) {
                var date2 = new Date();
                var date1 = new Date(Date.parse(sDate1.replace(/-/g,   "/")));
                var iDays = parseInt(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24);
                console.log(iDays)
                return iDays;
            },
            monthDiff (sDate1) {
                var date2 = new Date();
                var date1 = new Date(Date.parse(sDate1.replace(/-/g,   "/")));
                var iMonths = parseInt(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24/30);
                return iMonths;
            },
        },
        created(){
            if(this.$store.getters.userInfo){
                this.$router.options.routes[8].hidden = true
                this.$router.options.routes[9].hidden = true
                this.$router.options.routes[10].hidden = false
                this.$router.options.routes[10].name = '您好，'+JSON.parse(getCookie('userInfo')).Name
            }else{
                this.$router.options.routes[8].hidden = false
                this.$router.options.routes[9].hidden = false
                this.$router.options.routes[10].hidden = true
                this.$router.options.routes[10].name = ''
            }
        },
    }
</script>
<style lang='scss'>
#header{
    position:fixed;
    width:100%;
    top:0;
    left:0;
    z-index:2001;
}
/*header*/
.header{
    background: #3d424d;

    height:60px;
    .container{
        background: #3d424d;
        position:relative;
        .step_tip{
            height:24px;
            line-height: 24px;
            padding:0 8px;
            color:#fff;
            background: #f44336;
            z-index: 1;
            border-radius:24px;
            font-size:12px;
            right:-50px;
            top:8px;
        }
    }
    img{
        position: relative;
        top:-3px;
        height:30px;
    }
    .nlogo{
        width:103px;
        border-radius: 2px;
    }
    .logo{
        width:30px;
    }
    .tit{
        line-height: 60px;
    }
    ul{
        li{
            a,div{
                display: block;
                font-size:16px;
                &.router-link-active,&:hover{
                    color:#009688!important;
                }
            }
        }
    }
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus{
        background: none!important;
    }
    ul.index_nav{
        line-height: 70px;
        border:none!important;
        background: none;
        li{
            float: left;
            &.is-active{
                border-bottom: none!important;
                .el-submenu__title{
                    border-bottom: none!important;
                }
            }
            &.is-opened{
                .el-submenu__title{
                    span{
                        color:#009688!important;
                    }
                }
            }
            &:hover{
                background: none!important;
            }
            a{
                color:#f0f0f0;
                &:hover{
                    i{
                        &.i-login{
                            background-position: -2px -57px;
                        }
                    }
                }
            }
            .el-submenu__title {
                &:hover,&:focus{
                    background: none!important;

                }
                span{
                    color:#f0f0f0!important;
                }
            }
            div{
                &.server{
                    cursor:pointer;
                    color:#f0f0f0;
                    position: relative;
                    padding-right:20px;
                    &:after{
                        content:'';
                        position:absolute;
                        display: block;
                        vertical-align: middle;
                        border-top: 4px dashed;
                        border-top: 4px solid\9;
                        border-right: 4px solid transparent;
                        border-left: 4px solid transparent;
                        top:28px;
                        right:6px;
                    }
                    &:hover{
                        ul.hidden_navs{
                            display: block;
                        }
                    }
                }
            }
        }
    }

    /*nav iocn*/
    .i-login{
        width:18px;
        height:18px;
        background-size: 145px auto;
        background-position: -24px -30px;
        position: relative;
        top:-2px;
    }
}
/*二级导航*/
div.el-menu--horizontal{
    box-shadow: 0px 0px 8px #666!important;
    border-radius: 3px!important;
    position: relative;
    &:after{
        content:'';
        display: block;
        width: 0;
        height: 0;
        vertical-align: middle;
        border-top: 8px dashed;
        border-top: 8px solid\9;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        transform: rotate(-180deg);
        position: absolute;
        right: 45%;
        top: -5px;
        bottom: 0;
        color: #fff;
        z-index: 99999;
    }
    ul.el-menu--popup{
        min-width:140px!important;
        margin-top:0!important;
        li{
            height:42px!important;
            line-height: 42px!important;
            a{
                display: block;

                span{
                    font-size: 16px;
                    display: block;
                    text-align: center;

                }
            }
            &:hover{
                background: #ddd;
                span{
                    color:#009688!important;

                }
            }
        }
    }
}
.login-header{
    box-shadow: 0px 6px 30px #ddd;
}
@media screen and (max-width: 450px) {
    .container{
        width:100%!important;
    }
    #header{
        .header{
            a.fl{
                width:100%;
                .nlogo{
                    display: block;
                    margin:10px auto 0;
                    width:190px;
                    height:45px;
                }
                div.inline{
                    width:100%;
                    height:40px;

                    text-align: center;
                    span{
                        font-size:18px;
                        line-height: 40px!important;
                    }
                }
            }
            ul.index_nav{
                display: none;
            }
            .step_tip{
                display: none;
            }
        }
    }
}
</style>
