<template>
  <div class="wrapper" v-if="currentSign">
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
              <h2>{{ currentSign.fullName }}</h2>
              <p style="color:#615f5f">{{ currentLang.dashboardView[0] }}: {{ tests.length }}</p>
            </div>
          </div>
          <div class="d-flex flex-row" style="gap: 15px">
            <div class="dashboard__import-btn">
              <import-test :renderFunc="loadTests" />
            </div>
            <div class="dashboard__create-btn">
              <create-test :renderFunc="loadTests" />
            </div>
          </div>
        </div>

        <v-divider width="100%" color="#ccc" class="mt-3 mb-3"></v-divider>

        <div class="dashboard__content">
          <div class="dashboard__content-info d-flex justify-space-between">
            <h4 class="">{{ currentLang.dashboardView[1] }}</h4>

            <!-- INSTRUCTION -->
            <to-instruction :asyncComplate="true" :saveProcessFinally="{value:false}"></to-instruction>

          </div>

          <div class="d-flex justify-center mt-10" v-if="loader">
            <v-progress-circular
            :size="40"
            :width="3"
            color="#0167ff"
            indeterminate
            ></v-progress-circular>
          </div>

          <div class="dashboard__saved" v-if="tests.length && !loader">
            <work-card
            v-for="(test) in tests"
            :key="test.id"
            :id="test.id"
            :status="test.status"
            :test="test"

            :renderFunc="loadTests"
            />

          </div>

          <div v-if="!tests.length && !loader" class="dashboard__empty mt-5">
            <v-img
            max-height="120"
            max-width="120"
            src="@/assets/media/spider-web.png"
            contain
            transition="scale-transition"
            ></v-img>
              <h4 style="color:#888" class="mt-5">{{ currentLang.dashboardView[2] }}</h4>
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
import ImportTest from '@/components/dialogs/ImportTest.vue'
import { mapGetters, mapMutations } from 'vuex'
import { operationFromStore } from '@/services/localDB'

  export default {
    data() {
      return {
        tests: [],
        loader: true
      }
    },
    mounted() {
      if(!this.currentSign){
        return this.$router.push('/')
      }

      this.loadTests()
    },
    methods:{
      ...mapMutations(['clearSign']),
      loadTests(){
        operationFromStore('getAllTests', {sort:{author:this.currentSign.id, isDeleted:false}})
        .then(result=>{
          this.tests = result
          this.loader=false
        })
        .catch(e=>{
          console.error(this.currentLang.errors[0], e.message)
          this.clearSign()
          return this.$router.push('/')
        })
      }
    },
    computed: mapGetters(['currentSign', 'currentLang']),
    components:{
      WorkCard,
      ToInstruction,
      CreateTest,
      ImportTest
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
.dashboard__btn{
    padding: 4px 10px;
    font-size: 0.95em;
}
.dashboard__btn:hover{
    background-color: #0000000f;
}
</style>