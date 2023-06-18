<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<!-- 商品勾选状态 -->
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
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
				<!-- 商品数量 -->
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum"
					@change="numChangeHandler"></uni-number-box>
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
			// 商品信息对象
			goods: {
				type: Object,
				default: {}
			},
			// 是否显示左侧radio
			showRadio: {
				type: Boolean,
				default: false
			},
			// 是否显示数量组件
			showNum: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2);
			}
		},
		methods: {
			// 状态按钮事件
			radioClickHandler() {
				// 通过this.$emit()触发外界用@绑定的radio-change事件，同时把商品id和商品状态作为参数传给radio-change事件函数
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			// 商品数量事件
			// value为点击后的商品数量
			numChangeHandler(value) {
				this.$emit('num-change', {
					// 商品的 Id
					goods_id: this.goods.goods_id,
					// 商品的最新数量
					goods_count: +value
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		border-bottom: 1px solid #f0f0f0;
		width: 750rpx;
		box-sizing: border-box;

		.goods-item-left {
			padding: 10px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			padding: 10px;
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 14px;
			}

			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.goods-price {
					font-size: 16px;
					color: #c00000;
				}
			}
		}

	}
</style>