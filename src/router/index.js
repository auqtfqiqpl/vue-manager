import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import Login from '@/components/auth/login'
import Home from '@/components/home/home'
import Index from '@/components/home/Index'
//basic
import Staff from '@/components/basic/staff'

//sys
// import Menu from '@/components/sys/menu'

import AutoCode from '@/components/common/core/vue/AutoCode'

import ConfigView from '@/components/common/core/vue/ConfigView'

import FormView from '@/components/common/table/FormView'



import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
        path: 'staff',
        component: Staff
      },
      {
        path: 'index',
        component: Index
      },
      {
        path: 'autoCode',
        component: AutoCode
      },{
        path: 'formView',
        component:FormView
      }
      ,{
        path: 'configView',
        component:ConfigView
      }
    ]
    }
  ]
})
