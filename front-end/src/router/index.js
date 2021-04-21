import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserPoetry from '../views/UserPoetry.vue'
import MyPoetry from '../views/MyPoetry.vue'
import DailyPoem from '../views/DailyPoem.vue'
import PoetryHouse from '../views/PoetryHouse.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/userpoetry',
    name: 'UserPoetry',
    component: UserPoetry
  },
  {
    path: '/mypoetry',
    name: 'MyPoetry',
    component: MyPoetry
  },
  {
    path: '/dailypoem',
    name: 'DailyPoem',
    component: DailyPoem
  },
  {
    path: '/poetryhouse',
    name: 'PoetryHouse',
    component: PoetryHouse
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
