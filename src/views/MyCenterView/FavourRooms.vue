<template>
    <div class="applyFor-wrap myCenter-breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>已关注房间列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pad15" v-loading="loading">
            <el-table
                ref="multipleTable"
                :data="FavourRooms"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column prop="AllName" header-align="center" align="center" label="小区" width="250"></el-table-column>
                <el-table-column prop="AllName" header-align="center" align="center" label="房间地址" width="200"></el-table-column>
                <el-table-column prop="CreateDate" header-align="center" align="center" label="关注时间" width="180" :formatter="resetData"></el-table-column>
                <el-table-column label="操作" header-align="center" align="center" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" type="default" @click="cancelFavourRooms(scope.$index,scope.row)">取消</el-button>
                        <el-button size="mini" type="primary" @click="checkForRooms(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                </el-table-column>
            </el-table>
            <el-pagination  v-show='FavourRooms.length != 0' class="tc marT30" @current-change="handleCurrentChange" background
                :page-size="pageSize"
                :current-page="page"
                layout="prev, pager, next"
                :total="listsTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import { getCollectedLists,cancelCollect } from '../../api/api.js'
    import { formatDate,getCookie } from '../../util/index.js'
    export default{
        middleware: 'auth',
        data(){
            return {
                loading:false,
                FavourRooms:[],
                page:1,
                pageSize:10,
                listsTotal:0,
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_MYCENTERNAV',6)
            })
        },
        methods: {
            //格式化时间
            resetData(row,column){
                return formatDate(new Date(row.CreateDate),"yyyy-MM-dd hh:mm")
            },
            //分页
            handleCurrentChange(val){
                // console.log(`当前页: ${val}`);
                this.page = val
                this.getCollectedListFunc()
            },
            //查看房源
            checkForRooms(index,row){
                this.$router.push({path: `/houseDetails/${row.ObjectId}`,})
            },
            //取消关注
            cancelFavourRooms(index,row) {
                this.$confirm('是否确定取消关注该房间?', '提示信息', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                       type: 'warning'
                }).then(() => {
                    //取消代码
                    // console.log(row)
                    var params = {
       					AccountId:this.$store.getters.userInfo.AccountId,
       					ObjectId:row.ObjectId,
       				}
                    this.loading = true
                    // console.log(params)
                    cancelCollect(params).then(response => {
                        switch(response.StatusCode){
                            case 200:
                                this.getCollectedListFunc()
                                this.loading =false
                                this.$message({
                                    type: 'success',
                                    message: '取消成功'
                                });
                            break;
                            case 500:
                                this.$message({
                                    type: 'error',
                                    message: response.Info
                                });
                                break;
                            default:
                                this.$message({
                                    type: 'error',
                                    message: response.Info
                                });
                        }
                    }).catch(error => {
                        this.$message.error(error)
                    })
                }).catch(() => {});
            },
            //获取关注房源列表
            getCollectedListFunc(){
                this.loading = true
                if(this.$store.getters.userInfo){
                    var params = {
                        QueryJson:{
                            AccountId : this.$store.getters.userInfo.AccountId,
                        },
                        Page:this.page,
                        Rows:this.pageSize
                    }
                    getCollectedLists(params).then(response => {
                        switch(response.StatusCode){
                            case 200 :
                                this.listsTotal = response.Data.Records
                                if(response.Data.Rows!=null && response.Data.Rows != ''){
                                    this.FavourRooms = response.Data.Rows
                                }else{
                                    this.FavourRooms = []
                                }
                                setTimeout(()=>{
                                    this.loading = false
                                },1000)
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
            this.getCollectedListFunc()
        },
    }
</script>
<style lang="scss">
</style>
