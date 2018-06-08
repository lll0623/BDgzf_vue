<template>
    <div class="applyFor-wrap myCenter-breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>已签约房间列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pad15" v-loading = 'loading'>
            <el-table
                ref="multipleTable"
                :data="SignedRooms"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column prop="roomallname" header-align="center" align="center" label="小区" width="200"></el-table-column>
                <el-table-column prop="roomallname" header-align="center" align="center" label="房间地址" width="200"></el-table-column>
                <el-table-column prop="SignedTime" header-align="center" align="center" label="签约时间" width="160" :formatter="resetData"></el-table-column>
                <el-table-column prop="SignedTime" header-align="center" align="center" label="租赁期间" width="150" :formatter="resetData"></el-table-column>
                <el-table-column prop="state" header-align="center" align="center" width="110" label="合同状态">
                    <template slot-scope="props">
                        <el-tag type="success" v-if="props.row.cstate  == 1">待签约</el-tag>
                        <el-tag type="danger" v-if="props.row.cstate == 2">待执行</el-tag>
                        <el-tag type="success" v-if="props.row.cstate  == 3">当前</el-tag>
                        <el-tag type="danger" v-if="props.row.cstate == 4">历史</el-tag>
                        <el-tag type="success" v-if="props.row.cstate  == 5">已结束</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination  v-show='SignedRooms.length != 0' class="tc marT30" @current-change="handleCurrentChange" background
                :page-size="pageSize"
                :current-page="page"
                layout="prev, pager, next"
                :total="listsTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import { getChooseRoomLists } from '../../api/api.js'
    import { formatDate } from '../../util/index.js'
    export default{
        data(){
            return {
                listsTotal:0,
                page:1,
                pageSize:1,
                loading:true,
                SignedRooms:[]
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_MYCENTERNAV',5)
            })
        },

        methods: {
            //格式化时间
            resetData(row,column){
                return formatDate(new Date(row.choosetime),"yyyy-MM-dd hh:mm")
            },
            //分页
            handleCurrentChange(val){
                // console.log(`当前页: ${val}`);
                this.page = val
                this.loading = true;
                this.getChooseRoomListsFunc()
                setTimeout(()=>{
                    this.loading = false;
                },1000)
            },
            //获取选房列表数据
            getChooseRoomListsFunc(){
                if(this.$store.getters.userInfo){
                    this.loading = true
                    var params = {
                        Rows:this.pageSize,
                        Page:this.page,
                        QueryJson:{
                            MemberId:this.$store.getters.userInfo.MemberId,
                            State:-1,
                        }
                    }
                    getChooseRoomLists(params).then(response => {
                        switch(response.StatusCode){
                            case 200 :
                                this.listsTotal = response.Data.Records
                                this.SignedRooms = response.Data.Rows
                                setTimeout(()=>{
                                    this.loading = false
                                },1000)
                            break;
                            case 500 :
                                this.$message.error(response.Info)
                            break;
                            default:
                                this.$message.error(response.Info)
                        }
                    }).catch(error => {
                        this.$message.error(error)
                    })
                }
            },
        },
        created(){
            this.getChooseRoomListsFunc()
        }
    }
</script>
<style lang="scss">

</style>
