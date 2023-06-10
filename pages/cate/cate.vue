<template>
	<view>

		<my-search @click="gotoSearch"></my-search>

		<view class="scroll-container">
			<!-- 左侧分类列表 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: windowHeight+'px'}">
				<block v-for="(item,index) in cateList" :key="index ">
					<view class="left-scroll-view-item" :class="active===index?'active':''"
						@click="activeChange(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>

			<!-- 右侧分类商品列表 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: windowHeight+ 'px'}"
				:scroll-top="scrollTop">
				<view class="right-scroll-item" v-for="(cateitem,index) in cateItemList" :key="index">
					<!-- 商品分类标题 -->
					<view class="cateitem-title">{{cateitem.cat_name}}</view>
					<view class="cateitem2-list">
						<!-- 商品列表 -->
						<view class="cateitem2-item" v-for="(cateitem2,index2) in cateitem.children" :key="index2"
							@click="toGoodsList(cateitem2)">
							<image :src="cateitem2.cat_icon"></image>
							<text>{{cateitem2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 分类列表
				cateList: [],
				// 分类右侧物品列表
				cateItemList: [],
				// 窗口高度=屏幕-nav-tab
				windowHeight: 0,
				// 选中项，默认为第一项
				active: 0,
				// 滚动条距顶部的距离
				scrollTop: 0

			};
		},
		methods: {
			// 获取分类列表
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
			},
			// 改变当前选中项
			activeChange(index) {
				// 如果点击的分类为当前分类页，则不进行任何操作
				if (index === this.active) return
				this.active = index
				this.cateItemList = this.cateList[index].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			// 获取分类物品列表
			async getCateItemList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateItemList = res.message[0].children
			},
			// 跳转商品列表页
			toGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			// 扣除搜索高度
			this.windowHeight = sysInfo.windowHeight - 50
			this.getCateList()
			this.getCateItemList()
		}
	}
</script>

<style lang="scss">
	.scroll-container {
		display: flex;

		.left-scroll-view {
			width: 240rpx;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #fff !important;
					position: relative;

					&::before {
						content: '';
						display: inline-block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}

		}

		.right-scroll-view {
			.cateitem-title {
				font-size: 14px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;
			}

			.cateitem2-list {
				display: flex;
				flex-wrap: wrap;

				.cateitem2-item {
					width: 33.3%;
					margin-bottom: 10px;
					align-items: center;
					display: flex;
					flex-direction: column;

					image {
						width: 60px;
						height: 60px;
					}

					text {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>