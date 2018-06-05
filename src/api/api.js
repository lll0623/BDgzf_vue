import axios from 'axios'
import qs from 'qs'
import {generateMixed,getCookie,delCookie} from '../util'

import router from '../router'
import store from '../store'

//axios 配置
axios.default.timeout = 500
axios.defaults.baseURL = 'http://112.124.110.11:8043'

//axios httpHeader固定参数
axios.interceptors.request.use(
    config => {
        var userInfo = getCookie('userInfo') || ''
        if (userInfo) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.token = JSON.parse(userInfo).token.Token;
            config.headers.timestamp =  generateMixed(32);
            config.headers.nonce =  generateMixed(32);
            config.headers.signature =  generateMixed(32);
        }else{
            config.headers.token =  generateMixed(32);
            config.headers.timestamp =  generateMixed(32);
            config.headers.nonce =  generateMixed(32);
            config.headers.signature =  generateMixed(32);
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

//http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        var userInfo = getCookie('userInfo') || ''
        if(userInfo){
            if(response.data.StatusCode == 403){
                store.commit('SET_USERINFO','')
                delCookie('userInfo')
                router.replace({
                    path: '/login',
                    //query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                })
            }else{
                return response
            }
        }
        // }else{
        //     // if(response.data.StatusCode == 403){
        //     //     router.replace({
        //     //         path: '/login',
        //     //         query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        //     //     })
        //     // }else{
        //         return response
        //     // }
        //
        // }
         return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response)
    });

// POST传参序列化
axios.interceptors.request.use( (config)=>{
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if(config.method == 'post'){
        config.data = qs.stringify(config.data)
    }
    return config
},(error) =>{
    return Promise.reject(error)
})
//登录
export const getLogin = params => {
    return axios.post('/api/Member/Login',params).then(response => response.data)
}
//注册
export const getRegister = params => {
    return axios.post('/api/Member/Register',params).then(response => response.data)
}
//身份证补全
export const getIDCard = params => {
    return axios.post('/api/Member/Verified',params).then(response => response.data)
}
/*首页轮播图*/
export const getIndexBanner = params => {
    return axios.post('/api/SowingMap/QueryList',params).then(response => response.data)
}
// 获取新闻,公告，指南列表
export const getNews = params => {
    return axios.post('/api/SowingMap/QueryPageList',params).then(response => response.data)
}
// 获取新闻,公告，指南 详情
export const getNewsInfo = params => {
    return axios.post('/api/SowingMap/QueryInfo',params).then(response => response.data)
}
// 个人进度表
export const getMyProcess = params => {
    return axios.post('/api/Member/QueryMemberSchedule',params).then(response => response.data)
}
//获取提交申请单的data
export const getApplyForCurrentCode = params => {
    return axios.post('/api/Qualification/QueryCurrentBill',params).then(response => response.data)
}
//获取申请单列表
export const getApplyForLists = params => {
    return axios.post('/api/Qualification/QueryList',params).then(response => response.data)
}
//提交申请单
export const getApplyFor = params => {
    return axios.post('/api/Qualification/SaveFormByStep',params).then(response => response.data)
}
//获取申请单数据的回显
export const getApplyForInfo = params => {
    return axios.post('/api/Qualification/GetBillInfo',params).then(response => response.data)
}
// 会员消息列表
export const getMemberMSGList = params => {
    return axios.post('/api/Member/QueryMemberMSGList',params).then(response => response.data)
}
//消息处理接口
export const getReadMSG = params => {
    return axios.post('/api/Member/ReadMSG',params).then(response => response.data)
}
//合同列表
export const getContractList = params => {
    return axios.post('/api/ContractDWelling/QueryContracLst',params).then(response => response.data)
}
//合同信息查询
export const getContractDetail = params => {
    return axios.post('/api/ContractDWelling/QueryContracDetail',params).then(response => response.data)
}
// 个人信息查看
export const getUserInfo = params => {
    return axios.post('/api/Member/QueryInfo',params).then(response => response.data)
}
// 个人信息修改
export const getUserCenterUpdate = params => {
    return axios.post('/api/Member/ModifyMemberInfo',params).then(response => response.data)
}
// 修改密码
export const getUpdatePwd = params => {
    return axios.post('/api/Member/ModifyPassword',params).then(response => response.data)
}
// 小区统计查询--地图
export const getVillageMap = params => {
    return axios.post('/api/PStruct/GetStatistics',params).then(response => response.data)
}
//区域筛选条件
export const getScreenArea = params => {
    return axios.post('/api/PStruct/GetAreaList',params).then(response => response.data)
}
//小区列表
export const getVillageHouseLists = params => {
    return axios.post('/api/PStruct/QueryPStruct',params).then(response => response.data)
}
//房间列表
export const getHouseLists = params => {
    return axios.post('/api/PStruct/QueryPRoomLst',params).then(response => response.data)
}

//小区详情
export const getVillageDetails = params => {
    return axios.post('/api/PStruct/QueryPStructDetail',params).then(response => response.data)
}
//房间详情
export const getHouseDetails = params => {
    return axios.post('/api/PStruct/QueryRoomDetail',params).then(response => response.data)
}
//关注房源
export const getCollect = params => {
    return axios.post('/api/PStruct/AttentionRoom',params).then(response => response.data)
}
//获取关注房源的列表
export const getCollectedLists = params => {
    return axios.post('/api/PStruct/GetAttentionRoomList',params).then(response => response.data)
}
//取消关注
export const cancelCollect =params =>{
    return axios.post('/api/PStruct/CancelAttentionRoom',params).then(response => response.data)
}
//续租申请
export const getRenewleaseApplication = params => {
    return axios.post('/api/ContractDWelling/RenewleaseApplication',params).then(response => response.data)
}
//退租申请
export const getRetirementApplication = params => {
    return axios.post('/api/ContractDWelling/RetirementApplication',params).then(response => response.data)
}
//看房申请
export const getApplyForLookRoom = params => {
    return axios.post('/api/PStruct/Prospectiveapplication',params).then(response => response.data)
}
//看房列表
export const getApplyForLookRoomLists = params => {
    return axios.post('/api/PStruct/QueryProspectiveapplication',params).then(response => response.data)
}
//用户选房
export const getChooseRoom = params => {
    return axios.post('/api/PStruct/ChooseRoom',params).then(response => response.data)
}
//选房列表
export const getChooseRoomLists = params => {
    return axios.post('/api/PStruct/QuerySelectRoomLst',params).then(response => response.data)
}
//取消选房
export const getCancelRoom = params => {
    return axios.post('/api/PStruct/CancelRoom',params).then(response => response.data)
}
//网签合同
export const getSignContract = params => {
    return axios.post('/api/ContractDWelling/AddContractDWelling',params).then(response => response.data)
}

//获取申请单公示
export const getApplyForComLists = params => {
    return axios.post('/api/Qualification/QueryPublicList',params).then(response => response.data)
}
//获取首页最热房源列表
export const getHotHouseLists = params => {
    return axios.post('/api/PStruct/GetHotPStruct',params).then(response => response.data)
}
//首页快速查询入口
export const getIndexFast = params => {
    return axios.post('/api/Qualification/GetBillStateByIDCard',params).then(response => response.data)
}
    //短信接口
export const getSMSHelper = params => {
    return axios.post('/api/Common/SendSMS',params).then(response => response.data)
}
//找回密码
export const getFindPassword = params => {
return axios.post('/api/Member/FindPassword',params).then(response => response.data)
}
//邮箱接口
export const getEmailUtil = params => {
return axios.post('/api/Common/EmailUtil',params).then(response => response.data)
}
