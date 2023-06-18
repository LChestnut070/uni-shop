//此页为设置购物车商品数量徽标
import {
	mapGetters
} from 'vuex'

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	},
	watch: {
		total() {
			// 监听购物车页面商品的数量，与底部总数量同步
			// 如果当前页面非主页面，则不执行
			if (getCurrentPages().length !== 1) return
			this.setBadge()
		}
	}
}