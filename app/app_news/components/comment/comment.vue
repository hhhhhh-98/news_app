<template>
	<view>
		
		<view class="p-2 font font-weight-bold">
			最新评论 
		</view>
		<view v-for="(item,key) in recomment">
		<view class="px-2">
			<view class="uni-comment-list">
				<view class="uni-comment-face"><image :src="item.img" mode="widthFix"></image></view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>{{item.username}}</text>
					</view>
					<view class="uni-comment-content">{{item.content}}</view>
					<view class="uni-comment-date">
						<view>{{item.date}}</view>
					</view>
				</view>
			</view>
		</view>
		</view>
		<!-- 占位符 -->
		<view style="height: 100rpx;"></view>
		
		<!-- 评论框 -->
		<bottom-input @submit="submit"></bottom-input>
		
		<!-- 分享 -->
		<share ref="share"></share>
		
	</view>
</template>

<script>
	
	import share from '@/components/common/share.vue'
	import commonList from '@/components/common/common-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	
	export default {
		components: {
			share,
			commonList,
			bottomInput
		},
		data() {
			return {
				info: '',
				recomment:[],
			}
		},
		onLoad(e) {
			// 设置导航栏标题	
			if(e.detail) {
				
				this.info = JSON.parse(e.detail)
				this.info.content = ''
				this.info.imgs = ['/static/pic/banner2.jpg', '/static/pic/banner1.jpg', '/static/pic/banner3.jpg']
			//	console.log(this.info);
				uni.setNavigationBarTitle({
					title: this.info.title
				})
				this.loadData();
			}
		},
		// 导航按钮监听
		onNavigationBarButtonTap() {
			this.$refs.share.togglePopup('bottom')
		},
		onBackPress() {
			this.$refs.share.togglePopup('')
		},
		methods: {
			loadData(){
				uni.request({
					url:this.$store.state.weburl+"/getrecommentList",
					data:{id:this.info.id},
					header:{},
					method:"GET",
					success:(res)=>{
						this.recomment = res.data.data;
						console.log(this.recomment)
						this.$forceUpdate();
					},
					fail(err) {
						console.log(res);
					}
				})
			},
			
			submit(e) {
				uni.request({
					url:this.$store.state.weburl+"/addRecommentList",
					data:{commentid:this.info.id,username:this.$store.state.user,date:new Date().toLocaleString(),content:e},
					header:{},
					method:"POST",
					success:(res)=>{
						this.loadData();
					},
					fail(err) {
						console.log(res);
					}
				})
			}
		},
	
	}
</script>

<style>

</style>
