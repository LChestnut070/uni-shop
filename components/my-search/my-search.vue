<template>
	<view class="my-search-container">
		<view class="my-search-box" @click="searchboxHandler">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		props:{
			bgcolor: {
				type: String,
				default: '#c00000'
			}
		},
		methods: {
			searchboxHandler(){
				//自动触发外界click事件
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	background-color: #c00000;
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.my-search-box{
		height: 36px;
		width: 100%;
		background-color: #fff;
		border-radius: 15px;
		align-items: center;
		display: flex;
		justify-content: center;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>