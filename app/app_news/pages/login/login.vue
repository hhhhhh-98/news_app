<style>
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.container image{
		width: 200rpx;
		height: 200rpx;
		margin-top: 20%;
		border-radius: 50%;
	}
	.phone_number,
	.verification_code{
		width: 560rpx;
		height: 88rpx;
		margin-top: 50rpx;
		background-color: rgb(238, 238, 238);
		padding-left: 30rpx;
		border-radius: 50rpx;
		box-shadow: 2rpx 2rpx 10rpx 0rpx #dfdee3;
	}
	
	.btn{
		margin-top: 50rpx;
		height: 88rpx;
		width: 583rpx;
		border-radius: 50rpx;
		background-color: rgb(5, 187, 29);
		text-align: center;
		line-height: 88rpx;
		color: white;
		box-shadow: 0rpx 5rpx 10rpx #a2a2a2;
	}
	.agree{
		width: 560rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		color: #999999;
		margin-top: 40rpx;
		font-size: 28rpx;
		align-items: center;
	}
	.agree radio{
		transform: scale(.7);
	}
	.agree a{
		color: #858188;
	}
	.verification_code_father{
		position: relative;
	}
	.get_dode{
		position: absolute;
		right: 38rpx;
		bottom: 23rpx;
		color: #808080;
		font-size: 29rpx;
		padding-left: 15rpx;
		height: 44rpx;
		line-height: 50rpx;
		border-left: 2rpx solid #a7a7a7;
		width: 147rpx;
		z-index: 2;
		text-align: center;
	}
	.other_login{
		font-size: 28rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-top: 50rpx;
		position: relative;
		padding: 0rpx 10rpx;
		color: rgb(126, 126, 126);
	}
	.other_login::after{
		content: "";
		position: absolute;
		height: 2rpx;
		width: 170rpx;
		background-color: #CCCCCC;
		margin-top: 50rpx;
		left: 218rpx;
	}
	.other_login::before{
		content: "";
		position: absolute;
		height: 2rpx;
		width: 170rpx;
		background-color: #CCCCCC;
		margin-top: 50rpx;
		right: 218rpx;
	}
	.icon-weixin{
		font-family: 'iconfont';
		font-size: 88rpx;
		color: #999999;
	}
	.phClass{
		font-size: 28rpx;
	}
	.icon-weixin{
		font-family: 'iconfont';
		font-size: 68rpx;
		color: #444444 !important;
		position: relative;
	}
	button{
		width: 72rpx;
		height: 75rpx;
		position: absolute;
		bottom: 0rpx;
		opacity: 0;
	}
</style>
<template>
	<view class="container">
		<image src="../../static/head_portrait.png" mode=""></image>
		<view>
			<input v-model="account" placeholder-class="phClass" maxlength="14" class="phone_number" type="number" placeholder="请输入账号" />
		</view>
		<view>
			<input v-model="password" placeholder-class="phClass" maxlength="14" class="phone_number" type="password"
			 placeholder="密码" />
		</view>
		<view class="btn" @click="register()">注册/登录</view>
		<view class="agree">
			<radio @click="change" :checked="is_true" />
			同意<a href="">❬❬使用条款和数据隐私政策❭❭</a>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				is_true: true,
				account: "",
				password: "",
				is_click: true,
			}
		},
		onLoad: function() {

		},
		methods: {
			change() {
				this.is_true = !this.is_true
			},
			async register() {
				const res = await this.$request.registerAccount({
					account: this.account,
					password: this.password
				})
				if (res.data.status === 200) {
					this.$store.state.login = true;
					this.$store.state.user = res.data.data;
					this.$forceUpdate();
					uni.switchTab({
						url: "/pages/index/index",
						success() {
							let page = getCurrentPages().pop(); //跳转页面成功之后
							if (!page) return;
							page.onLoad();
						}

					})
				} else {
					alert(res.data.message);
				}
			}
		},

	}
</script>
