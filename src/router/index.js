import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import sharelist1 from '@/views/20180420/sharelist1'
import share11 from '@/views/20180420/share11'
import share12 from '@/views/20180420/share12'
import sharelist2 from '@/views/20180510/sharelist2'
import share21 from '@/views/20180510/share21'
import share22 from '@/views/20180510/share22'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/sharelist1',
      name: 'sharelist1',
      component: sharelist1
    },
    {
      path: '/share11',
      name: 'share11',
      component: share11
    },
    {
      path: '/share12',
      name: 'share12',
      component: share12
    },
    {
      path: '/sharelist2',
      name: 'sharelist2',
      component: sharelist2
    },
    {
      path: '/share21',
      name: 'share21',
      component: share21
    },
    {
      path: '/share22',
      name: 'share22',
      component: share22
    },


  ]
})
