export default {
    state: {
        minBall: '0.01',
        maxBall: '1',
        ballInterval: '0.01',
    },
    getters: {
        getMinBall(state){
            return state.minBall
        },
        getMaxBall(state){
            return state.maxBall
        },
        getBallInterval(state){
            return state.ballInterval
        }
    },
    mutations: {
        updateMin(state, value){
            state.minBall = value
        },
        updateMax(state, value){
            state.maxBall = value
        },
        updateInterval(state, value){
            state.ballInterval = value
        }
    }
}