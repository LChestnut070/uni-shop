<template>
	<view>
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 导航栏 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>

		<!-- 楼层 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view class="floor-img-box">
					<!-- 左侧大图片 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4 个小图片 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2"
							v-if="index2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图列表
				swiperList: [],
				// 分类导航栏列表
				navList: [],
				// 楼层列表
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			// 获取轮播图列表数据---
			async getSwiperList() {
				// promise异步请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 请求成功--
				if (res.meta.status === 200) {
					this.swiperList = res.message;
				}
				// 请求失败--
				else {
					return uni.$showErr()
				}
			},

			// 获取分类导航栏列表数据---
			async getNavList() {
				// promise异步请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				// 请求成功--
				if (res.meta.status === 200) {
					this.navList = res.message;
				}
				// 请求失败--
				else {
					return uni.$showErr()
				}
			},

			// 导航栏跳转
			navHandler(item) {
				// 如果点击的第一个则跳转至分类
				if (item.name == '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},

			// 获取楼层数据列表
			async getFloorList() {
				// promise异步请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				// 请求成功--
				if (res.meta.status === 200) {
					this.floorList = res.message;
					console.log(this.floorList);
				}
				// 请求失败--
				else {
					return uni.$showErr()
				}
				// forEach循环处理地址
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})

				})

			},

			// 跳转搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},

	}
</script>

<style lang="scss">
	.search-box {
		// 设置定位效果为“吸顶”
		position: sticky;
		// 吸顶的“位置”
		top: 0;
		// 提高层级，防止被轮播图覆盖
		z-index: 999;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 30rpx 0;

		.nav-item {

			.nav-img {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-img-box {
		display: flex;
		padding: 10rpx;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>