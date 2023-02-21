export default {
    state: {
        idCounter: undefined,
        inWorkspace: false,
        currentID: undefined,
    },
    getters: {
        currentTestsCounter(state){
            return +state.idCounter
        },
        onWorkProcess(state){
            return state.inWorkspace
        },
        getTestID(state){
            return state.currentID
        }
    },
    mutations: {
        updateTestsCounter(state, ctx){
            state.idCounter = +ctx

            localStorage.removeItem('testsCounter')
            localStorage.setItem('testsCounter', +state.idCounter)
        },
        updateWorkStatus(state, value){
            state.inWorkspace = value
        },


        updateTestID(state, value){
            state.currentID = value

            // + устанавливать его в localStorage
            let localID = localStorage.getItem('currentTestInProcess')
            if(localID){
                localStorage.removeItem('currentTestInProcess')
            }
            localStorage.setItem('currentTestInProcess', value)
        }
    },
    actions: {
    }
}  