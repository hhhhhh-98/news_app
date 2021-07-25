import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		login: false,
		user: "",
		backurl: ""
	},
	mutations: {
		changeLogin(state, status) {
			state.login = status
		},
		changeBackUrl(state, status){
			state.backurl = status;
			
		}
	},
})