import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * 每次刚进入网站，肯定会调用main.js，在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
 * @type {any}
 */
var car = JSON.parse(localStorage.getItem('car') || '[]')

export default new Vuex.Store({
  state: {
    /**
     * 相当于组件中的data，专门存储数据
     * this.$store.state.***
     **/
    car: car
    /**
     * 在car数组中存储即将用到的部分商品信息
     * car数组的形式为{ id：商品的id， count：要购买的数量， price：商品的单价， selected：false }
     * 其代码在GoodsInfo.vue组件中
     **/
  },
  mutations: {
    /**
     * 相当于代理商，
     * this.$store.commit('方法名称', '按需传递参数payload')
     * 如果要操作store中的state值，只能通过调用mutation提供的方法，才能操作state中的数据,
     * 不推荐直接操作state中的数据,因为万一出现了数据的紊乱，不能快速定位错误的原因，因为每个组件都有
     * 毁坏数据的可能。
     **/
    addToCar(state, goodsinfo) {
      /**
       * 点击加入购物车，把商品信息保存到store上的car上
       * 分析：
       * 1.如果购物车中已经有该商品了，那么只更新数量
       * 2.如果没有，则直接将商品数据push到car中即可
       * 假设，没有在购物车中找到对应的商品，flag = false
       */
      var flag = false
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      /**
       * 如果循环完毕得到的flag还是false,则把商品数据直接push到购物车中
       */
      if(!flag) {
        state.car.push(goodsinfo)
      }
      /**
       * 当car中的最初的商品数量更新之后，把car数组存储到本地的localStorage
       */
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, newNum) {
      /**
       * 修改购物车中商品的数量值
       * 分析：
       */
      this.state.car.some(item => {
        if(item.id == newNum.id) {
          item.count = parseInt(newNum.count)
          return true
        }
      })
      /**
       * 当购物车页面的数字选择框中的数量被修改导致car的数据被修改时，把最新的car数组存储到本地的localStorage
       */
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      /**
       * 根据id，将购物车中的数字框中的商品数据删除
       */
      this.state.car.some((item, i) => {
        if(item.id == id) {
          this.state.car.splice(i, 1)
          return true
        }
      })
      /**
       * 当car进行最终的更新时，把car数组存储到本地的localStorage
       */
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if(item.id == info.id) {
          item.selected = info.selected
        }
      })
      /**
       * 当car中的selected状态被修改时，把car数组存储到本地的localStorage
       */
      localStorage.setItem('car', JSON.stringify(state.car))
    },
  },
  getters: {
    /**相当于computed和computed中的get()，
     * this.$store.getters.***
     * 只负责对state中的数据进行实时引用、计算并对外提供，而不对数据进行修改，
     * 如果要修改state中的数据，就要去找mutations
     **/
    getAllCount(state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, //勾选的数量
        amount: 0, //勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  },
  actions: {

  },
  modules: {
  }
})
