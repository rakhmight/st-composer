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
            <h3 class="card__title">Укажите данные</h3>
            <p class="card__subtitle">вы можете указать Ф.И. либо псевдоним</p>
        </div>

        <v-spacer></v-spacer>

        <keep-alive>
            <auth-sign-info></auth-sign-info>
        </keep-alive>

    </div>

    <v-divider color="#ccc"></v-divider>

    <div class="card__main d-flex flex-column justify-center align-center">
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
        Назад
        </v-btn>
    </div>
</div>

</template>

<script>
import { mapMutations } from 'vuex'
import AuthSignInfo from '@/components/AuthSignInfo.vue'

export default {
    components:{
        AuthSignInfo
    },
    methods: {
        ...mapMutations(['updateTab'])
    },
}
</script>

<style>
    
</style>