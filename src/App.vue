<template>
  <v-app v-if="!checkingTimers">
    <header-component/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>

  <div class="main-loader" v-else>
    <v-progress-circular
    :size="150"
    :width="4"
    color="#0167ff"
    indeterminate
    ></v-progress-circular>
    <div style="position:absolute">
      <v-img src="@/assets/media/logo.png" width="100px" height="100px"></v-img>
    </div>
  </div>
</template>

<script>
import { mapMutations,mapGetters } from 'vuex'
import HeaderComponent from "@/components/HeaderComponent.vue"
import { initDB } from '@/services/localDB'
import checkTimers from '@/services/checkTimers'

export default {
  name: 'App',
  data(){
    return {
      checkingTimers: true,
      loader: true
    }
  },
  components:{
    HeaderComponent
  },
  methods: {
      ...mapMutations(['updateTestsCounter', 'updateWorkStatus', 'updateTestID', 'changeLang']),
  },
  computed: mapGetters(['getTestID']),
  mounted() {
    // инициализация DB
    initDB()

    // Проверка на удаление
    checkTimers()
    .then(()=>{
      setTimeout(()=>{
        this.checkingTimers = false
      },5000)
    })

    // testCounter в LS
    let testsCounter = localStorage.getItem('testsCounter')

    if(!testsCounter){
      // создать в LS
      localStorage.setItem('testsCounter', 0)
      this.updateTestsCounter(0)
    }else{
      // обновить в стейте
      this.updateTestsCounter(testsCounter)
    }


    // currentTestInProcess в LS
    let localID = localStorage.getItem('currentTestInProcess')
    if(localID){
      this.updateTestID(localID)
    }
    

    // Languages в LS
    let language = localStorage.getItem('language')
    if(language){
      this.changeLang(language)
    }
  },
  watch:{
    $route(to, from) {
      if(this.$route.path == '/workspace'){
        this.updateWorkStatus(true)
      }else{
        this.updateWorkStatus(false)
      }
    }
  }
}
</script>

<style>
html{
  overflow-y: scroll;
}
::-webkit-scrollbar {
    width: 12px; /* ширина для вертикального скролла */
    background-color: #b9b9b9;
}

/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
    background-color: #1b6eec9a;
    border-radius: 1em;
}

:root{
  --main-color: #0d5fd8;
}

.wrapper{
  width: 100%;
  height: 100%;
  background: #D9D9D9;
}
.container{
  padding: 0 15px;
}

.input{
  width: 	100%;
  height: 35px;
  text-indent: 10px;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
}
.input:focus{
  outline: none;
  box-shadow: 0px 0px 5px 5px #0b465a42;
}

.main-loader{
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  background-color: #b9b9b9;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>