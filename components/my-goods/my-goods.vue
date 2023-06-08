<template>

	<view class="goods-item">
		<view class="goods-item-left">
			<!-- 商品图片 -->
			<image :src="goods.goods_small_logo||defaultPic" class="goods-pic"></image>
		</view>
		<view class="goods-item-right">
			<!-- 商品名称 -->
			<view class="goods-name">
				{{goods.goods_name}}
			</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">
					￥{{goods.goods_price | tofixed}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		props: {
			goods: {
				type: Object,
				defaul: {}
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2);
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		.goods-item {
			display: flex;
			border-bottom: 1px solid #f0f0f0;

			.goods-item-left {
				padding: 10px;
				box-sizing: border-box;

				.goods-pic {
					width: 100px;
					height: 100px;
					display: block;
				}
			}

			.goods-item-right {
				padding: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.goods-name {
					font-size: 14px;
				}

				.goods-info-box {
					.goods-price {
						font-size: 16px;
						color: #c00000;
					}
				}
			}
		}
	}
</style>