export default {
    state: {
        sign: undefined
    },
    getters: {
        currentSign(state){
            return state.sign
        }
    },
    mutations: {
        setSign(state, value){
            state.sign = value
        },
        clearSign(state){
            state.sign = undefined
        }
    },
    actions: {
    }
}  