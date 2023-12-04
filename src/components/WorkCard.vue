<template>
    <div class="work" v-if="!status.isDeleted">
      <div class="work__content d-flex">
        <div class="w-full h-full d-flex flex-column">
          <div class="work__logo">
            <v-img
            v-if="!status.isSigned && !status.isExported"
            src="@/assets/media/work.png"
            contain
            max-width="35"
            style="opacity: 0.5;"
            ></v-img>
            <v-img
            v-if="!status.isSigned && status.isExported"
            src="@/assets/media/exported.png"
            contain
            max-width="35"
            style="opacity: 0.5;"
            ></v-img>

            <!-- isSigned -->
            <v-img
            v-if="status.isSigned"
            src="@/assets/media/work-complete.png"
            contain
            max-width="35"
            style="opacity: 0.9;"
            ></v-img>
          </div>

          <div class="d-flex" style="gap: 7px">
            <v-tooltip left color="error" v-if="status.isSigned">
              <template v-slot:activator="{ on, attrs }">
                <div class="clear mb-1" 
                  v-bind="attrs"
                  v-on="on"> 
                    <v-icon size="16" color="#ff4500">mdi-delete</v-icon>
                    {{ getDelTime() }}
                </div>
              </template>
              <span>{{ currentLang.dashboardView[10] }}: {{ getDelTime() }} {{ currentLang.dashboardView[11] }}</span>
            </v-tooltip>
            
            <v-tooltip left color="info" v-else>
              <template v-slot:activator="{ on, attrs }">
                <div class="del-info mb-1" 
                  v-bind="attrs"
                  v-on="on"> 
                    <v-icon size="16" color="#888">mdi-delete</v-icon>
                    {{ getMainDelTime() }}
                </div>
              </template>
              <span>{{ currentLang.dashboardView[10] }}: {{ getMainDelTime() }} {{ currentLang.dashboardView[11] }}</span>
            </v-tooltip>
            <!--  -->
            <v-tooltip left color="error" v-if="test.remarks && test.remarks.length">
              <template v-slot:activator="{ on, attrs }">
                <div class="clear mb-1" 
                  v-bind="attrs"
                  v-on="on"> 
                    <v-icon size="16" color="#ff4500">mdi-alert-circle</v-icon>
                    {{ test.remarks.length }}
                </div>
              </template>
              <span>{{ currentLang.additional[2] }}: {{ test.remarks.length }}</span>
            </v-tooltip>
          </div>

        </div>
        <div class="work__info d-flex justify-content-center">
          <table>
            <tr style="overflow-x: hidden;">
              <td>{{ currentLang.dashboardView[12] }}:</td>
              <td style="color:#0167FF;text-align: left;"><div style="width:91px;overflow-x: hidden;white-space: nowrap;text-overflow: ellipsis;"> {{ getSubject(test.subjectID) }}</div></td>
            </tr>
            <tr>
              <td style="opacity:0">space</td>
            </tr>
            <tr>
              <td>{{ currentLang.dashboardView[13] }}:</td>
              <td style="color:#0167FF;">{{ test.creationDate.date }}</td>
            </tr>
            <tr v-if="!status.isSigned">
              <td>{{ currentLang.dashboardView[14] }}:</td>
              <td style="color:#0167FF">{{ test.lastModified ? `${test.lastModified.date}` : '-' }}</td>
            </tr>

            <!-- isSigned -->
            <tr v-else>
              <td style="color:#0C2242">{{ currentLang.dashboardView[15] }}:</td>
              <td style="color:#0C2242">{{ getSignedDate() }}</td>
            </tr>
            <!--  -->

          </table>
        </div>
      </div>
      <div class="work__menu d-flex justify-space-between">
        <v-tooltip bottom color="#00000073">
          <template v-slot:activator="{ on, attrs }">
            <v-menu offset-y max-width="200" v-bind="attrs" v-on="on">
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
                  <div
                  class="dashboard__btn flex align-center"
                  style="cursor: pointer;"
                  v-if="test.status.isSigned"
                  @click="uploadTest()"
                  >
                  <v-icon color="#0C2242" size="19">mdi-file-upload-outline</v-icon>
                  <span class="ml-1">{{ currentLang.additional[1] }}</span>
                  </div>
                  <div
                  class="dashboard__btn flex align-center"
                  style="cursor: pointer;"
                  @click="exportTest()"
                  v-if="!test.status.isSigned"
                  >
                  <v-icon color="#0C2242" size="19">mdi-file-export</v-icon>
                  <span class="ml-1">{{ currentLang.additional[104] }}</span>
                  </div>
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
import { operationFromStore } from '@/services/localDB'
import getCurrentDate from '@/plugins/getCurrentDate'

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
    getSignedDate(){
      if((this.test.signedDate.getMonth()+1) < 9){
        return `${this.test.signedDate.getDate()}.0${this.test.signedDate.getMonth()+1}.${this.test.signedDate.getFullYear()}`
      } else{
        return `${this.test.signedDate.getDate()}.${this.test.signedDate.getMonth()+1}.${this.test.signedDate.getFullYear()}`
      }
    },
    getMainDelTime(){
      if(this.test.status.isExported){
        let time = (this.test.creationDate.full.getTime()+864000000) - new Date()
        return Math.round(time / 86400000)
      } else {
        let time = (this.test.creationDate.full.getTime()+5184000000) - new Date()
        return Math.round(time / 86400000)
      }
    },
    getDelTime(){
      let time = (this.test.signedDate.getTime()+1296000000) - new Date()
      return Math.round(time / 86400000)
    },
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
    },

    async uploadTest(){
      await operationFromStore('getSigned', { id: this.test.id })
      .then(data=>{
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `test-${this.test.subjectID}-${data.fileDate}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      })
    },

    async exportTest(){
      await operationFromStore('getByTestID', { id: this.test.id })
      .then(data=>{
        const fileDate = getCurrentDate()
        const test = {
          id: data.id,
          author: data.author,
          questions: data.questions,
          params: {
            subject: data.subjectID,
            themes: data.themes,
            languagesSettings: data.languagesSettings,
          },
          fileDate,
          history: data.history,
          testInfo: data.testInfo,
          signHash: data.signHash,
          status: {
              inProcess: true,
              isDeleted: false,
              isSigned: false,
              isExported: true
          }
        }

        if(data.ballSystem) test.params.ballSystem = data.ballSystem
        if(data.considerDifficulty) test.params.considerDifficulty = data.considerDifficulty
        if(data.remarks && data.remarks.length) test.remarks = data.remarks

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(test));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `exported-test-${this.test.subjectID}-${Date.now()}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      })
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
  display: flex;
  flex-direction: column;
  align-items: center;

}
.work__info{
  width: 100%;
  margin-left: 15px;
  overflow: hidden;
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
  font-size: 0.85em;
}

.clear{
  font-size: 0.75em;
  color:#ff4500;
  display: flex;
  align-items: center;
  gap: 4px
}
.del-info{
  font-size: 0.75em;
  color:#888;
  display: flex;
  align-items: center;
  gap: 4px
}
</style>