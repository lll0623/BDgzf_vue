<template>
    <div class="message-wrap myCenter-breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>我的消息</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="tools-bar clearfix pad15">
            <el-button class="fl" type="primary" @click="setAllChecked" v-show="setAllCheckedBtn" :disabled="this.sels.length===0">标记为已读</el-button>
            <el-button class="fl" type="primary" @click="setAllUnChecked" style="margin-left:0px;" v-show="setAllUnCheckedBtn" :disabled="this.sels.length===0">标记为未读</el-button>
            <div class="fr">
                <a :class="{active:unread}" href="javascript:;" class="inline" @click="screenMessage(1)">未读</a>
                <a :class="{active:alread}" href="javascript:;" class="inline" @click="screenMessage(2)">已读</a>
                <a :class="{active:allMeaasge}" href="javascript:;" class="inline" @click="screenMessage(0)">全部</a>
            </div>
        </div>
        <div class="pad15" v-loading="loading">
            <el-table
                ref="multipleTable"
                :data="messageLists"
                tooltip-effect="dark"
                style="width: 100%"
                stripe
                @selection-change="selsChange">
                <el-table-column type="selection" width="55"
                >
                </el-table-column>
                <el-table-column prop="DateTime" label="日期" width="170">
                    <template slot-scope="props">
                        <span :class="(props.row.IsRead ==1)?'noReady':''">{{ props.row.DateTime | dateFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Content" label="消息内容">
                    <template slot-scope="props">
                        <span :class="(props.row.IsRead ==1)?'noReady':''">{{ props.row.Content }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show='messageLists.length != 0' class="tc marT20" @current-change="handleCurrentChange" background
                :page-size="pageSize"
                :current-page="page"
                layout="prev, pager, next"
                :total="listsTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMemberMSGList,getReadMSG } from '../../api/api.js'
import moment from 'moment'
    export default{
        middleware: 'auth',
        data(){
            return{
                setAllCheckedBtn:false,
                setAllUnCheckedBtn:false,
                noReady:'',
                filterCheck:0,
                all_checked: false,
                loading:false,
                unread:false,
                alread:false,
                allMeaasge:true,
                listsTotal:0,
                page :1,
                pageSize : 10,
                sels: [],//列表选中列
                messageLists:[],//列表数据
            }
        },
		computed:{
            ...mapGetters(['myCenterNav','isReadOrNot']),
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_MYCENTERNAV',1)
            })
        },
        beforeRouteLeave(to, from, next) {
            if(this.$store.getters.userInfo){
                if(!from.meta.keepAlive){
                    from.meta.keepAlive = true
                }
                next()
            }else{
                from.meta.keepAlive = false
                to.meta.keepAlive = false
                next()
            }

        },
        created(){
            this.screenMessage(1);
        },
        mounted(){
        },
        methods:{
            selsChange(sels){
                this.sels = sels
            },
            // unChecked(row){
            //   	if(row.IsRead == 2){
            //     	return 0;
            //
            //     }else{
            //     	return 1
            //     }
            // },
            // checked(rows) {
            //     console.log(rows)
            //     if (rows) {
            //         rows.forEach(row => {
            //             if(row.IsRead == 2){
            //                 this.$refs.multipleTable.toggleRowSelection(row,true);
            //             }
            //         });
            //     }
            // },
            //标记为已读
            setAllChecked(){
                this.unread=false
                this.alread=false
                this.allMeaasge=true
                this.loading = true
                var ids = this.sels.map(item => item.Id).toString();
                let params = {
                    Id: ids,
                    IsRead: 2
                }
                // 标记已读接口
                getReadMSG(params).then((response) => {
                    this.screenMessage(1);
                })
            },
            //标记为未读
            setAllUnChecked(){
                this.unread=false
                this.alread=false
                this.allMeaasge=true
                this.loading = true
                var ids = this.sels.map(item => item.Id).toString();
                var ids = this.sels.map(item => item.Id).toString();
                let params = {
                    Id: ids,
                    IsRead: 1
                }
                // 标记读接口
                getReadMSG(params).then((response) => {
                    this.screenMessage(1);
                })
            },
            // 获取消息列表
            getMessageList() {
                this.loading = true
                let params = {
                    Page:this.page,
                    Rows:this.pageSize,
                    QueryJson:{
                        AccountId:this.$store.getters.userInfo.AccountId,
                        IsRead: this.filterCheck
                    }
                }
                // 获取消息列表接口
                getMemberMSGList(params).then((response) => {
                    var errorText = response.Info;
                    switch (response.StatusCode) {
                        case 200:
                            this.messageLists = (response.Data == null) ? [] : response.Data.Rows;
                            // this.checked(this.messageLists)
                            this.listsTotal = (response.Data == null) ? 0 : response.Data.Rows.length;
                            if( this.filterCheck == 1 ){
                                this.$store.commit('SET_ISREADORNOT',this.listsTotal); // 未读消息条数
                            }
                            this.loading = false
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
                                message: '获取列表失败！'
                            });
                    }

            })
            },
            screenMessage(type){
                if(type == 1){
                    this.unread=true
                    this.alread=false
                    this.allMeaasge=false
                    this.setAllCheckedBtn = true
                    this.setAllUnCheckedBtn = false
                    this.filterCheck = 1
                }else if(type==2){
                    this.unread=false
                    this.alread=true
                    this.allMeaasge=false
                    this.filterCheck = 2
                    this.setAllCheckedBtn = false
                    this.setAllUnCheckedBtn = true
                }else if(type==0){
                    this.unread=false
                    this.alread=false
                    this.allMeaasge=true
                    this.filterCheck = 0
                    this.setAllCheckedBtn = false
                    this.setAllUnCheckedBtn = false
                }
                this.handleCurrentChange(1)
            },
            //改变当前页数
            handleCurrentChange(val) {
                this.page = val;
                this.getMessageList();
            },

        },
        filters:{
            //时间格式化
            dateFormat:function(date) {
                if (date == undefined) {
                   return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            }
        }
    }
</script>
<style lang="scss">
    .message-wrap{
        .tools-bar{
            a{
                color:#999;
                line-height: 40px;
                margin-left:10px;
                &:hover,&.active{
                    color:#009688;
                }
            }
        }
        .el-table{

        }
        .noReady{
            font-weight: 700
        }
    }
</style>
