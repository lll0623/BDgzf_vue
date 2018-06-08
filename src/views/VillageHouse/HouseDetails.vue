<template>
<div class='container marT20 marB20' v-loading="loading" ref="box">
	<div>
		<div class="screen-search-breadcrumb">
			<!-- 面包屑 -->
			<div class="clearfix search-breadcrumb">
				<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb_nav fl">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/houseLists' }">房源列表</el-breadcrumb-item>
					<el-breadcrumb-item>房源详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="villageDetails-item-top pad15" id="'anchor-0">
			<div class="clearfix houseDetails_tit_wrap marB20">
				<h4 class="bold fs30 c-3 fl">{{title}}</h4>
				<el-button type="primary" class="fr collect_btn" @click="collectFun()"><i class="fa fa-heart" :class="{red:isCollected == 1}"></i>关注</el-button>
			</div>
			<ul class="villageDetails-item-nav clearfix" :class="IsFixed? 'fix' : ''">
				<li v-for="(item,index) in navData" :key="index" :class="{'active':item.isActive===true}" @click="tabActive(item)">
					<a href="javascript:void(0)" @click="goAnchor('#anchor-'+index)">{{item.name}}</a>
				</li>
			</ul>
			<div class="villageDetails-item-top-cont clearfix">
                <div class="fl marR30 villageDetails-item-top-cont-fir rel">
					<swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
						<swiper-slide v-for="(banner,index) in banners" :key="index">
							<img :src="banner">
						</swiper-slide>
						<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
						<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
					</swiper>
					<swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
						<swiper-slide v-for="(banner,index) in banners" :key="index">
							<img :src="banner">
						</swiper-slide>
					</swiper>
				</div>
				<div class="fl villageDetails-item-top-cont-sec">
					<h5 class="bold fs16 c-3">房源概况</h5>
					<div class="clearfix village-info-fir">
						<p class="fl c-6"><strong class="red fs40">{{MonthlyRent}}</strong>元/月</p>
						<div class="fr modelPhonebtnWrap">
							<h4 v-show="!isLookRoom || IsSearchRoom == 1" class="applyForTip rel">{{applyForTipText}}</h4>
							<el-button v-show="isLookRoom && IsSearchRoom == 0" plain type="primary"  @click="dialogVisible=true">看房申请</el-button>
						</div>
					</div>
					<div class="mian_info clearfix marT20">
						<p class="fl fs20 c-3">
							<label>户型：</label>
							<span>{{houseType}}</span>
						</p>
						<p class="fl fs20 c-3 marL20">
							<label>面积：</label>
							<span>{{houseArea}}</span>
							<span class="fs12 c-6" style="font-weight:normal;">平方米</span>
						</p>
					</div>
					<ul class="village-info-sec marT20">
						<li>
							<label>房号：</label>
							<span>{{houseMark}}</span>
						</li>
						<li>
							<label>起租日期：</label>
							<span>{{startRentDate}}</span>
						</li>
						<li>
							<label>楼层：</label>
							<span>{{FloorName}}</span>
						</li>
						<li>
							<label>小区：</label>
							<span>{{ProjectName}}</span>
						</li>
						<li>
							<label>地址：</label>
							<span>{{address}}</span>
						</li>
					</ul>
					<el-button type="primary" class="operation_btn" :disabled="isDisabled" @click="getApplyForFunc">{{operation_btn_text}}</el-button>
					<p class="tc marT10" v-show="isShowTime">可选房时间：<span>{{SecSpan}}</span></p>
				</div>
			</div>
		</div>
	</div>
	<div class="villageCircum-wrap marT30 pad15" id="#anchor-1">
		<h2 class="site-title">房源周边</h2>
		<div class="DetailsFilter__Map">
			<div class="DetailsFilter__Map__Media fl" id="mapcontainer"></div>
			<div class="DetailsFilter__Map__Panel fr">
				<el-tabs v-model="villageArea" @tab-click="handleClick">
					<el-tab-pane v-for="(item,index) in villageAreaList" :label="item.name" :key="index" :index="index" :name="item.menu">
						<div class="villageAreaView" v-show="ite.list.length !== 0" v-for="(ite,index2) in listMessage" :key="index2">
			              <h4>{{ ite.title }}</h4>
			              <div :class="{villageAreaViewLi:true,active: ites.title==viactive}" v-for="(ites,index3) in ite.list" :key="index3" @mouseenter="mapChangeOver(ites.point, ite.cateList + (index3 + 1) )" @mouseleave="mapChangeOut(ites.point, ite.cateList + (index3 + 1) )"  @click="addClickHandler(ites.address,ites.point,ites.title);toggleClick(ites.title)">
			                <i class="pull-left">{{ ite.cateList }}{{ index3 + 1 }}</i>
			                <span>{{ites.title}}</span>
			                <span class="fr">{{ ites.point | pointDistence(lng,lat) }}米</span>
			              </div>
			            </div>

					</el-tab-pane>
				</el-tabs>
				<div class="DetailsFilter__Map__InsideMemu medmenu">
					<ul class="clearfix">
						<li v-for="(item,index) in distenceList" :key="index" :class="{'active':item.isDistrnceActive}" @click="checkAreaSize(item.distence,index)">{{ item.label }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="marT30 village-house" id='#anchor-2' v-show='showSimilarityLists'>
		<h2 class="site-title">相似房源</h2>
		<div class="DetailsFilter__OthersHouse">
			<div class="col-xs-3" v-for="(item,index) in similarityLists">
				<a @click="reloadFunc(item.Id)" class="panel panel-default block">
					<div class="panel-body">
						<img v-lazy="(item.mainpic == null || item.mainpic == '') ? defaultImg : item.mainpic "  data-error="../../assets/images/default.jpg" class="fl block DetailsFilter__OthersHouse__media" :alt="item.allname">
						<p class="text-warning marB10">{{item.AllName}}</p>
						<p>{{item.RoomTypeName | filterRoomTypeName}}</p>
						<!-- <p><span class='text-warning'>{{item.MonthlyRent}}</span>元／月</p> -->
					</div>
				</a>
			</div>
		</div>
	</div>
	 <!-- 看房申请dialog -->
	<el-dialog
		title="看房申请"
		:visible.sync="dialogVisible"
		width="45%">
		<div class="applyForLookRoom_wrapper">
			<ul class="applyForLookRoom_info marB20">
				<li class="clearfix"><label>申请人：</label><span>{{applyForLookRoom_info.name}}</span></li>
				<li class="clearfix"><label>联系电话：</label><span>{{applyForLookRoom_info.phone}}</span></li>
				<li class="clearfix"><label>身份证号：</label><span>{{applyForLookRoom_info.IDCard}}</span></li>
				<li class="clearfix"><label>看房地址：</label><span>{{applyForLookRoom_info.lookRoomAddr}}</span></li>
			</ul>
			<div class="clearfix lookRoomTime">
				<p class="fl">请选择预约看房时间：</p>
				<el-date-picker
					v-model="lookRoomTime"
					type="datetime"
					placeholder="请选择预约看房时间"
					class="fl">
				</el-date-picker>
			</div>
			<div class="clearfix lookRoomTime description">
				<p class="fl">附加说明：</p>
				<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入内容"
					v-model="description">
				</el-input>
			</div>
			<div class="clearfix lookRoomTime description">
				<p class="red fl">温馨提示：</p>
				<p class="tipCont red fl">如看房申请过程中此房源被他人选取，则此次看房申请将被取消；您可以先行选取房源，如房源不满意可在选房后的五个工作日内自行取消（包括选房当天）。</p>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="getApplyForLookRoomFunc()">确 定</el-button>
		</span>
	</el-dialog>
	<!-- 身份证补全 -->
	<el-dialog
		title="请补全身份证"
		:visible.sync="complementDialogVisible"
		append-to-body
		width="40%">
		<el-input v-model="input_IDCard" placeholder="请输入您的身份证号码"></el-input>
		<span slot="footer" class="dialog-footer">
		<el-button @click="complementDialogVisible = false">取 消</el-button>
		<el-button type="primary" @click="submit_IDCard" :loading="btnLoading">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>
<script>
import { MP } from '../../../static/map.js'
import { getHouseDetails,getCollect,cancelCollect,getUserInfo,getChooseRoom,getApplyForLookRoom,getIDCard } from '../../api/api.js'
import { mapGetters } from 'vuex'
import { formatDate,getScrollTop,setCookie,getCookie} from '../../util/index.js'
import BMap from 'BMap'
import defaultImg from '../../assets/images/default.jpg'
import dwImg from '../../assets/images/dw.png'
import aroundPos from '../../assets/images/aroundPos.png'
import aroundPosActive from '../../assets/images/aroundPosActive.png'
var mapVillage;
export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			document.body.style.backgroundColor = '#eee'
		})
	},
	beforeRouteLeave(to, from, next) {
		document.body.style.backgroundColor = '#fff'
		next()
	},
	data() {
		return {
			//补全身份证信息
			complementDialogVisible:false,
			btnLoading:false,
			input_IDCard:'',
			defaultImg,
			step:{   //此数据是控制动画快慢的
	            type:Number,
	            default:50
	        },
			IsFixed:false,
			roomId :'',
			IsSearchRoom:false,
			dialogVisible:false,
			distence:'',
			loading:false,
			isDisabled:false,
			isShowTime:false,
			isLookRoom:false,
			applyForTipText:'请先登录',
			navData: [{
				name: '房源概况',
				isActive: true
			}, {
				name: '房源周边',
				isActive: false
			},{
				name: '相似房源',
				isActive: false
			}],
			swiperOptionTop: {
				spaceBetween: 10,
				loop: true,
				loopedSlides: 5, //looped slides should be the same
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			},
			swiperOptionThumbs: {
				spaceBetween: 10,
				slidesPerView: 4,
				touchRatio: 0.2,
				loop: true,
				loopedSlides: 5, //looped slides should be the same
				slideToClickedSlide: true,
			},
			//details
			title:'',//房源全称
			houseId:this.$route.params.id,
			MonthlyRent:'0',//月租金
			houseType:'',//户型
			houseArea:0,//面积
			houseMark:'',//房号
			startRentDate:'',//起租日期
			FloorName:'',//楼层
			ProjectName:'',//所属小区
			address:'',//地址
			isCollected:false,//是否关注
			SecSpan:'',//可选房时间
			//操作按钮
			operation_btn_text:'',
			lookRoomTime:'',//预约看房时间
			description:'',//附加说明
			applyForLookRoom_info:{
				name:'',
				phone:'',
				IDcard:'',
				lookRoomAddr:'',
			},
			banners: [],
			//相似房源
			similarityLists:[],
			//相似房源是否为空
			showSimilarityLists:true,

			//map
			villageArea: "tran",
			villageAreaList: [{
				name: '交通',
				keyWOrd: ['地铁', '公交'],
				menu: 'tran'
			}, {
				name: '教育',
				keyWOrd: ['幼儿园', '小学', '中学', '大学', '学院'],
				menu: 'edu'
			}, {
				name: '医疗',
				keyWOrd: ['医院', '药店'],
				menu: 'med'
			}, {
				name: '购物',
				keyWOrd: ['商场', '超市', '便利店', '市场'],
				menu: 'shop'
			}, {
				name: '生活',
				keyWOrd: ['ATM', '银行', '快餐', '餐厅', '咖啡厅'],
				menu: 'live'
			}, {
				name: '娱乐',
				keyWOrd: ['公园', '电影院', 'KTV', '健身房', '体育馆'],
				menu: 'happy'
			}],
			cateList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"], // 类型标记
	        listMessage: '',
			tabIndex: "",
			viactive:"", //周边列表选则
		 	activeMap:false,
			lat: '',
			lng: '',
			distenceList: [{
				distence: 500,
				label: "0.5km",
				isDistrnceActive: true
			}, {
				distence: 1000,
				label: "1km",
				isDistrnceActive: false
			}, {
				distence: 1500,
				label: "1.5km",
				isDistrnceActive: false
			}, {
				distence: 2000,
				label: "2km",
				isDistrnceActive: false
			}, {
				distence: 2500,
				label: "2.5km",
				isDistrnceActive: false
			}],
			distence: 500,
			map: '',
		}
	},
	computed : {
		...mapGetters(['userInfo']),
	},
	filters:{
		filterRoomTypeName(val){
			if(val == 1){
				return '一室'
			}else if(val == 2){
				return '一室一厅'
			}else if(val == 3){
				return '两室'
			}else if(val == 4){
				return '两室一厅'
			}else if(val == 5){
				return '三室'
			}else if(val == 6){
				return '三室一厅'
			}else if(val == 7){
				return '四室'
			}else if(val == 8){
				return '五室'
			}
		},
		// 根据金纬度距离计算
		pointDistence: function(point,lng,lat) {
            let mPoint_lat,mPoint_lng;
			if (lat == '' || lat == null || lat == 0 || lng == '' || lng == null || lng == 0) {
				mPoint_lng = 121.5505840120, 31.2274065041
				mPoint_lat = 31.2274065041
			} else {
                mPoint_lng = lng
				mPoint_lat = lat
			}
			var radLat1 = mPoint_lat * Math.PI / 180.0;
			var radLat2 = point.lat * Math.PI / 180.0;
			var a = radLat1 - radLat2;
			var b = mPoint_lng * Math.PI / 180.0 - point.lng * Math.PI / 180.0;
			var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
			s = s * 6378.137;
			s = (Math.round(s * 10000) / 10).toFixed(0);
			return s
		}
	},
	mounted() {
		this.$nextTick(() => {
			var _this =this
			const swiperTop = this.$refs.swiperTop.swiper
			const swiperThumbs = this.$refs.swiperThumbs.swiper
			swiperTop.controller.control = swiperThumbs
			swiperThumbs.controller.control = swiperTop
			//监听滚动条
			window.addEventListener("scroll", function(){
				if(getScrollTop()>=160){
					_this.IsFixed = true
					if(getScrollTop()>=560&&getScrollTop()<810){
						_this.navData[0].isActive = false;
						_this.navData[1].isActive = true;
						if(_this.navData.length == 3){
							_this.navData[2].isActive = false;
						}
					}else if(getScrollTop()>=810){
						_this.navData[0].isActive = false;
						_this.navData[1].isActive = false;
						if(_this.navData.length == 3){
							_this.navData[2].isActive = true;
						}
					}
				}else{
					_this.navData[0].isActive = true;
					_this.navData[1].isActive = false;
					if(_this.navData.length == 3){
						_this.navData[2].isActive = false;
					}
					_this.IsFixed = false
				}
			});
			this.$refs.box.style.minHeight = (document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight -30) +'px'
		})
		setTimeout(() => {
			this.creatChangeMap(0);
		}, 1000)
	},
	methods: {
		reloadFunc(id){
			this.$router.push({
				path: `/houseDetails/${id}`,
			})
			this.houseId = id
			this.geHouseDetails()
		},
		tabActive(item) {
			for (var i = 0; i < this.navData.length; i++) {
				this.navData[i].isActive = false
			}
			item.isActive = true
		},
		backTop(i){
            //参数i表示间隔的幅度大小，以此来控制速度
            document.documentElement.scrollTop-=i;
            if (document.documentElement.scrollTop>0) {
                var c=setTimeout(()=>this.backTop(1),16);
            }else {
                clearTimeout(c);
            }
        },
		//获取锚点
		goAnchor(anchorName) {
			// 找到锚点
			let anchorElement = document.getElementById(anchorName);
			// 如果对应id的锚点存在，就跳转到锚点
			if(anchorElement) { anchorElement.scrollIntoView(); }
			if(anchorName == '#anchor-0'){
				this.backTop(this.step)
			}
		},
		checkAreaSize(dis, index) {
			for (var i = 0; i < this.distenceList.length; i++) {
				this.distenceList[i].isDistrnceActive = false;
			}
			this.distenceList[index].isDistrnceActive = true;
			this.distence = dis;
			this.creatChangeMap(this.tabIndex);
		},
		creatChangeMap(tab_index) {
	      var map = new BMap.Map("mapcontainer", {
	        enableMapClick: true
	      });
 		 // 添加地图类型控件
 		 map.addControl(new BMap.MapTypeControl());
 		 // 添加工具条、比例尺控件
 		 map.addControl(new BMap.ScaleControl({
 			 anchor: BMAP_ANCHOR_TOP_LEFT
 		 }));
 		 map.addControl(new BMap.NavigationControl());
 		 map.addControl(new BMap.NavigationControl({
 			 anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
 			 type: BMAP_NAVIGATION_CONTROL_SMALL
 		 }));
 		 // 开启鼠标滚轮缩放
 		 map.enableScrollWheelZoom(true);
	      map.clearOverlays();
	      mapVillage = map;
	      this.tabIndex = tab_index;

		  let mPoint;
 		 if (this.lat == '' || this.lat == null || this.lat == 0 || this.lng == '' || this.lng == null || this.lng == 0) {
 			 mPoint = new BMap.Point(121.5505840120, 31.2274065041);  // 默认浦东新区的经纬度
 		 } else {
 			 mPoint = new BMap.Point(this.lng, this.lat);
 		 }

 		 var myIcon = new BMap.Icon(dwImg, new BMap.Size(35, 35));
 		 var marker = new BMap.Marker(mPoint, {
 			 icon: myIcon
 		 }); // 创建标注
 		 map.addOverlay(marker); // 将标注添加到地图中

	      map.centerAndZoom(mPoint, 15);
	      var circle = new BMap.Circle(mPoint, this.distence, {
	        fillColor: "#009688",
	        strokeWeight: 1,
	        fillOpacity: 0.3,
	        strokeOpacity: 0.3
	      });
	      map.addOverlay(circle);
	      var arry;
	      var _this = this,
	        arryList = [];
	      for (var i = 0; i < this.villageAreaList[this.tabIndex].keyWOrd.length; i++) {
	        var result, index = 0;;
	        var options = {
	          onSearchComplete: function(results) {
	            index += 1;
	            result = results.keyword;
	            var list = [];
	            for (var m = 0; m < results.getCurrentNumPois(); m++) {
	              list.push(results.getPoi(m));
	              var point = new BMap.Point(results.getPoi(m).point.lng, results.getPoi(m).point.lat);
				  var myIcon = new BMap.Icon(aroundPos, new BMap.Size(40, 40));
	              var marker = new BMap.Marker(point, {
			        icon: myIcon
			      });
				  marker.addEventListener('mouseover', function (e) {//气泡mouseenter事件
					  if (this.activeMap == true) return false;
				  	//当前气泡高亮、置顶
					var myIconActive = new BMap.Icon(aroundPosActive, new BMap.Size(40, 40));
				  	this.setIcon(myIconActive);
				  	this.setTop(true);
				  });
				  marker.addEventListener('mouseout', function (e) {//气泡mouseenter事件
					  if (this.activeMap == true) return false;
				  	//当前气泡高亮、置顶
					var myIcon = new BMap.Icon(aroundPos, new BMap.Size(40, 45));
				  	this.setIcon(myIcon);
				  	this.setTop(true);
				  });


	              _this.addClickHandler2(results.getPoi(m).address, results.getPoi(m).title, marker, point,""+_this.cateList[index - 1]+"" + (m+1) +"");
	            }
	            arryList.push({
	              title: result,
	              list: list,
	              cateList: _this.cateList[index - 1]
	            });
	            _this.listMessage = arryList;
	          },
	          pageCapacity: 100
	        };

	        var local2 = new BMap.LocalSearch(map, options);
	        local2.searchNearby(this.villageAreaList[this.tabIndex].keyWOrd[i], mPoint, this.distence);
	      }
	    },
		addClickHandler(address, points, title) {
	      var map = mapVillage;
	      var point = new BMap.Point(points.lng, points.lat);
	      var marker = new BMap.Marker(point); // 创建标注
	      this.openInfo(address, title, point)
	    },
		// 移入事件
		mapChangeOver(points,labels) {

		},
		// 移出事件
		mapChangeOut(points,labels) {

		},
		toggleClick(index) {
			this.viactive = index;
		},
	    addClickHandler2(content, title, marker, point, text) {
	      var _this = this;
		  var map = mapVillage;
		  var label = new BMap.Label(text);
		  label.setStyle({
						color: "#fff",
						letterSpacing: '-2px',
						fontSize: "12px",
						border: "0",
						background: "transparent",
						textAlign: "center",
						width: "26px",
						height: "29px",
						marginLeft: "-3px",
						paddingTop: "5px"
					});

		  marker.setLabel(label);
		  map.addOverlay(marker);
	      marker.addEventListener("click", function(e) {
			this.activeMap = true;
	        _this.openInfo(content, title, point);
			//当前气泡高亮，其他气泡还原
			var myIconActive = new BMap.Icon(aroundPosActive, new BMap.Size(40, 40));
			this.setIcon(myIconActive);
			this.setTop(true);
			this.activeMap = false;
	      });
	    },
	    openInfo(content, title, point) {
	      var map = mapVillage;
	      var point = point;
	      var infoWindow = new BMap.InfoWindow("地址：" + content + "", {
	        width: 200, // 信息窗口宽度
	        height: 100, // 信息窗口高度
	        title: title, // 信息窗口标题
	        enableMessage: true, //设置允许信息窗发送短息
	      }); // 创建信息窗口对象
	      map.openInfoWindow(infoWindow, point); //开启信息窗口
	    },
		handleClick(tab, event) {
			this.creatChangeMap(tab.index); //检索的函数 this.creatChangeMap()
		},
		//收藏
		collectFun(){
			if(this.$store.getters.userInfo){//判断是否登录
				if(this.$store.getters.userInfo.HasIDCard == 1){//身份证信息是否补全
					var params = {
						AccountId:this.$store.getters.userInfo.AccountId,
						ObjectId:this.roomId,
					}
					//登录状态下
					if(this.isCollected == 0){
						//关注
						getCollect(params).then(response => {
							switch (response.StatusCode) {
								case 200:
									this.isCollected = true
									this.$message.success('关注成功')
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
					}else{
						//取消关注
						cancelCollect(params).then(response => {
							switch(response.StatusCode){
								case 200:
									this.isCollected = false
									this.$message.success('已取消关注')
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
					}
				}else{
					//是否需要弹框来补全身份证
					this.complementDialogVisible = true
				}
			}else{
				this.$router.push({path:'/login'})
			}
		},
		countDown(times){
			var timer=null;
			var _this = this
			timer=setInterval(function(){
				var day=0,
				hour=0,
				minute=0,
				second=0;//时间默认值
				if(times > 0){
					day = Math.floor(times / (60 * 60 * 24));
					hour = Math.floor(times / (60 * 60)) - (day * 24);
					minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
					second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
				}
				if (day <= 9) day = '0' + day;
				if (hour <= 9) hour = '0' + hour;
				if (minute <= 9) minute = '0' + minute;
				if (second <= 9) second = '0' + second;
				_this.operation_btn_text = (day+"天:"+hour+"小时："+minute+"分钟："+second+"秒");
				times--;
				},1000);
			if(times<=0){
				this.geHouseDetails()
				clearInterval(timer);
			}
		},
		//判断按钮状态
		getApplyForFunc(){
			if(this.$store.getters.userInfo){
				if(this.$store.getters.userInfo.State == 1001 || this.$store.getters.userInfo.State == 1002){
					this.$router.push({path:'/applyFor'})
				}else if(this.$store.getters.userInfo.State == 1007){
					this.getChooseRoomFunc(this.$store.getters.userInfo.AccountId,this.roomId)
				}else if(this.$store.getters.userInfo.State == 0 || this.$store.getters.userInfo.State == ''){
					this.complementDialogVisible = true
				}
			}else{
				this.$router.push({path:'/login'})
			}
		},
		//用户选房
		getChooseRoomFunc(AccountId,RoomId){
			console.log(AccountId);
			getChooseRoom({AccountId:AccountId,RoomId:RoomId}).then(response => {
				switch(response.StatusCode){
					case 200 :
						//选房之后刷新页面
						this.$store.commit('SET_STEPTIP','1008');
						this.geHouseDetails()
						// console.log(response.Data)
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
		//看房申请
		getApplyForLookRoomFunc(){
			if(this.lookRoomTime == ""){
				this.$message.error('请选择预约看房的时间')
			}else{
				var nowTime = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")//本地当前时间
				nowTime = Date.parse(nowTime.replace(/-/,"/"))
				var selTime = formatDate(new Date(this.lookRoomTime),"yyyy-MM-dd hh:mm:ss")//选房的时间
				selTime = Date.parse(selTime.replace(/-/,"/"))
				if(nowTime>=selTime){
					this.$message.error('请选择预约看房的时间')
				}else{
					getApplyForLookRoom(
						{
							AccountId:this.$store.getters.userInfo.AccountId,
							RoomId:this.roomId,
							Category:'1',
							ContactName:this.$store.getters.userInfo.Name,
							ContactPhone:this.applyForLookRoom_info.phone,
							ExpectTime:formatDate(new Date(this.lookRoomTime),"yyyy-MM-dd hh:mm:ss"),
							Description:this.description
						}).then(response => {
						switch(response.StatusCode){
							case 200 :
								// console.log(response.Data)
								this.loading = true
								this.geHouseDetails()
								this.$message.success('预约看房成功')
								this.dialogVisible = false
							break;
							case 500 :
								this.$message.error(response.Info)
							break;
							default:
								this.$message.error(response.Info)
						}
					}).catch(error =>{
						this.$message.error(error)
					})
				}
			}
		},
		//判断按钮的状态
		JudgeBtn(RoomState,FamilyType,HouseTypeName,SplitedSex,SplitedMark,systemDate,SecSpan,roomAddr,IsSelect){//房间状态判断 | 用户可选户型 | 户型 | 合租性别 | 拆套房间 | 系统时间 |选房时间|看房地址|该房间是否曾被选过
			//判断是否到的选房时间
			var systemTime = formatDate(new Date(systemDate),"yyyy-MM-dd hh:mm:ss")//系统时间
			systemTime = Date.parse(systemTime.replace(/-/,"/"))
			var SecSpanTime = formatDate(new Date(SecSpan),"yyyy-MM-dd hh:mm:ss")//选房时间
			SecSpanTime = Date.parse(SecSpanTime.replace(/-/,"/"))
			var selTime=  SecSpanTime-systemTime
			if(this.$store.getters.userInfo){
				//登录状态下获取个人信息

				getUserInfo({AccountId:this.$store.getters.userInfo.AccountId}).then(response => {

					//更新个人数据
					var userInfo = JSON.parse(getCookie('userInfo'))
					userInfo.State = response.Data.State
					this.$store.commit('SET_USERINFO',userInfo)
					setCookie('userInfo',JSON.stringify(userInfo))
					if(RoomState == 1){
						//判断看房申请按钮

						if(response.Data.State>=1007){
							this.isLookRoom = true
							this.applyForLookRoom_info.name =response.Data.Name
							this.applyForLookRoom_info.phone =response.Data.Phone
							this.applyForLookRoom_info.IDCard = response.Data.IDCard
							this.applyForLookRoom_info.lookRoomAddr = roomAddr
						}else if(response.Data.State<1007 && (response.Data.State!=0 || response.Data.State != '')){
							this.applyForTipText = '请先申请租房资格'
							this.isLookRoom = false
						}else{
							this.applyForTipText = '请先补全身份证信息'
							this.isLookRoom = false
						}
						//判断租房资格申请按钮
						if(response.Data.State == 0 || response.Data.State == ''){
							this.operation_btn_text = '请先补全身份证信息'
						}else if(response.Data.State >= 1003 && response.Data.State<1007){
							this.isDisabled = true
							this.operation_btn_text = '租房资格申请通过后可操作'
						}else if(response.Data.State == 1001 || response.Data.State == 1002){
							this.isDisabled = false
							this.operation_btn_text = '请先申请租房资格'
						}else if(response.Data.State == 1007 ){
							this.isShowTime = true
							if(IsSelect == 0){
								if(FamilyType == 1){//单身
									if(HouseTypeName == 1 || HouseTypeName==2){//一室户
										if(SplitedMark == 0 || SplitedMark == 4){//原始房间、合并房间
											if(selTime>0){
												this.countDown(selTime/1000)
												this.isDisabled =true
											}else{
												this.operation_btn_text = '可选房'
											}
										}else if(SplitedMark == 2){//拆套房间
											if(SplitedSex != response.Data.Sex){
												if(SplitedSex == 1){
													this.operation_btn_text = '此房间只限男性'
												}else if(SplitedSex == 2){
													this.operation_btn_text = '此房间只限女性'
												}
												this.isDisabled =true
											}else{
												if(selTime>0){
													this.countDown(selTime/1000)
													this.isDisabled =true
												}else{
													this.operation_btn_text = '可选房'
												}
											}
										}else{
											this.operation_btn_text = '此房间已改建不能出租'
											this.isDisabled =true
										}
									}else if(HouseTypeName == '' || HouseTypeName == 0){
										this.operation_btn_text = '此房间的户型状态为空，请联系客服'
										this.isDisabled =true
									}else{
										this.operation_btn_text = '您只可租一室户'
										this.isDisabled =true
									}
								}else if(FamilyType == 2){//大龄单身
									if(HouseTypeName == 1 || HouseTypeName == 2 || HouseTypeName == 3 || HouseTypeName ==4){
										if(SplitedMark == 0 || SplitedMark == 4){//原始房间、合并房间
											if(selTime>0){
												this.countDown(selTime/1000)
												this.isDisabled =true
											}else{
												this.operation_btn_text = '可选房'
											}
										}else if(SplitedMark == 2){//拆套房间
											if(SplitedSex && SplitedSex != response.Data.Sex){
												if(SplitedSex == 1){
													this.operation_btn_text = '此房间只限男性'
												}else if(SplitedSex == 2){
													this.operation_btn_text = '此房间只限女性'
												}
												this.isDisabled =true
											}else{
												if(selTime>0){
													this.countDown(selTime/1000)
													this.isDisabled =true
												}else{
													this.operation_btn_text = '可选房'
												}
											}
										}else{
											this.operation_btn_text = '此房间已改建不能出租'
											this.isDisabled =true
										}
									}else if(HouseTypeName == '' || HouseTypeName == 0){
										this.operation_btn_text = '此房间的户型状态为空，请联系客服'
										this.isDisabled =true
									}else{
										this.operation_btn_text = '您只可租一室户和两室户'
										this.isDisabled =true
									}
								}else if(FamilyType == 3){ //家庭  不能承租拆间
									if(SplitedMark == 2){
										this.operation_btn_text = '此房间您不能承租'
										this.isDisabled =true
									}else if(SplitedMark== 0 || SplitedMark == 4){
										if(selTime>0){
											this.countDown(selTime/1000)
											this.isDisabled =true
										}else{
											this.operation_btn_text = '可选房'
										}
									}else{
										this.operation_btn_text = '此房间已改建不能出租'
										this.isDisabled =true
									}
								}else{
									this.operation_btn_text = '家庭类型为'+FamilyType+'请联系客服'
									this.isDisabled =true
								}
							}else if(IsSelect == 1){
								this.operation_btn_text = '此房您已取消，两天内不能选取该房间'
								this.isDisabled =true
							}else{
								this.operation_btn_text = 'IsSelect为'+IsSelect+',请联系客服'
								this.isDisabled =true
							}
						}else if(this.$store.getters.userInfo.State == 1008){
							this.isDisabled = true
							this.operation_btn_text = '您已选房'
						}else if(this.$store.getters.userInfo.State > 1008){
							this.isDisabled = true
							this.operation_btn_text = '您已租房'
						}
					}else if(RoomState ==0){
						this.isLookRoom = false
						this.operation_btn_text = "此房间正在准备中，请等待"
						this.applyForTipText = this.operation_btn_text
						this.isDisabled = true
					}else if(RoomState == 2){
						this.isLookRoom = false
						this.operation_btn_text = "您已选房"
					    this.applyForTipText = '此房间已被选取'
						this.isDisabled = true
					}else if(RoomState == 3){
						this.isLookRoom = false
						this.operation_btn_text = "此房间已出租"
						this.applyForTipText = this.operation_btn_text
						this.isDisabled = true
					}else if(RoomState == 4){
						this.isLookRoom = false
						this.operation_btn_text = "此房间为自用房间"
						this.applyForTipText = this.operation_btn_text
						this.isDisabled = true
					}else if(RoomState == 5){
						this.isLookRoom = false
						this.operation_btn_text = "此房间已售"
						this.applyForTipText = this.operation_btn_text
						this.isDisabled = true
					}else if(RoomState == 6){
						this.isLookRoom = false
						this.operation_btn_text = "此房间续租中"
						this.applyForTipText = this.operation_btn_text
						this.isDisabled = true
					}else if(RoomState == 7){
						this.isLookRoom = false
						this.operation_btn_text = "此房间维修中"
						this.applyForTipText = this.operation_btn_text
						this.isDisabled = true
					}
				}).catch(error => {
					this.$message.error(error)
				})
			}else{
				this.operation_btn_text = '请登录后再操作'
			}
		},
		geHouseDetails(){
			this.loading =true
			//获取房源详情
			//判断是否登录
			var AccountId = null
			if(this.$store.getters.userInfo){
				AccountId = this.$store.getters.userInfo.AccountId
			}
			var params ={
				Id:this.houseId,
				AccountId:AccountId
			}
			getHouseDetails(params).then(response => {
				var data = response.Data
				switch(response.StatusCode){
					case 200 :
						this.roomId = data.BaseInfo.Id//房间id
						this.IsSearchRoom = data.IsSearchRoom
						if(data.IsSearchRoom == 1){ //1已申请看房
							this.applyForTipText = '已申请看房'
						}else{

						}
						// this.applyForTipText = '请先登录'
						this.title = data.BaseInfo.Name//房源全称
						this.MonthlyRent  = data.BaseInfo.Rent//月租金
						this.houseType = data.BaseInfo.RoomTypeName //户型
						this.houseArea = data.BaseInfo.Acreage //房屋面积
						this.houseMark = data.BaseInfo.Code //房号
						this.lat = data.BaseInfo.LAT //经度
						this.lng = data.BaseInfo.LNG //纬度
						this.startRentDate = data.BaseInfo.EMoveInDate //起租日期
						this.FloorName=data.BaseInfo.FloorName//楼层
						this.ProjectName=data.BaseInfo.PropertyName//所属小区
						this.address=data.BaseInfo.AllName//地址
						//相似房源

						if(data.OtherInfo && data.OtherInfo.length>0){
							this.similarityLists = data.OtherInfo
						}else{
							this.navData = this.navData.slice(0,2)
							this.showSimilarityLists = false
						}

						this.SecSpan = data.BaseInfo.SecSpan//可选房时间
						this.isCollected = data.IsCollection //判断是否已关注 0 否 1是
						if(data.ImageList.length == 0){
							this.banners.push(defaultImg)
						}else{
							this.banners = data.FileList
						}
						//相似的房源
						//按钮状态的判断
						this.JudgeBtn(data.BaseInfo.State,data.FamilyType,data.BaseInfo.RoomTypeName,data.BaseInfo.SplitedSex,data.BaseInfo.SplitedMark,data.SystemTime,data.BaseInfo.SecSpan,data.BaseInfo.AllName,data.IsSelect)//传如房间的状态
						setTimeout(()=>{
							this.loading =false
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
		submit_IDCard(){//补全身份证信息
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if(this.input_IDCard == ''){
				this.$message.warning('请输入您的身份证号码！')
				return false
			}
			if(!reg.test(this.input_IDCard)){
				this.$message.warning('请输入正确的身份证号码！')
				return false
			}
			var params = {
				AccountId:this.$store.getters.userInfo.AccountId,
				IDCard : this.input_IDCard
			}
			this.btnLoading = true
			getIDCard(params).then(response => {
				switch(response.StatusCode){
					case 200 :
						this.$message.success('提交成功')
						var userInfo = JSON.parse(getCookie('userInfo'))
						userInfo.HasIDCard = '1'
						userInfo.State = '1001'
						this.$store.commit('SET_USERINFO',userInfo)
						this.$store.commit('SET_STEPTIP','1001')
						setCookie('userInfo',JSON.stringify(userInfo))
						this.btnLoading = false
						this.complementDialogVisible = false
						this.geHouseDetails()
					break;
					default:
						this.$message.error(response.Info)
				}
			}).catch(error => {
				this.$message.error(error)
			})
		},
	},
	created() {
		this.geHouseDetails()
	}
}
</script>
<style lang="scss">
.DetailsFilter__Map__Panel {
    .el-tabs__item {
        padding: 0 15px;
    }
    .el-tabs__header {
        margin-left: 15px;
    }
    .el-tabs__content {
        height: 336px;
        overflow: scroll;
        margin-top: 40px;
        h4 {
            margin: 10px;
            font-size: 18px;
            color: #333;
        }
    }
}
.DetailsFilter__Map__InsideMemu {
    position: absolute;
    top: 45px;
    padding-left: 30px;
    ul li {
        float: left;
        width: 52px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #009688;
        margin-right: 5px;
        color: #333;
    }
    ul li.active {
        color: #fff;
        background-color: #009688;
    }
}
.site-title {
    width: 100%;
    margin-bottom: 20px;
    font-size: 30px;
    color: #333;
    font-weight: 300;
}
.DetailsFilter__OthersHouse {
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
    .col-xs-3 {
        width: 25%;
        float: left;
        .panel-body {
            padding: 15px;
            .DetailsFilter__OthersHouse__media {
                width: 100%;
                height: 120px;
                background-color: #fff;
                margin-bottom: 10px;
                overflow: hidden;
                vertical-align: middle;
                display: block;
            }
            .text-warning {
                color: #ff5722;
            }
        }
    }
}
.villageAreaView {
	padding-left: 15px;
	h4{
		font-weight: 300;
		font-size: 18px;
	}
    .villageAreaViewLi {
		height: 35px;
		cursor: pointer;
        i {
            width: 24px;
            height: 24px;
            line-height: 24px;
            background-color: #009688;
            color: #fff;
            text-align: center;
            border-radius: 50%;
            font-style: normal;
            margin-right: 10px;
        }
		&:hover{
			color: #ff9a1b !important;
			i{
				background-color: #ff9a1b !important;
			}
		}
    }
	.villageAreaViewLi.active {
		color: #ff9a1b !important;
	}

}
.houseDetails_tit_wrap{
	padding-bottom:10px;
	border-bottom:1px solid #e8e8e8;
	>button{
		width:100px;
		i{
			margin-right:10px;
		}
	}
}
.applyForTip{
	top:10px;
	background: rgba(0,150,136,0.9);
	color:#fff;
	padding:10px;
	border-radius: 3px;
	box-shadow: 0px 0px 10px #999;
	position: relative;
}
.applyForTip:after{
	content:'';
	display: block;
	width: 0;
	height: 0;
	vertical-align: middle;
	border-top: 8px dashed;
	border-top: 8px solid\9;
	border-right: 8px solid transparent;
	border-left: 8px solid transparent;
	transform: rotate(90deg);
	position: absolute;
	left:-12px;
	top: 15px;
	color: rgba(0,150,136,0.9);
	z-index: 10;
}
.mian_info{
	p{
		label,span{
			font-weight:700;
		}
	}
}
.collect_btn .red{
	color:#f44336;
}
/*房源操作按钮*/
.operation_btn{
	width:280px!important;
	display: block!important;
	margin:20px auto 0!important;
}
/*看房申请页面*/
.applyForLookRoom_wrapper{
	ul.applyForLookRoom_info{
		li{
			font-size:16px;
			padding:10px 0;
			border-bottom:1px solid #999;
			>label{
				width:150px;
				display: inline-block;
				text-align:right;
				color:#333;
				float:left;
				padding-right: 10px;
			}
			>span{
				display: inline-block;
				width:498px;
				color:#666;
				float:left;
			}
		}
	}
	.lookRoomTime{
		p{
			width:150px;
			height:40px;
			line-height: 40px;
			padding-right: 10px;
			text-align: right;
			&.tipCont{
				line-height: normal;
				width:498px;
				height:auto;
				padding:10px 0 0 0;
			}
		}
		.el-input__inner{
			border:1px solid #00aa9a;
		}
	}
	.description{
		padding-top:10px;
		.el-textarea{
			width:295px;
			.el-textarea__inner{
				border:1px solid #00aa9a;
			}
		}
	}
}
//锚点
ul.villageDetails-item-nav{
	&.fix{
		top:60px;
		left:0;
		width:100%;
		z-index: 2001;
		background: #fff;
	}
}
@media screen and (max-width: 450px) {
	.container{
		overflow-x: hidden;
		.collect_btn,.modelPhonebtnWrap,.operation_btn{
			display: none!important;
		}
		.houseDetails_tit_wrap{
			margin-bottom:0;
		}
		.villageDetails-item-nav{
			display: none;
		}
		.villageCircum-wrap,.village-house{
			display:none;
		}
		.villageDetails-item-top{
			>h4{
				margin-bottom: 0;
			}
		}
		.villageDetails-item-top-cont{
			.villageDetails-item-top-cont-fir{
				width:100%;
				height:auto;
				.swiper-container{
					.swiper-wrapper{
						.swiper-slide{
							width:100%;
							img{
								width:100%!important;
								height:100%!important;
							}
						}
					}
				}
				.gallery-thumbs{
					display: none;
				}
			}
			.villageDetails-item-top-cont-sec{
				margin-top:10px;
				width:100%;
			}
		}
	}
}
</style>
