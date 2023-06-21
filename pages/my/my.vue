<template>
	<view class="my-box">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		mixins: [badgeMix],
		computed: {
			...mapState('m_user', ['token'])
		}
	}
</script>

<style lang="scss">
	page,
	.my-box {
		height: 100%;
	}
</style>