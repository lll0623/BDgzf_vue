<template>
    <div class="applyFor-wrap myCenter-breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>已选定房间列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pad15" v-loading = 'loading'>
            <el-table
                ref="multipleTable"
                :data="SelectedRooms"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column prop="roomallname" header-align="center" align="center" label="小区" width="200"></el-table-column>
                <el-table-column prop="roomallname" header-align="center" align="center" label="房间地址" width="180"></el-table-column>
                <el-table-column prop="choosetime" header-align="center" align="center" label="选定时间" width="180" :formatter="resetData"></el-table-column>
                <el-table-column prop="state" header-align="center" align="center" width="100" label="状态">
                    <template slot-scope="props">
                        <el-tag type="success" v-if="props.row.state  == 0">有效</el-tag>
                        <el-tag type="warning" v-if="props.row.state == 1">已网签</el-tag>
                        <el-tag type="success" v-if="props.row.state == 2">已签约</el-tag>
                        <el-tag type="info" v-if="props.row.state == 3">已取消</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.state == '0'" type="primary" @click="getSignContractFunc(scope.$index, scope.row)">签约</el-button>
                        <el-button size="mini" v-if="scope.row.state == '0'" type="danger" @click="getCancelRoomFunc(scope.$index, scope.row)">取消</el-button>
                        <p v-else>无操作</p>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show='SelectedRooms.length != 0' class="tc marT30" @current-change="handleCurrentChange" background
                :page-size="pageSize"
                :current-page="page"
                layout="prev, pager, next"
                :total="listsTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import { getChooseRoomLists,getCancelRoom,getSignContract } from '../../api/api.js'
    import { formatDate } from '../../util/index.js'
    export default{
        data(){
            return {
                listsTotal:0,
                page:1,
                pageSize:10,
                loading:true,
                SelectedRooms: [],
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_MYCENTERNAV',3)
            })
        },
        methods: {
            //格式化时间
            resetData(row,column){
                return formatDate(new Date(row.choosetime),"yyyy-MM-dd hh:mm:ss")
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
                this.loading = true
                var params = {
                    Rows:this.pageSize,
                    Page:this.page,
                    QueryJson:{
                        AccountId:this.$store.getters.userInfo.AccountId,
                    }
                }
                getChooseRoomLists(params).then(response => {
                    switch(response.StatusCode){
                        case 200 :
                            this.listsTotal = response.Data.Records
                            this.SelectedRooms = response.Data.Rows
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
            },
            //取消选房
            getCancelRoomFunc(index,row){
                this.$confirm('是否确定取消关注该房间?', '提示信息', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                       type: 'warning'
                }).then(() => {
                    var param ={
                        AccountId : this.$store.getters.userInfo.AccountId,
                        Id:row.id,
                        RoomId:row.roomid,
                    }
                    getCancelRoom({Id:row.id}).then(response => {
                        switch(response.StatusCode){
                            case 200 :
                                this.getChooseRoomListsFunc()
                                this.$message({
                                    type: 'success',
                                    message: '取消成功'
                                });
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
                }).catch(error => {})
            },
            //网签合同
            getSignContractFunc(index,row){
                var params = {
                    AccountId: this.$store.getters.userInfo.AccountId,
                    RoomId : row.roomid,
                    SelectId : row.id,
                }
                getSignContract(params).then(response=>{
                    console.log(response.Data)
                    switch(response.StatusCode){
                        case 200 :
                            this.$store.commit('SET_STEPTIP','1009');
                            this.getChooseRoomListsFunc()
                            this.$message({
                                type: 'success',
                                message: '签约成功'
                            });
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
                    this.$message.error(erro)
                })
            },
        },
        created(){
            this.getChooseRoomListsFunc()
        },
    }
</script>
<style lang="scss">

</style>
