import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate";
import testStore from "./test"

export default createStore({
    modules: {testStore},
    plugins: [createPersistedState()]
})