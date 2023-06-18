export default {
	namespaced: true,
	// data数据
	state: () => ({
		// 如果本地有数据则转换为数组输出，如果没有则输出空数组
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	// 模块方法methods
	mutations: {
		// state指已有购物车物品,goods指准备加入购物车的物品
		addToCart(state, goods) {
			// 寻找准备加入购物车的商品与购物车已有的商品是否存在相同，find函数返回布尔值，x指state.cart（已有购物车）
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			// 如果不存在，则加入购物车，如果存在则数量加一
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			// 每当将物品添加到购物车，就将数据转存到本地
			this.commit('m_cart/saveToStorage')
		},

		// 将已有购物车数据转存到本地
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},

		//更新购物车商品的勾选状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},

		// 更新购物车商品的数量
		updateGoodsNum(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		// 购物车滑动商品删除
		removeGoods(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		//更新购物车所有商品勾选状态
		updateAllGoodsState(state, newState) {
			// 对购物车商品进行遍历，将新的状态全部赋给商品
			state.cart.forEach(x => x.goods_state = newState)
		}

	},
	// 计算属性computed
	getters: {
		// 统计已有购物车的商品总数量
		total(state) {
			// c总数量
			let c = 0;
			// goods为已有购物车
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},

		// 计算勾选商品的总数量
		checkedCount(state) {
			// reduce将已勾选的商品进行累加，item指x（state.cart）即当前索引的值，total初始值（每次计算返回的结果），0初始值
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},

		checkedGoodsPrice(state) {
			// reduce将已勾选的商品进行累加，item指x（state.cart）即当前索引的值(当前商品)，total初始值（每次计算返回的结果），0初始值，tofixed保留2位小数
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count *
				item.goods_price, 0).toFixed(2)
		}
	},

}