<template>
    <div class="wrapper" style="position: relative;">
        <div class="auth__wrapper">
            <component :is="currentTab"></component>
        </div>

        <div style="position: absolute; bottom: 15px; right: 30px;">
            <v-menu
            offset-y
            max-width="120"
            center
            >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                    color="var(--main-color)"
                >
                    <v-icon
                    size="24"
                    >mdi-translate</v-icon>
                </v-btn>
                </template>

                <v-list
                class="header__list"
                >
                <v-btn
                class="header__btn" 
                small
                :color="activeLang == lang.short ? '#ccc' : '#eaeaea'" 
                v-for="(lang, i) in langs"
                :key="i"
                @click="setLanguage(lang.short)"
                >
                    <span style="color: #0167FF">{{lang.lang}}</span>
                </v-btn>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import OwnSignForm from '@/components/authForms/OwnSignForm.vue'
import FreeSignForm from '@/components/authForms/FreeSignForm.vue'

export default {
    components:{
        OwnSignForm,
        FreeSignForm
    },
    data(){
        return {
            langs: [
            {lang: 'русский', short: 'ru'},
            {lang: "o'zbek", short: 'uz_l'},
            // {lang: "ўзбек", short: 'uz_k'},
            // {lang: 'english', short: 'eng'}
            ],
            activeLang: 'ru'
        }
    },
    computed: mapGetters(['currentTab', 'currentSign', 'currentLang']),
    methods:{
      ...mapMutations(['changeLang']),

      setLanguage(lang){
        this.changeLang(lang)
        this.activeLang = lang

        localStorage.setItem('language', lang)
      }
    },
    mounted(){
        if(this.currentSign){
            this.$router.push('/dashboard')
        }
    },
}
</script>

<style>
::-webkit-scrollbar {
    width: 0
}
.auth__wrapper{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card{
    width: 550px;
    min-height: 300px;
    max-height: 300px;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
}
.v-icon.v-icon::after{
    width: auto;
}
.v-dialog > .v-card > .v-card__text{
    color: #000
}
.auth__file-input.v-input{
    min-width: 100%;
}
</style>