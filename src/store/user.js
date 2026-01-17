const state = {
    login: false,
    id: null,
    message: 'Hello Vuex!',
    token: {
        access_token: null,
        refresh_token: null
    }
}

const mutations = {
    setStatus(state, params) {
        state.login = params.login
        if (params.login === true) {
            state.id = params.id
        } else {
            state.id = null
        }
    },
    setToken(state, params) {
        state.token.access_token = params.access
        state.token.refresh_token = params.refresh
    },
    setLogout(state) {
        state.login = false
        state.id = null
        state.token.access_token = null
        state.token.refresh_token = null
    }
}

const getters = {
    getLoginStatus(state) {return state.login},
    getUserId(state) {return state.id},
    getToken(state) {return state.token}
}

const userStore = {
    namespaced: true,
    state: state,
    mutations: mutations,
    action: {},
    getters: getters
}

export default userStore