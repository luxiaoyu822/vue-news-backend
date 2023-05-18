import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login'
import Main from '@/views/Main'
import NotFound from '@/components/NotFound'
import RoutesConfig from './config'
import store from '@/store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    //根据权限动态添加嵌套路由
    children: [],
  },
  {
    path: '/404',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
      })
    } else {
      if (!store.state.isGetterRouter) {
        RouteConfig()
        next({
          path: to.fullPath,
        })
      } else {
        next()
      }
    }
  }
})

const RouteConfig = () => {
  RoutesConfig.forEach(item => {
    router.addRoute('main', item)
  })
  store.commit('changeGetterRouter', true)
}
export default router
