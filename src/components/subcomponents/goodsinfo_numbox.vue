<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1"
               @change="countChanged" ref="numbox"/>
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
        //每当文本框的数据改变时，立即将最新的数据通过事件的调用，传递给父组件
        // console.log(this.$refs.numbox.value)
        this.$emit('getcount', parseInt(this.$refs.numbox.value))
      }
    },
    props: ['max'],
    watch: {
      //监听max值
      'max': function (newVal, oldVal) {
        mui(".mui-numbox").numbox().setOption('max',newVal)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>