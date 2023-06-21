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
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				// 倒计时秒数
				seconds: 3,
				timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsPrice']),
			...mapState('m_cart', ['cart']),
			...mapGetters('m_user', ['addressStr']),
			...mapState('m_user', ['token']),
			// 是否全选
			isFullChecked() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			// 全选/反选商品
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			changeAllGoodsState() {
				// 如果非全选状态，那么传递true并赋给全部商品使之全选
				this.updateAllGoodsState(!this.isFullChecked)
			},

			// 点击结算后的判断事件
			settlement() {
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				if (!this.addressStr) return uni.$showMsg('请选择收货地址！')
				if (!this.token) return this.delayNavigate()
				this.payOrder()
			},

			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请先登录后再结算！' + n + '秒后自动跳转登录',
					mask: true,
					duration: 1500
				})
			},

			// 延迟导航到my页面
			delayNavigate() {
				// 重置计时器为3秒，防止多次点击后计时器出现负数不清除的情况
				this.seconds = 3
				// 先将计时器传递
				this.showTips(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					// 如果计时器不为正数则清除定时器并跳转
					if (this.seconds <= 0) {
						clearInterval(this.timer)

						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								// 将重定向值传递
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)
				}, 1000)

			},
			// 创建订单
			async payOrder() {
				const orderInfo = {
					// 订单价格
					// order_price: this.checkedGoodsAmount
					order_price: 0.01,
					// 订单地址
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
				}

				// 将请求参数发送并将接收到的订单号赋值
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)

				if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				const orderNumber = res.message.order_number

				// 将请求参数发送并将接收到的订单支付信息赋值
				const {
					data: res2
				} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: orderNumber
				})
				if (res2.meta.status !== 200) return uni.$showMsg('创建预付订单失败！')
				const payInfo = res2.message.pay

				// 详细见微信开发者文档，个体无法调用微信支付接口
				// const res3 = uni.requestPayment({
				// 	"provider": "wxpay",
				// 	"orderInfo": {
				// 		"appid": "wx499********7c70e", // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
				// 		"noncestr": "c5sEwbaNPiXAF3iv", // 随机字符串
				// 		"package": "Sign=WXPay", // 固定值
				// 		"partnerid": "148*****52", // 微信支付商户号
				// 		"prepayid": "wx202254********************fbe90000", // 统一下单订单号 
				// 		"timestamp": 1597935292, // 时间戳（单位：秒）
				// 		"sign": "A842B45937F6EFF60DEC7A2EAA52D5A0" // 签名，这里用的 MD5/RSA 签名
				// 	},
				// 	success(res) {},
				// 	fail(e) {}
				// })

				// 3.3 完成了支付，进一步查询支付的结果
				const {
					data: res3
				} = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
					order_number: orderNumber
				})
				// 3.4 检测到订单未支付
				if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
				// 3.5 检测到订单支付完成
				uni.showToast({
					title: '支付完成！',
					icon: 'success'
				})
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