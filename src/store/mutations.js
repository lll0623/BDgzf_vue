export default {
    SET_HEADTOGGLE:(state,toggle)=>{//重置headerbar
        state.head.toggle = toggle
    },
    SET_USERINFO:(state,val)=>{//重置登录信息
        state.userInfo = val
    },
    SET_APPLYFORTAB:(state,val) =>{//重置提交表单数据步骤
        state.applyForTab = val
    },
    SET_USERINFOFORM:(state,val) => {//重置个人数据
        state.userInfoForm = val
    },
    SET_APPLYFORCODE:(state,val) => {//重置表单数据Code
        state.applyForCode = val
    },
    SET_APPLYFORDATA:(state,val) => {//重置表单数据
        state.applyForData = val
    },
    SET_APPLYFORSTATE:(state,val) => {//重置表单状态1003
        state.userInfo.State = val
    },
    SET_MYCENTERNAV:(state,val) => {
        state.myCenterNav =val
    },
    SET_ISUSERENTER:(state,val) => {
        state.isUserEnter =val
    },
    SET_ISREADORNOT:(state,val) => {
        state.isReadOrNot =val
    },
    SET_STEPTIP:(state,val)=>{
        state.stepTip = val
    },
}
