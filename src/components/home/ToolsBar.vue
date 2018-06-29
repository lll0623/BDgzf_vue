<template>
    <div class="tool_bar fix" v-if="head.toggle == 0">
        <ul>
            <li>
                <span class="baged abs white fs12 block tc" v-if="userInfo && this.$store.getters.isReadOrNot > 0">
                    {{ this.$store.getters.isReadOrNot }}
                </span>
                <router-link to="/myCenter">

                    <i class="icon i-msg"></i>

                    <span>我的消息</span>
                </router-link>
            </li>
            <li>
                <router-link to="/myCenter/userCenter">
                    <i class="icon i-info"></i>
                    <span>我的资料</span>
                </router-link>
            </li>
            <li>
                <router-link to="/myCenter/userApplyFor">
                    <i class="icon i-applyFor"></i>
                    <span>我的申请</span>
                </router-link>
            </li>
            <li>
                <router-link to="/myCenter/selectedRooms">
                    <i class="icon i-house"></i>
                    <span>我的房间</span>
                </router-link>
            </li>
            <li>
                <router-link to="/myCenter/userContract">
                    <i class="icon i-contract"></i>
                    <span>我的合同</span>
                </router-link>
            </li>
        </ul>
        <button class="back_top" @click="backTop(step)" :class="{show:isActive}">
            <i class="icon i-top"></i>
            <span class="c-3">Top</span>
        </button>
    </div>
</template>
<script type="es6">
import { mapGetters } from 'vuex'
export default{
    props:{
        step:{   //此数据是控制动画快慢的
            type:Number,
            default:50
        }
    },
    data(){
        return {
            isActive:false
        }
    },
    computed:{
        ...mapGetters(['head','userInfo']),
        setIsreadOrNot() {
            return this.$store.getters.isReadOrNot
        },
    },
    watch: {
        setIsreadOrNot(val){
            return val
        }
    },
    methods:{
        backTop(i){
            //参数i表示间隔的幅度大小，以此来控制速度
            document.documentElement.scrollTop-=i;
            if (document.documentElement.scrollTop>0) {
                var c=setTimeout(()=>this.backTop(i),16);
            }else {
                clearTimeout(c);
            }
        }
    },
    mounted(){
        var vm=this;
        this.$nextTick(function () {
            window.addEventListener('scroll', function(){
                if(this.scrollY>100){
                    vm.isActive=true;
                }else{
                    vm.isActive=false;
                }
            });//滚动事件监听
        });
        //获取消息
        if(this.$store.getters.userInfo){
            this.$store.dispatch('SET_ISREADORNOT', {
                QueryJson:{
                AccountId:this.$store.getters.userInfo.AccountId,
                IsRead: 1
                }
            })
        }
    }
}
</script>
<style lang="scss">
.tool_bar{
    right:0;
    top:0;
    z-index: 100;
    height:100%;
    width:38px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
    background:#fff;
    ul{
        position: absolute;
        top:50%;
        margin-top:-120px;
        li{
            .baged {
                width: 20px;
                height: 20px;
                line-height: 20px;
                background: #f44336;
                border-radius: 50%;
                top: 0px;
                left: -8px;
                z-index: 999;
            }
            &:nth-of-type(1):after,&:nth-of-type(3):after{
                content:"";
                display: block;
                width:19px;
                height:1px;
                background:#4d4d4d;
                margin:7px auto;
            }
            a{
                width:38px;
                height:38px;
                display: block;
                position: relative;
                /*tool icon*/
                i{
                    width:38px;
                    height:38px;
                    background-size: 200px auto;
                    &.i-msg{
                        background-position: -123px 3px;
                    }
                    &.i-info{
                        background-position: 5px -35px;
                    }
                    &.i-applyFor{
                        background-position: 5px 3px;
                    }
                    &.i-house{
                        background-position: -91px 3px;
                    }
                    &.i-contract{
                        background-position: -57px -35px;
                    }
                }
                span{
                    display: none;
                    width:100px;
                    height:38px;
                    text-align: center;
                    line-height: 38px;
                    position: absolute;
                    background-color: #009688;
                    color:#fff;
                    top:0;
                    left:-110px;
                    animation: mymove 0.5s 1;
                    &:after{
                        content:'';
                        display: block;
                        width: 0;
                        height: 0;
                        margin-left: 2px;
                        vertical-align: middle;
                        border-top: 4px dashed;
                        border-top: 4px solid\9;
                        border-right: 4px solid transparent;
                        border-left: 4px solid transparent;
                        transform: rotate(-90deg);
                        position: absolute;
                        right: -6px;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        color: #009688;
                    }
                }
                &:hover{
                    span{
                        display: block;
                        left:-100px;
                        @keyframes mymove{
                            from{
                                left:-110px;
                                }
                            to{
                                left:-100px;
                            }
                        }
                    }
                    background: rgb(57,64,67);
                    .i-msg{
                        background-position: -156px 3px;
                    }
                    .i-info{
                        background-position: -26px -35px;
                    }
                    .i-applyFor{
                        background-position: -26px 3px;
                    }
                    .i-house{
                        background-position: -58px 3px;
                    }
                    .i-contract{
                        background-position: -90px -35px;
                    }
                }
            }
        }
    }
    .back_top{
        position: absolute;
        cursor:pointer;
        bottom:50px;
        width:100%;
        text-align: center;
        display: none;
        &.show{
            display: block;
        }
        >span{
            font-weight: 0;
        }
        .i-top{
            width:20px;
            height:15px;
            background-position: -27px -66px;
        }
    }
}
@media screen and (max-width: 450px) {
    .tool_bar{
        display: none;
    }
}
</style>
