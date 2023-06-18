<template>
	<view class="cart-box" v-if="cart.length!==0">
		<my-address></my-address>
		<!-- 购物车标题 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 文本描述 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 购物车商品列表 -->
		<uni-swipe-action>
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swiperActionClickHandler(item)">
					<my-goods :goods="item" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true"
						@num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>

			</block>
		</uni-swipe-action>

		<!-- 购物车底部结算 -->
		<my-settle></my-settle>
	</view>
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tips-text">空空如也~</text>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		computed: {
			...mapState('m_cart', ['cart'])
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsNum', 'removeGoods']),
			// 通过my-goods组件内部的this.$emit才能触发此函数，同时接收到内部传递的数据
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			// 改变商品数量及同步商品总数量
			numberChangeHandler(e) {
				this.updateGoodsNum(e)
			},
			// 左滑删除商品
			swiperActionClickHandler(goods) {
				this.removeGoods(goods.goods_id)
			}
		},
		mixins: [badgeMix]
	}
</script>

<style lang="scss">
	.cart-box {
		padding-bottom: 50px;

		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 5px;
			border-bottom: 1px solid #efefef;

			.cart-title-text {
				// margin-left: 10px;

			}
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 250px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
			margin-top: 15pxs;
		}
	}
</style>