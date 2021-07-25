export default {
  app_key:"88d40dbfd944f0e6ce3366c878238848",
  
  
  //方法写在下面 注释写上方法的作用和参数的意义
  
  /*
  **
  * 用于判断用户是否登录，
  * @url 登录成功跳转的url
  * @store.state.login 登录状态
  */
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