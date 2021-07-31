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
			changImg(){
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: this.$store.state.weburl+'/uploadvideo', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				               
				            },
				            success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								this.img =  this.$store.state.weburl+"/getImg?img="+data.msg;
								console.log(data.msg);
				            //    console.log(uploadFileRes.data.msg);
				            }
				        });
				    }
				});
			},
			
			submit() {
				uni.request({
					url:this.$store.state.weburl+"/updateUser",
					data:{id:this.$store.state.user,img:this.img,mail:this.mail,name:this.name},
					header:{},
					method:"POST",
					success:(res)=>{
						uni.redirectTo({
							url:"../account/account",
							fail(res) {
								console.log(res)
							}
						})
					},
					fail(err) {
						console.log(res);
					}
				})
			}
		},
		onShow() {
			this.user = {...this.$store.state.user};
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