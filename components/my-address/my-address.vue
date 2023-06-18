<template>
	<view>
		<!-- 未选择地址时的地址栏 -->
		<!-- 判断address是否为空对象 -->
		<view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址</button>
		</view>

		<!-- 已选择地址时的地址栏 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<text class="username">收货人：{{address.userName}}</text>
				</view>
				<view class="row1-right">
					<view class="phone">电话：{{address.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<text>收货地址：{{addressStr}}</text>
			</view>
		</view>

		<!-- 地址栏底部边框 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				// address: {}
			};
		},
		computed: {
			// 替换了data中的address数据
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addressStr'])
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),

			// 点击选择地址
			async chooseAddress() {
				// const res = await uni.chooseAddress().catch(err => err)
				const that = this
				const res = await uni.chooseAddress({
					success(succRes) {
						console.log('success', succRes);
						if (succRes && succRes.errMsg === 'chooseAddress:ok') {
							that.updateAddress(succRes)
						}
					}

					// fail(failRes) {
					// 	console.log('fail', failRes);
					// 	if (failRes && failRes.errMsg === 'chooseAddress:fail auth deny') {
					// 		that.resAuth()
					// 	}
					// }

				})
			},

			// 新版本已自动授权，无需手动授权确认
			//重新发起收货地址的授权
			// async resAuth() {
			// 	const res = await uni.showModal({
			// 		content: '检测到您没打开地址权限，是否去设置打开？',
			// 		confirmText: "确认",
			// 		cancelText: "取消",
			// 	})
			// }
		}

	}
</script>

<style lang="scss">
	.address-choose-box {

		display: flex;
		align-items: center;
		justify-content: center;
		height: 90px;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;
		}
	}

	.address-border {
		display: flex;
		width: 100%;
		height: 5px;
		z-index: 999;
	}
</style>