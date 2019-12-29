<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time | dataFormate}}</span>
            <span>点击次数:{{photoinfo.click}}次</span>
        </p>

        <hr>

<!--        缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>

<!--        图片内容区域-->
        <div class="content" v-html="photoinfo.content">

        </div>

<!--        放置现成的评论子组件-->
        <cmt-box :id="id"></cmt-box>

    </div>
</template>

<script>
    import comment from '../subcomponents/comment'
  export default {
    name: 'PhotoInfo',
    components: { //注册评论子组件
      'cmt-box': comment
    },
    data() {
      return {
        id: this.$route.params.id, //获取路由中的Id
        photoinfo: { //图片详情

        },
        list:[]
      }
    },
    created () {
      this.getPhotoInfo()
      this.getThumbs()
    },
    methods: {
      getPhotoInfo() {
        // 获取图片的详情
        this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/' + this.id).then(result => {
            if(result.body.status === 0) {
              this.photoinfo = result.body.message[0]
            }
          }
        )
      },
      getThumbs() {
        // 获取图片的详情
        this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result => {
            if(result.body.status === 0) {
              //循环每个图片数据,补全图片的宽和高
              result.body.message.forEach(item => {
                item.msrc = item.src
                item.w = 600
                item.h = 400
                })
              //把完整的数据保存到list中
              this.list = result.body.message
            }
          })
      },
      handleClose() {
        console.log('close event')
      }
    }
  }
</script>

<style lang="scss" scoped>
    .photoinfo-container{
        padding: 3px;
        h3 {
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
        .thumbs{
            /deep/ .my-gallery{ //deep深层选择器
                display: flex;
                flex-wrap: wrap; //默认换行
                figure{
                    width: 29%;
                    margin: 2px 5px;
                    img{
                        width: 100%;
                        box-shadow: 0 0 8px #999;
                        border-radius: 5px;
                        margin: 2px 6px;
                    }
                }
            }
        }
    }
</style>