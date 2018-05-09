import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import share1 from '@/views/share1'
import share2 from '@/views/share2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/share1',
      name: 'share1',
      component: share1
    }, {
      path: '/share2',
      name: 'share2',
      component: share2
    },

  ]
})
