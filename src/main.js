import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 导入MUI的样式
import '../lib/mui/css/mui.min.css'

// 按需导入Mint-ui中的组件
import { Header } from 'mint-ui'

Vue.component(Header.name, Header)
Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
