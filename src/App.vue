<template>
  <v-app>
    <header-component />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations,mapGetters } from 'vuex'
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: 'App',
  components:{
    HeaderComponent
  },
  methods: {
      ...mapMutations(['updateTestsCounter', 'updateWorkStatus', 'updateTestID']),
  },
  computed: mapGetters(['getTestID']),
  mounted() {
    // testCounter в LS
    let testsCounter = localStorage.getItem('testsCounter')

    if(!testsCounter){
      // создать в LS
      localStorage.setItem('testsCounter', 0)
    }else{
      // обновить в стейте
      this.updateTestsCounter(testsCounter)
    }


    // currentTestInProcess в LS
    let localID = localStorage.getItem('currentTestInProcess')
    if(localID){
      this.updateTestID(localID)
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
</style>