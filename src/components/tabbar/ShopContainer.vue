<template>
    <div class="shopcar-container">

        <div class="goods-list">

<!--        商品列表区域-->
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch
                                v-model="$store.getters.getGoodsSelected[item.id]"
                                @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])">
                        </mt-switch>
                        <img :src="item.thumb_path"/>
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <shopcar_numbox
                                        :initcount="$store.getters.getGoodsCount[item.id]"
                                        :goodsid="item.id">
                                </shopcar_numbox>
<!--                                问题：如何从购物车中获取商品的数量-->
<!--                                1.可以先创建一个空对象，然后循环购物车中的所有商品的数据，-->
<!--                                把循环得到的id作为对象的属性名key， 把count作为对象的属性值value，-->
<!--                                这样把所有的商品循环一遍，就会得到一个对象： { 88：2， 89：1， 90：4}-->
                                <a href="#" class="del" @click.prevent="remove(item.id, i)">删除</a>
<!--                                由于其为a链接，所以要阻止默认行为-->
<!--                                item.id用来删除Vuex中的state中的数据，i用来删除goodslist中的数据-->
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

<!--    结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费):</p>
                        <p>已勾选商品
                            <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>
                            件，总价
                            <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import shopcar_numbox from '../subcomponents/shopcar_numbox'
  export default {
    name: 'ShopContainer',
    data () {
      return {
        goodslist: []
        /**
         * 购物车中所有商品的数据
         **/
      }
    },
    created () {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        /**
         * 获取Vuex中的state中的car数组中的所有商品的Id，并拼接出一个用逗号分隔的字符串
         */
        var idArr = []
        this.$store.state.car.forEach( item => idArr.push(item.id))
        /**
         * 如果购物车中没有商品，则直接反弹回去，不需要请求数据接口，否则会报错
         */
        if(idArr.length <= 0) {
          return
        }
        /**
         * 获取购物车商品列表
         */
        this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/' + idArr.join(",")).then(
          result => {
            if(result.body.status === 0) {
              this.goodslist = result.body.message
            }
          }
        )
      },
      remove(id, i) {
        /**
         * 点击删除，既要删除购物车里的数据，又要删除购物车页面数字框中的数据
         */
        this.goodslist.splice(i, 1)
        this.$store.commit('removeFormCar', id)
    },
      selectedChanged(id, val) {
        /**
         * 每当点击开关，将最新的开关状态同步到Vuex中
         */
        this.$store.commit('updateGoodsSelected', {id, selected: val})
      }
    },
    components: {
      shopcar_numbox
    }
  }
</script>

<style lang="scss" scoped>
    .shopcar-container {
        background-color: #eee;
        overflow: hidden;
        .goods-list {
            .mui-card-content-inner {
                /*display: flex;*/
                /*flex-direction: column;*/
                /*justify-content: space-around;*/
                display: flex;
                align-items: center;
                padding: 15px 1px;
            }
            img {
                width: 50px;
                height: 50px;
            }
            .info {
                h1 {
                    font-size: 12px;
                }
                p {

                    font-size: 12px;
                    display: flex;
                    justify-content: space-around;
                    .price {
                        color: red;
                        font-weight: bold;

                    }
                    .del {

                    }
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 6px;
            .red {
                color: red;
                font-weight: bold;
                font-size: 14px;
            }
        }
    }


</style>