<template>
	<view class="main">
		<h3>提交问题</h3>
		<view>
			<p>标题<span style="color: red;">*</span></p>
			<input type="text" class="title" v-model="title"/>
		</view>
		<view>
			<p>内容描述<span style="color: red;">*</span></p>
			<textarea  class="description" v-model="description"></textarea>
		</view>
		<button class="edit_info" @click="submitFeedBack()"> 提交</button>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				title: "",
				description: ""
			}
		},
		methods:{
			async submitFeedBack() {
				if(!this.title){
					alert("标题不能为空！");
					return;
				}
				if(!this.description){
					alert("内容描述不能为空！");
					return;
				}
				const res =  await this.$request.submitFeedBack({
					account: this.$store.state.user.account,
					title: this.title,
					description: this.description
				})
				if(res.data.status == 200){
					alert("系统已经收到你的反馈！")
				}
			}
		}
	}
</script>

<style>
	.main{
		margin-left: 30rpx;
	}
	
	view{
		margin-top: 30rpx;
	}
	
	.title{
		border: 1px solid rgb(200,200,200);
		width: 95%;
		height: 50rpx;
		margin-top: 10rpx;
	}
	
	.description{
		border: 1px solid rgb(200,200,200);
		width: 95%;
		margin-top: 10rpx;
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
