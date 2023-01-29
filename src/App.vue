<template>
  <v-app>
    <header-component />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: 'App',
  components:{
    HeaderComponent
  }
}
</script>

<style>
.wrapper{
  width: 100%;
  height: 100%;
  background: #D9D9D9;
}
.container{
  padding: 0 15px;
}
</style>