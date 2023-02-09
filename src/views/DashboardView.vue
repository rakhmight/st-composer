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

            <!-- INSTRUCTION -->
            <to-instruction></to-instruction>

          </div>

          <div class="dashboard__saved">

            <work-card v-for="card in cards" :id="card.id" :status="card.status"/>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkCard from '@/components/WorkCard.vue'
import ToInstruction from '@/components/ToInstruction.vue'
import CreateTest from '@/components/dialogs/CreateTest.vue'

  export default {
    data() {
      return {
        cards:[
          {id:1, status:{ inProcess: true, isSigned: false, isDeleted: false }},
          {id:2, status:{ inProcess: true, isSigned: true, isDeleted: false }},
          {id:3, status:{ inProcess: true, isSigned: false, isDeleted: false }},
          {id:4, status:{ inProcess: true, isSigned: true, isDeleted: false }},
          {id:5, status:{ inProcess: true, isSigned: false, isDeleted: false }},
          {id:6, status:{ inProcess: true, isSigned: true, isDeleted: true }}
        ]
      }
    },
    components:{
      WorkCard,
      ToInstruction,
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

.dashboard__saved{
  width: 100%;
  margin-top: 30px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 250px);
  justify-content: space-between;
}

.dialog-errors-box{
    width: 100%;
}

.dashboard__btn{
  width: 100%;
}

.v-menu__content{
  overflow: none;
  overflow-y: hidden;
  overflow-x: hidden;
}
.v-list{
  padding: 0;
}
.v-dialog{
  overflow: hidden;
}
</style>