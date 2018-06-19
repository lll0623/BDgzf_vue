import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Index from '@/views/Index.vue'

//组件的异步加载,注意后缀vue
const Login = resolve => {
    require.ensure([],()=>resolve(require('@/views/Login.vue')),'Login')
}
const Register = resolve => {
    require.ensure([],()=>resolve(require('@/views/Register.vue')),'Register')
}
const News = resolve => {
    require.ensure([],()=>resolve(require('@/views/NewsGuide/News.vue')),'News')
}
const NewsView = resolve => {
    require.ensure([],()=>resolve(require('@/views/NewsGuide/NewsView.vue')),'NewsView')
}
const Guide = resolve => {
    require.ensure([],()=>resolve(require('@/views/NewsGuide/Guide.vue')),'Guide')
}
const GuideView = resolve => {
    require.ensure([],()=>resolve(require('@/views/NewsGuide/GuideView.vue')),'GuideView')
}
const webHelp = resolve => {
    require.ensure([],()=>resolve(require('@/views/webHelp.vue')),'webHelp')
}
const Server = resolve => {
    require.ensure([],()=>resolve(require('@/views/Server.vue')),'Server')
}
const ApplyFor = resolve => {
    require.ensure([],()=>resolve(require('@/views/ApplyForOrder/ApplyFor.vue')),'ApplyFor')
}
const FirstStep = resolve => {
    require.ensure([],()=>resolve(require('@/views/ApplyForOrder/FirstStep.vue')),'FirstStep')
}
const SecondStep = resolve => {
    require.ensure([],()=>resolve(require('@/views/ApplyForOrder/SecondStep.vue')),'SecondStep')
}
const ThirdStep = resolve => {
    require.ensure([],()=>resolve(require('@/views/ApplyForOrder/ThirdStep.vue')),'ThirdStep')
}
const FourthStep = resolve => {
    require.ensure([],()=>resolve(require('@/views/ApplyForOrder/FourthStep.vue')),'FourthStep')
}


const AddrSel = resolve => {
    require.ensure([],()=>resolve(require('@/views/AddrSel.vue')),'AddrSel')
}
const VillageLists = resolve => {
    require.ensure([],()=>resolve(require('@/views/VillageHouse/VillageLists.vue')),'VillageLists')
}

const HouseLists = resolve => {
    require.ensure([],()=>resolve(require('@/views/VillageHouse/HouseLists.vue')),'HouseLists')
}

const Relet = resolve => {
    require.ensure([],()=>resolve(require('@/views/Relet.vue')),'Relet')
}
const Retreat = resolve => {
    require.ensure([],()=>resolve(require('@/views/Retreat.vue')),'Retreat')
}
const FindPassword = resolve => {
    require.ensure([],()=>resolve(require('@/views/FindPassword.vue')),'FindPassword')
}
const Terms = resolve => {
    require.ensure([],()=>resolve(require('@/views/Terms.vue')),'Terms')
}
const MyCenter = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyCenterView/MyCenter.vue')),'MyCenter')
}
const MyMessage = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyCenterView/MyMessage.vue')),'MyMessage')
}
const UserApplyFor = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyCenterView/UserApplyFor.vue')),'UserApplyFor')
}
const SelectedRooms = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyCenterView/SelectedRooms.vue')),'SelectedRooms')
}
const SeeRoomList = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyCenterView/SeeRoomList.vue')),'SeeRoomList')
}
const SignedRooms = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyCenterView/SignedRooms.vue')),'SignedRooms')
}
const FavourRooms = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyCenterView/FavourRooms.vue')),'FavourRooms')
}
const UserContract = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyCenterView/UserContract.vue')),'UserContract')
}
const UserCenter = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyCenterView/UserCenter.vue')),'UserCenter')
}
const MyProcess = resolve => {
    require.ensure([],()=>resolve(require('@/views/MyProcess.vue')),'MyProcess')
}
const VillageDetails = resolve => {
    require.ensure([],()=>resolve(require('@/views/VillageHouse/VillageDetails.vue')),'VillageDetails')
}
const HouseDetails = resolve => {
    require.ensure([],()=>resolve(require('@/views/VillageHouse/HouseDetails.vue')),'HouseDetails')
}
const DownloadPdf= resolve => {
    require.ensure([],()=>resolve(require('@/views/Download/DownloadPdf.vue')),'DownloadPdf')
}
const ContractPdf= resolve => {
    require.ensure([],()=>resolve(require('@/views/Download/ContractPdf.vue')),'ContractPdf')
}

const router= new Router({
    // mode:'history',
    base: __dirname,
    routes: [
        {
            path: '/index',
            routerName: 'index',
            name: '首页',
            component:Index,
            iconCls:'',
            hidden:true,
            alias : '/',
            meta: {
                keepAlive: true,
            },
        },{
            mode: 'history',
            path: '/news',
            routerName: 'news_id',
            name: '新闻',
            component:News,
            iconCls:'',
            hidden:false,
            meta: {
                keepAlive: true,
            },
        },{
            mode: 'history',
            path: '/newsview/:id',
            routerName: 'news_id',
            name: '新闻详情',
            component:NewsView,
            iconCls:'',
            hidden:true,
            meta: {
                keepAlive: false,
            },
        },{
            mode: 'history',
            path: '/guide',
            routerName: 'guide_id',
            name: '申请指南',
            component:Guide,
            iconCls:'',
            hidden:false,
            meta: {
                keepAlive: true,
            },
        },{
            mode: 'history',
            path: '/guideview/:id',
            routerName: 'guide_id',
            name: '申请指南详情',
            component:GuideView,
            iconCls:'',
            hidden:true
        },{
            mode: 'history',
            path: '/webHelp',
            routerName: 'web_help_id',
            name: '网站帮助',
            component:webHelp,
            iconCls:'',
            hidden:false,
            meta: {
                keepAlive: true,
            },
        },{
            mode: 'history',
            path: '/villageLists',
            routerName: 'village_lists',
            component:VillageLists,
            name: '小区',
            iconCls:'',
            hidden:false,
            meta: {
                keepAlive: false,
            },
        },{
            path:'/server',
            leaf:true,
            routerName: 'server',
            component:Server,
            name: '业务办理',
            iconCls:'',
            hidden:false,
            meta: {
                keepAlive: false,
            },
            children:[
                {
                    mode: 'history',
                    path: '/applyFor',
                    routerName: 'apply_for',
                    component:ApplyFor,
                    name: '提交申请',
                    meta: {
        	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                        keepAlive: false,
        	        },
                    children:[
                        {
                            mode: 'history',
                            path: '/applyFor',
                            routerName: 'first_step',
                            component:FirstStep,
                            name: '完成申请人信息',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        },
                        {
                            mode: 'history',
                            path: '/applyFor/secondStep',
                            routerName: 'second_step',
                            component:SecondStep,
                            name: '共同申请人',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        },{
                            mode: 'history',
                            path: '/applyFor/thirdStep',
                            routerName: 'third_step',
                            component:ThirdStep,
                            name: '申请人现有住房',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        },{
                            mode: 'history',
                            path: '/applyFor/fourthStep',
                            routerName: 'fourth_step',
                            component:FourthStep,
                            name: '申请人单位信息',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        }
                    ]
                },{
                    mode: 'history',
                    path: '/addrSel',
                    routerName: 'addr_sel',
                    name: '地图选房',
                    component:AddrSel,
                    meta: {
                        requireAuth: false,
                        keepAlive: false,
                    },
                },{
                    mode: 'history',
                    path: '/houseLists',
                    routerName: 'condition_sel',
                    component:HouseLists,
                    name: '条件选房',
                    meta: {
                        keepAlive: false,
                    },
                },{
                    mode: 'history',
                    path: '/uploadContract',
                    routerName: 'upload_contract',
                    name: '下载合同',
                    meta: {
        	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                        keepAlive: false,
        	        },
                },{
                    path: '/relet',
                    routerName: 'relet',
                    name: '续租申请',
                    component:Relet,
                    meta: {
        	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                        keepAlive: false,
        	        },
                },{
                    mode: 'history',
                    path: '/retreat',
                    routerName: 'retreat',
                    name: '退租申请',
                    component:Retreat,
                    meta: {
        	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                        keepAlive: false,
        	        },
                },
            ]
        },{

            path: '/login',
            routerName: 'login',
            component:Login,
            name: '登录',
            iconCls : 'icon i-login',
            hidden:false,
        },{

            path: '/register',
            routerName: 'register',
            component:Register,
            name: '注册',
            hidden:false,
        },{
            path:'/server',
            leaf:true,
            routerName: 'server',
            component: Server,
            name: '',
            iconCls:'',
            hidden:true,
            meta: {
                requireAuth: true,
                keepAlive: false,
            },
            children:[
                {
                    mode: 'history',
                    path: '/myProcess',
                    routerName: 'my_process',
                    name: '我的进度',
                    component: MyProcess,
                    hidden : false,
                    meta: {
        	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        	        },
                },{
                    mode: 'history',
                    path: '/myCenter',
                    routerName: 'my_center',
                    component: MyCenter,
                    name: '个人中心',
                    meta: {
        	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                        keepAlive: false,
        	        },
                    children:[
                        {
                            mode: 'history',
                            path: '/myCenter',
                            routerName: 'my_message',
                            component: MyMessage,
                            name: '我的消息',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        },{
                            mode: 'history',
                            path: '/myCenter/userApplyFor',
                            routerName: 'user_applyfor',
                            component: UserApplyFor,
                            name: '我的申请',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        },{
                            mode: 'history',
                            path: '/myCenter/selectedRooms',
                            routerName: 'selected_rooms',
                            component: SelectedRooms,
                            name: '已选定房间列表',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        },{
                            mode: 'history',
                            path: '/myCenter/seeRoomList',
                            routerName: 'seeroom_list',
                            component: SeeRoomList,
                            name: '看房申请列表',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        },{
                            mode: 'history',
                            path: '/myCenter/signedRooms',
                            routerName: 'signed_rooms',
                            component: SignedRooms,
                            name: '已签约房间列表',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        },{
                            mode: 'history',
                            path: '/myCenter/favourRooms',
                            routerName: 'favour_rooms',
                            component: FavourRooms,
                            name: '已关注房间列表',
                            meta: {
                	            requireAuth: true,
                                keepAlive: false,
                	        },
                        },{
                            mode: 'history',
                            path: '/myCenter/userContract',
                            routerName: 'user_contract',
                            component: UserContract,
                            name: '我的合同',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        },{
                            mode: 'history',
                            path: '/myCenter/userCenter',
                            routerName: 'user_center',
                            component: UserCenter,
                            name: '个人信息管理',
                            meta: {
                	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                                keepAlive: false,
                	        },
                        }
                    ]
                },{
                    mode: 'history',
                    path: '',
                    routerName: 'log_out',
                    name: '退出',
                    hidden : false,
                    meta: {
        	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        	        },
                }
            ]
        },{
            mode: 'history',
            path: '/findPassword',
            routerName: 'findPassword',
            name: '忘记密码',
            component:FindPassword,
            iconCls:'',
            hidden:true,
        },{
            mode: 'history',
            path: '/terms',
            routerName: 'terms',
            name: '服务条款',
            component:Terms,
            iconCls:'',
            hidden:true,
            meta: {
                keepAlive: true,
            },
        },{
            mode: 'history',
            path: '/villageDetails/:id',
            routerName: 'village_details',
            component:VillageDetails,
            name: '小区详情',
            iconCls:'',
            hidden:true,
            meta: {
                keepAlive: false,
            },
        },{
            mode: 'history',
            path: '/houseDetails/:id',
            routerName: 'house_details',
            component:HouseDetails,
            name: '房源详情',
            iconCls:'',
            hidden:true,
            meta: {
                keepAlive: false,
            },
        },{
            mode: 'history',
            path: '/downloadPdf',
            routerName: 'download_pdf',
            component:DownloadPdf,
            name: '下载',
            iconCls:'',
            hidden:true,
            meta: {
                keepAlive: false,
            },
        },{
            mode: 'history',
            path: '/contractPdf',
            routerName: 'contract_pdf',
            component:ContractPdf,
            name: '下载',
            iconCls:'',
            hidden:true,
            meta: {
                keepAlive: false,
            },
        }
    ],
})
export default router;
