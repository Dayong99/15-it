<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120"></textarea>

        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cme-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dataFormate}}
                </div>
                <div class="cmt-body">
                    {{item.content === 'undefined' ? '此用户很懒，没有评论' : item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'comment',
    data() {
      return {
        pageIndex: 1, //默认展示第一页数据
        comments: [] //所有的评论数据
      }
    },
    props: ["id"],
    created () {
      this.getComments()
    },
    methods: {
      getComments () {
        return axios.get("http://www.liulongbin.top:3005/api/getcomments/" + this.id + "?pageindex=1" +
          this.pageIndex).then(res => {
            console.log(res)
            this.comments = this.comments.concat(res.data.message)
          }
        )
      },
      getMore() { //加载更多
        this.pageIndex++;
        this.getComments()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
    }

    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
        }
        .cmt-title{
            line-height: 30px;
            background-color: #ccc;
        }
        .cmt-body{
            line-height: 35px;
            text-indent: 2em;
        }
    }
</style>