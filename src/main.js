import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'
//安装图片预览插件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)


// 导入MUI的样式
import './components/lib/mui/css/mui.min.css'
import './components/lib/mui/css/icons-extra.css'

// 按需导入Mint-ui中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

Vue.use(MintUI)

Vue.use(VueResource);
Vue.http.options.root = 'http://www.liulongbin.top:3005/api',
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false

// 导入格式化时间插件
import moment from 'moment'

// 定义全局的过滤器
Vue.filter('dataFormate',function (dataStr,pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
