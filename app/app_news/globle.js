export default {
  app_key:"88d40dbfd944f0e6ce3366c878238848",
  //方法写在下面 注释写上方法的作用和参数的意义
  
  /*
  **
  * 用于判断用户是否登录，
  * @url 登录成功跳转的url
  * @store.state.login 登录状态
  */
 video_key:'d50138b29582f5011d4c41d34440aa0a',
 //子豪:daa694f25fdde3d8330805353eb5707a
  judgeLogin : function (url){
	 if(this.$store.state.login === true)
		return true;
	else{
		this.$store.state.backurl = url;
		uni.navigateTo({
		    url: '/pages/login/login'  
		});
	}
  }
}