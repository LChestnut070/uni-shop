export default {
	namespaced: true,
	state: () => ({
		// 收货地址，将本地的数据转换为对象输出
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirectInfo: null
	}),
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		// 更新用户信息
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			this.commit('m_user/saveUserInfoToStorage')
		},
		// 将地址转换为字符串存储到本地
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 将用户信息转换为字符串存储到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		// 更新token
		updateToken(state, token) {
			state.token = token
		},
		// 将token存储到本地
		saveTokenToStorsge(state) {
			uni.setStorageSync('token', state.token)

		},
		// 更新重定向
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
		}
	},

	getters: {
		// 拼接地址
		addressStr(state) {
			if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}