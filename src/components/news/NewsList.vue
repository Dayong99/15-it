<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | dataFormate}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { getNews } from '../../network/home'
  export default {
    name: 'NewsList',
    data() {
      return {
        newslist: []
      }
    },
    created () {
      this.getNews()
    },
    methods: {
      getNews() {
        getNews().then(res => {
          this.newslist = res.data.message
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{font-size: 14px}
            .mui-ellipsis{
                font-size: 10px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }

</style>