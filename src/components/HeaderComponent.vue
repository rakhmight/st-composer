<template>
    <v-app-bar
      app
      color="#0d5fd8"
      height="70"
      class="header-flex"
      style="z-index: 10;"
    >
      <div class="d-flex align-center">
        <v-img
        src="@/assets/media/logo.png"
        height="55"
        width="55"
        contain
        transition="scale-transition"
        class="shrink mr-4"
        >
        </v-img>
        <div class="d-flex flex-column">
          <h4 class="header__title">{{ currentLang.header[0] }}</h4>
          <p>{{ currentLang.header[1] }}</p>
        </div>
      </div>
    
      <v-spacer></v-spacer>

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
          >
            <v-icon
            size="33"
            >mdi-translate-variant</v-icon>
          </v-btn>
        </template>

        <v-list
        class="header__list"
        >
          <v-btn
          class="header__btn" 
          small color="#eaeaea" 
          v-for="(lang, i) in langs"
          :key="i"
          @click="setLanguage(lang.short)"
          >
            <span style="color: #0167FF">{{lang.lang}}</span>
          </v-btn>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>
      
      <v-menu
      offset-y
      max-width="400"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#eaeaea"
            v-bind="attrs"
            v-on="on"
            min-width="120"
            small
          >
            <v-img
              class="shrink mr-3"
              contain
              src="@/assets/media/user.png"
              transition="scale-transition"
              width="15"
            />
            <span style="color:#0167FF">{{ currentSign.fullname }}</span>
          </v-btn>
        </template>
        <v-list
        class="header__list">
          <v-btn
          class="header__btn" 
          small
          color="#c8c7ce" 
          dark
          @click="$router.push('/')"
          >
            <span style="color:red">{{ currentLang.header[2] }}</span>
          </v-btn>
        </v-list>
      </v-menu>
    </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    data() {
      return {
        langs: [{lang: 'русский', short: 'ru'},{lang: "o'zbek", short: 'uz_l'},{lang: 'english', short: 'eng'}]
      }
    },
    computed: mapGetters(['currentLang', 'currentSign']),
    methods:{
      ...mapMutations(['changeLang']),

      setLanguage(lang){
        this.changeLang(lang)

        localStorage.setItem('language', lang)
      }
    },
    mounted(){
      console.log(this.currentLang);
    }
}
</script>

<style>
.header-flex.v-toolbar__content{
  padding: 4px 15px;
}
.header__title{
  width: 400px;
  color: #fff;
}
.v-application p{
  margin-bottom: 0;
  color: rgb(179, 179, 179);
  font-size: 0.9em;
}
.header__btn{
  width: 100%;
}
.header__list.v-list{
  padding: 0;
}
</style>