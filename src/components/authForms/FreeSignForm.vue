<template>

<div class="card">
    <div class="card__header d-flex mb-2">
        <v-icon
        color="#0167FF"
        size="50"
        class="mr-1"
        >
            mdi-file-delimited-outline
        </v-icon>
        <div class="card__titles d-flex flex-column">
            <h3 class="card__title">{{ currentLang.authView[5] }}</h3>
            <p class="card__subtitle">{{ currentLang.authView[6] }}</p>
        </div>

        <v-spacer></v-spacer>

        <keep-alive>
            <auth-sign-info></auth-sign-info>
        </keep-alive>

    </div>

    <v-divider color="#ccc"></v-divider>

    <div class="card__main d-flex flex-column justify-center align-center">
        <h4 class="mt-5">Временно не поддерживается</h4>
        <v-btn
        color="#5a5a5a"
        elevation="2"
        dark
        class="mt-6"
        max-width="370"
        @click="updateTab('own-sign-form')"
        small
        >
            <v-icon
            color="#fff"
            class="mr-2"
            >
                mdi-arrow-left-thin
            </v-icon>
            {{ currentLang.authView[7] }}
        </v-btn>
    </div>
</div>

</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import AuthSignInfo from '@/components/authForms/AuthSignInfo.vue'

export default {
    components:{
        AuthSignInfo
    },
    computed: mapGetters(['currentLang']),
    methods: {
        ...mapMutations(['updateTab'])
    },
}
</script>

<style>
    
</style>