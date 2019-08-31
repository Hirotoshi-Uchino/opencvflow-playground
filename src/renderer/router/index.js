import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/MainPage').default
    },
    {
      path: '/flask',
      name: 'flask-page',
      component: require('@/components/FlaskPage').default
    },
    {
      path: '/drug_drop',
      name: 'drug_drop-page',
      component: require('@/components/DrugDropPage').default
    },
    {
      path: '/line_connect',
      name: 'line_connect-page',
      component: require('@/components/LineConnectPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
