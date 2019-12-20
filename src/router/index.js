import Vue from 'vue'
import VueRouter from 'vue-router'

const HomeContainer = () => import('../components/tabbar/HomeContainer')
const MemberContainer = () => import('../components/tabbar/MemberContainer')
const ShopContainer = () => import('../components/tabbar/ShopContainer')
const SearchContainer = () => import('../components/tabbar/SearchContainer')

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
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // 覆盖默认高亮属性router-link-active为mui中的mui-active属性
  linkActiveClass: 'mui-active'
})


export default router