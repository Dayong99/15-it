<template>
    <div class="goods-list">
<!--        <router-link class="goods-item" v-for="item in goodsList" :key="item.id"-->
<!--                     :to="'/home/goodsinfo/' + item.id" tag="div">-->
<!--            <img :src="item.img_url">-->
<!--            <h1 class="title">{{ item.title }}</h1>-->
<!--            <div class="info">-->
<!--                <p class="price">-->
<!--                    <span class="now">￥{{ item.sell_price }}</span>-->
<!--                    <span class="old">￥{{ item.market_price }}</span>-->
<!--                </p>-->
<!--                <p class="sell">-->
<!--                    <span>热卖中</span>-->
<!--                    <span>剩余{{item.stock_quantity}}件</span>-->
<!--                </p>-->
<!--            </div>-->
<!--        </router-link>-->
        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>


        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
  export default {
    name: 'GoodsList',
    data() {
      return {
        pageindex: 1, //分页页数
        goodsList: [],//存放商品列表的数组

      }
    },
    created () {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex=' + this.pageindex).then(result =>{
          if(result.body.status === 0) {
            this.goodsList = this.goodsList.concat(result.body.message)
          }
        })
      },
      getMore() {
        this.pageindex++
        this.getGoodsList()
      },
      goDetail(id) {
        this.$router.push("/home/goodsinfo/" + id)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;

        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }

            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
            }
        }
    }

</style>