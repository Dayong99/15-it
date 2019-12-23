<template>
    <div>
<!--        轮播图区域-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe>

<!--        九宫格 到 六宫格的改造-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu1.png"/>
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu2.png"/>
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu3.png"/>
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu4.png"/>
                <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu5.png"/>
                <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu6.png"/>
                <div class="mui-media-body">联系我们</div></router-link></li>
        </ul>
    </div>
</template>

<script>
  import { getLunbo } from "../../network/home"

  export default {
    name: 'HomeContainer',
    data () {
      return {
        lunbotuList: [],
      }
    },
    created () {
      this.getLunbo()
    },
    methods: {
      getLunbo() {
        getLunbo().then(res => {
          this.lunbotuList = res.data.message
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;

        .mint-swipe-item {
            &:nth-child(1) {
                background-color: red;
            }
            &:nth-child(2) {
                background-color: #7f57ff;
            }
            &:nth-child(3) {
                background-color: #35ff27;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .mui-grid-view.mui-grid-9{
        background-color: white;
        border: 0;
        img{
            width: 60px;
            height: 60px;
            margin-top: 9px;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }
</style>