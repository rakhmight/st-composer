export default {
    state: {
        inWorkspace: false,
        currentID: undefined,
    },
    getters: {
        onWorkProcess(state){
            return state.inWorkspace
        },
        getTestID(state){
            return state.currentID
        }
    },
    mutations: {
        updateWorkStatus(state, value){
            state.inWorkspace = value
        },
        updateTestID(state, value){
            state.currentID = value
        }
    },
    actions: {
    }
}  