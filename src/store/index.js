import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate";
import testStore from "./test"
import userStore from "./user"

export default createStore({
    modules: {testStore, userStore},
    plugins: [createPersistedState()]
})