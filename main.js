import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store/store.js'
import './uni.promisify.adaptor'
import {
	$http
} from "@escook/request-miniprogram"

Vue.config.productionTip = false
wx.$http = $http;
uni.$http = $http;
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 数据请求之前
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中..."
	})
	// 如果请求接口中有my字段，则添加请求头身份认证
	if (options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
	// console.log(options);
}
// 数据请求之后
$http.afterRequest = function() {
	uni.hideLoading()
}
// 数据请求失败,挂载自定义方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif