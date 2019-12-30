<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test"
               class="mui-input-numbox"
               type="number"
               :value="initcount"
               @change="countChanged"
               ref="numbox"
               readonly />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>

        <!--        子组件什么时候把数据传递给父组件？-->
    </div>
</template>

<script>
  import mui from '../lib/mui/js/mui.min.js'
  export default {
    name: 'goodsinfo_numbox',
    mounted () {
      //初始化数字选择框
      mui('.mui-numbox').numbox()
    },
    methods: {
      countChanged() {
        /**
         * 每当商品数量改变，立即将最新数据同步到Vuex中的car中，覆盖之前的数量值
         */
        // console.log(this.$refs.numbox.value)
        this.$store.commit('updateGoodsInfo', {
          id: this.goodsid,
          count: this.$refs.numbox.value
        })
      }
    },
    props: ['initcount', 'goodsid']
    // props: ['max'],
    // watch: {
    //   //监听max值
    //   'max': function (newVal, oldVal) {
    //     mui(".mui-numbox").numbox().setOption('max',newVal)
    //   }
    // }
  }
</script>

<style lang="scss" scoped>

</style>