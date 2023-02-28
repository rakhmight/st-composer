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
    
        <div class="card__main d-flex flex-column justify-center align-center">
            <v-file-input
                :rules="rules"
                accept="application/json"
                :placeholder="currentLang.authView[2]"
                :label="currentLang.authView[3]"
                outlined
                dense
                class="mt-6 auth__file-input"
                min-width="100%"
            ></v-file-input>
            <v-btn
            color="#0167FF"
            elevation="2"
            dark
            class="mb-6"
            @click="$router.push('/dashboard')"
            small
            >
            <v-icon
            color="#fff"
            class="mr-2"
            size="18"
            >
                mdi-upload
            </v-icon>
            {{ currentLang.authView[3] }}
            </v-btn>
    
            <v-divider width="100%" color="#ccc"></v-divider>
            
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
        }
    },
    computed: mapGetters(['currentLang']),
    methods: {
        ...mapMutations(['updateTab']),
    },
    components:{
        AuthSignInfo
    }
}
</script>

<style>
    
</style>