// import 'babel-polyfill'
// import 'common/js/hack'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import { loadPlay } from 'common/js/cache'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { isNULL, dateFormat, commonUtils } from 'common/js/util'

import { post, get, upload, postJson, postForm, download, apiPath, lookImg } from 'common/js/http'

/* eslint-disable */
Vue.prototype.$_POST = post
Vue.prototype.$_POST_FORM = postForm
Vue.prototype.$_POST_JSON = postJson
Vue.prototype.$_GET = get
Vue.prototype.$_UPLOAD = upload
Vue.prototype.$_DOWNLOAD = download
Vue.prototype.$_LOOK = lookImg
// 路径静态库
Vue.prototype.$_APIPATH = apiPath
Vue.prototype.$_ISNULL = isNULL
Vue.prototype.$_DATE_FORMAT = dateFormat;
Vue.prototype.$_COMMONUTILS = commonUtils


fastclick.attach(document.body)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
