<template>
    <div>
        <!-- <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
          <span>当前暂无租赁合同</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" style="display:none;">取 消</el-button>
            <router-link to="/">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </router-link>
          </span>
        </el-dialog> -->
        <div class="applyBody" v-show='bodyView' v-loading="loading">
                <div class="" style="margin: 40px 0 0 0;">
                    <h2 class="tc" style="margin-bottom:10px;">退租申请</h2>
                    <div class="clearfix" style="margin-bottom:10px;">
                        <div class="clearfix">
                            <el-tag v-show="this.Category = 0" type="danger">即将到期</el-tag>
                            <div class="pull-right" style="margin-top:15px">
                                <p class="pull-left" style="margin-right:20px;margin-left:20px;">
                                    <span>合同编号：</span>
                                    <span class="qContract">{{ dialogInfo_cdw.Code }}</span>
                                </p>
                                <p class="pull-left">
                                    <span>签约日期：</span>
                                    <span>{{ dialogInfo_cdw.Date }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <table class="retreatTable" style="border-collapse: collapse; min-width: 100%;border: 1px solid #999;margin-bottom: 20px;">
                    <colgroup>
                      <col style="width: 130px;" />
                      <col style="width: 130px;" />
                      <col style="width: 130px;" />
                      <col style="width: 130px;" />
                      <col style="width: 130px;" />
                      <col style="width: 130px;" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td>申请人：</td>
                        <td>{{ dialogInfo_cdw.CustimerName }}</td>

                        <td>身份证号：</td>
                        <td>{{ dialogInfo_member.IDCard }}</td>

                        <td>联系电话：</td>
                        <td>{{ dialogInfo_member.Phone }}</td>
                      </tr>
                      <tr>
                        <td>租赁房屋：</td>
                        <td colspan="5">{{ dialogInfo_cpi.RoomName }}</td>
                      </tr>
                      <tr>
                        <td>建筑面积：</td>
                        <td>{{ dialogInfo_cpi.RoomArea }}</td>

                        <td>户型：</td>
                        <td>{{ dialogInfo_cpi.RoomType }}</td>

                        <td>每月租金：</td>
                        <td>{{ dialogInfo_cdw.MontylyRent }}</td>
                      </tr>
                      <tr>
                        <td>租赁起始日期：</td>
                        <td>{{ dialogInfo_cdw.BeginDate | dateFormat }}</td>

                        <td>租赁终止日期：</td>
                        <td>{{ dialogInfo_cdw.EndDate | dateFormat }}</td>

                        <td>租赁年限（年）：</td>
                        <td>{{ dialogInfo_cdw.RentYear }}</td>
                      </tr>
                    </tbody>
                </table>

                <table class="retreatTable" style="border-collapse: collapse; min-width: 100%;">
                    <tbody>
                      <tr>
                        <td style="width: 15%;">退租类型：</td>
                        <td style="width: 35%;">
                          <span v-if="this.Category = 0">到期退租</span>
                          <span v-if="this.Category = 1">提前退租</span>
                        </td>
                        <td style="width: 15%;">
                          租赁终止日期：
                        </td>
                        <td style="width: 35%;">
                          <el-date-picker
                            v-model="ReLeaseDate"
                            :default-value="timeDefaultShow"
                            type="date"
                            :picker-options="pickerOptions0"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                          </el-date-picker>
                        </td>
                      </tr>
                      <tr>
                        <td style="width: 15%;">附加说明：</td>
                        <td colspan="3">
                          <textarea v-model="Description" name="message" style="width: 100%;text-align: left;height: 60px;padding:0px;"></textarea>
                        </td>
                      </tr>
                      <tr style="background-color: yellow;">
                        <td style="width: 15%;">温馨提示：</td>
                        <td colspan="3" style="border: 1px solid rgb(219, 219, 219); width: 936px; padding: 8px;text-align: left;">
                          <div>提交申请后非审核失败则不允许再提交,请核对数据正确</div>
                        </td>
                      </tr>
                    </tbody>
                </table>
                <div class="row mg35">
                    <div class="col-xs-12">
                      <div style="display: table;margin-left: auto;margin-right: auto;">
                        <el-button class="primary-button" @click="retreatSubmit">提交</el-button>
                        <router-link to="/" class="marL10">
                            <el-button class="default-button">取消</el-button>
                        </router-link>
                      </div>
                    </div>
                </div>
            </div>
        <!-- </el-form> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getContractDetail,getRetirementApplication } from '../api/api.js'
import moment from 'moment'
var retreatStartTime,retreatEndTime;
export default {
name: 'retreat-apply',
data() {
	return {
        pickerOptions0: {
          disabledDate(time) {
                var date_s = new Date(Date.parse(retreatStartTime.replace(/-/g,   "/")));
                var date_e = new Date(Date.parse(retreatEndTime.replace(/-/g,   "/")));
                var iMonths = parseInt(Math.abs(date_e.getTime()- date_s.getTime()) /1000/60/60/24/30); //相距多少个月数

                let startDate = (new Date(date_s)).getTime();

                let monthRange_s = 30 * 24 * 3600 * 1000;
                let numMonths_s = startDate + monthRange_s;

                let monthRange_e = iMonths * 30 * 24 * 3600 * 1000;
                let numMonths_e = startDate + monthRange_e;
                return time.getTime() < numMonths_s || time.getTime() > numMonths_e;
          }
        },
        loading:true,
        // zanqu:false,
        timeDefaultShow:'',
        // dialogVisible:false,
        bodyView:false,
        dialogInfo_cdw:'',
        dialogInfo_cpi:'',
        dialogInfo_member:'',
		retreatForm:'',
        Category:'',
        ReLeaseDate:'',
        Description:'',
        daysRange:'',
        ContractId:''
	}
},
counted() {

},
created() {
    // var State = this.$store.getters.userInfo.State
    // switch (State) {
    //     case State =1011 :
    //         this.$alert('当前正在续租中，等待管理员审核！', '提示', {
    //             confirmButtonText: '确定',
    //             callback: action => {
    //             this.$router.push({path:'/'})
    //           }
    //         });
    //         break;
    //     case State =1012 :
    //         this.zanqu = true;
    //         this.$alert('当前正在退租中，等待管理员审核！', '提示', {
    //             confirmButtonText: '确定',
    //             callback: action => {
    //             this.$router.push({path:'/'})
    //           }
    //         });
    //         break;
    //     default:
    //
    // }
this.getRetreatDetail();
},
methods: {
    getRetreatDetail() {
        let params = {
            Id:this.$store.getters.userInfo.AccountId
        }
        // 获取合同详情接口
        getContractDetail(params).then((response) => {
            // if(response.Data == null || response.Data == "") {
            //     this.dialogVisible = true;
            //     this.zanqu = true;
            //     return
            // }

            var errorText = response.Info;
            switch (response.StatusCode) {
                case 200:
                this.dialogInfo_cdw = JSON.parse(response.Data).cdw;
                this.dialogInfo_cpi = JSON.parse(response.Data).cpi;
                this.dialogInfo_member = JSON.parse(response.Data).member;
                setTimeout(()=>{
                    this.loading = false
                },1000)
                retreatStartTime = this.dialogInfo_cdw.BeginDate;
                retreatEndTime = this.dialogInfo_cdw.EndDate;
                //日期控件默认聚焦时间
                this.timeDefaultShow = moment(new Date(JSON.parse(response.Data).cdw.BeginDate)).add(1, 'months');
                this.ContractId = this.dialogInfo_cdw.Id; //合同id

                var endTime = moment(this.dialogInfo_cdw.EndDate).format('L');
                this.daysRange = this.dateDiff(endTime);
                if(this.daysRange>60){
                    this.Category = 1;
                }else if (this.daysRange>30 && this.daysRange<60) {
                    this.Category = 0;
                }
                this.bodyView = true;
                break;
                case 500:
                    if(response.Data == null) {
                        this.retreatForm = [];
                    }
                    this.$message({
                        type: 'error',
                        message: errorText
                    });
                    break;
                default:
                    this.$message({
                        type: 'error',
                        message: '获取信息失败！'
                    });
            }
        })
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
    retreatSubmit() {
        if( this.ReLeaseDate == '' ){
            this.$message({
                type: 'error',
                message: '租赁终止日期不能为空！'
            });
            return;
        }
        if( this.Description == '' ){
            this.$message({
                type: 'error',
                message: '附加说明不能为空！'
            });
            return;
        }
        this.ReLeaseDate = moment(this.ReLeaseDate).format("YYYY-MM-DD") //所选退租日期
        let params = {
            ContractId:this.ContractId,
            Category:this.Category,
            ReLeaseDate:this.ReLeaseDate,
            Description:this.Description
        }
        getRetirementApplication(params).then((response) => {
            var errorText = response.Info;
            switch (response.StatusCode) {
                case 200:
                    this.$alert('退租申请成功，等待审核！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        this.$router.push({path:'/'})
                      }
                    });
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
                        message: '提交申请失败！'
                    });
            }
        })
    }
},
filters:{
    //时间格式化
    dateFormat:function(date) {
        if (date == undefined) {
           return "";
        }
        return moment(date).format("YYYY-MM-DD");
    }
}
}
</script>
<style lang="scss">
.noRetrate{
    width: 150px;
    padding: 0 30px;
    border: 1px solid #c3c3c3;
    -webkit-box-shadow: rgba(0, 0, 0, .2) 0px 1px 10px;
    margin: 30px auto;
    box-shadow: rgba(0, 0, 0, .2) 0px 1px 10px;
}
.applyBody{
    width: 960px;
    padding: 0 30px;
    border: 1px solid #c3c3c3;
    -webkit-box-shadow: rgba(0, 0, 0, .2) 0px 1px 10px;
    margin: 30px auto;
    box-shadow: rgba(0, 0, 0, .2) 0px 1px 10px;
}
.retreatTable tbody td {
    border: 1px solid rgb(219, 219, 219);
    padding: 8px;
}
.primary-button {
    background: #009688 !important;
    border-color: #009688 !important;
    color: white !important;
    &:hover {
        background: #18ab9d !important;
        border-color: #18ab9d !important;
        color: white !important;
    }
}
.default-button {
    background: #e4e4e4 !important;
    border-color: #e4e4e4 !important;
    color: #606266 !important;
    &:hover {
        background: #f2f2f2 !important;
        border-color: #f2f2f2 !important;
        color: #606266 !important;
    }
}
.mg35 {
    margin: 35px 0;
}
</style>
