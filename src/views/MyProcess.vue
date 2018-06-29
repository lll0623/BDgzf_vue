<template lang="html">
	<div class="container myProcess-wapper" v-loading="loading">
		<div class="myProcess-header bg-white marT30 marB20">
			<h4 class="c-3 fs28">我的进度</h4>
			<ul class="clearfix marT10">
				<li class="fl">
					<label>姓名：</label>
					<span>{{userInfo.RealName}}</span>
				</li>
				<li class="fl">
					<label>身份证号码：</label>
					<span>{{userInfo.IDCard}}</span>
				</li>
				<li class="fl">
					<label>手机号码：</label>
					<span>{{userInfo.PhoneNum}}</span>
				</li>
			</ul>
		</div>
		<div class="myProcess-content bg-white marB20" ref="box">
			<ul class="myProcessNav clearfix white">
				<li class="fl" :class="isActive == 1?'active':''" @click="checkTab('1')">非续租</li>
				<li class="fl" :class="isActive == 2?'active':''" @click="checkTab('2')">续租</li>
			</ul>
			<div class="" v-show="isActive == 1">
				<p class="tc error_text"  v-if="processLists1.length == 0">暂无数据!</p>
				<ul class="myProcessCont"  v-if="processLists1.length != 0"><!-- 1非续租、2续租 -->
					<li v-for="(item,index) in processLists1" :key="index" class="clearfix">
						<i></i>
						<label class="el-icon-success bg-green" v-if="item.State == 1"></label>
						<label class="el-icon-error bg-red" v-if="item.State == 2"></label>
						<label class="el-icon-info bg-info" v-if="item.State == 0"></label>
						<div>
							<h4>{{item.Time | resetData}}</h4>
							<p>
								<span>{{item.Schedule | filterSchedule}}</span>
								<el-tag v-if="item.State == 1">已通过</el-tag>
								<el-tag type="warning" v-if="item.State == 0">不通过</el-tag>
								<el-tag type="danger" v-if="item.State == 2">已拒绝</el-tag>
							</p>
							<h5 :class="!isShowMore ? 'fold' : 'unfold'">{{item.Content}}</h5>
							<i v-show="item.Content.length>=50 && !isShowMore" @click="isShowMore=true" class="fa fa-angle-double-down rel green fa-2x show_more" aria-hidden="true"></i>
							<i v-show="item.Content.length>=50 && isShowMore" @click="isShowMore=false" class="fa fa-angle-double-up rel green fa-2x hide_more" aria-hidden="true"></i>
						</div>
					</li>
				</ul>
			</div>
			<div class="" v-show="isActive == 2">
				<p class="tc error_text" v-if="processLists2.length == 0">暂无数据!</p>
				<ul class="myProcessCont" v-if="processLists2.length != 0"><!-- 1非续租、2续租 -->
					<li v-for="(item,index) in processLists2" :key="index" class="clearfix">
						<i></i>
						<label>{{index+1}}</label>
						<div>
							<h4>{{item.Time | resetData}}</h4>
							<p>
								<span>{{item.Schedule | filterSchedule}}</span>
								<el-tag v-if="item.State == 1">已通过</el-tag>
								<el-tag type="warning" v-if="item.State == 0">审核中</el-tag>
								<el-tag type="danger" v-if="item.State == 2">已拒绝</el-tag>
							</p>
							<h5>{{item.Content}}</h5>
						</div>
					</li>
				</ul>
			</div>
        </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMyProcess,getUserInfo } from '../api/api.js'
import { formatDate } from '../util/index.js'
export default {
	data() {
		return{
			loading:false,
			isShowMore:false,
			isActive:'1',
			userInfo : {
				RealName: "",
				IDCard : '',
				PhoneNum : '',
			},
			processLists1:[],
			processLists2:[],
		}
	},
	filters:{
		filterSchedule(val){
			switch(val){
				case 1001:
					return '受理中'
				break;
				case 2001:
					return '资格初审'
				break;
				case 2003:
					return '资料递交'
				break;
				case 2004:
					return '市局审批'
				break;
				default:
					return '资格复审'
			}
		},
		resetData(time){
			return formatDate(new Date(time),"yyyy-MM-dd hh:mm:ss")
		},
	},
	methods:{
		getUserInfoFunc(){
			this.loading = true
			var userInfo = this.$store.getters.userInfoForm
			if(userInfo){
				this.userInfo.RealName = userInfo.Name
				this.userInfo.IDCard = userInfo.IDCard
				this.userInfo.PhoneNum = userInfo.Phone
				this.getMyProcessFunc()
			}else{
				var params = {
					AccountId: this.$store.getters.userInfo.AccountId
				}
				getUserInfo(params).then(response => {
					this.userInfo.RealName = response.Data.Name
					this.userInfo.IDCard = response.Data.IDCard
					this.userInfo.PhoneNum = response.Data.Phone
					this.$store.dispatch('SET_USERINFOFORM',response.Data)
					this.getMyProcessFunc()
				}).catch(error => {
					this.$message.error(error)
				})
			}

		},
		getMyProcessFunc(){
			var params = {
				AccountId:this.$store.getters.userInfo.AccountId
			}
			getMyProcess(params).then((response) =>{
				for(var i=0;i<response.Data.length;i++){
					if(response.Data[i].Type == 0 || response.Data[i].Type == 1){
						this.processLists1.push(response.Data[i])
					}else{
						this.processLists2.push(response.Data[i])
					}
				}
				this.loading = false
			})
		},
		checkTab(val){
			this.isActive = val
		},
	},
	created() {
		this.getUserInfoFunc()
	},
	mounted(){
		this.$nextTick(() =>{
			this.$refs.box.style.minHeight = (document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight -30) +'px'
		});
	},
	//路由截取
	beforeRouteEnter (to,from,next) {
		next(vm =>{
			vm.$store.commit('SET_HEADTOGGLE',1)
			document.body.style.backgroundColor = '#eee'
		})
	},
	beforeRouteLeave(to,from,next){
		this.$store.commit('SET_HEADTOGGLE',0)
		document.body.style.backgroundColor = '#fff'
		next()
	},
}
</script>

<style lang="scss">
.myProcess-wapper{
    .myProcess-header{
        padding:20px;
        box-shadow: 0px 4px 8px #ddd;
        border-radius:2px;
        ul{
            li{
                width:33.33333%;
                color:#666;
            }
        }
    }
	.myProcess-content{
		box-shadow: 0px 4px 8px #ddd;
        padding:15px;
		.error_text{
			color:#009688;
			font-size: 16px;
			padding:30px 0 20px;
		}
		//进度条
		ul.myProcessNav{
			background: #f0f0f0;
			li{
				width:50%;
				height:50px;
				color:#333;
				line-height: 50px;
				text-align: center;
				font-size:16px;
				cursor: pointer;
				&.active{
					background:#009688;
					color:#fff;
				}
			}
		}
		ul.myProcessCont{
			padding: 80px 0 30px;
			li{
				width:50%;
				min-height:120px;
				position: relative;
				>i{
					position: absolute;
					top:0;
					width:1px;
					height:100%;
					background: #009688;
				}
				>label{
					display: block;
					position: absolute;
					color:#009688;
					width:26px;
					height: 26px;
					border-radius: 50%;
					line-height: 26px;
					text-align:center;
					color: #fff;
					z-index: 1;
					top:-7px;
				}
				>div{
					position:relative;
					top:-10px;
					width:55%;
					box-shadow:0px 2px 4px #999;
					background: #f0f0f0;
					border-radius: 3px;
					>i{
						&.show_more,&.hide_more{
							cursor: pointer;
							position:relative;
							bottom:3px;
						}
					}
					>h4{
						padding:10px;
						font-size:14px;
						color:#fff;
						background: #009688;
						margin-bottom: 15px;
						border-radius:3px 3px 0 0;
					}
					>p{
						padding-bottom:15px;
						font-size: 16px;
						>span{
							&.el-tag{
								font-size: 14px!important;
							}
						}
					}
					>h5{
						padding:10px;
						font-size: 14px;
						color:#666;
						text-align: left;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						overflow: hidden;
						line-height:26px;
						&.fold{
							-webkit-line-clamp: 3;
						}
						.unfold {
							-webkit-line-clamp: 100;
						}
					}
					&:after{
						content:'';
				        display: block;
				        width: 0;
				        height: 0;
				        vertical-align: middle;
				        border-top: 14px dashed;
				        border-top: 14px solid\9;
				        border-right: 8px solid transparent;
				        border-left: 8px solid transparent;
				        position: absolute;
				        top: 10px;
				        bottom: 0;
				        color: #009688;
				        z-index: 9;
					}
				}
				&:nth-of-type(n){
					text-align:right;
					>i{
						right:13px;
					}
					>label{
						right:0;
					}
					>div{
						padding-right:0;
						float: right;
						margin-right:55px;
						i{
							&.show_more,&.hide_more{
								right:15px;
							}
						}
						>h4{
							padding-right:15px;
						}
						>p,h5{
							padding-right:15px;
						}
						>p{
							>span{
								&.el-tag{
									margin-left:15px;
								}
							}
						}
						&:after{
							right:-12px;
							transform: rotate(-90deg);
						}
					}
				}
				&:nth-of-type(2n){
					text-align:left;
					margin-left:50%;
					>i{
						left:-14px;
					}
					>label{
						left:-27px;
					}
					>div{
						float: left;
						margin-left:30px;
						i{
							&.show_more,&.hide_more{
								left:15px;
							}

						}
						>h4{
							padding-left:15px;
						}
						>p,h5{
							padding-left:15px;
						}
						>p{
							>span{
								&.el-tag{
									margin-right:15px;
								}
							}
						}
						&:after{
							left:-12px;
							transform: rotate(90deg);
						}
					}
				}
				&:last-child{
					>i{
						width:0;
					}
				}
			}
		}
	}
}
</style>
