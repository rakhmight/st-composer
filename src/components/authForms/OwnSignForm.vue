<template>

    <div class="card">
        <keep-alive>
            <div class="card__header d-flex mb-2">
                <v-icon
                color="#0167FF"
                size="50"
                class="mr-1"
                >
                    mdi-file-account-outline
                </v-icon>
                <div class="card__titles d-flex flex-column">
                    <h3 class="card__title">{{ currentLang.authView[0] }}</h3>
                    <p class="card__subtitle">{{ currentLang.authView[1] }}</p>
                </div>
        
                <v-spacer></v-spacer>
                <auth-sign-info></auth-sign-info>

            </div>
        </keep-alive>
        <v-divider color="#ccc"></v-divider>
    
        <div class="card__main d-flex flex-column justify-space-between align-center" style="height: auto;">

            <div style="width: 100%; height: 100%;" class="d-flex align-center">
                <v-file-input
                :rules="rules"
                accept="application/json"
                :placeholder="currentLang.authView[2]"
                :label="currentLang.authView[3]"
                outlined
                dense
                class="mt-6 auth__file-input"
                min-width="100%"
                @change="handleSignUpload( $event )"
                :error="signFileError.status"
                :error-messages="signFileError.msg"
                ></v-file-input>
            </div>
    
            <div style="width:100%">
                <v-divider width="100%" color="#ccc"></v-divider>
                
                <div class="w-100 d-flex justify-center">
                    <v-btn
                    color="#5a5a5a"
                    elevation="2"
                    dark
                    class="mt-6"
                    max-width="370"
                    @click="updateTab('free-sign-form')"
                    small
                    >
                    {{ currentLang.authView[4] }}
                    <v-icon
                    color="#fff"
                    class="ml-2"
                    >
                        mdi-arrow-right-thin
                    </v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import AuthSignInfo from '@/components/authForms/AuthSignInfo.vue'

export default {
    data() {
        return {
            rules: [
                value => !value || value.size < 2000000 || 'Размер файла не должен превышать 2МБ',
            ],
            signFileError:{
                status: false,
                msg: undefined
            }
        }
    },
    computed: mapGetters(['currentLang']),
    methods: {
        ...mapMutations(['updateTab', 'setSign']),

        handleSignUpload(signFile){
            this.signFileError.status = false
            this.signFileError.msg = undefined

			let reader  = new FileReader()

            reader.addEventListener("load", function () {
                const sign = JSON.parse(reader.result)
                if(sign.id){
                    this.setSign(sign)
                    this.$router.push('/dashboard')
                    return
                } else {
                    this.signFileError.status = true
                    this.signFileError.msg = 'Некорректный формат подписи'
                    return
                }
			}.bind(this), false)

            if(signFile){
                if ( /\.(json)$/i.test( signFile.name ) ) {
					reader.readAsText(signFile)
				}
            }
        }
    },
    components:{
        AuthSignInfo
    }
}
</script>

<style scoped>
    .card{
        display: grid;
        grid-template-rows: 50px 1px auto;
    }
</style>