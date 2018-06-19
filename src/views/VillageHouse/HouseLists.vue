<template>
    <section class="container" ref="box">
        <div class="screen-search-breadcrumb">
            <!-- 面包屑&搜索 -->
            <div class="clearfix search-breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb_nav fl">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="this.$route.params.id" :to="{ path: '/villageLists' }">小区列表</el-breadcrumb-item>
                    <el-breadcrumb-item>房间列表</el-breadcrumb-item>
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
                <div class="clearfix screen-item marB10">
                    <h4 class="fl c-3 bold">小区：</h4>
                    <ul class="clearfix fl">
                        <li v-for="(item,index) in screenVillageLists" :key="index" :class="{active:item.isActive}" @click="checkScreen(item.villageName,2,index,item.PStructId)">{{item.villageName}}</li>
                    </ul>
                </div>
                <div class="clearfix screen-item marB10">
                    <h4 class="fl c-3 bold">户型：</h4>
                    <ul class="clearfix fl">
                        <li v-for="(item,index) in screenRoomTypeLists" :key="index" :class="{active:item.isActive}" @click="checkScreen(item.name,3,index,item.HouseTypeName)">{{item.name}}</li>
                    </ul>
                </div>
                <div class="clearfix screen-item marB10">
                    <h4 class="fl c-3 bold">租金：</h4>
                    <ul class="clearfix fl">
                        <li v-for="(item,index) in screenMoneyLists" :key="index" :class="{active:item.isActive}" @click="checkScreen(item.name,4,index,item.Rental)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
            <!--手机模式下-->
            <!-- 区域选择 -->
            <div class="screen-wrap-modelPhone none clearfix">
                <h4 class="fl bold c-3">区域：</h4>
                <span class="fl c-6" @click="showModelPhoneScreenLists(1)">{{areaSel}}</span>
                <ul class="" v-show='modelPhoneScreenLists1'>
                    <li v-for="(item,index) in screenLists" :key="index" :class="{active:item.isActive}" @click="checkScreen(item.AreaName,1,index,item.AreaId)">{{item.AreaName}}</li>
                </ul>
            </div>
            <!-- 小区选择 -->
            <div class="screen-wrap-modelPhone none clearfix">
                <h4 class="fl bold c-3">小区：</h4>
                <span class="fl c-6" @click="showModelPhoneScreenLists(2)">{{xiaoquSel}}</span>
                <ul class="" v-show='modelPhoneScreenLists2'>
                    <li v-for="(item,index) in screenVillageLists" :key="index" :class="{active:item.isActive}" @click="checkScreen(item.villageName,2,index,item.PStructId)">{{item.villageName}}</li>
                </ul>
            </div>
            <!-- 户型选择 -->
            <div class="screen-wrap-modelPhone none clearfix">
                <h4 class="fl bold c-3">户型：</h4>
                <span class="fl c-6" @click="showModelPhoneScreenLists(3)">{{huxingSel}}</span>
                <ul class="" v-show='modelPhoneScreenLists3'>
                    <li v-for="(item,index) in screenRoomTypeLists" :key="index" :class="{active:item.isActive}" @click="checkScreen(item.name,3,index,item.HouseTypeName)">{{item.name}}</li>
                </ul>
            </div>
            <!-- 租金选择 -->
            <div class="screen-wrap-modelPhone none clearfix">
                <h4 class="fl bold c-3">户型：</h4>
                <span class="fl c-6" @click="showModelPhoneScreenLists(4)">{{zujinSel}}</span>
                <ul class="" v-show='modelPhoneScreenLists4'>
                    <li v-for="(item,index) in screenMoneyLists" :key="index" :class="{active:item.isActive}" @click="checkScreen(item.name,4,index,item.Rental)">{{item.name}}</li>
                </ul>
            </div>
            <!-- 清空筛选 -->
            <div class="clear-screen clearfix">
                <h4 class="fl c-3 bold fl c-3 bold">已选条件：</h4>
                <div class="fl clearfix">
                    <ul class="checked-screen fl marL10 clearfix">
                        <li v-for="(item,index) in checkedScreenLists">{{item.name}}<i class='fa fa-times' @click="deleteScreen(item.name,item.type,item.index)"></i></li>
                    </ul>
                    <el-button size="mini" plain type="danger" @click="clearScreen()" :disabled="checkedScreenLists.length==0">清空选项</el-button>
                </div>
            </div>
        </div>
        <h4 class="fs26 c-6 village-house-tit">共<span class="red">{{listsTotal}}</span>个房源：</h4>
        <div class="village-house-wrap" v-loading="loading">
            <p class="noDataText padT20 padB20 tc fs16 green" v-show='villageLists.length == 0'>无数据!</p>
            <ul class="village-house-lists">
                <li v-for="(item,index) in villageLists" :key="index" class="clearfix rel">
                    <router-link :to="`/HouseDetails/${item.Id}`" class="clearfix">
                        <img v-lazy="(item.MainPic == null || item.MainPic == '') ? defaultImg : item.MainPic " class="fl" :alt="item.AllName">
                        <div class="fl marL30">
                            <h4 class="c-6 fs26">{{item.AllName}}</h4>
                            <p class="c-6 marT10"><span class="bold">所属区域：</span><span class="c-7">{{item.RegionName}}</span></p>
                            <p class="c-6 marT10"><span class="bold">所属户型：</span><span class="c-7">{{item.HouseTypeName}}</span></p>
                            <p class="c-6 marT10"><span class="bold">楼层名称：</span><span class="c-7">{{item.FloorName}}</span></p>
                            <p class="c-6 marT10"><span class="bold">套内面积：</span><span class="c-7">{{item.Acreage}}</span></p>
                        </div>
                    </router-link>
                    <a href="javascript:;" style="cursor:auto;" class="abs lookForhouse lookForhouseLists c-6 block">
                        <span class="green fs18">{{item.MonthlyRent}}</span>
                        月租金
                    </a>
                </li>
            </ul>
            <!-- 工具条 -->
            <el-pagination v-show='villageLists.length != 0' class="tc" @current-change="handleCurrentChange" background
                :page-size="pageSize"
                :current-page="page"
                layout="prev, pager, next"
                :total="listsTotal"
            >
            </el-pagination>
        </div>
    </section>
</template>
<script type="es6">
    import {getVillageHouseLists, getHouseLists,getScreenArea,getApplyForLookRoom } from '../../api/api.js'
    import defaultImg from '../../assets/images/default.jpg'
    import { isNull } from '../../util/index.js'
    export default{
        data(){
            return{
                areaSel:'不限',
                xiaoquSel:'不限',
                huxingSel:'不限',
                zujinSel:'不限',
                modelPhoneScreenLists1:false,
                modelPhoneScreenLists2:false,
                modelPhoneScreenLists3:false,
                modelPhoneScreenLists4:false,

                defaultImg,
                //接口数据
                search_input:'',//关键字
                PStructId:this.$route.query.id || null,//所属小区的id
                AreaId:null,//区域
                HouseTypeName:null,//户型
                Rental:null,//租金

                screenLists:[],//区域筛选
                screenVillageLists:[],//小区筛选
                screenRoomTypeLists:[
                    {
                        name:'不限',
                        isActive:true,
                        HouseTypeName:''
                    },{
                        name:'一室',
                        isActive:false,
                        HouseTypeName:'1'
                    },{
                        name:'一室一厅',
                        isActive:false,
                        HouseTypeName:'2'
                    },{
                        name:'两室',
                        isActive:false,
                        HouseTypeName:'3'
                    },{
                        name:'两室一厅',
                        isActive:false,
                        HouseTypeName:'4'
                    },{
                        name:'三室',
                        isActive:false,
                        HouseTypeName:'5'
                    },{
                        name:'三室一厅',
                        isActive:false,
                        HouseTypeName:'6'
                    },{
                        name:'四室',
                        isActive:false,
                        HouseTypeName:'7'
                    },{
                        name:'五室',
                        isActive:false,
                        HouseTypeName:'8'
                    },
                ],
                screenMoneyLists:[
                    {
                        name:'不限',
                        isActive:true,
                        Rental:''
                    },{
                        name:'1000以下',
                        isActive:false,
                        Rental:'a'
                    },{
                        name:'1000-1999',
                        isActive:false,
                        Rental:'b'
                    },{
                        name:'2000-2999',
                        isActive:false,
                        Rental:'c'
                    },{
                        name:'3000-3999',
                        isActive:false,
                        Rental:'d'
                    },{
                        name:'4000-4999',
                        isActive:false,
                        Rental:'e'
                    },{
                        name:'5000-5999',
                        isActive:false,
                        Rental:'f'
                    },{
                        name:'6000-6999',
                        isActive:false,
                        Rental:'g'
                    },{
                        name:'7000-8000',
                        isActive:false,
                        Rental:'h'
                    }
                ],
                checkedScreenLists:[],
                villageLists:[

                ],
                loading: false,
                listsTotal:0,
                page : 1,
                pageSize : 10
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
            this.$nextTick(() => {
                this.$refs.box.style.minHeight = (document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight -30) +'px'
            })
        },
        methods:{

            serchScreen(){
                if(this.search_input !="" && !isNull(this.search_input)){
                    this.checkedScreenLists = this.checkedScreenLists.filter(item => item.type !== 0)
                    this.checkedScreenLists.push({name:this.search_input,type:0})
                    this.loading = true;
                    this.getHouseListsFunc()
                }else{
                    this.$message({
                        message: '请输入关键字',
                        type: 'warning'
                    });
                }
            },
            checkScreen(val,type,index,id){
                if(type == 1){//区域筛选条件
                    for(var i = 0;i<this.screenLists.length;i++){
                        this.screenLists[i].isActive = false
                    }
                    this.screenLists[index].isActive = true
                    this.AreaId = id
                    this.areaSel = val
                }else if(type == 2){//小区筛选条件
                    for(var i = 0;i<this.screenVillageLists.length;i++){
                        this.screenVillageLists[i].isActive = false
                    }
                    this.screenVillageLists[index].isActive = true
                    this.PStructId = id
                    this.xiaoquSel = val
                }else if(type == 3){//户型筛选条件
                    for(var i = 0;i<this.screenRoomTypeLists.length;i++){
                        this.screenRoomTypeLists[i].isActive = false
                    }
                    this.screenRoomTypeLists[index].isActive = true
                    this.HouseTypeName = id
                    this.huxingSel = val
                }else if(type == 4){//租金筛选条件
                    for(var i = 0;i<this.screenMoneyLists.length;i++){
                        this.screenMoneyLists[i].isActive = false
                    }
                    this.screenMoneyLists[index].isActive= true
                    this.Rental = id
                    this.zujinSel = val
                }else if(type==0){
                    this.search_input = ''
                }

                if(val !== '不限'){
                    this.checkedScreenLists = this.checkedScreenLists.filter(item => item.type !== type)
                    this.checkedScreenLists.push({name:val,type:type,index:index})
                }else{
                    this.checkedScreenLists = this.checkedScreenLists.filter(item => item.type !== type)
                }
                this.loading = true;
                //点击筛选条件刷新列表
                this.getHouseListsFunc()

                //手机端
                this['modelPhoneScreenLists'+type] = false
            },
            //删除当前所选条件
            deleteScreen(val,type,index){
                if(type == 1){
                    this.screenLists[index].isActive = false
                    this.screenLists[0].isActive = true
                    this.AreaId = null
                    this.areaSel='不限'
                }else if(type == 2){
                    this.screenVillageLists[index].isActive = false
                    this.screenVillageLists[0].isActive = true
                    this.PStructId = null
                    this.xiaoquSel='不限'
                }else if(type == 3){
                    this.screenRoomTypeLists[index].isActive = false
                    this.screenRoomTypeLists[0].isActive = true
                    this.HouseTypeName = null
                    this.huxingSel='不限'
                }else if(type == 4){
                    this.screenMoneyLists[index].isActive = false
                    this.screenMoneyLists[0].isActive = true
                    this.Rental = null
                    this.zujinSel='不限'
                }else if(type == 0){
                    this.search_input = ''
                }
                this.checkedScreenLists = this.checkedScreenLists.filter(item => item.name !== val)
                this.loading = true;
                //清除当前筛选条件刷新列表
                this.getHouseListsFunc()
            },
            clearScreen(){
                for(var i =0;i<this.checkedScreenLists.length;i++){
                    if(this.checkedScreenLists[i].type == 1){
                        this.screenLists[0].isActive = true
                        this.screenLists[this.checkedScreenLists[i].index].isActive = false
                    }else if(this.checkedScreenLists[i].type == 2){
                        this.screenVillageLists[this.checkedScreenLists[i].index].isActive = false
                        this.screenVillageLists[0].isActive = true
                    }else if(this.checkedScreenLists[i].type == 3){
                        this.screenRoomTypeLists[this.checkedScreenLists[i].index].isActive = false
                        this.screenRoomTypeLists[0].isActive = true
                    }else if(this.checkedScreenLists[i].type == 4){
                        this.screenMoneyLists[this.checkedScreenLists[i].index].isActive = false
                        this.screenMoneyLists[0].isActive = true
                    }
                }
                this.checkedScreenLists = []
                this.loading = true;
                this.AreaId = null
                this.PStructId = null
                this.HouseTypeName = null
                this.Rental = null
                this.search_input = null
                //清空筛选条件
                this.getHouseListsFunc()
                this.areaSel='不限'
                this.xiaoquSel='不限'
                this.huxingSel='不限'
                this.zujinSel='不限'
            },
            //改变当前页数
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.page = val
                this.loading = true;
                this.getHouseListsFunc()
                setTimeout(()=>{
                    this.loading = false;
                },1000)
            },
            getHouseListsFunc(){
                this.loading = true
                var params = {
                    QueryJson:{
                        Type: '5',//1-楼盘(小区) 2，3-楼阁 4-楼层 5-房间
                        KeyWord : this.search_input,//关键字
                        AreaId:this.AreaId,//区域id
                        PropertyId:this.PStructId,//小区id
                        RoomTypeName:this.HouseTypeName,//户型
                        Rental:this.Rental,//租金
                    },
                    Page:this.page,
                    Rows:this.pageSize,
                }
                getHouseLists(params).then(response => {
                    switch(response.StatusCode){
                        case 500 :
                            this.$message.error('房源列表请求失败'+response.Info)
                            break;
                        case 200:
                            this.villageLists = response.Data.Rows//房间数据列表
                            this.listsTotal = response.Data.Records
                    }
                    this.loading = false
                }).catch( error=> {
                    this.$message.error(error);
                });
            },
            //获取区域筛选条件
            getScreenAreaFunc(){
                getScreenArea({CityCode:"310100",AreaCode:"310115"}).then(response => {
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
            //初始化筛选条件
            initScreen(){
                // url传id
                if(this.$route.query.id){
                    for(var i =0;i<this.screenVillageLists.length;i++){
                        if(this.$route.query.id == this.screenVillageLists[i].PStructId){
                            this.checkedScreenLists.push({
                                name:this.screenVillageLists[i].villageName,
                                type:2,
                                index: i
                            })
                            this.screenVillageLists[0].isActive = false
                            this.screenVillageLists[i].isActive = true
                        }
                    }

                }
            },
            //手机模式筛选条件
            showModelPhoneScreenLists(val){
                if(val == 1){
                    this.modelPhoneScreenLists2 = false
                    this.modelPhoneScreenLists3 = false
                    this.modelPhoneScreenLists4 = false
                }else if(val == 2){
                    this.modelPhoneScreenLists1 = false
                    this.modelPhoneScreenLists3 = false
                    this.modelPhoneScreenLists4 = false
                }else if(val ==3){
                    this.modelPhoneScreenLists1 = false
                    this.modelPhoneScreenLists2 = false
                    this.modelPhoneScreenLists4 = false
                }else if(val ==4){
                    this.modelPhoneScreenLists1 = false
                    this.modelPhoneScreenLists2 = false
                    this.modelPhoneScreenLists3 = false
                }
                if(this["modelPhoneScreenLists"+val] == false){
                    this["modelPhoneScreenLists"+val]= true
                }else{
                    this["modelPhoneScreenLists"+val] = false
                }
            },
        },
        created(){
            //获取筛选条件
            this.getScreenAreaFunc()
            //获取小区筛选条件
            getVillageHouseLists({QueryJson:{Type:1}}).then(response=>{
                var data = [{
                    villageName:'不限',
                    PStructId:null,
                    isActive:true
                }]
                for(var i=0;i<response.Data.Rows.length;i++){
                    data.push({
                        villageName: response.Data.Rows[i].Name,
                        PStructId  : response.Data.Rows[i].PropertyId,
                        isActive   : false
                    })
                }
                this.screenVillageLists = data
                this.initScreen()
            }).catch( error=> {
                this.$message.error(error);
            })
            this.getHouseListsFunc()

        }
    }
</script>
<style lang="scss">
.lookForhouseLists{
    top:10px;
    border:none!important;
    background: none!important;
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
                    width:202px;
                    max-height:250px;
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
