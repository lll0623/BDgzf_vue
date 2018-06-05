<template>
    <section class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb_nav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>网站帮助</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-content">
            <h2 class="title is-2">办理指南</h2>

            <div class="">
                <img src="http://webres.pdgzf.com/20171127/c7f731a53df34cdd8f017231414a67d3.png" width="100%" alt="">
            </div>
        </div>
    </section>
</template>
<script>


export default {
  data() {
      return{}
  },
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
</style>
