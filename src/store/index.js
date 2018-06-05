import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import {getCookie} from '../util'
Vue.use(Vuex)

const state = {
    head : {
        toggle: 0
    },
    userInfo : getCookie('userInfo')== null ? '' : JSON.parse(getCookie('userInfo')), //登录信息
    userInfoForm : '', //获取个人信息
    applyForTab : 1,//
    applyForCode: getCookie('applyForCode')== null ? '' : getCookie('applyForCode'),
    applyForData: getCookie('applyForData')== null ? '' : getCookie('applyForData'),//所填写的表单数据本地保存
    myCenterNav: '1',//1.我的消息、2.我的申请、3.我的房间、4.我的合同、5、个人信息管理
    isReadOrNot: '0', //个人未读消息条数
    isUserEnter:getCookie('isUserEnter') == null ? '0' : '1',//是否从个人中心进入提交申请页面
    stepTip:getCookie('userInfo')== null ? '1001' :JSON.parse(getCookie('userInfo')).State,//头部进度提示
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
