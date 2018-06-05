<template>
    <div id="app">
        <ComHeader/>
        <div class="wapper" ref="box">
            <keep-alive>
                <router-view v-if='$route.meta.keepAlive'/>
            </keep-alive>
            <router-view v-if='!$route.meta.keepAlive'/>
        </div>
        <ToolsBar/>
        <Footer/>
    </div>
</template>

<script type="es6">
    import ComHeader from './components/home/ComHeader'
    import Footer from './components/home/Footer'
    import ToolsBar from './components/home/ToolsBar'
    import { getMemberMSGList } from './api/api.js'
    import { mapGetters } from 'vuex'
    import { getCookie } from './util'
    export default {
        data() {
            return{
                messageLists:[]
            }
        },
        name: 'App',
        components : {
            ComHeader,
            ToolsBar,
            Footer
        },
        mounted(){
            this.$nextTick(() =>{
                this.$refs.box.style.minHeight = (document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight -30) +'px'
            });
        }
    }
</script>

<style lang="scss">
.wapper{
    padding-top:60px;
}
@media screen and (max-width: 450px) {
    body{
        /*overflow-x: hidden;*/
        .wapper{
            padding-top:95px;
            width:100%;
        }
        .el-message{
            min-width:200px!important;
        }
    }
}
</style>
