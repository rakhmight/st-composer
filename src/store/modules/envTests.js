export default {
    state: {
        idCounter: 0
    },
    getters: {
        currentTestsCounter(state){
            return +state.idCounter
        }
    },
    mutations: {
        updateTestsCounter(state, ctx){
            state.idCounter = +ctx

            localStorage.removeItem('testsCounter')
            localStorage.setItem('testsCounter', +state.idCounter)
        }
    },
    actions: {
    }
}  