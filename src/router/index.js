import Vue from 'vue'
import VueRouter from 'vue-router'

const HomeContainer = () => import('../components/tabbar/HomeContainer')
const MemberContainer = () => import('../components/tabbar/MemberContainer')
const ShopContainer = () => import('../components/tabbar/ShopContainer')
const SearchContainer = () => import('../components/tabbar/SearchContainer')
const NewsList = () => import('../components/news/NewsList')
const NewsInfo = () => import( '../components/news/NewsInfo')
const PhotoList = () => import( '../components/photos/PhotoList')
const PhotoInfo = () => import('../components/photos/PhotoInfo')
const GoodsList = () => import('../components/goods/GoodsList')
const GoodsInfo = () => import('../components/goods/GoodsInfo')
const GoodsDesc = () => import('../components/goods/GoodsDesc')
const GoodsComment = () => import('../components/goods/GoodsComment')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component: HomeContainer
  },
  {
    path: '/member',
    component: MemberContainer
  },
  {
    path: '/shopcar',
    component: ShopContainer
  },
  {
    path: '/search',
    component: SearchContainer
  },
  {
    path: '/home/newslist',
    component: NewsList
  },
  {
    path: '/home/newsinfo/:id',
    component: NewsInfo
  },
  {
    path: '/home/photolist',
    component: PhotoList
  },
  {
    path: '/home/photoinfo/:id',
    component: PhotoInfo
  },
  {
    path: '/home/goodslist',
    component: GoodsList
  },
  {
    path: '/home/goodsinfo/:id',
    component: GoodsInfo
  },
  {
    path: '/home/goodsdesc/:id',
    component: GoodsDesc,
    name: 'goodsdesc'
  },
  {
    path: '/home/goodscomment/:id',
    component: GoodsComment,
    name: 'goodscomment'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // 覆盖默认高亮属性router-link-active为mui中的mui-active属性
  linkActiveClass: 'mui-active'
})


export default router