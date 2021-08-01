<template>
	<view class="main">
		<h1 >{{title}}</h1>
		<view class="mb-2 flex  border-bottom">
			<span class="flex-1">密码</span>
			<input  v-model="password" type="password" class=" base-style flex-10" placeholder="密码" />
		</view>
		<view class="mb-2 flex  border-bottom" v-if="reset">
			<span class="flex-1">新密码</span>
			<input  v-model="newpassword" type="password" class=" base-style flex-10" placeholder="确认密码"/>
		</view>
		<button class="edit_info" @click="submitPassword()"> 提交</button>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				password:"",
				newpassword:"",
				reset:false,
				title:"验证当前密码"
			};
		},
		methods:{
			async submitPassword() {
				if(!this.reset){
					const res = await this.$request.registerAccount({
						account: this.$store.state.user.account,
						password: this.password,
					})
					if(res.data.status == 200){
						this.password = "";
						this.reset = true;
						this.title = "重置密码"
						console.log(res.data)
					}else{
						alert("密码错误！");
					}
				}else{
					if(this.password != this.newpassword){
						alert("密码不一致！")
						return;
					}
					if(!this.password ){
						alert("密码不能为空！")
						return;
					}
					const res = await this.$request.resetPassword({
						account: this.$store.state.user.account,
						password: this.password
					})
					if(res.data.status == 200){
						alert(res.data.message)
						uni.switchTab({
							url:"/pages/account/account"
						})
					}else{
						alert(res.data.message)
					}
				}
			}
			
		},
		onShow() {
		//	this.reset = false;
		//	this.title = "验证当前密码"
		}
	}
</script>

<style >
	.main{
		margin-left: 30rpx;
	}
	
	h1{
		font-weight: 500;
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
	
	.base-style{
		width: 600rpx;
		height: 50rpx;
	}
	
	.edit_info{
		position: absolute;
		top: 50%;
		left: 0;
		width: 96%;
		text-align: center;
		background: #ec706b;
		margin: 12rpx 2%;
		border-radius: 25rpx;
		color: white;
		font-weight: 600;
	}
</style>
