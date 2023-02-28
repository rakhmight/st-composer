import lang from '@/utils/lang'

export default {
    state: {
        language: lang.ru
    },
    getters: {
        currentLang(state){
            return state.language
        }
    },
    mutations: {
        changeLang(state, newLang){
            if(newLang=='ru'){
                state.language = lang.ru
            }else if(newLang=='uz_l'){
                state.language = lang.uz_l
            }else if(newLang=='uz_k'){
                state.language = lang.uz_k
            }else if(newLang=='eng'){
                state.language = lang.eng
            }
        }
    },
    actions: {
    }
}  