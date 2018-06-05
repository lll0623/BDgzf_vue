import { getApplyForCurrentData,getUserInfo,getMemberMSGList} from '../api/api.js'
import { getCookie,setCookie } from '../util/index.js'
export default {
    SET_USERINFO({commit},userInfo){
        commit('SET_USERINFO',userInfo)
    },
    SET_USERINFOFORM({commit},userInfoForm){
        commit('SET_USERINFOFORM',userInfoForm)
    },
    SET_APPLYFORCODE({commit},applyForCode){
        commit('SET_APPLYFORCODE',applyForCode)
    },
    SET_APPLYFORDATA({commit},applyForData){
        commit('SET_APPLYFORDATA',applyForData)
    },
    //获取表单数据
//     SET_APPLYFORDATA(context,params) {
//         return new Promise((resolve) => {
//             getApplyForCurrentData(params).then((response) => {
//                 context.commit('SET_APPLYFORDATA', response.data);
//                 resolve();
//             });
//         });
//     }
    //获取进度
    SET_STEPTIP(context,params){
        return new Promise((resolve) => {
            getUserInfo(params).then((response) => {
                var userInfo = JSON.parse(getCookie('userInfo'))
                userInfo.State  = response.Data.State
                setCookie('userInfo',JSON.stringify(userInfo))
                context.commit('SET_USERINFO', userInfo);
                context.commit('SET_STEPTIP', response.Data.State);
                resolve();
            });
        });
    },
    //未读消息数
    SET_ISREADORNOT(context,params){
        return new Promise((resolve) => {
            getMemberMSGList(params).then((response) => {
                response.Data = (response.Data == null) ? [] : response.Data;
                context.commit('SET_ISREADORNOT', response.Data.Records);
                resolve();
            });
        });
    },
}
