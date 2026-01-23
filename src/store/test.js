const state = {
    message: 'Hello Vuex!'
}

const mutations = {
    setMessage(state, params) {state.message = params.message}
}

const getters = {
    getMessage(state) {return state.message}
}

const testStore = {
    namespaced: true,
    state: state,
    mutations: mutations,
    action: {},
    getters: getters
}

export default testStore