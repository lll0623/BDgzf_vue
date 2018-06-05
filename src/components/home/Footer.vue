<template>
    <div class="footer marT30" id="footer" ref="footer" v-if="head.toggle===0">
        <div class="container clearfix">
            <div class="footer_item_1 fl">
                <div class="top clearfix">
                    <h4 class="fl white">友情链接：</h4>
                    <a class="fl block" href="http://www.shfg.gov.cn/" target="view_window">上海市住房保障和房屋管理局 </a>
                    <a class="fl block" href="http://www.pudong.gov.cn/shpd/" target="view_window">上海市浦东新区</a>
                    <a class="fl block" href="http://www.shgjj.com/" target="view_window">上海市住房公积金网</a>
                    <a class="fl block" href="http://www.12333sh.gov.cn/201712333/index.shtml" target="view_window">上海市人力资源社会保障网</a>
                </div>
                <ul class="bottom">
                    <li>上海市浦东新区公共租赁住房投资运营有限公司&nbsp;© Copyright 2010-2017</li>
                    <li>地址：浦东新区浦三路930弄1号</li>
                    <li>power by: <a href="http://www.lesoft.cn" target="view_window">lesoft</a></li>
                </ul>
            </div>
            <ul class="footer_item_2 fl">
                <li>
                    <strong>咨询电话:</strong>
                    <p>021-50591069</p>
                </li>
                <li>
                    <strong>报修电话:</strong>
                    <p>021-68389100</p>
                </li>
                <li>
                    <strong>投诉电话:</strong>
                    <p>021-50591229</p>
                </li>
            </ul>
            <div class="footer_item_3 fr">
                <p>关注公租房微信公众号</p>
                <img src="http://tstres.lesoft.cn/web/contents/images/ic_home_white_24dp_2x1.png">
            </div>
        </div>
    </div>
</template>
<script type="es6">
    import { mapGetters } from 'vuex'
    export default {
        computed : {
			...mapGetters(['head']),
        }
    }
</script>
<style lang="scss">
/*footer*/
.footer{
    background: url(../../assets/images/global-footer-bg.jpg) no-repeat center;
    background-size: cover;
    padding:40px 0;
    .footer_item_1{
        padding-right:70px;
        .top{
            height:30px;
            line-height: 30px;
            padding-bottom:20px;
            margin-bottom:30px;
            border-bottom: 1px solid #555;
            width:750px;
            h4{
                font-weight:700;
            }
            a{
                color:#d7d7d7;
                font-size: 14px;
                display: block;
                float: left;
                margin-right:20px;
                &:hover{
                    color:#fff;
                }
            }
        }
        ul.bottom{
            li{
                color:#d7d7d7;
                padding-bottom:10px;
                a{
                    color:#d7d7d7;
                    &:hover{
                        color:#fff;
                    }
                }
            }
        }
    }
    ul.footer_item_2{
        width:165px;
        padding-top:6px;
        li{
            margin-bottom:20px;
            strong{
                display: block;
                margin-bottom:10px;
                color:#fff;
                font-weight:700;
            }
            p{
                color:#d7d7d7;
            }
        }
    }
    .footer_item_3{
        padding-top:6px;
        p{
            color:#fff;
            padding-bottom: 15px;
        }
        img{
            width:140px;
            height:140px;
        }
    }
}
@media screen and (max-width: 450px) {
    #footer{
        display: none;
    }
}
</style>
