<style>
	.container{
		background-color: #F8F8F8;
		padding: 0rpx 20rpx;
		height: 100vh;
	}
	.title{
		display: flex;
		align-items: center;
		background-color: white;
		padding: 30rpx;
	}
	.title image{
		height: 90rpx;
		width: 90rpx;
		border-radius: 45rpx;
		border: 1px solid #CCCCCC;
		margin-right: 20rpx;
	}
	.item_list{
		margin-top: 10rpx;
	}
	.item{
		display: flex;
		justify-content: space-between;
		height: 89rpx;
		line-height: 89rpx;
		font-size: 30rpx;
		font-weight: 700;
		background-color: white;
		padding: 0rpx 20rpx;
		margin-top: 20rpx;
		border-radius:20rpx;
	}
	.wrap{
		display: flex;
	}
	.wrap text:nth-of-type(1){
		font-size: 40rpx;
		margin-right: 20rpx;
	}
	.nickname{
		margin-right: 19rpx;
	}
	.info{
		line-height: 46rpx;
		font-size: 26rpx;
	}
	.icon{
		 margin-left:auto;
		 width: 150rpx;
		 height: 60rpx;
		 text-align: center;
		 line-height: 60rpx;
		 color: #555555;
		 border: 1px solid #555555;
		 font-size: 26rpx;
		 border-radius: 50rpx;
	}

</style>

<template>
	<view class="container">
		<view  class="title" @click="toDetail()">
			<image :src="avatar"></image>
			<view class="info">
				<text class="nickname">昵称：{{nickname}}</text>
				<text v-show="!gender==''"  :class="[gender==1?'icon-nv':'icon-nv1']"></text>
				<view>城市：{{city}}</view>
			</view>
			<view  class="icon" v-if="isShow">登录/注册</view>
		</view>
		<view class="item_list">
			<view class="item">
				<view class="wrap">
					<text class="icon-icon-"></text>
					<text>修改密码</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
			
			<view class="item">
				<view class="wrap">
					<text class="icon-yue"></text>
					<text>我评论的</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
			<view class="item">
				<view class="wrap">
					<text class="icon-yijianfankui1"></text>
					<text>我收藏的</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
			<view class="item">
				<view class="wrap">
					<text class="icon-yijianfankui1"></text>
					<text>我要反馈</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nickname: "",
				gender:"",
				avatar:"",
				city:"",
				isShow: true,
			}
		},
		onShow() {
			this.nickname = this.$store.state.user.name || "";
			this.gender = 1;
			this.city = this.$store.state.user.city || "";
			this.isShow = !this.$store.state.login;
			if(!this.isShow)
				this.avatar = "../../static/head_portrait.png";
		},
		methods:{
			toDetail(){
				if(!this.$store.state.login)
					uni.navigateTo({
						url:"/pages/login/login"
					})
				else
					uni.navigateTo({
						url:"/pages/userDetail/userDetail"
					})
			}
		}
	}
</script>
