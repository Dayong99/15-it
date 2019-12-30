<template>
    <div class="goodsinfo-container">
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

<!--        商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="Lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

<!--        商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;
                        销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<goodsinfo_numbox
                            @getcount="getselectedCount"
                            :max="goodsinfo.stock_quantity"></goodsinfo_numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>&nbsp;&nbsp;
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

<!--        商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dataFormate }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import goodsinfo_numbox from '../subcomponents/goodsinfo_numbox'
    import swiper from '../subcomponents/swiper'
  export default {
    name: 'GoodsInfo',
    components: {
      swiper,
      goodsinfo_numbox
    },
    data() {
      return {
        id: this.$route.params.id, //将路由参数对象的id挂载到data上，方便后期调用
        Lunbotu: [], //轮播图的数据
        goodsinfo: {}, //获取到的商品的信息
        ballFlag: false, //控制小球隐藏和显示的标识
        selectedCount: 1, //保存用户选中的商品数量，默认数量为1
      }
    },
    created () {
      this.getLunbotu()
      this.getGoodsInfo()
    },
    methods: {
      getLunbotu() {
        // 获取图片的详情
        this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result => {
          if(result.body.status === 0) {
            //先循环轮播数组中的每一项，为item添加img属性，因为轮播图组件中，只认识item.img，不认识item.src
            result.body.message.forEach(item => {
              item.img = item.src
            })
            this.Lunbotu = result.body.message
          }
            })
      },
      getGoodsInfo() {
        //获取商品的信息
        this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/' + this.id).then(result => {
          this.goodsinfo = result.body.message[0]
        })
      },
      goDesc(id) {
        //使用编程式导航 跳转到图文介绍页面
        this.$router.push({ name: "goodsdesc", params: { id }})
      },
      goComment(id) {
        //点击跳转到评论页面
        this.$router.push({ name: "goodscomment", params: { id }})
      },
      addToShopCar() {
        this.ballFlag = !this.ballFlag
        /**
         * 点击加入购物车时，拼接出一个要保存到store中car数组里的商品信息对象
         * @type {{price: *, count: number, id: (default.$route.params.id|string), selected: boolean}}
         */
        var goodsinfo = {
          id: this.id,
          count: this.selectedCount,
          price: this.goodsinfo.sell_price,
          selected: true
        }
        /**
         * 将goodsinfo提交到Vuex中的mutations中的addToCar方法中去
         */
        this.$store.commit('addToCar', goodsinfo)
      },
      beforeEnter(el) {
        el.style.transform = "translate(0, 0)"
      },
      enter(el, done) {
        el.offsetWidth;
        //利用ref获取DOM中的元素和组件，在这里是ball
        //利用domObject.getBoundingClientRect()来获取小球在页面中的位置ballPosition
        const ballPosition = this.$refs.ball.getBoundingClientRect()
        //获取购物车上的小徽标在页面上的位置
        const badgePosition = document.getElementById("badge").getBoundingClientRect()
        const xDist = badgePosition.left - ballPosition.left
        const yDist = badgePosition.top - ballPosition.top
        el.style.transform = `translate(${xDist}px, ${yDist}px)`
        el.style.transition = 'all 0.5s cubic-bezier(.35,-0.16,1,.54)'
        done()
      },
      afterEnter(el){
        this.ballFlag = !this.ballFlag
      },
      getselectedCount(count) {
        //当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
        this.selectedCount = count
        // console.log(this.selectedCount)

      }
    }
  }
</script>

<style lang="scss" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
    }
    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }

    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 19;
        top:390px;
        left: 146px;
        /*transform: translate();*/
    }

</style>