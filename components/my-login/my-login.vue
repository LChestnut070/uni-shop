<template>
	<view class="login-box">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo"
			@click="getUserInfo">一键登录</button>
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			// 点击登录获取信息
			getUserInfo(e) {
				uni.getUserInfo({
					provider: 'weixin',
					success: (res) => {
						// 获取用户信息
						this.updateUserInfo(res.userInfo)
						// 获取用户token
						this.getToken(res)
					},
					fail: (err) => {
						if (err.errMsg === 'getUserInfo:fail auth deny') {
							uni.$showMsg('您取消了授权')
						}
					}
				})

			},
			// 调用登录接口，换取永久token
			getToken(info) {
				uni.login({
					provider: 'weixin', //使用微信登录
					onlyAuthorize: true,
					success: (res) => {
						if (res && res.errMsg === 'login:ok') {
							// 将基本信息传给请求参数
							const query = {
								code: res.code,
								encryptedData: info.encryptedData,
								iv: info.iv,
								rawData: info.rawData,
								signature: info.signature
							}
							// 假数据
							const loginResult = {
								"message": {
									"user_id": 12,
									"user_email_code": null,
									"is_active": null,
									"user_sex": "男",
									"user_qq": "",
									"user_tel": "",
									"user_xueli": "本科",
									"user_hobby": "",
									"user_introduce": null,
									"create_time": 1525402223,
									"update_time": 1525402223,
									"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
								},
								"meta": {
									"msg": "登录成功",
									"status": 200
								}
							}
							// 该接口暂时失效
							// const loginResult = uni.$http.post('/api/public/v1/users/wxlogin', query)
							if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败')
							uni.$showMsg('登录成功')
							this.updateToken(loginResult.message.token)
						} else {
							uni.$showMsg('登录失败')
						}
					},
					fail(failRes) {
						console.log('failRes', failRes);
					}
				});
				// 执行重定向判断
				this.navigateBack()
			},
			navigateBack() {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						// 完成跳转后重置重定向
						complete: () => {
							this.redirectInfo = null
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-box {
		// height: 100%;
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		overflow: hidden;
		position: relative;

		&::after {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>