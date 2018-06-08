<template>
    <div class="container  clearfix" ref="box">
        <div class="screen-search-breadcrumb">
            <!-- 面包屑&搜索 -->
            <div class="clearfix search-breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb_nav fl">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>小区列表</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="fr search-wrap">
                    <el-input v-model="search_input" placeholder="请输入小区关键词" clearable class="marR10"></el-input>
                    <el-button type="primary" @click="serchScreen()">搜索</el-button>
                </div>
            </div>
            <!-- 筛选条件 -->
            <div class="screen-wrap">
                <div class="clearfix screen-item marB10">
                    <h4 class="fl c-3 bold">区域：</h4>
                    <ul class="clearfix fl">
                        <li v-for="(item,index) in screenLists" :key="index" :class="{active:item.isActive}" @click="checkScreen(item.AreaName,1,index,item.AreaId)">{{item.AreaName}}</li>
                    </ul>
                </div>
            </div>
            <!--手机模式下-->
            <div class="screen-wrap-modelPhone none clearfix">
                <h4 class="fl bold c-3">区域：</h4>
                <span class="fl c-6" @click="showModelPhoneScreenLists()">{{areaSel}}</span>
                <ul class="fl" v-show='modelPhoneScreenLists'>
                    <li v-for="(item,index) in screenLists" :key="index" :class="{active:item.isActive}" @click="checkScreen(item.AreaName,1,index,item.AreaId)">{{item.AreaName}}</li>
                </ul>
            </div>
            <!-- 清空筛选 -->
            <div class="clear-screen clearfix">
                <h4 class="fl c-3 bold fl c-3 bold">已选条件：</h4>
                <div class="fl clearfix">
                    <ul class="checked-screen fl marL10 clearfix">
                        <li v-for="(item,index) in checkedScreenLists">{{item.name}}<i class='fa fa-times' @click="deleteScreen(item.name,item.type,item.index,item.id)"></i></li>
                    </ul>
                    <el-button size="mini" plain type="danger" @click="clearScreen()" :disabled="checkedScreenLists.length==0">清空选项</el-button>
                </div>
            </div>
        </div>
        <h4 class="fs26 c-6 village-house-tit">共<span class="red">{{listsTotal}}</span>个小区：</h4>
        <div class="village-house-wrap" v-loading="loading">
            <p class="noDataText padT20 padB20 tc fs16 green" v-show='villageLists.length == 0'>无数据!&nbsp;&nbsp;-_-!!!</p>
            <ul class="village-house-lists">
                <li v-for="(item,index) in villageLists" :key="index" class="clearfix rel">
                    <router-link :to="`/villageDetails/${item.PropertyId}`" class="clearfix">
                        <img v-lazy="(item.MainPic == null || item.MainPic == '') ? defaultImg : item.MainPic " class="fl" :alt="item.FullHead">
                        <div class="fl marL30">
                            <h4 class="c-6 fs26">{{item.FullName}}</h4>
                            <p class="c-6 marT10"><span class="bold">所属区域：</span><span class="c-7">{{item.AreaName}}</span></p>
                            <p class="c-6 marT10"><span class="bold">地址：</span><span class="c-7">{{item.Address}}</span></p>
                            <p class="c-6 marT10"><span class="bold">小区简介：</span><span class="c-7">{{item.Memo}}</span></p>
                        </div>
                    </router-link>
                    <router-link :to="{name:'条件选房',query:{id:item.PropertyId}}" class="abs fs18 lookForhouse c-6">
                        <span class="green">{{item.RoomCount | filterRoomCount}}</span>
                        套房源，点击查看房源
                    </router-link>
                </li>
            </ul>
            <!-- 工具条 -->
            <el-pagination v-show='villageLists.length != 0' class="tc" @current-change="handleCurrentChange" background :page-size="pageSize" layout="prev, pager, next" :total="listsTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script type="es6">
    import { getVillageHouseLists,getScreenArea } from '../../api/api.js'
    import defaultImg from '../../assets/images/default.jpg'
    import { isNull } from '../../util/index.js'
    export default{
        data(){
            return{
                areaSel:'不限',
                modelPhoneScreenLists:false,

                defaultImg,
                isActive:true,
                search_input:'',
                AreaId : null,
                screenLists:[
                    {
                        name:'不限',
                        isActive:true
                    },{
                        name:'杭头',
                        isActive:false
                    },{
                        name:'回南',
                        isActive:false
                    },{
                        name:'金阳',
                        isActive:false
                    },{
                        name:'金阳',
                        isActive:false
                    },{
                        name:'金阳',
                        isActive:false
                    },
                ],
                checkedScreenLists:[

                ],
                villageLists:[],
                loading: false,
                listsTotal:0,
                page : 1,
                pageSize : 10
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.$refs.box.style.minHeight = (document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight -30) +'px'
            })
        },
        filters:{
            filterRoomCount(val){
                if(val == null || val == ""){
                    return '0'
                }else{
                    return val
                }
            }
        },
        methods:{

            serchScreen(){
                if(this.search_input !="" && !isNull(this.search_input)){
                    this.checkedScreenLists = this.checkedScreenLists.filter(item => item.type !== 0)
                    this.checkedScreenLists.push({name:this.search_input,type:0})
                    this.loading = true;
                    this.getVillageListsFunc()
                }else{
                    this.$message({
                        message: '请输入关键字',
                        type: 'warning'
                    });
                }
            },
            checkScreen(val,type,index,id){
                for(var i = 0;i<this.screenLists.length;i++){
                    this.screenLists[i].isActive = false
                }
                this.screenLists[index].isActive = true
                if(val !== '不限'){
                    this.checkedScreenLists = this.checkedScreenLists.filter(item => item.type !== type)
                    this.checkedScreenLists.push({name:val,type:type,index:index,id:id})
                    this.AreaId = id
                }else{
                    this.checkedScreenLists = this.checkedScreenLists.filter(item => item.type !== type)
                    this.AreaId = null
                }
                this.loading = true;
                this.getVillageListsFunc()
                //手机端
                this.areaSel = val
                this.modelPhoneScreenLists = false
            },
            //删除筛选条件
            deleteScreen(val,type,index,id){
                this.checkedScreenLists = this.checkedScreenLists.filter(item => item.name !== val)
                if(type==1){//区域
                    this.screenLists[index].isActive = false
                    this.screenLists[0].isActive = true
                    this.AreaId = null
                }else if(type==0){
                    this.search_input = ''
                }
                this.loading = true;
                this.getVillageListsFunc()
                this.areaSel = "不限"
            },
            //清空筛选条件
            clearScreen(){
                if(this.checkedScreenLists.length){
                    for(var i =0;i<this.checkedScreenLists.length;i++){
                        if(this.checkedScreenLists[i].type == 1){
                            this.screenLists[0].isActive = true
                            this.screenLists[this.checkedScreenLists[i].index].isActive = false
                        }
                    }
                    this.checkedScreenLists = []
                    this.loading = true;
                    this.search_input = ''
                    this.AreaId = ''
                    this.getVillageListsFunc()
                }
            },
            //改变当前页数
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.page = val
                this.loading = true;
                this.getVillageListsFunc()
            },
            //获取小区列表
            getVillageListsFunc(){
                this.loading = true
                var params = {
                    QueryJson:{
                        Type: '1',
                        KeyWord : this.search_input,
                        Area:this.AreaId,
                        RoomState:1,
                    },
                    Page:this.page,
                    Rows:this.pageSize,
                }
                getVillageHouseLists(params).then(response => {
                    switch(response.StatusCode){
                        case 500 :
                            this.$message.error('小区列表请求失败'+response.Info)
                            break;
                        case 200:
                            this.villageLists = response.Data.Rows
                            this.listsTotal = response.Data.Records

                    }
                    this.loading = false
                }).catch( error=> {
                    this.$message.error(error);
                });
            },
            //获取区域筛选条件
            getScreenAreaFunc(){
                getScreenArea({
                    CityCode:"310100",
                    AreaCode:"310115"
                }).then(response => {
                    var data = [{
                        AreaName:'不限',
                        AreaId:null,
                        isActive:true
                    }]
                    for(var i =0;i<response.Data.length;i++){
                        data.push({
                            isActive:false,
                            AreaName:response.Data[i].AreaName,
                            AreaId:response.Data[i].AreaId
                        })
                    }
                    this.screenLists = data
                }).catch(error => {
                    this.$message.error(error);
                })
            },
            //手机模式筛选条件
            showModelPhoneScreenLists(){
                if(this.modelPhoneScreenLists == false){
                    this.modelPhoneScreenLists = true
                }else{
                    this.modelPhoneScreenLists = false
                }
            },
        },
        created(){
            if(this.$route.query.id){
                this.search_input = this.$route.query.id
                this.checkedScreenLists.push({name:this.search_input,type:0})
            }
            this.getScreenAreaFunc()
            this.getVillageListsFunc()
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
    }
</script>
<style lang="scss">
    .lookForhouse{
        padding:10px;
        border:1px solid #009688;
        top:10px;
        border-radius: 3px;
        background: #ecf5ff;
        text-align: center;
    }
    @media screen and (max-width: 450px) {
        .container{
            overflow-x:hidden;
            .screen-search-breadcrumb{
                .screen-wrap{
                    display: none;
                }
                .screen-wrap-modelPhone{
                    padding:10px 10px;
                    display: block;
                    position: relative;
                    h4{
                        width:80px;
                    }
                    >span{
                        display: block;
                        width:195px;
                        height:30px;
                        border:1px solid #999;
                        position:relative;
                        top:-5px;
                        line-height: 30px;
                        padding-left:5px;
                        border-radius: 3px;
                    }
                    ul{
                        position: absolute;
                        top:37px;
                        left:90px;
                        background: #fff;
                        z-index: 2002;
                        height:300px;
                        overflow-y:auto;
                        li{
                            padding:5px 0 0 10px;
                        }
                    }
                }
                .breadcrumb_nav{
                    float: none;
                }
                .clear-screen{
                    padding:0 10px 10px;
                    >div{
                        width:220px;
                        ul{
                            float: none;
                            li{
                                margin-bottom: 10px;
                                // float: none;

                            }
                        }
                        button{
                            float:none;
                            display: block;
                        }
                    }
                }
                .search-wrap{
                    width:100%;
                    float: none;
                    top:0;
                    .el-input{
                        width:70%;
                    }
                }
            }
            h4.village-house-tit{
                padding:10px;
                font-size: 18px;
            }
            .village-house-wrap{
                ul.village-house-lists{
                    li{
                        a.clearfix{
                            display: block;
                            img{
                                width:100%;
                                float: none;
                            }
                            >div{
                                float:none;
                                margin-left: 0;
                                >h4{
                                    margin-top: 5px;
                                    font-size: 16px;
                                }
                                >p{
                                    font-size:12px;
                                    margin-top: 5px;
                                }
                            }
                        }
                        a.abs{
                            position: static;
                            font-size:12px;
                            display: block;
                            width:60%;
                            margin:10px auto 0;
                        }
                    }
                }
            }
        }
    }
</style>
