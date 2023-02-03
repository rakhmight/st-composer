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
                    <h3 class="card__title">Загрузите подпись</h3>
                    <p class="card__subtitle">прикрипите файл с подписью</p>
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
                placeholder="Выберите файл с подписью"
                label="Загрузить подпись"
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
            >
            <v-icon
            color="#fff"
            class="mr-2"
            size="20"
            >
                mdi-upload
            </v-icon>
            Загрузить подпись
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
            Использовать свободную подпись
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
import { mapMutations } from 'vuex'
import AuthSignInfo from '@/components/authForms/AuthSignInfo.vue'

export default {
    data() {
        return {
            rules: [
                value => !value || value.size < 2000000 || 'Размер файла не должен превышать 2МБ',
            ],
        }
    },
    methods: {
        ...mapMutations(['updateTab'])
    },
    components:{
        AuthSignInfo
    }
}
</script>

<style>
    
</style>