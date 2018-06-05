<template>
    <div class="index-wrapper">
        <div class="rel">
            <swiper :options="swiperOption2" class="indexBanner">
                <swiper-slide v-for="(item,index) in indexBanner" :key="index"><img :src="item.Image"></swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <!-- <el-carousel :interval="8000" arrow="always">
                <el-carousel-item v-for="(item,index) in indexBanner" :key="index">
                    <img :src="item.Image">
                </el-carousel-item>
            </el-carousel> -->
            <div class="index_search_wrap clearfix">
                <div class="clearfix abs" style="top:30px;left:50%;margin-left:-470px;">
                    <el-input placeholder="请输入区域或小区名开始找房" v-model="search_text" clearable class="fl"></el-input>
                    <button class="fl search_btn" @click="searchVillageFunc">
                        <i class="icon i-search"></i>
                    </button>
                    <button class="fl addr_btn" @click="addrHouse">
                        <i class="icon i-addr"></i>
                        <span>地图找房</span>
                    </button>
                    <button class="fl condition_btn" @click="selHouse">
                        <i class="icon i-condition-black i-condition-white"></i>
                        <span>条件找房</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="getApplyForComListsWrap rel" v-loading ='getApplyForComListsLoading'>
                <div class="fast_IDCard_entry abs">
                    <el-input v-model="inputIDCard" placeholder="请输入您的身份证号码" clearable></el-input>
                    <el-button type="primary" @click="getIndexFastFunc()">查询</el-button>
                </div>
                <h2 class="fs30 c-3 tc marB30">上周资格申请公告栏</h2>
                <el-table
                    :data="getApplyForComLists"
                    style="width: 60%;"
                    stripe>
                    <el-table-column type="index" header-align="center" align="center" width="50"></el-table-column>
                    <el-table-column prop="Name" header-align="center" align="center" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="Code" header-align="center" align="center" label="市局编号" width="180"></el-table-column>
                    <el-table-column prop="State" header-align="center" align="center" label="状态">
                        <template slot-scope="props">
                            <el-tag type="success" v-if="props.row.State  == 6">通过</el-tag>
                            <el-tag type="danger" v-else="props.row.state == -1">未通过</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination  v-show='getApplyForComLists.length != 0' class="tc marT30" @current-change="handleCurrentChange" background
                    :page-size="pageSize"
                    :current-page="page"
                    layout="prev, pager, next"
                    :total="listsTotal">
                </el-pagination>
            </div>
            <ul class="fast_entry clearfix tc fs20 marB30">
                <li>
                    <h2>提交申请</h2>
                    <img src="../assets/images/s_01.png">
                    <el-button type="primary" v-show="stepTip >= 1003 && userInfo" @click="fastEnterApplyFor">提交申请</el-button>
                </li>
                <li>
                    <h2>下载合同</h2>
                    <img src="../assets/images/s_01.png">
                    <el-button type="primary" v-show="stepTip >= 1010 && userInfo" @click="fastEnterUploadContract">下载合同</el-button>
                </li>
                <li>
                    <h2>续租／退租</h2>
                    <img src="../assets/images/s_01.png">
                    <el-button type="primary" v-if="stepTip==1011 && userInfo" @click="fastEnterRelet">续租</el-button>
                    <el-button type="primary" v-if="stepTip==1012 && userInfo" @click="fastEnterRetreat">退租</el-button>
                </li>
            </ul>
            <div v-show='showHotHouseLists'>
                <div class="site-title clearfix">
                    <h2 class="fs30 c-3 fl">可选房源总览<small class="fs14 c-7 marL10">好房源那么多，我们为你精选</small></h2>
                    <router-link class="fr fs14 c-8" to="/villageLists">查看更多&gt;&gt;</router-link>
                </div>

                <swiper :options="swiperOption" class="canSelHouseLists">
                    <swiper-slide v-for="(item,index) in swiperLists" :key="index">
                        <router-link :to="`/villageDetails/${item.Id}`" class="clearfix">
                            <img v-lazy="item.img == null ? defaultImg : item.img"  onerror="javascript:this.src='../assets/images/defined.png';" :alt="item.tit" class="fl">
                            <div class="fl">
                                <h4 class="ellipsis">{{item.FullName}}</h4>
                                <p class="c-7">
                                    <i class="fa fa-map-marker fa-lg"></i>
                                    <span>{{item.Address}}</span>
                                </p>
                                <p class="c-7">
                                    <i class="fa fa-home fa-lg"></i>
                                    <span>
                                        剩余房源
                                        <span>{{item.RoomCount}}</span>
                                        套
                                    </span>
                                </p>
                                <p class="red">
                                    <i class="fa fa-usd fa-lg"></i>
                                    <span>
                                        租金范围：
                                        <span>{{item.money}}</span>
                                        元／月
                                    </span>
                                </p>
                            </div>
                        </router-link>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div v-show="ShowNews_listst">
                <div class="site-title clearfix">
                    <h2 class="fs30 c-3 fl">新闻<small class="fs14 c-7 marL10">有关上海公租房廉租房的最新资讯</small></h2>
                    <router-link class="fr fs14 c-8" to="/news">查看更多&gt;&gt;</router-link>
                </div>
                <div class="index_news_lists clearfix marB30" >
                    <router-link :to="`/newsview/${newslists[0].Id}`">
                        <img v-lazy="newslists[0].MainPic == null ? defaultImg : newslists[0].MainPic">
                        <div class="abs">
                            <h4 class="fs18 white marB10">{{newslists[0].FullHead}}</h4>
                            <div class="c-3" v-html="unescape(newslists[0].NewsContent)"></div>
                        </div>
                    </router-link>
                    <div class="fl">
                        <router-link :to="`/newsview/${newslists[1].Id}`">
                            <img v-lazy="newslists[1].MainPic == null ? defaultImg : newslists[1].MainPic">
                            <div class="abs">
                                <h4 class="fs18 white">{{newslists[1].FullHead}}</h4>
                            </div>
                        </router-link>
                        <router-link :to="`/newsview/${newslists[2].Id}`">
                            <img v-lazy="newslists[0].MainPic == null ? defaultImg : newslists[0].MainPic">
                            <div class="abs">
                                <h4 class="fs18 white">{{newslists[2].FullHead}}</h4>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-show='ShowGuide_listst'>
                <div class="site-title clearfix">
                    <h2 class="fs30 c-3 fl">指南<small class="fs14 c-7 marL10">帮你最快租到心仪的房子</small></h2>
                    <router-link class="fr fs14 c-8" to="/guide">查看更多&gt;&gt;</router-link>
                </div>
                <ul class="index_guide_listst clearfix marB30">
                    <li v-for="(item,index) in guide_listst" :key="index">
                        <router-link :to="`/guideview/${item.Id}`">
                            <h4 class="fs18 c-6 bold marB10">{{item.FullHead}}</h4>
                            <div class="c-3" v-html="unescape(item.NewsContent)"></div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { getIndexBanner,getVillageHouseLists,getNews,getApplyForComLists,getHotHouseLists,getIndexFast,getIDCard} from '../api/api.js'
import defaultImg from '../assets/images/default.jpg'
import { getMemberMSGList } from '../api/api.js'
import { mapGetters } from 'vuex'
import { isNull } from '../util/index.js'
export default{
    data(){
        return {

            inputIDCard:'',
            messageLists:[],
            defaultImg,
            newsLoading:true,
            getApplyForComListsLoading:true,
            indexBanner:[],
            search_text: '',
            swiperLists: [],
            swiperOption: {
                slidesPerView: 2,
                spaceBetween: 20,
                autoplay: true,
                loop:true,
                pagination: {
                    el: '.swiper-pagination',

                },
            },
            swiperOption2:{
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',

                },
            },
            newslists: [
                {
                    MainPic: '',
                    FullHead: '',
                    NewsContent :'',
                    Id: null,
                },{
                    MainPic: '',
                    FullHead: '',
                    NewsContent :'',
                    Id: null,
                },{
                    MainPic: '',
                    FullHead: '',
                    NewsContent :'',
                    Id: null,
                }
            ],
            guide_listst:[],
            ShowGuide_listst : true,
            ShowNews_listst : true,
            //申请公示
            page:1,
            pageSize:10,
            getApplyForComLists:[],
            listsTotal:0,
            //房源纵览
            showHotHouseLists:false
        }
    },
    beforeRouteEnter (to,from,next) {
        next(vm =>{
            vm.$store.commit('SET_HEADTOGGLE',0)
        })
    },
    computed:{
        ...mapGetters(['isReadOrNot','stepTip','userInfo']),
        setIsreadOrNot() {
            return this.$store.getters.isReadOrNot
        },
    },
    watch:{
        stepTip(val){
            return val
        },
        setIsreadOrNot(val){
            return val
        }
    },
    mounted() {
        if(this.$store.getters.userInfo){
            this.$store.dispatch('SET_ISREADORNOT', {
                QueryJson:{
                AccountId:this.$store.getters.userInfo.AccountId,
                IsRead: 1
                }
            })
        }
    },
    methods:{
        //快速入口
        fastEnterApplyFor(){
            this.$router.push({path:'/applyFor'})
        },
        fastEnterUploadContract(){
            this.$router.push({path:'/myCenter/userContract'})
        },
        fastEnterRelet(){
            this.$router.push({path:'/relet'})
        },
        fastEnterRetreat(){
            this.$router.push({path:'/retreat'})
        },
        searchVillageFunc(){
            if(this.search_text !="" && !isNull(this.search_text)){
                this.$router.push({path:'/villageLists',query: {id: this.search_text}})
            }else{
                this.$message({
                    message: '请输入关键字',
                    type: 'warning'
                });
            }
        },
        addrHouse(){
            this.$router.push({path:'/addrSel'})
        },
        selHouse(){
            this.$router.push({path:'/houseLists'})
        },
        unescape(html){
            if(html){
                return html
                .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, "\"")
                .replace(/&#39;/g, "\'");
            }
        },
        getApplyForComListsFunc(){
            this.getApplyForComListsLoading = true
            var params = {
                Rows: this.pageSize,
                Page: this.page,
            }
            //获取申请公示
            getApplyForComLists(params).then(response => {
                this.getApplyForComLists = response.Data.Rows
                this.listsTotal = response.Data.Records
                setTimeout(()=>{
                    this.getApplyForComListsLoading = false
                },800)

            }).catch(error => {
                this.$message.error(error)
            })
        },
        //申请公示改变当前页
        handleCurrentChange(){
            this.page = val
            this.getApplyForComListsFunc()
        },
        //快速查询入口
        getIndexFastFunc(){
            if(this.inputIDCard == ''){
                this.$message.warning('请输入您的身份证号码')
                return false
            }
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(!reg.test(this.inputIDCard)){
                this.$message.warning('请输入正确的身份证号码！')
                return false
            }
            var params = {
                IDCard:this.inputIDCard
            }
            getIndexFast(params).then(response => {
                if(response.StatusCode == 200){
                    this.$notify({
                        title: '',
                        message: response.Data,
                        offset: 100,
                        type: 'info',
                    });
                }else{
                    this.$message.error(response.Info)
                }
            }).catch(error => {
                this.$message.error(error)
            })
        },

    },
    created(){
        //获取轮播图
        getIndexBanner({"QueryJson":{"Category":1}}).then((response) => {
            switch(response.StatusCode){
                case 500 :
                    this.$message({
                        type:'error',
                        message:'轮播图请求失败'+response.Info
                    })
                    break;
                case 200:
                    this.indexBanner = response.Data
                break;
            }
        }).catch(error => {
            this.$message({
                type:'error',
                message:error
            })
        })
        //获取房源
        getHotHouseLists({Rows:5,Type:2}).then(response => {
            switch(response.StatusCode){
                case 500 :
                    this.$message.error('房源数据请求失败'+response.Info)
                break;
                case 200 :
                    if(response.Data == null || response.Data.length == 0){
                        this.showHotHouseLists = false
                    }else{
                        this.showHotHouseLists = true
                        this.swiperLists =response.Data
                    }

                break;
            }
        }).catch(error =>{
            this.$message({
                type:'error',
                message:error
            })
        })
        //获取新闻
        getNews({QueryJson:{"Type":1},Rows: 3,page:1,}).then(response => {
            switch(response.StatusCode){
                case 500 :
                    this.$message.error('房源数据请求失败'+response.Info)
                break;
                case 200 :
                    var data = response.Data.Rows
                    switch(response.Data.Rows.length){
                        case 1:
                            this.newslists[0].Id = data[0].Id
                            this.newslists[0].FullHead = data[0].FullHead
                            this.newslists[0].MainPic = data[0].MainPic
                            this.newslists[0].NewsContent = data[0].NewsContent
                        break;
                        case 2:
                            this.newslists[0].Id = data[0].Id
                            this.newslists[0].FullHead = data[0].FullHead
                            this.newslists[0].MainPic = data[0].MainPic
                            this.newslists[0].NewsContent = data[0].NewsContent
                            this.newslists[1].Id = data[1].Id
                            this.newslists[1].FullHead = data[1].FullHead
                            this.newslists[1].MainPic = data[1].MainPic
                            this.newslists[1].NewsContent = ''
                        break;
                        case 3:
                            this.newslists[0].Id = data[0].Id
                            this.newslists[0].FullHead = data[0].FullHead
                            this.newslists[0].MainPic = data[0].MainPic
                            this.newslists[0].NewsContent = data[0].NewsContent
                            this.newslists[1].Id = data[1].Id
                            this.newslists[1].FullHead = data[1].FullHead
                            this.newslists[1].MainPic = data[1].MainPic
                            this.newslists[1].NewsContent = ''
                            this.newslists[2].Id = data[2].Id
                            this.newslists[2].FullHead = data[2].FullHead
                            this.newslists[2].MainPic = data[2].MainPic
                            this.newslists[2].NewsContent = data[2].NewsContent
                        break;
                        default:
                            this.ShowNews_listst = false
                    }
                break;
            }
        })
        //获取指南
        getNews({QueryJson:{"Type":3},Rows: 3,page:1,}).then(response => {
            switch(response.StatusCode){
                case 500 :
                    this.$message.error('指南数据请求失败'+response.Info)
                break;
                case 200 :
                    if(response.Data.Rows&&response.Data.Rows.length !=0){
                        this.guide_listst = response.Data.Row
                    }else{
                        this.ShowGuide_listst = false
                    }
                break;
            }
        })
        this.getApplyForComListsFunc()
    }
}
</script>
<style lang="scss">
.swiper-pagination-bullet-active{
    background: #009688;
}

@media screen and (min-width: 450px) {
    .fast_IDCard_entry{
        width:285px;
        top:20px;
        right:20px;
        .el-input{
            display: inline-block;
            width:200px;
            margin-right:10px;
        }
    }
    .getApplyForComListsWrap{
        margin-top:50px;
        padding:40px 0;
        background: rgba(0,0,0,0.08);
        .el-table{
            display: block;
            width:50px;
            margin:0 auto;
            thead{
                width:100%;
            }
        }
    }
    .el-carousel__container{
        width:100%;
        height:500px;
        .el-carousel__arrow{
            background: rgba(31, 45, 61, 0.4)!important;
        }
        .el-carousel__arrow--right{
            right:40px!important;
        }
        .el-carousel__item {
            img{
                width:100%;
                height:100%;
            }
            .img_item{
                color: #475669;
                font-size: 18px;
                opacity: 0.75;
                line-height: 500px;
                margin: 0;
                text-align: center;
                background: url(../assets/images/banner03.jpg) no-repeat;
            }
        }
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .indexBanner{
        height: 500px;
        width:100%;
        img{
            width:100%;
            height:100%;
        }
        .swiper-button-next{
            right:40px;
        }
        .swiper-pagination{
            display: none;
        }
    }
    /*首页搜索*/
    .index_search_wrap{
        background: rgba(0,0,0,0.5);
        z-index: 100;
        position: absolute;
        bottom: 0px;
        left:0;
        width:100%;
        height:60px;
        padding:30px 0px;
        // margin-left:-470px;
        .el-input{
            width:586px;
            input.el-input__inner{
                height:60px;
                outline: none;
                border-radius:4px 0 0 4px!important;
            }
        }
        button{
            width:124px;
            height:60px;
            border:1px solid #fff;
            color:#fff;
            font-size: 16px;
            border-radius: 4px;
            background:none;
            span{
                position: relative;
                top:2px;
            }
            &:hover{
                background: #eee;
                color:#000000;
            }
            &.search_btn{
                height:60px;
                width:60px;
                background:#03a9f4;
                border:none;
                border-radius: 0;
                &:hover{
                    background:#34b6f1;
                }
            }
            &.addr_btn{
                margin-right:8px;
                margin-left:28px;
                &:hover{
                    i{
                        background-position:-99px -58px;
                    }
                }
            }
            &.condition_btn{
                margin-left:10px;
                &:hover{
                    i{
                        background-position:3px 2px;
                    }
                }
            }
        }
    }
    /*快速入口*/
    ul.fast_entry{
        padding:30px 0;
        li{
            float:left;
            width:33.33%;
            h2{
                font-weight: 350;
                margin:20px 0;
            }
            img{
                display: block;
                margin-left:auto;
                margin-right:auto;
                width:200px;
                height:200px;
                border-radius: 50%;
            }
            button{
                margin-top:20px;
                width:120px;
                font-size:16px;
            }
        }
    }
    .site-title{
        padding:15px 0;
        h2{
            font-weight: 340;
            small{
                font-weight: 400;
            }
        }
        a{
            margin-top:16px;
            &:hover{
                color:#009688;
            }
        }
    }
    /*swiper-wrapper*/
    .index-wrapper{
        .canSelHouseLists.swiper-container{
            margin-bottom:20px;
            overflow: hidden;
            width:1170px;
            .swiper-wrapper{
                width:100%;
                .swiper-slide{
                    float: left;
                }
            }
            .swiper-pagination{
                display: none;
            }
        }
        /*更多房源*/
        .canSelHouseLists .swiper-slide{
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
            margin:10px 0px 10px 0px;
            a{
                padding:15px;
                display: block;
                img{
                    width:240px;
                    height:150px;
                    margin-right:20px;
                }
                >div.fl{
                    width:285px;
                    height:150px;
                    h4{
                        width:100%;
                        height:26px;
                        line-height: 26px;
                        padding:10px 0 15px;
                        font-weight:500;
                        font-size:18px;
                    }
                    p{
                        padding-bottom:15px;
                        padding-left:30px;
                        height:20px;
                        line-height: 20px;
                        position: relative;
                        >i{
                            position: absolute;
                            top:0;
                            left:0;
                        }
                    }
                }
                &:hover{
                    h4{
                        color:#009688;
                    }
                }
            }
        }
    }
    /*新闻*/
    .index_news_lists{
        >a,>div{
            display: block;
            overflow: hidden;
            width:585px;
            height:380px;
            float: left;
            position: relative;
        }
        >a{
            &:before{
                content: '';
                position: absolute;
                z-index: 5;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.8) 95%);
            }
            img{
                height:100%;
            }
            >div{
                z-index: 6;
                bottom:0;
                left:0;
                padding:10px 15px;
                >h4{
                    font-weight:400;
                }
            }
            &:hover:after{
                content:'';
                display: block;
                position: absolute;
                width:100%;
                height:100%;
                z-index: 7;
                top:0;
                left:0;
                background: rgba(0,0,0,0.3);
            }
        }
        >div{
            >a{
                &:before{
                    content: '';
                    position: absolute;
                    z-index: 5;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.8) 95%);
                }
                display: block;
                overflow: hidden;
                position: relative;
                &:nth-of-type(1){
                    height:175px;
                    img{
                        height:100%;
                    }
                }
                &:nth-of-type(2){
                    height:204px;
                    img{
                        width:100%;
                    }
                }
                >div{
                    padding:10px 15px;
                    z-index: 6;
                    bottom:0;
                    left:0;
                    >h4{
                        font-weight: 400;
                    }
                }
                &:hover:after{
                    content:'';
                    display: block;
                    position: absolute;
                    width:100%;
                    height:100%;
                    z-index: 7;
                    top:0;
                    left:0;
                    background: rgba(0,0,0,0.3);
                }
            }
        }
    }
    /*申请指南*/
    ul.index_guide_listst{
        li{
            float: left;
            a{
                display: block;
                width:340px;
                min-height:150px;
                padding:15px;
                box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
                border-radius: 2px;
                margin-right:30px;
                &:hover{
                    h4{
                        color:#009688;
                    }
                }
            }
            &:nth-of-type(3){
                a{
                    margin-right:0;
                }
            }
        }
    }
    /*适配手机端*/
}
@media screen and (max-width: 450px) {
    .container{
        width:100%!important;
    }
    .getApplyForComListsWrap{
        display: none;
    }
    .index-wrapper{
        overflow-x:hidden;
        div.rel{
            padding-bottom: 60px;
            .indexBanner{
                img{
                    width:100%;
                    height:100%;
                }
                .swiper-button-next,.swiper-button-prev{
                    display: none;
                }
                .swiper-pagination{
                    display: block;
                }
            }
            .index_search_wrap{
                z-index: 1;
                background: rgba(0,0,0,0.5);
                position:absolute;
                bottom:0px;
                left:0;
                width:100%;
                height:60px;
                .abs{
                    width:100%;
                    top:10px!important;
                    left:1.5%!important;
                    margin-left:0!important;
                    .el-input{
                        width:80%;
                    }
                    .search_btn{
                        width:15%;
                        height:40px;
                        border-radius:3px;
                        margin-left:2%;
                        background: #009688;
                    }
                    .addr_btn,.condition_btn{
                        display: none;
                    }
                }
            }
        }
        .fast_entry,.canSelHouseLists,.site-title:nth-of-type(1){
            display: none;
        }
        .site-title{
            padding:10px 2%;
            width:96%;
            >h2{
                font-size:18px;
                small{
                    display: block;
                    margin-left:0;
                    margin-top:4px;
                }
            }
            >a{
                position:relative;
                top:30px;
                font-size:12px;
            }
        }
        .index_news_lists{
            padding:10px;
            margin-bottom: 0;
            >a{
                display:block;
                width:100%;
                >img{
                    width:100%;
                    height:100%;
                }
            }
            >div{
                width:100%;
                >a{
                    display:block;
                    width:100%;
                    >img{
                        width:100%;
                    }
                }
            }
        }
        .index_guide_listst{
            margin-bottom:0;
            li{

            }
        }
    }
}
</style>
