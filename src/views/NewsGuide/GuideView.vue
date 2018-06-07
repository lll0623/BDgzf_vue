<template>
    <section class="container" ref="box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb_nav">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/guide' }">申请指南</el-breadcrumb-item>
        <el-breadcrumb-item>{{ item.FullHead }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content" v-loading="loading">
        <h2 class="title is-2" :style="{color:'#'+item.FullheadColor,cursor:'inherit'}">{{ item.FullHead }}</h2>
        <!-- <div class="viewImg" v-show="item.MainPic">
          <img :src="item.MainPic" :alt="item.FullHead" width="300" height="300">
        </div> -->
        <div style="margin-top: 15px;" class="guideContent" v-html="item.NewsContent"></div>
    </div>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'
import { getNewsInfo } from '../../api/api.js'
var ids,thisId;
export default {
    data() {
        return{
			loading:true,
			item:'',
			id: this.$route.params.id,
        }
    },
    computed:{
        ...mapGetters(['newsGuideType'])
    },
    mounted(){
        this.$nextTick(() =>{
            this.$refs.box.style.minHeight = (document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight -30) +'px'
        });
    },
    created() {
		var params = {
			QueryJson:{
				"Type":3,
				"Id": this.id
			}
		}
		  getNewsInfo(params).then((response) =>{
              switch(response.StatusCode){
                  case 500 :
                      this.$message.error('申请指南列表请求失败'+response.Info)
                      break;
                  case 200:
                      this.item = response.Data;

              }
              this.loading = false
		  }).catch(error => {
              this.$message.error(error)
          })
    },
    // asyncData (context) {
    //     return api.getNewsInfo({"QueryJson":{"Type":ids,"Id":context.route.params.id}})
    //       .then((res) => {
    //           return { item: res.Data }
    //       })
    // },
    beforeRouteEnter (to,from,next) {
        next(vm =>{
            document.body.style.backgroundColor = '#eee'
        })
    },
    beforeRouteLeave(to,from,next){
        document.body.style.backgroundColor = '#fff'
        next()
    },
  head() {
    return {
      meta: [{
        hid: 'description',
        name: 'description'
      }]
    }
  }
}
</script>
<style media="screen">
.viewImg{
  margin: 30px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  line-height: 1.2;
  color: #333;
}

.title:hover {
  color: #333 !important;
}
.guideContent p{
    padding: 15px 0;
}
</style>
