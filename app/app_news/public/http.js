const http = {}
const api = "http://127.0.0.1:7001"
const httpUploadImg = (url, method, query,tempFilePaths) => {
	var promise = new Promise(function(resolve, reject) {
		uni.uploadFile({
		    url: url,
		    filePath: tempFilePaths[0],
		    name: 'file',
			data:query,
		    formData: {
		    },
		    success: ((res) => {
				res.data = JSON.parse(res.data)		
				resolve(res)
			}),
			fail: ((err) => {
				reject(err)
			}),
		});
	});
	return promise;
}

const httpRequest = (url, method, query) => {
	var promise = new Promise(function(resolve, reject) {
		uni.request({
			url: url,
			data: query,
			method: method,
			success: ((res) => {
						resolve(res)
			}),
			fail: ((err) => {
				reject(err)
			}),
		})
	});
	return promise;
}
// 请求新闻列表接口
http.getProductList = (query) => {
	return httpRequest('/api/toutiao/index', 'GET', query);
}
// 请求新闻详情接口
http.getProductDetail = (query) => {
	return httpRequest('/api/toutiao/content', 'GET', query);
} 
http.getVideoList = (query) => {
	return httpRequest('/videoapi/fapig/douyin/billboard', 'GET', query);
}

//注册接口
http.registerAccount = (query) => {
	return httpRequest(api+"/register","POST",query)
}

//修改密码
http.resetPassword = (query) => {
	return httpRequest(api+"/resetpassword","POST",query)
}

//修改个人信息
http.updateUser = (query) => {
	return httpRequest(api+"/updateUser","POST",query)
}

//提交反馈
http.submitFeedBack = (query) => {
	return httpRequest(api+ "/feedBack","POST",query)
}

//上传图片
http.uploadImg = (query,tempFilePaths) => {
	return httpUploadImg(api+"/uploadImg","POST",query,tempFilePaths)
}


export default http