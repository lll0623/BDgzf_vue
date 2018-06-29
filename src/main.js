// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
//全局css
import './assets/css/base.css'

import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'font-awesome/css/font-awesome.min.css'

var VueCookie = require('vue-cookie')

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import './element-variables.scss'

import VueLazyload from 'vue-lazyload'
import {isEmptyObject,getCookie} from './util'
// Vue.config.productionTip = false
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'SYNT8pjLkFrGP2CPhboCqK26wjYG3XQc'
})

/* eslint-disable no-new */
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueCookie)
Vue.use(VueLazyload)


import htmlToPdf from '@/util/htmlToPdf'
Vue.use(htmlToPdf)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
router.beforeEach((to,from,next) => {
    if (to.matched.length !==0) {
        if(to.meta.requireAuth){
            if(!isEmptyObject(store.getters.userInfo)){
                next()
            }else{
                store.commit('SET_HEADTOGGLE', 1)
                router.push({path:'/login'});
            }
        }else{
            next();
        }
    }else {
        from.name ? next({ name:from.name }) : next('/');                                                                             //如果匹配到正确跳转
    }
})
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
})
