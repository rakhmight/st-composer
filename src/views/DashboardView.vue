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
              <h2>{{ currentSign.fullname }}</h2>
              <p style="color:#615f5f">Кол-во тестов: {{ tests.length }}</p>
            </div>
          </div>
          <div class="dashboard__create-btn">
            <create-test :renderFunc="loadTests"></create-test>
          </div>
        </div>

        <v-divider width="100%" color="#ccc" class="mt-3 mb-3"></v-divider>

        <div class="dashboard__content">
          <div class="dashboard__content-info d-flex justify-space-between">
            <h4 class="">Сохранённые работы</h4>

            <!-- INSTRUCTION -->
            <to-instruction></to-instruction>

          </div>

          <div class="dashboard__saved" v-if="tests.length">
            <work-card
            v-for="(test, i) in tests"
            :key="i"
            :id="test.id"
            :status="test.status"
            :test="test"

            :renderFunc="loadTests"
            />

          </div>

          <div v-else class="dashboard__empty mt-5">
            <v-img
            max-height="250"
            max-width="250"
            src="@/assets/media/spider-web.png"
            contain
            transition="scale-transition"
            ></v-img>
              <h2 style="color:#888" class="mt-5">СОХРАНЕНИЙ ПОКА НЕТ</h2>
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
import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        tests: [],
      }
    },
    methods:{
      loadTests(){
        this.tests = []
        let counter = +localStorage.getItem('testsCounter')

        if(counter){
          for(let i=1; i<=counter; i++){
            let test = JSON.parse(localStorage.getItem(`test-${i}`))

            if(test && test.author.id==this.currentSign.owner && !test.status.isDeleted){
              this.tests.push(test)
            }
          }
        }
      }

    },
    mounted() {
      this.loadTests()
    },
    computed: mapGetters(['currentSign']),
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

.dashboard__empty{
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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