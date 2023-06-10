<template>
	<!-- 解决未加载完成时价格显示undefined -->
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 商品图片轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price">
				￥{{goods_info.goods_price}}
			</view>
			<!-- 信息主体 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<!-- 收藏 -->
				<view class="goods-fav">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>

		<!-- 商品图片式详情 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<!-- 底部商品导航 -->
		<view class="goods_nav">
			<!-- fill右侧按钮样式，options、buttongroup按钮配置，click、buttonclick按钮事件 -->
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {},
				// 左侧按钮组
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车'
				}],
				// 右侧按钮组
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				}, {
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id);
		},
		methods: {
			// 获取商品详情信息
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				// replace替换结构，去掉图片上下之间的空白
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"').replace(/webp/g, 'jpg')
				// 为 data 中的数据赋值
				this.goods_info = res.message
			},

			// 点击查看大图
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map(pic => pic.pics_big)
				})
			},

			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		padding-bottom: 50px;

		swiper {
			width: 100%;
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.goods-info-box {
			padding: 10px;
			padding-right: 0;

			.goods-price {
				margin: 10px 0;
				color: #c00000;
				font-size: 18px;
			}

			.goods-info-body {
				display: flex;
				justify-content: space-between;

				.goods-name {
					padding-right: 10px;
					font-size: 13px;
					line-height: 20px;
				}

				.goods-fav {
					width: 120px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-bottom: 1px solid #efefef;
					color: gray;
				}
			}

			.yf {
				margin: 10px 0;
				font-size: 12px;
				color: gray;
			}


		}




		.goods_nav {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 999;
		}
	}
</style>