<template>
	<view class="my-settle-box">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllGoodsState">
			<radio color="#c00000" :checked="isFullChecked" /><text>全选</text>
		</label>
		<!-- 合计区域 -->
		<view class="amount-box">
			合计： <text class="amount">￥{{checkedGoodsPrice}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsPrice']),
			// 是否全选
			isFullChecked() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllGoodsState() {
				// 如果非全选状态，那么传递true并赋给全部商品使之全选
				this.updateAllGoodsState(!this.isFullChecked)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;
		z-index: 999;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			padding: 0 10px;
			text-align: center;
		}
	}
</style>