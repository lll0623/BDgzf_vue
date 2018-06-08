<template>
<section>
	<div class="login-header header clearfix addressSel" style="background:#fff;margin-top: -60px;width:100%;position:fixed;z-index:999;">

		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<router-link to="/" class="fl block">
				<img src="../assets/images/logo.png" class="logo vm marR10 marL20">
				<span class="tit green fs20">上海浦东新区公租房网上业务平台</span>
			</router-link>
			<form class="MapSearchRoom—__navbar-form navbar-left">
				<div class="form-group pr">
					<input type="text" class="searchkey" @blur="InputChange(0,777)" v-model="keyword" placeholder="请输入区域、板块或小区名开始找房">
					<i class="fa fa-search material-icons" aria-hidden="true"></i>
				</div>
			</form>
			<el-dropdown :hide-on-click="false">
				<span class="el-dropdown-link">
                    月租金<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="(item,index) in pricesList" :key="index">
						<el-checkbox v-model="item.checked" @change="plaChange(item.checked,item.value,item.label,1,item.index)">{{ item.label }}</el-checkbox>
					</el-dropdown-item>
					<input type="number" class="changeInput" @blur="InputChange(1,888)" v-model="prices" placeholder="具体租金">
				</el-dropdown-menu>
			</el-dropdown>
			<el-dropdown :hide-on-click="false">
				<span class="el-dropdown-link">
                    户型<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="(item,index) in laysList" :key="index">
						<el-checkbox v-model="item.checked" @change="plaChange(item.checked,item.value,item.label,2,item.index)">{{ item.label }}</el-checkbox>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-dropdown :hide-on-click="false">
				<span class="el-dropdown-link">
                    实用面积<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="(item,index) in acreList" :key="index">
						<el-checkbox v-model="item.checked" @change="plaChange(item.checked,item.value,item.label,3,item.index)">{{ item.label }}</el-checkbox>
					</el-dropdown-item>
					<input type="number" class="changeInput" @blur="InputChange(3,999)" v-model="acre" placeholder="具体面积">
				</el-dropdown-menu>
			</el-dropdown>
			<router-link to="/" class="fr block marR20">
				<span class="tit green fs16 marR15">返回首页</span>
				<i class="fa fa-chevron-right green"></i>
			</router-link>
		</el-menu>

	</div>
	<div class="MapSearchRoom__Sidebar">
		<div class="MapSearchRoom__Sidebar_Inner" v-bind:style="{'max-height':mapHeight,'overflow-y': 'scroll'}">
			<div class="MapSearchRoom__Sidebar__Place">
				<h4><i class="fa fa-map-marker" aria-hidden="true"></i>浦东
					<span class="fr backLevel" v-show="backlevel" @click="backlevelBtn(backId,backName)">返回上一级</span>
				</h4>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item v-show="this.aName">{{ this.aName }}</el-breadcrumb-item>
					<el-breadcrumb-item v-show="this.bName">{{ this.bName }}</el-breadcrumb-item>
					<el-breadcrumb-item v-show="this.cName">{{ this.cName }}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<h4 class="summerytitle" v-show="!careaCountDiv">为您找到
                        <span class="text-danger">
                            <strong v-show="aareaCountDiv">{{ this.AAreaCount }}</strong>
                            <strong v-show="bareaCountDiv">{{ this.bAreaList.length }}</strong>
                            <strong v-show="careaCountDiv">{{ this.cAreaList.length }}</strong>
                        </span>个
                        <span v-show="aareaCountDiv">区域</span>
                        <span v-show="bareaCountDiv">小区</span>
                        ，共
                        <span class="text-danger">
                             <strong v-show="aareaCountDiv">{{ this.aStatistics }}</strong>
                             <strong v-show="bareaCountDiv">{{ this.bStatistics }}</strong>
                         </span>套房源
            </h4>
			<h4 class="summerytitle" v-show="careaCountDiv">
                        共<span class="text-danger">
                             <strong>{{ this.cAreaList.length }}</strong>
                         </span>套房源
            </h4>
			<div v-loading="loading">
				<div class="areaCountList" v-show="aareaCountDiv && item.Name !== null" @click="aareaCountListBtn(item.Id,item.Name)" v-for="(item,index) in aAreaList">
					<span>{{ item.Name }}</span><span class="fr">{{ item.num }}套></span>
				</div>
				<div class="areaCountList" v-show="aareaCountDiv && aAreaList.length == 0" style="text-align:center;">
					<span>暂无房源</span>
				</div>

				<div class="areaCountList" v-show="bareaCountDiv" @click="bareaCountListBtn(item.Id,item.Name,item.LNG,item.LAT)" v-for="(item,index) in bAreaList">
					<span>{{ item.Name }}</span><span class="fr">{{ item.num }}套></span>
				</div>
				<div class="areaCountList" v-show="bAreaList.length == 0 && bareaCountDiv" style="text-align:center;">
					<span>暂无房源</span>
				</div>

				<div class="roomList" v-show="careaCountDiv" v-for="(item,index) in cAreaList">
					<router-link :to="`/HouseDetails/${item.Id}`">
						<div class="MapSearchRoom__Sidebar__List">
							<a class="block MapSearchRoom__Sidebar__List__Media pull-left">
	                            <img :src="item.MainPic" class="block">
	                        </a>
							<div class="MapSearchRoom__Sidebar__List__Content">
								<h4><a target="_blank"><strong>{{ item.AllName }}</strong></a></h4>
								<div class="clearfix">
									<a><span class="pull-left">{{ item.Name }}</span>
	                                </a>
									<span class="pull-right text-danger"><strong>{{item.MonthlyRent}}</strong>
	                                </span>
								</div>
								<div class="marT10">
									<el-tag v-if="item.HousetypeName == null || item.HousetypeName == ''" type="success">暂无标记</el-tag>
									<el-tag v-if="item.HousetypeName == '1' " type="success">一室</el-tag>
									<el-tag v-if="item.HousetypeName == '2' " type="success">一室一厅</el-tag>
									<el-tag v-if="item.HousetypeName == '3' " type="success">二室</el-tag>
									<el-tag v-if="item.HousetypeName == '4' " type="success">二室一厅</el-tag>
									<el-tag v-if="item.HousetypeName == '5' " type="success">三室</el-tag>
									<el-tag v-if="item.HousetypeName == '6' " type="success">三室一厅</el-tag>
									<el-tag v-if="item.HousetypeName == '7' " type="success">四室</el-tag>
									<el-tag v-if="item.HousetypeName == '8' " type="success">五室</el-tag>
								</div>
							</div>
						</div>
					</router-link>
				</div>
				<div class="areaCountList" v-show="careaCountDiv && cAreaList.length == 0" style="text-align:center;">
					<span>暂无房源</span>
				</div>
			</div>
		</div>
	</div>
	<div class="MapSearchRoom__Main" v-bind:style="{'min-height':mapHeight}">
		<div id="XSDFXPage" class="XSDFXPage" v-bind:style="{'min-height':mapHeight}"></div>
		<div class="MapSearchRoom__Main__Filter clearfix">
			<span class="MapSearchRoom__Main__Filter__Title pull-left">条件：</span>
			<div class="pull-left MapSearchRoom__Main__Filter__Content filter-content">
				<div class="alert alert-dismissible pull-left" v-for="(item,index) in KeyWordList">
					<button type="button" class="close" @click="deleteChecked(item.index,item.value,item.type)">×</button> {{ item.label }}
				</div>
				<div class="alert alert-dismissible pull-left" v-for="(item,index) in checkedPrices">
					<button type="button" class="close" @click="deleteChecked(item.index,item.value,item.type)">×</button> {{ item.label }}
				</div>
				<div class="alert alert-dismissible pull-left" v-for="(item,index) in checkedLays">
					<button type="button" class="close" @click="deleteChecked(item.index,item.value,item.type)">×</button> {{ item.label }}
				</div>
				<div class="alert alert-dismissible pull-left" v-for="(item,index) in checkedAcres">
					<button type="button" class="close" @click="deleteChecked(item.index,item.value,item.type)">×</button> {{ item.label }}
				</div>
				<a href="javascript:void(0)" @click="clearAllChecked()" class="pull-left btn btn-default MapSearchRoom__Main__Filter__AllClose">
                            <i class="fa fa-trash" aria-hidden="true"></i> <span>清空</span>
                        </a>
			</div>
			<router-link :to="`/houseLists`" class="listHouse pull-right" target="_blank">
				<i class="fa fa-list" aria-hidden="true"></i>列表找房
			</router-link>
		</div>
	</div>
</section>
</template>
<!-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak="></script> -->
<script>
import { MP } from '../../static/map.js'
import { mapGetters } from 'vuex'
import { getVillageMap,getVillageHouseLists,getVillageDetails } from '../api/api.js'
import BMap from 'BMap'
export default {
	name: '',
	data() {
		return {
			jsonDataTree: '', // 自己转的三级json
			AAreaCount: '', // 总区域数
			backId: '',
			backName: '',
			loading: false,
			mapHeight: '',
			activeIndex: '1',
			ak: 'Zs8NeMcBBpACgNXXBMbAq0IjQxLBKql8',
			keyword: '', //关键字查询
			pricesList: [{
				value: "a",
				label: "1000以下",
				checked: false,
				index: 0
			}, {
				value: "b",
				label: "1000-2000",
				checked: false,
				index: 1
			}, {
				value: "c",
				label: "2000-3000",
				checked: false,
				index: 2
			}, {
				value: "d",
				label: "3000-4000",
				checked: false,
				index: 3
			}, {
				value: "e",
				label: "4000-5000",
				checked: false,
				index: 4
			}, {
				value: "f",
				label: "5000-6000",
				checked: false,
				index: 5
			}, {
				value: "g",
				label: "6000-7000",
				checked: false,
				index: 6
			}, {
				value: "h",
				label: "7000-8000",
				checked: false,
				index: 7
			}],
			laysList: [{
				value: "1",
				label: "一室",
				checked: false,
				index: 0
			}, {
				value: "2",
				label: "一室一厅",
				checked: false,
				index: 1
			}, {
				value: "3",
				label: "二室",
				checked: false,
				index: 2
			}, {
				value: "4",
				label: "二室一厅",
				checked: false,
				index: 3
			}, {
				value: "5",
				label: "三室",
				checked: false,
				index: 4
			}, {
				value: "6",
				label: "三室一厅",
				checked: false,
				index: 5
			}, {
				value: "7",
				label: "四室",
				checked: false,
				index: 6
			}, {
				value: "8",
				label: "五室",
				checked: false,
				index: 7
			}],
			acreList: [{
				value: "a",
				label: "0平-20平",
				checked: false,
				index: 0
			}, {
				value: "b",
				label: "20平-40平",
				checked: false,
				index: 1
			}, {
				value: "c",
				label: "40平-60平",
				checked: false,
				index: 2
			}, {
				value: "d",
				label: "60平-80平",
				checked: false,
				index: 3
			}, {
				value: "e",
				label: "80平-100平",
				checked: false,
				index: 4
			}, {
				value: "f",
				label: "100平-120平",
				checked: false,
				index: 5
			}, {
				value: "g",
				label: "大于120平",
				checked: false,
				index: 6
			}],
			acre:'',
			prices:'',
			KeyWordList:[],//关键字数组
			checkedPrices: [],
			checkedLays: [],
			checkedAcres: [],
			AreaData: {
				AreaName: "上海松江出口加工区",
				DataId: "pudongxinqu",
				Lat: 31.2080020905,
				Lng: 121.6065292358,
				Num: 75,
				NumType: 0,
				ParentDataIdType: -1
			},
			BAreaData: [{
				AreaName: "惠南",
				DataId: "huinan",
				Lat: 31.047659,
				Lng: 121.773632,
				Num: 14,
				NumType: 1,
				ParentDataIdType: "pudongxinqu"
			}, {
				AreaName: "闵行",
				DataId: "lujiazui",
				Lat: 31.12,
				Lng: 121.38,
				Num: 3,
				NumType: 1,
				ParentDataIdType: "pudongxinqu"
			}],
			BAreaDataIndex: 1,
			// 区域列表
			aAreaList: [],
			aareaCountDiv: true,
			backlevel: false, //返回上一级
			aStatistics: 0, // 区域 房间数
			aName: '', //所选区域名称

			bAreaList: [],
			bareaCountDiv: false,
			bStatistics: 0, // 小区 房间数
			bName: '', //所选小区名称

			cAreaList: [],
			careaCountDiv: false,
			cStatistics: 0, // 户型 房间数
			cName: '', //所选户型名称

		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.commit('SET_HEADTOGGLE', 2)
		})
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit('SET_HEADTOGGLE', 0)
		next()
	},
	created() {
		this.initAreaList();
	},
	methods: {
		handleSelect(key, keyPath) {
		},
		InputChange(type,index){
			if(type == 0){
				this.KeyWordList = this.KeyWordList.filter(item => item.index !== 777)
				this.KeyWordList.push({
					type: type,
					value:this.keyword,
					label: this.keyword,
					index: index
				})
			}else if (type == 1) {
				this.checkedPrices = this.checkedPrices.filter(item => item.index !== 888)
				this.checkedPrices.push({
					value: this.prices,
					type: type,
					label: this.prices,
					index: index
				})
			}else if (type == 3) {
				this.checkedAcres = this.checkedAcres.filter(item => item.index !== 999)
				this.checkedAcres.push({
					value: this.acre,
					type: type,
					label: this.acre,
					index: index
				})
			}
			this.initAreaList();
		},
		//添加选房条件
		plaChange(check, val, label, type, index) {
			if (type == 1) {
				if (check == true) {
					this.checkedPrices.push({
						value: val,
						type: type,
						label: label,
						index: index
					})
				} else {
					this.checkedPrices = this.checkedPrices.filter(item => item.value !== val)
				}

			} else if (type == 2) {
				if (check == true) {
					this.checkedLays.push({
						value: val,
						type: type,
						label: label,
						index: index
					})
				} else {
					this.checkedLays = this.checkedLays.filter(item => item.value !== val)
				}
			} else if (type == 3) {
				if (check == true) {
					this.checkedAcres.push({
						value: val,
						type: type,
						label: label,
						index: index
					})
				} else {
					this.checkedAcres = this.checkedAcres.filter(item => item.value !== val)
				}
			}
			this.initAreaList();
			this.aareaCountDiv = true; //区域列表
			this.bareaCountDiv = false; //小区列表
			this.backlevel = false; // 返回上一级
		},
		//删除选房条件
		deleteChecked(index, val, type) {
			console.log(type);
			if(type == 0){
				this.KeyWordList = [];
				this.keyword = '';
			}
			else if (type == 1) {
				if(index == 888){
					this.prices = '';
					this.checkedPrices = this.checkedPrices.filter(item => item.value !== val)
				}else{
					this.pricesList[index].checked = false;
					this.checkedPrices = this.checkedPrices.filter(item => item.value !== val)
				}
			} else if (type == 2) {
				this.laysList[index].checked = false;
				this.checkedLays = this.checkedLays.filter(item => item.value !== val)
			} else if (type == 3) {
				if(index == 999){
					this.acre = '';
					this.checkedAcres = this.checkedPrices.filter(item => item.value !== val)
				}else{
					this.acreList[index].checked = false;
					this.checkedAcres = this.checkedAcres.filter(item => item.value !== val)
				}
			}
			this.initAreaList();
			this.aareaCountDiv = true; //区域列表
			this.bareaCountDiv = false; //小区列表
			this.backlevel = false; // 返回上一级
		},
		// 初始化 左侧表格############
		initAreaList() {
			this.loading = true;
			this.aareaCountDiv = true; //区域列表
			this.bareaCountDiv = false; //小区
			this.careaCountDiv = false; //户型
			this.backlevel = false; // 返回上一级
			this.aStatistics = 0; //清零
			this.aName = '';
			this.bName = '';
			this.cName = '';
			let Rental,Area;
			if(this.prices == "" && this.checkedPrices.map(item => item.value).toString() == ""){
				Rental = "";
			}if(this.prices !== "" && this.checkedPrices.map(item => item.value).toString() == ""){
				Rental = this.prices;
			}if(this.prices == "" && this.checkedPrices.map(item => item.value).toString() !== ""){
				Rental = this.checkedPrices.map(item => item.value).toString()
			}if(this.prices !== "" && this.checkedPrices.map(item => item.value).toString() !== ""){
				Rental = this.checkedPrices.map(item => item.value).toString() +','+ this.prices;
 			}

			if(this.acre == "" && this.checkedAcres.map(item => item.value).toString() == ""){
				Area = "";
			}if(this.acre !== "" && this.checkedAcres.map(item => item.value).toString() == ""){
				Area = this.acre;
			}if(this.acre == "" && this.checkedAcres.map(item => item.value).toString() !== ""){
				Area = this.checkedAcres.map(item => item.value).toString()
			}if(this.acre !== "" && this.checkedAcres.map(item => item.value).toString() !== ""){
				Area = this.checkedAcres.map(item => item.value).toString() +','+ this.acre;
 			}
			console.log(Rental);
			var params = {
				Area: Area,
				HouseTypeName: this.checkedLays.map(item => item.value).toString(),
				Rental: Rental,
				keyword: this.keyword
			}
			console.log(params);
			//地图选房接口
			getVillageMap(params).then((response) => {
				var AData = response.Data;
				// 三级json数据
				var jsonDataTree = this.transData(AData.Lst, 'Id', 'Parentid', 'children');
				this.AAreaCount = AData.AreaCount; //区域数
				// this.aStatistics = AData.RoomCount; // 总房间域数
				// 第一级
				let aAreaData = AData.Lst.filter(res => {
					return res.Type == 0;
				})


				for (var i = 0; i < jsonDataTree.length; i++) {
					var num_i = 0;
					if (jsonDataTree[i].children) {
						for (var j = 0; j < jsonDataTree[i].children.length; j++) {
							var num_j = 0;
							if (jsonDataTree[i].children[j].children) {
								for (var s = 0; s < jsonDataTree[i].children[j].children.length; s++) {
									num_i += 1
									num_j += 1;
								}
							}
							jsonDataTree[i].children[j]["num"] = num_j;
						}
					}
					jsonDataTree[i]["num"] = num_i;

				}
				this.aAreaList = jsonDataTree;

				if(this.aAreaList.length !== 0){
					for (var i= 0; i < this.aAreaList.length;i++) {
						this.aStatistics += this.aAreaList[i].num //总房间域数
					}
				}
				this.getBoundary();
				this.loading = false;
			})

		},
		transData(a, idStr, pidStr, chindrenStr) {
			var r = [],
				hash = {},
				id = idStr,
				pid = pidStr,
				children = chindrenStr,
				i = 0,
				j = 0,
				len = a.length;
			for (; i < len; i++) {
				hash[a[i][id]] = a[i];
			}
			for (; j < len; j++) {
				var aVal = a[j],
					hashVP = hash[aVal[pid]];
				if (hashVP) {
					!hashVP[children] && (hashVP[children] = []);
					hashVP[children].push(aVal);
				} else {
					r.push(aVal);
				}
			}
			return r;
		},
		// 一级区域点击事件##############
		aareaCountListBtn(id, name) {
			this.backId = id;
			this.backName = name;
			this.loading = true;
			this.aareaCountDiv = false; //区域列表
			this.bareaCountDiv = true; //小区
			this.careaCountDiv = false; //户型
			this.backlevel = true; // 返回上一级
			this.bStatistics = 0; //清零
			this.aName = name;
			this.aAreaList["Id"] = id
			for (var i = 0; i < this.aAreaList.length; i++) {
				if(this.aAreaList[i].num !==0){
					if (this.aAreaList[i].Id == id) {
						this.bAreaList = (this.aAreaList[i].children == []) ? [] : this.aAreaList[i].children;
						for (var j = 0; j < this.bAreaList.length; j++) {
							this.bStatistics += this.bAreaList[j].num
						}
						console.log(this.bAreaList);
					}
				}
			}
			this.loading = false;
		},
		// 二级区域点击事件##############
		bareaCountListBtn(id, name,Lng,lat) {
			this.loading = true;
			this.aareaCountDiv = false; //区域列表
			this.bareaCountDiv = false; //小区
			this.careaCountDiv = true; //户型
			this.backlevel = true; // 返回上一级
			this.cStatistics = 0; //清零
			this.bName = name;
			for (var i = 0; i < this.bAreaList.length; i++) {
				if (this.bAreaList[i].Id == id) {
					this.cAreaList = (this.bAreaList[i].children == null) ? [] : this.bAreaList[i].children;
				}
			}
			this.loading = false;
			this.getBoundaryThree(Lng,lat,name);
		},
		//返回上一级
		backlevelBtn(id, name) {
			if (this.bareaCountDiv == true) {
				this.initAreaList()
			} else if (this.careaCountDiv == true) {
				this.aareaCountListBtn(id, name);
			}
		},
		clearAllChecked() {
			for (var i = 0; i < this.pricesList.length; i++) {
				this.pricesList[i].checked = false;
			}
			this.checkedPrices = [];

			for (var i = 0; i < this.laysList.length; i++) {
				this.laysList[i].checked = false;
			}
			this.checkedLays = [];

			for (var i = 0; i < this.acreList.length; i++) {
				this.acreList[i].checked = false;
			}
			this.checkedAcres = [];
			this.initAreaList();
			this.aareaCountDiv = true; //区域列表
			this.bareaCountDiv = false; //小区列表
			this.backlevel = false;
		},
		getBoundary() {
			var _this = this;
			var map = new BMap.Map("XSDFXPage", {
				enableMapClick: true
			});

			map.centerAndZoom("上海", 15); // 初始化地图,用城市名设置地图中心点
			map.setCurrentCity("上海");
			// 开启鼠标滚轮缩放
			map.enableScrollWheelZoom(true);
			var bdary = new BMap.Boundary();
			bdary.get("浦东", function(rs) { //获取行政区域
				// map.clearOverlays(false);       //清除地图覆盖物
				var count = rs.boundaries.length; //行政区域的点有多少个
				// if (count === 0) {
				// 	alert('未能获取当前输入行政区域');
				// 	return ;
				// }
				var pointArray = [];
				var ply;
				for (var i = 0; i < count; i++) {
					ply = new BMap.Polygon(rs.boundaries[i], {
						strokeWeight: 2,
						strokeColor: "#ff0000",
						fillColor: ""
					}); //建立多边形覆盖物  fillColor:"" 去掉遮罩的作用
					map.addOverlay(ply); //添加覆盖物
					pointArray = pointArray.concat(ply.getPath());
				}
				ply.hide();
				var pointPD = new BMap.Point(_this.AreaData.Lng, _this.AreaData.Lat); //定位经纬度
				var marker_title = new BMap.Marker(pointPD);
				//将标注放大地图上
				map.addOverlay(marker_title);
				//文字提示
				// var html = '<div class="district-overlay">浦东<p class="map-overlay__total">8套</p></div>'
				var label = new BMap.Label('<div class="district-overlay">' + '浦东新区' + '<p class="map-overlay__total">' + _this.aStatistics + '套</p></div>', {
					offset: new BMap.Size(0, 0)
				});
				label.setStyle({
					border: "none",
					background: "none",
				});
				marker_title.setLabel(label);
				label.addEventListener("onmouseover", function(e) {
					label.setStyle({
						lineHeight: "20px",
						border: "none",
						background: "none",
					});
					ply.show();
				});

				label.addEventListener("onmouseout", function(e) {
					ply.hide();
				});
				label.addEventListener('click', function() {
					// _this.getBoundaryThree(BMap, map, _this)
				});
				map.setViewport(pointArray); //调整视野
			});
		},
		getBoundaryThree(Lng, Lat,name) {
			if(Lng == '' || Lng == null || Lat == '' || Lat == null){
				Lng = 121.5505840120,
				Lat = 31.2274065041
			}
			var _this = this;
			var map = new BMap.Map("XSDFXPage", {
				enableMapClick: true
			});
			map.centerAndZoom(new BMap.Point(Lng, Lat), 15);
			map.enableScrollWheelZoom();
			// 复杂的自定义覆盖物
			function ComplexCustomOverlay(point, text, mouseoverText) {
				this._point = point;
				this._text = text;
				this._overText = mouseoverText;
			}
			ComplexCustomOverlay.prototype = new BMap.Overlay();
			ComplexCustomOverlay.prototype.initialize = function(map) {
				this._map = map;
				var div = this._div = document.createElement("div");
				div.style.position = "absolute";
				div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
				div.style.backgroundColor = "#EE5D5B";
				div.style.border = "1px solid #BC3B3A";
				div.style.color = "white";
				div.style.height = "18px";
				div.style.padding = "6px";
				div.style.lineHeight = "18px";
				div.style.borderRadius = "4px";
				div.style.whiteSpace = "nowrap";
				div.style.MozUserSelect = "none";
				div.style.fontSize = "12px"
				var span = this._span = document.createElement("span");
				div.appendChild(span);
				span.appendChild(document.createTextNode(this._text));
				var that = this;

				var arrow = this._arrow = document.createElement("div");
				arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
				arrow.style.position = "absolute";
				arrow.style.width = "11px";
				arrow.style.height = "10px";
				arrow.style.top = "30px";
				arrow.style.left = "10px";
				arrow.style.overflow = "hidden";
				div.appendChild(arrow);

				div.onmouseover = function() {
					this.style.backgroundColor = "#6BADCA";
					this.style.borderColor = "#6BADCA";
					this.getElementsByTagName("span")[0].innerHTML = that._overText;
					arrow.style.backgroundPosition = "0px -20px";
				}

				div.onmouseout = function() {
					this.style.backgroundColor = "#EE5D5B";
					this.style.borderColor = "#BC3B3A";
					this.getElementsByTagName("span")[0].innerHTML = that._text;
					arrow.style.backgroundPosition = "0px 0px";
				}

				map.getPanes().labelPane.appendChild(div);

				return div;
			}
			ComplexCustomOverlay.prototype.draw = function() {
				var map = this._map;
				var pixel = map.pointToOverlayPixel(this._point);
				this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
				this._div.style.top = pixel.y - 30 + "px";
			}
			var txt = " " + this.cAreaList.length + "套",
				mouseoverTxt = txt + name;

			var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(Lng, Lat), " " + this.cAreaList.length + "套", mouseoverTxt);

			map.addOverlay(myCompOverlay);
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.mapHeight = (document.documentElement.clientHeight - 120) + 'px'
		});
	}
}
</script>
<style lang="scss">
.login-header {
    -webkit-box-shadow: 0 6px 30px #ddd;
    box-shadow: 0 6px 30px #ddd;
}
.XSDFXPage {
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
    padding-top: 60px;
}
.district-overlay {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    line-height: 180%;
    padding-top: 20px;
    border-radius: 50%;
    background: rgba(46, 171, 98, 0.8);
    text-align: center;
    font-size: 12px;
    font-weight: inherit;
    color: #fff;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.24);
    &:hover {
        background: rgba(221, 36, 36, 0.8) !important;
    }
    p {
        color: white !important;
    }
}
.district-overlay.two {
    width: 70px !important;
    height: 70px !important;
    background: #e6a23c;
}
.MapSearchRoom—__navbar-form {
    padding: 0;
    margin: 12px;
    float: left;
    .form-group {
        position: relative;
        input {
            margin: 0;
            padding: 0;
            border: 0;
            height: 35px;
            line-height: 35px;
            width: 350px;
            background-color: #f1f1f1;
            padding-left: 10px;
        }
        .material-icons {
            position: absolute;
            right: 10px;
            top: 12px;
			cursor: pointer;
        }
    }
}
.addressSel {
    .el-dropdown {
        margin: 20px 20px 0 0;
        cursor: pointer;
        &:hover {
            color: #14924b;
        }
    }
}
.MapSearchRoom__Sidebar {
    width: 400px;
    float: left!important;
    color: #606266;
    .MapSearchRoom__Sidebar_Inner {
        background-color: #fff;
        overflow: auto;
        padding: 10px;
        .MapSearchRoom__Sidebar__Place {
            background: #fafafa;
            border-bottom: 1px solid #dedede;
            padding: 8px;
            h4 {
                font-size: 18px;
                margin: 5px 5px 15px;
                i {
                    margin-top: -3px;
                    margin-right: 5px;
                    color: #ff5722;
                }
                .backLevel {
                    cursor: pointer;
                    &:hover {
                        color: #009688;
                    }
                }
            }
        }
        h4 {
            font-size: 18px;
            margin: 8px 0;
        }
        .areaCountList {

            padding: 8px;
            border-top: 1px solid #dedede;
            cursor: pointer;
            &:hover {
                background-color: #f5f5f5 !important;
            }
        }
        .areaCountList:nth-child(odd) {
            background-color: #f9f9f9;
        }
        .areaCountList:nth-child(even) {
            background-color: white;
        }
    }
    .text-danger {
        color: #f44336;
    }
}
.MapSearchRoom__Main {
    position: relative;
    margin-left: 400px;
    .MapSearchRoom__Main__Filter {
        width: 100%;
        background-color: rgba(228, 231, 237, 0.75);
        position: absolute;
        left: 0;
        top: 0;
        padding-top: 10px;
        z-index: 0;
        .MapSearchRoom__Main__Filter__Title {
            display: block;
            margin-left: 15px;
            line-height: 40px;
            width: 50px;
            float: left !important;
        }
        .MapSearchRoom__Main__Filter__Content {
            width: 700px;
            float: left !important;
            .alert {
                border: 1px solid #ff824c;
                padding: 8px;
                margin: 0;
                color: #666;
                border-radius: 4px;
                margin-right: 10px;
                margin-bottom: 10px;
                .close {
                    position: relative;
                    top: -2px;
                    right: 0;
                    color: inherit;
                    -webkit-appearance: none;
                    padding: 0;
                    cursor: pointer;
                    background: 0 0;
                    border: 0;
                    float: right;
                    font-size: 21px;
                    font-weight: 700;
                    line-height: 1;
                    color: #000;
                    text-shadow: 0 1px 0 #fff;
                    filter: alpha(opacity=20);
                    opacity: 0.2;
                }
            }
            .MapSearchRoom__Main__Filter__AllClose {
                margin: 0;
                color: rgba(0,0,0, 0.87);
                margin-bottom: 10px;
                border: none;
                border-radius: 2px;
                position: relative;
                padding: 8px 30px;
                margin: 0 1px;
                font-size: 16px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0;
                will-change: box-shadow, transform;
                -webkit-transition: -webkit-box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                -o-transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                outline: 0;
                cursor: pointer;
                text-decoration: none;
                background: transparent;
                &:hover {
                    background-color: rgba(153, 153, 153, 0.2);
                }
            }
        }
        .listHouse {
            background-color: #EEEEEE;
            color: rgba(0,0,0, 0.87);
            margin: 0 0 10px;
            padding: 8px;
        }
    }
}
.roomList {
    cursor: pointer;
    .MapSearchRoom__Sidebar__List {
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        .MapSearchRoom__Sidebar__List__Media {
            width: 140px;
            height: 140px;
            overflow: hidden;
            background-color: #e8e8e8;
            margin-right: 15px;
        }
        .block {
            display: block;
        }
        .pull-left {
            float: left!important;
        }
        .MapSearchRoom__Sidebar__List__Content {
            margin-left: 140px;
            height: 140px;
            overflow: hidden;
            h4 {
                width: 100%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                color: #555;
                font-size: 16px;
                line-height: 24px;
            }
        }
    }
}
.changeInput {
    border: 1px solid #e4e7ed;
    height: 35px;
    margin: 0 5px;
}
.estate-overlay {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 30px;
    line-height: 30px;
}
.estate-overlay__count {
    position: relative;
    width: 50px;
    box-sizing: border-box;
    padding: 0 6px;
    white-space: nowrap;
    background: rgba(57, 172, 106, 0.98);
    color: #fff;
    text-align: center;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.24);
    border-radius: 2px;
}
</style>
