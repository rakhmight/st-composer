export default {
    state: {
        answers: [{number:1}, {number:2}]
    },
    getters: {
        getAnswers(state){
            return state.answers
        }
    },
    mutations: {
        // updateTab(state, tab){
        //     state.authTab = tab
        // }
    },
    actions: {
    }
}  