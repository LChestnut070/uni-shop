<template>
	<view class="my-userinfo-box">
		<!-- 昵称头像显示区域 -->
		<view class="top-box">
			<image :src="userInfo.avatarUrl" class="avatar"></image>
			<view class="nick-name">{{userInfo.nickName}}</view>
		</view>
		<!-- 面板列表 -->
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
				</view>
			</view>
			<view class="panel">

				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-userinfo",
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['userInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
			logout() {

				uni.showModal({
					title: '提示',
					content: '确认退出登录吗？',
					success: (res) => {
						if (res && res.confirm) {
							this.updateAddress({})
							this.updateToken('')
							this.updateUserInfo({})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-box {
		height: 100%;
		background-color: #f4f4f4;

		.top-box {
			height: 400rpx;
			background-color: #c00000;
			flex-direction: column;
			display: flex;
			align-items: center;
			justify-content: center;

			.avatar {
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 1px solid white;
				box-shadow: 0 1px 5px gray;
			}

			.nick-name {
				color: white;
				font-size: 16px;
				font-weight: bold;
				margin-top: 10px;
			}
		}

		.panel-list {
			padding: 0 10px;
			position: relative;
			top: -10px;

			.panel {
				background-color: white;
				border-radius: 3px;
				margin-bottom: 8px;

				.panel-title {
					padding-left: 10px;
					line-height: 45px;
					font-size: 15px;
					border-bottom: 1px solid #f4f4f4;
				}

				.panel-body {
					display: flex;
					justify-content: space-around;


					.panel-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						font-size: 13px;
						padding: 10px 0;

						.icon {
							width: 35px;
							height: 35px;
						}
					}
				}

				.panel-list-item {
					display: flex;
					height: 45px;
					justify-content: space-between;
					align-items: center;
					padding: 0 10px;
					font-size: 15px;
				}
			}
		}
	}
</style>