<template>
    <div class="work" v-if="!status.isDeleted">
      <div class="work__content d-flex">
        <div class="work__logo d-flex flex-column justify-content-center justify-center">
          <v-img
          v-if="!status.isSigned"
          src="@/assets/media/work.png"
          contain
          max-width="40"
          ></v-img>

          <!-- isSigned -->
          <v-img
          v-if="status.isSigned"
          src="@/assets/media/work-complete.png"
          contain
          max-width="40"
          ></v-img>

          <v-tooltip left color="error" v-if="status.isSigned">
            <template v-slot:activator="{ on, attrs }">
              <div class="clear mb-1" 
                v-bind="attrs"
                v-on="on"> 
                  <v-icon size="20" color="#ff4500">mdi-delete</v-icon>
                  4
                  <!--  -->
              </div>
            </template>
            <span>{{ currentLang.dashboardView[10] }}: 4{{ currentLang.dashboardView[11] }}</span>
          </v-tooltip>
          <!--  -->

        </div>
        <div class="work__info d-flex justify-content-center">
          <table>
            <tr style="overflow-x: hidden;">
              <td>{{ currentLang.dashboardView[12] }}:</td>
              <td style="color:#0167FF;"><div style="width:91px;overflow-x: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ getSubject(test.subjectID) }}</div></td>
            </tr>
            <tr>
              <td style="opacity:0">space</td>
            </tr>
            <tr>
              <td>{{ currentLang.dashboardView[13] }}:</td>
              <td style="color:#0167FF">{{ test.creationDate.date }}</td>
            </tr>
            <tr v-if="!status.isSigned">
              <td>{{ currentLang.dashboardView[14] }}:</td>
              <td style="color:#0167FF">{{ test.lastModified ? `${test.lastModified.date}` : '-' }}</td>
            </tr>

            <!-- isSigned -->
            <tr v-else>
              <td style="color:orangered">{{ currentLang.dashboardView[15] }}:</td>
              <td style="color:orangered">{{ test.signedDate.date }}</td>
            </tr>
            <!--  -->

          </table>
        </div>
      </div>
      <div class="work__menu d-flex justify-space-between">
        <v-tooltip bottom color="#00000073">
          <template v-slot:activator="{ on, attrs }">
            <v-menu offset-y max-width="140" v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    height="31"
                    text
                    v-bind="attrs"
                    v-on="on"
                    >
                  <v-icon color="#304654">mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <info-test :id="testID" :test="currentTest" />
                  <saved-tests :id="testID"/>
                  <edit-test :test="currentTest" :renderFunc="renderTests"/>
                  <test-history :test="currentTest"/>
                  <delete-test :test="currentTest" :renderFunc="renderTests" />
                </v-list>
            </v-menu>
          </template>
          <span>{{ currentLang.dashboardView[16] }}</span>
        </v-tooltip>

        <div class="d-flex align-center justify-center">
          <v-tooltip bottom color="#00000073" v-if="!invalidHash">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                height="31"
                text
                body-2
                @click="goToWorkspace"
                >
                <v-icon color="#0167FF" size="22">mdi-arrow-top-right</v-icon>
              </v-btn>
            </template>
            <span>{{ currentLang.dashboardView[17] }}</span>
          </v-tooltip>

          
          <v-tooltip bottom color="warning" v-else>
            <template v-slot:activator="{ on, attrs }">
              <div
              style="width: 50px;"
              class="d-flex justify-center"
              >
                <v-icon
                v-bind="attrs"
                v-on="on"
                color="warning"
                >
                  mdi-alert
                </v-icon>
              </div>
            </template>
            <span style="color: #111"><b>Тест зашифрован другим ключом</b></span>
          </v-tooltip>
        </div>
      </div>
    </div>
</template>

<script>
import InfoTest from './dialogs/InfoTest.vue'
import SavedTests from './dialogs/SavedTests.vue'
import EditTest from './dialogs/EditTest.vue'
import TestHistory from './dialogs/TestHistory.vue'
import DeleteTest from '@/components/dialogs/DeleteTest.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  props:{
    id:Number,
    status: Object,
    test: Object,
    renderFunc: Function,
  },
  data() {
    return {
      testID: this.id,
      testStatus: this.status,
      currentTest: this.test,
      invalidHash: false
    }
  },
  computed: mapGetters(['currentLang', 'currentSign']),
  methods:{
    ...mapMutations(['updateTestID']),
    renderTests(ctx){
      this.renderFunc()
      this.currentTest = ctx
    },

    goToWorkspace(){
      this.updateTestID(this.testID)
      this.$router.push(`/workspace`)
    },

    getSubject(id){
      const subject = this.currentSign.subjects.find(subject=> subject.id==id)

      if(subject){
        return subject.name.ru
      }else {
        return id
      }
    }
  },
  mounted(){
    if(this.test.signHash != this.currentSign.hash){
      this.invalidHash = true
    }
  },
  components:{
    InfoTest,
    SavedTests,
    DeleteTest,
    EditTest,
    TestHistory
  }
}
</script>

<style scoped>
.work{
  width: 250px;
  height: 150px;
  background-color: rgb(240, 240, 240);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  transition: box-shadow 0.2s ease-in-out;
}
.work:hover{
  box-shadow: 0px 6px 8px -1px rgb(0 0 0 / 20%), 0px 8px 9px 0px rgb(0 0 0 / 14%), 0px 5px 14px 0px rgb(0 0 0 / 12%);
}

.work__content{
height: 100%;
padding: 15px 10px 0;
}
.work__logo{
  height: 100%;
  width: 60px;
  opacity: 0.5;
}
.work__info{
  width: 100%;
  margin-left: 15px;
}

.work__menu{
  width: 100%;
  height: 32px;
  display: grid;
  border-top: 1px solid rgb(156, 156, 156);
  grid-template-columns: 1fr 1fr 1fr 1.5fr;
  background-color: rgb(212, 212, 212);
}

.work__item:hover{
background-color: rgb(224, 224, 224);
}
.work__item:not(:first-child){
  border-left: 1px solid rgb(156, 156, 156);
}

.work__info>table{
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
}

.clear{
  font-size: 0.8em;
  color:#ff4500
}
</style>