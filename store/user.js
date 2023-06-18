export default {
	namespaced: true,
	state: () => ({
		// 收货地址，将本地的数据转换为对象输出
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address;
			this.commit('m_user/saveAddressToStorage')
		},
		// 将地址转换为字符串存储到本地
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
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