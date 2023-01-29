<template>
  <div class="wrapper">
    <div class="container">
      <div class="dashboard">
        <div class="dashboard__header d-flex justify-space-between align-center">
          <div class="dashboard__author-box d-flex align-center">
            <v-icon
            color="#0167FF"
            size="30"
            class="mr-2"
            >
              mdi-typewriter
            </v-icon>
            <v-divider vertical color="#ccc"></v-divider>
            <div class="dashboard__author-info ml-2">
              <h2>Author</h2>
              <p style="color:#615f5f">Chair</p>
            </div>
          </div>
          <div class="dashboard__create-btn">
            <create-test></create-test>
          </div>
        </div>

        <v-divider width="100%" color="#ccc" class="mt-3 mb-3"></v-divider>

        <div class="dashboard__content">
          <div class="dashboard__content-info d-flex justify-space-between">
            <h4 class="">Сохранённые работы</h4>
            <keep-alive>
              <instruction/>
            </keep-alive>
          </div>

          <div class="dashboard__saved">

            <work-card></work-card>
            <work-card></work-card>
            <work-card></work-card>
            <work-card></work-card>
            <work-card></work-card>
            <work-card></work-card>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkCard from '@/components/WorkCard.vue'
import Instruction from '@/components/Instruction.vue';
import CreateTest from '@/components/CreateTest.vue';

  export default {
    components:{
      WorkCard,
      Instruction,
      CreateTest
    }
  }
</script>

<style>
.dashboard{
  width: 100%;
  height: 100%;
  padding-top: 30px;
}

.instruction:hover{
  cursor: pointer;
  text-decoration: underline;
}

.dashboard__saved{
  width: 100%;
  margin-top: 30px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 250px);
  justify-content: space-between;
}
</style>