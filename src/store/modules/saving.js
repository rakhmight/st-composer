export default {
    state: {
        inWorkspace: false
    },
    getters: {
        onWorkProcess(state){
            return state.inWorkspace
        }
    },
    mutations: {
        updateWorkStatus(state, value){
            state.inWorkspace = value
        }
    },
    actions: {
    }
}  