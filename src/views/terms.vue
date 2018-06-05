<template>
<div class="main-content" id="terms">
    <h3 class="site-title text-center">服务条款</h3>
    <p><strong>根据《浦东新区公共租赁住房供应管理实施细则》浦府【2014】9号文件：</strong></p>
    <div class="mb30">
        <p><strong>公租房申请条件：</strong></p>

        <p>1. 具有本市常住户口，且与在浦东新区注册的单位签订一年以上（含一年）劳动合同；</p>

        <p>2. 持有《上海市居住证》达到二年以上，在沪连续缴纳社会保险金达到一年以上，且与在浦东新区注册的单位签订一年以上（含一年）劳动合同；</p>

        <p>3. 申请浦东新区公共租赁住房的单身申请人或申请家庭全体成员应当同时符合以下条件：</p>

        <p>1） 在本市人均住房建筑面积低于15平方米</p>

        <p>2） 未享受本市廉租房、共有产权保障住房政策</p>

        <p>4. 陆家嘴金融贸易区（筹）、金桥经济技术开发区、张江高科技园区、中国（上海）自由贸易试验区、临港地区、国际旅游度假区等开发园区或区域内的青年职工、引进人才和来沪务工人员应当向所在园区内的公共租赁住房运营机构申请公共租赁住房（含单位租赁房）。</p>
    </div>
    <div class="mb30">
        <p><strong>公租房申请所需材料：</strong></p>

        <p>1. 公租房准入资格申请表；（含单位初审意见，并盖公章）</p>

        <p>2. 单身申请人（申请家庭成员）的身份证复印件及原件；（身份证正反面复印在一页纸，一人一页）</p>

        <p>3. 单身申请人（申请家庭成员）的本市户籍证明复印件和原件；（本市户籍证明复印件复印至原件空白页）</p>

        <p>4. 《上海市居住证》复印件和所属派出所办理的收件收据；（仅限非本市户籍人员）</p>

        <p>5. 申请家庭成员的婚姻状态证明复印件及原件；（包括结婚证、离婚证、离婚判决书、离婚协议书、单身证明；其中单身证明须有申请人所在户籍地民政部门出具）</p>

        <p>6. 单身申请人（申请家庭成员）拥有本市产权住房的《房地产权证》复印件，承租本市共有住房的《租用居住公房凭证》。其中本市户籍人员，还需提供户籍地住房的相关证明材料；（出示原件）</p>

        <p>7. 持有《上海市居住证》的单身申请人（申请家庭主申请人）的社会保险缴纳证明；</p>

        <p>8. 单身申请人（申请家庭主申请人）的劳动合同（出示原件）</p>

        <p>9. 本单位营业执照复印件（加盖公司公章）；若由于公司经营性质无营业执照，用组织机构代码证代替（加盖公司公章），所盖公章须与劳动合同上的公章一致。</p>
    </div>
    <div class="mb30">
        <p class="text-danger">1. 以上所需申请材料皆可原件扫描后，作为附件上传，进行网上申请。</p>
        <p class="text-danger">2. 请您详细阅读本申请说明书，本说明书最终解释权归上海市浦东新区公共租赁住房投资运营有限公司所有。</p>
        <p class="text-danger">3. 如有疑问可前往上海市浦东新区公共租赁住房受理中心进行现场咨询和受理，（地址：浦东新区浦三路930弄1号，日常接待时间周一、周三至周六，上午9：00至16:00）或拨打电话021-68389100进行咨询。</p>
    </div>
</div>
</template>
<script>


export default {
  data: {

  },
  beforeRouteEnter (to,from,next) {
      next(vm =>{
          vm.$store.commit('SET_HEADTOGGLE',1)
          document.body.style.backgroundColor = '#eee'
      })
  },
  beforeRouteLeave(to,from,next){
      this.$store.commit('SET_HEADTOGGLE',0)
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
.main-content {
  margin: 30px auto;
  max-width: 1170px;
  padding: 30px;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
}
.site-title {
    width: 100%;
    margin-bottom: 20px;
    font-size: 24px;
}
.text-center {
    text-align: center;
}
.mb30 {
    margin-bottom: 30px;
}
.text-danger {
    color: #f44336;
}
#terms p{
    margin-bottom: 10px;
}
</style>
