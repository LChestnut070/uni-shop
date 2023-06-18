import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store/store.js'
import './uni.promisify.adaptor'
import {
	$http
} from "@escook/request-miniprogram"

Vue.config.productionTip = false

uni.$http = $http;
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 数据请求之前
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中..."
	})
}
// 数据请求之后
$http.afterRequest = function() {
	uni.hideLoading()
}
// 数据请求失败,挂载自定义方法
uni.$showErr = function() {
	uni.showToast({
		title: '数据加载失败',
		duracation: 1500,
		icon: 'none'
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