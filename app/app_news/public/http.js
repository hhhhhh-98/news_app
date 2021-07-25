const baseUrl = '/api/toutiao/index'
const http = {}
const httpRequest = (method, url, data) => {
	var promise = new Promise(function(resolve, reject) {
		uni.request({
			url: baseUrl,
			data: data,
			method: method,
			success: ((res) => {
					if (res.data.errcode == 0) {
						resolve(res.data.data)
					} else {
						resolve(res.data.data)
					} 
			}),
			fail: ((err) => {
				reject(err)
			}),
		})
	});
	return promise;
}

const httpGet = (url, data) => {
	return httpRequest('Get', url, data)
}
const httpPost = (url, data) => {
	return httpRequest('POST', url, data)
}

http.getProductList = (data) => {
	return httpPost('', data)
}
export default http