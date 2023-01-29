export default {
    state: {
        authTab: 'own-sign-form'
    },
    getters: {
        currentTab(state){
            return state.authTab
        }
    },
    mutations: {
        updateTab(state, tab){
            state.authTab = tab
        }
    },
    actions: {
    }
}