// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuebar from 'vuebar';

import draggable from 'vuedraggable';


import less from 'less'
import "./assets/icon/iconfont.css" //全局引入阿里icon

import Api from './components/common/core/js/axiso/api';
import Status from './components/common/core/js/status';
import CommonUtils from './components/common/core/js/commonUtils';

//import Json2 from './components/common/core/js/json2';

Vue.prototype.$api = Api;

Vue.prototype.$status = Status;

Vue.prototype.$commonUtils = CommonUtils;


//Vue.prototype.$Json = Json2;

Vue.use(draggable);

Vue.use(Vuebar);

Vue.use(less);

Vue.use(VueAxios,axios);   

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
