<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="toDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					// 查询关键词
					query: '',
					// 查询分类id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示的数据
					pagesize: 10
				},
				// 商品列表
				goodsList: [],
				// 商品总数
				total: 0,
				isLoading: false,
				// 默认图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods: {
			// 获取商品列表
			async getGoodsList(callback) {
				// 加载状态
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false;
				// 是否有回调函数，有则执行
				callback && callback()
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total;

			},

			// 跳转详情页
			toDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},

		onLoad(option) {
			this.queryObj.query = option.query || ''
			this.queryObj.cid = option.cateId || ''
			this.getGoodsList()
		},

		onReachBottom() {
			// 判断是否有下一组数据
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return
			// 判断当前是否正在加载
			if (this.isLoading) return
			this.queryObj.pagenum += 1;
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			this.getGoodsList(() => uni.stopPullDownRefresh())

		}
	}
</script>

<style lang="scss">

</style>