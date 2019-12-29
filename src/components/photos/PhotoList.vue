<template>
    <div>
<!--        顶部滑动条区域-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control
            mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
                       v-for="item in catas"
                       :key="item.id" @tap="getPhotoListByCataId(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

<!--        图片列表区域-->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //1.导入mui的js文件
    import mui from '../lib/mui/js/mui'

  export default {
    name: 'PhotoList',
    data() {
      return {
        catas: [], //所有分类的列表数组
        list: [] //图片列表的数组
      }
    },
    created () { /**组件中的data和methods被创建好时，用created钩子函数**/
      this.getAllCategory ()
      this.getPhotoListByCataId(0)  //默认进入页面就主动请求‘所有’图片列表数据
    },
    mounted () {
      /**当组件中的所有DOM结构都已经被渲染并放到页面中后，会执行这mounted钩子函数。如果要操作元素，
       * 最好在mounted里面，因为这里的DOM元素是最新的
       **/
      //2.初始化滑动控件
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    methods: {
      getAllCategory () {
        this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory').then(result => {
          if (result.body.status === 0) {
            result.body.message.unshift({ title: '全部', id: 0 });
            this.catas = result.body.message;
          }
          })
      },
      getPhotoListByCataId(cataId) {//根据分类Id获取图片列表
        this.$http.get('http://www.liulongbin.top:3005/api/getimages/' + cataId).then(result =>{
          if(result.body.status === 0) {
            this.list = result.body.message
          }
        })
    }
    }
  }
</script>

<style lang="scss" scoped>
    * {
        /*touch-action: none;*/
        touch-action: pan-y;
    }
    .photo-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li{
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img{
                width: 100%;
                vertical-align: middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info{
                background-color: rgba(0, 0, 0, 0.4);
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                }
            }
        }
    }
</style>