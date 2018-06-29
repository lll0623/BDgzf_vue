<template>
    <!-- 第三步 -->
    <div class="" v-show="applyForTab==3" v-loading="loading">
        <el-form :inline="true"
        v-model="step03_Form"
        label-width="140px"
        class="step03-ruleForm">
            <div class="rel step03-ruleForm-01">
                <h4 class="c-3 fs20 bold marB20">申请人本市户籍地住房情况</h4>
                <span class="abs fs30 c-3">1</span>
                <el-form-item label="房租坐落地址">
                    <el-input v-model="step03_Form[0].Address" placeholder="请输入房租坐落地址" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-radio-group v-model="step03_Form[0].houseAreaType" :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                        <el-radio label="1">建筑面积</el-radio>
                        <el-radio label="0">使用面积</el-radio>
                    </el-radio-group>
                    <el-input v-model="step03_Form[0].houseArea" placeholder="请输入房屋面积" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="产权人或公房承租人">
                    <el-input v-model="step03_Form[0].Owner" placeholder="请输入产权人或公房承租人" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="该住房户籍人口总数">
                    <el-input v-model="step03_Form[0].PeopleCount" placeholder="请输入该住房户籍人口总数" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="产权性质">
                    <el-select v-model="step03_Form[0].PropertyType" placeholder="请选择产权性质" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                        <el-option v-for="(item,index) in propertyTypeLists" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋类型">
                    <el-select v-model="step03_Form[0].RoomType" placeholder="请选择房屋类型" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                        <el-option v-for="(item,index) in houseType" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="rel step03-ruleForm-01">
                <span class="abs fs30 c-3" style="top:65px;">2</span>
                <el-form-item label="房租坐落地址">
                    <el-input v-model="step03_Form[1].Address" placeholder="请输入房租坐落地址" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-radio-group v-model="step03_Form[1].houseAreaType" :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                        <el-radio label="1">建筑面积</el-radio>
                        <el-radio label="0">使用面积</el-radio>
                    </el-radio-group>
                    <el-input v-model="step03_Form[1].houseArea" placeholder="请输入房屋面积" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="产权人或公房承租人">
                    <el-input v-model="step03_Form[1].Owner" placeholder="请输入产权人或公房承租人" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="该住房户籍人口总数">
                    <el-input v-model="step03_Form[1].PeopleCount" placeholder="请输入该住房户籍人口总数" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="产权性质">
                    <el-select v-model="step03_Form[1].PropertyType" placeholder="请选择产权性质" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                        <el-option v-for="(item,index) in propertyTypeLists" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋类型">
                    <el-select v-model="step03_Form[1].RoomType" placeholder="请选择房屋类型" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                        <el-option v-for="(item,index) in houseType" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="rel step03-ruleForm-01 step03-ruleForm-02">
                <h4 class="c-3 fs20 bold marB20">申请人本市产权住房情况</h4>
                <span class="abs fs30 c-3" style="top:78px;">1</span>
                <el-form-item label="房租坐落地址">
                    <el-input v-model="step03_Form[2].Address" placeholder="请输入房租坐落地址" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="建筑面积">
                    <el-input v-model="step03_Form[2].Area" placeholder="请输入房屋面积" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="产权人或公房承租人">
                    <el-input v-model="step03_Form[2].Owner" placeholder="请输入产权人或公房承租人" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="该住房户籍人口总数">
                    <el-input v-model="step03_Form[2].PeopleCount" placeholder="请输入该住房户籍人口总数" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
            </div>
            <div class="rel step03-ruleForm-01 step03-ruleForm-02">
                <span class="abs fs30 c-3" style="top:20px;">2</span>
                <el-form-item label="房租坐落地址">
                    <el-input v-model="step03_Form[3].Address" placeholder="请输入房租坐落地址" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="建筑面积">
                    <el-input v-model="step03_Form[3].Area" placeholder="请输入房屋面积" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="产权人或公房承租人">
                    <el-input v-model="step03_Form[3].Owner" placeholder="请输入产权人或公房承租人" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="该住房户籍人口总数">
                    <el-input v-model="step03_Form[3].PeopleCount" placeholder="请输入该住房户籍人口总数" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
            </div>
            <div class="rel step03-ruleForm-01">
                <h4 class="c-3 fs20 bold marB20">申请人承租本市公有住房情况</h4>
                <span class="abs fs30 c-3">1</span>
                <el-form-item label="房租坐落地址">
                    <el-input v-model="step03_Form[4].Address" placeholder="请输入房租坐落地址" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-radio-group v-model="step03_Form[4].houseAreaType" :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                        <el-radio label="1">建筑面积</el-radio>
                        <el-radio label="0">使用面积</el-radio>
                    </el-radio-group>
                    <el-input v-model="step03_Form[4].houseArea" placeholder="请输入房屋面积" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="产权人或公房承租人">
                    <el-input v-model="step03_Form[4].Owner" placeholder="请输入产权人或公房承租人" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="该住房户籍人口总数">
                    <el-input v-model="step03_Form[4].PeopleCount" placeholder="请输入该住房户籍人口总数" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1"></el-input>
                </el-form-item>
                <el-form-item label="产权性质">
                    <el-select v-model="step03_Form[4].PropertyType" placeholder="请选择产权性质" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                        <el-option v-for="(item,index) in propertyTypeLists" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋类型">
                    <el-select v-model="step03_Form[4].RoomType" placeholder="请选择房屋类型" clearable :disabled = "(userInfo.State != 1001 && userInfo.State != 1002) || isUserEnter == 1">
                        <el-option v-for="(item,index) in houseType" :key="item.name"  :label="item.name" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
        <div class="stpe03_tip">
            <p>注：</p>
            <p>1、建筑面积、居住面积由申请人按《房地产权证》或《租用居住公房凭证》上记载的面积填写。</p>
            <p>2、上述住房如有除产权人或公房承租人之外的户籍人口，需提供本市户口簿复印件。</p>
            <p>3、同一处住房在不同栏目中不需要重复填写。</p>
        </div>
        <div class="step02_btn_wrap tc padT10 padB20" v-show="(userInfo.State ==1001 || userInfo.State==1002) && isUserEnter !=1">
            <el-button @click="step03_prev()">上一步</el-button>
            <el-button type="primary" @click="step03_next()">下一步</el-button>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { houseType,propertyTypeLists } from '../../../static/dataJson/dataJson'
    import { getApplyFor,getApplyForInfo} from '../../api/api.js'
    import { getCookie,setCookie } from '../../util/index.js'
    export default{
        data(){
            return {
                loading:false,
                //房屋类型
                houseType,
                //产权性质
                propertyTypeLists,
                //第三步
                step03_Form:[{
                    Address:'',//房租坐落地址
                    houseAreaType:'1',
                    houseArea:'',
                    Area:'',
                    UseArea:'',
                    Owner:'',//产权人或公房承租人
                    PeopleCount:'',//该住房户籍人口总数
                    PropertyType:'',//产权性质
                    RoomType:'',//房屋类型
                    Category:1,
                },{
                    Address:'',//房租坐落地址
                    houseAreaType:'1',
                    houseArea:'',
                    Area:'',
                    UseArea:'',
                    Owner:'',//产权人或公房承租人
                    PeopleCount:'',//该住房户籍人口总数
                    PropertyType:'',//产权性质
                    RoomType:'',//房屋类型
                    Category:1,
                },{
                    Address:'',
                    Area:'',
                    Owner:'',
                    PeopleCount:'',
                    Category:2,
                },{
                    Address:'',
                    Area:'',
                    Owner:'',
                    PeopleCount:'',
                    Category:2,
                },{
                    Address:'',//房租坐落地址
                    houseAreaType:'1',
                    houseArea:'',
                    Area:'',
                    UseArea:'',
                    Owner:'',//产权人或公房承租人
                    PeopleCount:'',//该住房户籍人口总数
                    PropertyType:'',//产权性质
                    RoomType:'',//房屋类型
                    Category:3,
                },],
            }
        },
        computed:{
            ...mapGetters(['applyForTab','userInfo','isUserEnter']),
            getApplyForCode(){
                return this.$store.getters.applyForCode
            },
        },
        watch:{
            getApplyForCode:function(val){
                if(val !=''){
                    this.getApplyForInfoFunc(val)
                }
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm =>{
                vm.$store.commit('SET_APPLYFORTAB',3)
            })
        },
        methods:{
            //第三步提交
            step03_prev(){
                this.loading =true;
                setTimeout(()=>{
                    this.loading = false;
                    this.$router.push({path:'/applyFor/secondStep'})
                },2000)
            },
            step03_next(){
                var paramsRoomlist = []
                // console.log(this.step03_Form)
                for( var i = 0;i<this.step03_Form.length;i++){
                    if(this.step03_Form[i].Address!=''){
                        if(this.step03_Form[i].houseAreaType == 1){
                            this.step03_Form[i].Area = this.step03_Form[i].houseArea
                        }else if(this.step03_Form[i].houseAreaType ==0){
                            this.step03_Form[i].UseArea = this.step03_Form[i].houseArea
                        }else{
                            this.step03_Form[i].Area = this.step03_Form[i].houseArea
                        }
                        this.step03_Form[0].Category = 1;
                        this.step03_Form[1].Category = 1;
                        this.step03_Form[2].Category = 2;
                        this.step03_Form[3].Category = 2;
                        this.step03_Form[4].Category = 3;
                        paramsRoomlist.push(this.step03_Form[i]);
                    }
                }
                var params ={
                    step : 3,
                    bill: {
                        SignType: this.$store.getters.applyForData.bill.SignType,
                        code:this.$store.getters.applyForCode,
                        TelAddr:this.$store.getters.applyForData.bill.TelAddr,
                        PostCode:this.$store.getters.applyForData.bill.PostCode,
                    },
                    member:this.$store.getters.applyForData.member,
                    filelist:this.$store.getters.applyForData.filelist,
                    residentlist:this.$store.getters.applyForData.residentlist,
                    roomlist:paramsRoomlist
                }
                var applyForData = {
                    bill:params.bill,
                    member:params.member,
                    filelist:params.filelist,
                    residentlist:params.residentlist,
                    roomlist:params.roomlist,
                }
                // console.log(params)
                getApplyFor(params).then(response => {
                    switch (response.StatusCode) {
                        case 200:
                            this.loading = false
                            this.$store.dispatch('SET_APPLYFORDATA',applyForData)
                            setCookie('applyForData',JSON.stringify(applyForData))
                            this.$router.push({path:'/applyFor/FourthStep'})
                        break;
                        case 500:
                            this.loading = false;
                            this.$message({
                                type: 'error',
                                message: response.Info
                            });
                            break;
                        default:
                            this.loading = false;
                            this.$message({
                                type: 'error',
                                message: response.Info
                            });
                    }
                }).catch(error=> {
                    this.$message({
                        type: 'error',
                        message: error
                    });
                })
            },
            getApplyForInfoFunc(val){
                this.loading = true
                getApplyForInfo({Id:val}).then((response) =>{
                    // console.log(JSON.parse(response.Data))
                    switch (response.StatusCode) {
                        case 200:
                            var step03_Form = [{
                                Address:'',//房租坐落地址
                                houseAreaType:'1',
                                houseArea:'',
                                Area:'',
                                UseArea:'',
                                Owner:'',//产权人或公房承租人
                                PeopleCount:'',//该住房户籍人口总数
                                PropertyType:'',//产权性质
                                RoomType:'',//房屋类型
                                Category:'1',
                            },{
                                Address:'',//房租坐落地址
                                houseAreaType:'1',
                                houseArea:'',
                                Area:'',
                                UseArea:'',
                                Owner:'',//产权人或公房承租人
                                PeopleCount:'',//该住房户籍人口总数
                                PropertyType:'',//产权性质
                                RoomType:'',//房屋类型
                                Category:'1',
                            },{
                                Address:'',
                                Area:'',
                                Owner:'',
                                PeopleCount:'',
                                Category:'2',
                            },{
                                Address:'',
                                Area:'',
                                Owner:'',
                                PeopleCount:'',
                                Category:'2',
                            },{
                                Address:'',//房租坐落地址
                                houseAreaType:'1',
                                houseArea:'',
                                Area:'',
                                UseArea:'',
                                Owner:'',//产权人或公房承租人
                                PeopleCount:'',//该住房户籍人口总数
                                PropertyType:'',//产权性质
                                RoomType:'',//房屋类型
                                Category:'3',
                            },]
                            var roomlist = JSON.parse(response.Data).roomlist
                            for(var i=0;i<roomlist.length;i++){
                                if(roomlist[i].Category == 1 && step03_Form[0].Address == '') {
                                    step03_Form[0] =  roomlist[i]
                                }else if(roomlist[i].Category == 1){
                                    step03_Form[1] =  roomlist[i]
                                }
                                if(roomlist[i].Category == 2 && step03_Form[2].Address == ''){
                                    step03_Form[2] =  roomlist[i]
                                }else if(roomlist[i].Category == 2){
                                    step03_Form[3] =  roomlist[i]
                                }
                                if(roomlist[i].Category == 3){
                                    step03_Form[4] =  roomlist[i]
                                }
                            }
                            for(var i=0;i<step03_Form.length;i++){
                                if(step03_Form[i].UseArea != ''){
                                    step03_Form[i].houseAreaType ="0"
                                    step03_Form[i].houseArea = step03_Form[i].UseArea
                                }else if(step03_Form[i].Area != ''){
                                    step03_Form[i].houseAreaType ="1"
                                    step03_Form[i].houseArea = step03_Form[i].Area
                                }
                            }
                            this.step03_Form=step03_Form

                            this.loading = false;
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
                }).catch(error=> {
                    this.$message.error(error)
                })
            }
        },
        created(){
            if(this.$store.getters.applyForCode){
                this.getApplyForInfoFunc(this.$store.getters.applyForCode)
            }
        }
    }
</script>
<style lang='scss'>

</style>
