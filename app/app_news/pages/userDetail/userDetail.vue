<template>
	<view>
		
		<!-- #ifdef APP-PLUS -->
			<uni-status-bar></uni-status-bar>
			<view>
				<view class="iconfont icon-guanbi flex align-center justify-center font-lg" hover-class="bg-light" @tap="goBack" style="width: 100rpx;height: 100rpx;"></view>
			</view>
		<!-- #endif -->
		
		
		<template >
			<view class="px-2">
				<view class="image-father">
					<image :src="img" @click="changImg" class="image-style"></image>
				</view>
				<view class="mb-2 flex  border-bottom">
					<span class="flex-1">账号</span>
					<input  v-model="user.account"  class=" base-style flex-10" disabled="true" />
				</view>
				<view class="mb-2 flex border-bottom">
					<span class="flex-1">用户名</span>
					<input  v-model="user.name" class=" base-style flex-10"/>
				</view>
				<view class="mb-2 flex border-bottom">
					<span class="flex-1">城市</span>
					<input  v-model="user.city"  class=" base-style flex-10"/>
				</view>
			</view>
		</template>
		<button class="edit_info" @click="submit"> 修改信息</button>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				img: "",
				user:{
					headImg,
					account,
					name,
					city
				}
			}
		},
		computed: {
			
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1,
				})
			},
			initForm() {
				this.username = ''
				this.password = ''
				
			},
			async changImg(){
				uni.chooseImage({
				    success:async (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        const res =await this.$request.uploadImg(
						{},tempFilePaths)
						this.img = this.$globle.imgUrl + res.data.fileName;
						this.$forceUpdate();
						this.user.headImg = res.data.fileName;
				    }
				});
			},
			
			async submit() {
				const res = await this.$request.updateUser({
					user:this.user
				})
				if(res.data.status == 200){
					this.$store.state.user = res.data.user;
				}
			}
		},
		onShow() {
			this.user = {...this.$store.state.user};
			this.img = this.$globle.imgUrl + this.user.headImg;
		},
		mounted() {
			
		}
	}
</script>

<style>
	.p-15 {
		padding: 15rpx;
	}
	
	.image-style{
		height: 350rpx;
		width: 350rpx;
		border-radius: 50%;
		border: 1rpx solid #444444;
		margin-top: 50rpx;
	}
	.image-father{
		text-align: center;
		height:500rpx;
	}
	
	.border-bottom{
		border-bottom: 1rpx solid #A9A5A0;
		margin-top: 40rpx;
		padding:  18rpx;
	}
	
	.base-style{
		width: 600rpx;
		height: 50rpx;
	}
	
	.flex{
		display: flex;
	}
	
	.flex-1{
		flex: 2;
	}
	
	.flex-10{
		flex: 6;
	}
	
	.edit_info{
		position: absolute;
		bottom: 0;
		width: 96%;
		text-align: center;
		background: #ec706b;
		margin: 12rpx 2%;
		border-radius: 25rpx;
		color: white;
		font-weight: 600;
	}
</style>