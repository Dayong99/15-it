<template>
    <div class="newsinfo-container">
<!--        大标题-->
        <h3 class="title">{{getNewsInfo.title}}</h3>
<!--        子标题-->
        <p class="subtitle">
            <span>发表时间:{{getNewsInfo.add_time | dataFormate }}</span>
            <span>点击:{{getNewsInfo.click}}次</span>
        </p>

        <hr>
<!--        内容区域-->
        <div class="content" v-html="getNewsInfo.content"></div>

<!--        评论子组件区域-->
        <comment-box :id="this.id">

        </comment-box>
    </div>
</template>

<script>
  import axios from 'axios'
  import comment from '../subcomponents/comment'
  export default {
    name: 'NewsInfo',
    components: {
      "comment-box" :comment
    },
    data() {
      return {
        id: this.$route.params.id,
        getNewsInfo: []
      }
    },
    created() {
      axios.get('http://www.liulongbin.top:3005/api/getnew/' + this.id).then(res => {
          console.log(res)
          this.getNewsInfo = res.data.message[0]
        }
      )
    },
  }
</script>

<style lang="scss" scoped>
    .newsinfo-container {
        padding: 0 4px;
        .title {
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #007aff;
            display: flex;
            justify-content: space-between;
        }
        .content{
            width: 100%;
        }
    }
</style>