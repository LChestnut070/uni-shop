<template>
	<view class="search-box">
		<!-- 搜索框 -->
		<uni-search-bar @input="input" :radius="100" cancelButton="none">
		</uni-search-bar>
		<!-- 搜索历史 -->
		<view class="history-box" v-if="searchReasults.length===0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			</view>
			<!-- 搜索历史列表 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,index) in historys" :key="index" @click="toGoodsList(item)"></uni-tag>
			</view>
		</view>
		<!-- 搜索建议 -->
		<view class="sugg-list" v-else>
			<view class="sugg-item" v-for="(item,index) in searchReasults" :key="index" @click="toDetail(item.goods_id)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 计时器
				timer:null,
				// 关键词
				keywords: '',
				// 搜索建议列表
				searchReasults: [],
				// 搜索历史列表
				historyList: ['a','app',1],
			};
		},
		computed:{
			// 由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
			// 而是应该新建一个内存无关的数组，再进行 reverse 反转
			historys(){
				return [...this.historyList].reverse()
			}
		},
		methods: {
			input(e){
				clearTimeout(this.timer)
				// 如果500ms内没有新的输入事件，则把值赋予
				this.timer = setTimeout(()=>{
					this.keywords = e
					this.getSearchList()
				},500)
			},
			
			// 获取搜索建议列表
			async getSearchList(){
				if(this.keywords ===''){
					this.searchReasults = []
					return
				}
				const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keywords })
				  if (res.meta.status !== 200) return uni.$showMsg()
				  this.searchReasults = res.message;
				  this.saveSearchHistory()

			},
			
			// 跳转商品详情
			toDetail(goods_id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
				})
			},
			
			// 保存搜索历史
			saveSearchHistory(){
				//将数组转换为对象进行去重
				const set = new Set(this.historyList)
				//先去掉与搜索词相同的历史搜索
				set.delete(this.keywords)
				// 再将搜索词添加进搜索记录
				// 如果有与历史搜索相同的关键词，则关键词会提到最前，如果没有，则正常添加至历史搜索
				set.add(this.keywords)
				this.historyList = Array.from(set)
				uni.setStorageSync('keywords',JSON.stringify(this.historyList))
			},
			// 清除搜索历史
			clearHistory(){
				this.historyList = []
				uni.setStorageSync('keywords','[]')
			},
			// 跳转商品列表页
			toGoodsList(keywords){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+ keywords
				})
			}
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('keywords')||'[]')
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
	.history-box{
		padding: 0 10px;
		.history-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 20px;
			border-bottom: 1px solid #efefef;
			margin-bottom: 10px
		}
		.history-list{
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			.uni-tag{
				margin-left: 5px;
			}
		}
	}
	.sugg-list{
		padding: 0 15px;
		.sugg-item{
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
}

</style>
