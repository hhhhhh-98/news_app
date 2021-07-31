const http = {}
const api = "http://127.0.0.1:7001"
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
export default http