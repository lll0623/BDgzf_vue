<template>
    <div class="applyFor-wrap myCenter-breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>看房申请列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pad15" v-loading="loading">
            <el-table
                ref="multipleTable"
                :data="SeeRoomList"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column prop="AllName" header-align="center" align="center" label="小区" width="200"></el-table-column>
                <el-table-column prop="AllName" header-align="center" align="center" label="房间地址" width="200"></el-table-column>
                <el-table-column prop="ExpectTime" header-align="center" align="center" label="申请时间" width="180" :formatter="resetData"></el-table-column>
                <el-table-column prop="ApproveTypeText" header-align="center" align="center" width="100" label="审批状态">
                    <template slot-scope="props">
                        <el-tag type="success" v-if="props.row.state  == 0">未完成</el-tag>
                        <el-tag type="danger" v-else="props.row.state == 1">已完成</el-tag>
                        <el-tag type="danger" v-else="props.row.state == 2">已取消</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="SeeRoomListBtn(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination  v-show='SeeRoomList.length != 0' class="tc marT30" @current-change="handleCurrentChange" background
                :page-size="pageSize"
                :current-page="page"
                layout="prev, pager, next"
                :total="listsTotal">
            </el-pagination>
        </div>
        <el-dialog
            id="dialogSeeRoomList"
            title="看房申请"
            :visible.sync="dialogSeeRoomList"
            width="40%"
            >
            <div class="SeeRoomList-wrap ">
                <el-form :model="SeeRoomListViewForm" label-width="120px" ref="SeeRoomListViewForm">
                    <el-form-item label="审批状态：" prop="ApplyPeople">
                        <el-tag type="success" v-if="SeeRoomListViewForm.state  == 0">未完成</el-tag>
                        <el-tag type="danger" v-else="SeeRoomListViewForm.state == 1">已完成</el-tag>
                        <el-tag type="danger" v-else="SeeRoomListViewForm.state == 2">已取消</el-tag>
                    </el-form-item>
                    <el-form-item label="申请人：" prop="ApplyPeople">
                       <div>{{SeeRoomListViewForm.name}}</div>
                    </el-form-item>
                    <el-form-item label="联系电话：">
                    	<div>{{SeeRoomListViewForm.phone}}</div>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                     	<div>{{SeeRoomListViewForm.IDCard}}</div>
                    </el-form-item>
                    <el-form-item label="看房地址：">
                     	<div>{{SeeRoomListViewForm.VillageAddress}}</div>
                    </el-form-item>
                    <el-form-item label="预约看房时间：">
                     	<div>{{SeeRoomListViewForm.ExpectTime}}</div>
                    </el-form-item>
                    <el-form-item label="附加说明：">
                     	<div>{{SeeRoomListViewForm.OtherDesc}}</div>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" plain  @click="dialogSeeRoomList = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getApplyForLookRoomLists } from '../../api/api.js'
import { formatDate } from '../../util/index.js'
    export default{
        data(){
            return {
                loading:true,
                listsTotal:0,
                page:1,
                pageSize:10,
                dialogSeeRoomList:false, //看房申请弹出框
                ApproveTypeText: 'danger', //看房申请表单状态
                SeeRoomListViewForm:{ ///看房申请表单
                    name:'',
                    phone:'',
                    IDCard:'',
                    VillageAddress:'',
                    ExpectTime:'',
                    OtherDesc:'',
                    state:'',
                },
                SeeRoomList:[],
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_MYCENTERNAV',4)
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
        methods: {
            //格式化时间
            resetData(row,column){
                return formatDate(new Date(row.ExpectTime),"yyyy-MM-dd hh:mm:ss")
            },
            //查看
           SeeRoomListBtn(index,row) {
               console.log(this.$store.getters.userInfoForm)
                this.SeeRoomListViewForm.name = this.$store.getters.userInfoForm.Name
                this.SeeRoomListViewForm.phone = this.$store.getters.userInfoForm.Phone
                this.SeeRoomListViewForm.IDCard = this.$store.getters.userInfoForm.IDCard
                this.SeeRoomListViewForm.VillageAddress = row.AllName
                this.SeeRoomListViewForm.ExpectTime =formatDate(new Date(row.ExpectTime),"yyyy-MM-dd hh:mm:ss")
                this.SeeRoomListViewForm.OtherDesc = row.Description
                this.SeeRoomListViewForm.state = row.state
                this.dialogSeeRoomList = true;
           },
           //分页
           handleCurrentChange(val){
               // console.log(`当前页: ${val}`);
               this.page = val
               this.getApplyForLookRoomListsFunc()
           },
           //获取选房列表数据
           getApplyForLookRoomListsFunc(){
               var params = {
                   Rows:this.pageSize,
                   Page:this.page,
                   QueryJson:{
                       AccountId:this.$store.getters.userInfo.AccountId
                   }
               }
               if(this.$store.getters.userInfo){
                    getApplyForLookRoomLists(params).then(response => {
                       switch(response.StatusCode){
                           case 200 :
                               this.listsTotal = response.Data.Records
                               this.SeeRoomList = response.Data.Rows
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
           }
        },
        created(){
            this.getApplyForLookRoomListsFunc()
        },
    }
</script>
<style lang="scss">
    #dialogSeeRoomList {
        .el-form-item{

        }
    }
</style>
