<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">

            <v-btn
                v-bind="attrs"
                v-on="on"
              small
              color="#0C2242"
              >
              <v-icon color="#fff" size="19">mdi-file-download-outline</v-icon>
              <span style="color:#fff">{{ currentLang.additional[23] }}</span>
            </v-btn>

        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            {{ currentLang.additional[23] }}
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">

                <v-file-input
                    style="width: 100%;"
                    accept="application/json"
                    show-size
                    counter
                    clearable
                    :label="currentLang.additional[24]"
                    dense
                    outlined
                    v-model="testFile"
                    @change="handleTestUpload()"
                    :error="fileError.status"
                    :error-messages="fileError.msg"
                    :loading="loadFile"
                    color="var(--main-color)"
                    ></v-file-input>

            </div>

            <v-divider></v-divider>

            <v-card-actions class="d-flex align-items-center flex-column">
            
                <v-btn
                    :color="blockBtn ? '#eee': 'var(--main-color)'"
                    small
                    justify="center"
                    width="200"
                    :disabled="blockBtn"
                    @click="importTest()"
                >
                    <span style="color: #fff" v-if="!loader">{{ currentLang.additional[24] }}</span>
                    <v-progress-circular
                        :width="1"
                        size="15"
                        color="var(--main-color)"
                        indeterminate
                        v-else
                    ></v-progress-circular>
                </v-btn>
                
                <v-spacer></v-spacer>

                <div class="dialog-alert-box mt-3" style="width:100%">
                    <v-alert
                    style="width: 100%"
                    color="var(--main-color)"
                    dense
                    dismissible
                    elevation="3"
                    class="subtitle-2"
                    v-if="success"
                    >
                    <span style="color: #fff">{{ currentLang.additional[25] }}</span>
                    </v-alert>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import putToHistory from '@/services/putToHistory'
import getCurrentDate from '@/plugins/getCurrentDate'
import { operationFromStore } from '@/services/localDB'
import { mapGetters, mapMutations } from 'vuex'

export default {
    props:{
        renderFunc: Function
    },
    data() {
        return {
            dialog: false,
            blockBtn: true,
            loader: false,
            loadFile: false,
            success: false,
            fileError: {
                value: false,
                msg: undefined
            },

            testFile: undefined,
            testToImport: undefined
        }
    },
    computed: mapGetters(['currentTestsCounter', 'currentSign', 'currentLang']),
    methods:{
        ...mapMutations(['updateTestsCounter', 'clearSign', 'updateTestID']),

        async importTest(){
            if(this.testToImport){
                this.loader = true
                this.blockBtn = true

                // проверка signHash && author из подписи
                if(this.currentSign.id != this.testToImport.author){
                    this.loader = false
                    this.fileError.value = true
                    this.fileError.msg = 'Вы не являетесь автором тестов'
                    return
                }
                if(this.currentSign.signHash != this.testToImport.signhash){
                    this.loader = false
                    this.fileError.value = true
                    this.fileError.msg = 'Не совпадает подпись'
                    return
                }

                const testHistory = this.testToImport.history.map(item=>{
                    const history = item

                    if(history.type=='create'){
                        const date = new Date(history.date)
                        history.date = {}
                        history.date.time = `${date.getHours()}:${date.getMinutes()}`
                        if((date.getMonth()+1)<9){
                            history.date.date = `${date.getDay()}.0${date.getMonth()+1}.${date.getFullYear()}`
                        } else {
                            history.date.date = `${date.getDay()}.${date.getMonth()+1}.${date.getFullYear()}`
                        }
                        history.date.full = date

                        return history
                    } else {
                        history.date = new Date(history.date)
                        return history
                    }
                })
                
                // создаём нов экземпляр теста в DB                
                const newTestInDb = {
                    id: this.currentTestsCounter+1,
                    author: this.testToImport.author,
                    questions: this.testToImport.questions,
                    subjectID: this.testToImport.params.subject,
                    themes: this.testToImport.params.themes,
                    languagesSettings: this.testToImport.params.languagesSettings,
                    ballSystem: this.testToImport.params.ballSystem ? this.testToImport.params.ballSystem : undefined,
                    considerDifficulty: this.testToImport.params.considerDifficulty ? this.testToImport.params.considerDifficulty :undefined,
                    history: [
                        ...testHistory,
                        putToHistory('import'),
                    ],
                    testInfo: this.testToImport.testInfo,
                    signHash: this.testToImport.signHash,
                    status: {
                        inProcess: true,
                        isDeleted: false,
                        isSigned: false
                    },
                    signedDate: undefined,
                    creationDate: getCurrentDate(),
                    lastModified: undefined
                }

                if(this.testToImport.remarks) newTestInDb.remarks = this.testToImport.remarks
                if(this.testToImport.testImage) newTestInDb.testImage = this.testToImport.testImage
                
                this.updateTestsCounter(this.currentTestsCounter+1)

                await operationFromStore('addTest', {data: newTestInDb})
                .then(()=>{
                    this.loader = false
                    this.blockBtn = true
                    this.success = true
                    
                    this.renderFunc()
                    this.updateTestID(this.currentTestsCounter)

                    setTimeout(()=>{
                        this.success = false
                        this.loadFile = undefined
                        this.testToImport = undefined
                        
                        this.$router.push(`/workspace`)
                    },3000)
                })
                .catch(e=>{
                    console.error(this.currentLang.errors[0], e.message)
                    this.clearSign()
                    return this.$router.push('/')
                })
                
            }
        },

        handleTestUpload(){
            this.blockBtn = true
            this.loadFile = true
            this.fileError.status = false
            this.fileError.msg = undefined

			let reader  = new FileReader()

            reader.addEventListener("load", function () {
                this.loadFile= false
                const test = JSON.parse(reader.result)
                // куча проверок
                if(test){
                    //if(test.author && typeof test.author == 'string' && test.fileDate && typeof test.fileDate == 'number' && test.history && typeof test.history == 'object' && test.id && typeof test.id == 'number' && test.params && typeof test.params == 'object' && test.questions && typeof test.questions == 'string' && test.signHash && typeof test.signHash == 'string' && test.testInfo && typeof test.testInfo == 'object' && test.remarks && typeof test.remarks == 'object' && test.testImage && typeof test.testImage == 'string'){
                    if(test.author && typeof test.author == 'string' && test.author == this.currentSign.id && test.fileDate && typeof test.fileDate == 'number' && test.history && typeof test.history == 'object' &&test.id && typeof test.id == 'number' && test.params && typeof test.params == 'object' && test.questions && typeof test.questions == 'string' && test.signHash && typeof test.signHash == 'string' && test.testInfo && typeof test.testInfo == 'object'){
                        this.blockBtn = false
                        this.testToImport = test
                        return
                    } else {
                        this.fileError.status = true
                        this.fileError.msg = 'Некорректный формат теста'
                        return
                    }
                }
			}.bind(this), false)

            if(this.testFile){
                if ( /\.(json)$/i.test( this.testFile.name ) ) {
					reader.readAsText(this.testFile)
				} else{
                    this.fileError.status = true
                    this.fileError.msg = 'Некорректный формат теста'
                    return
                }
            } else {
                this.loadFile= false
                return
            }
        }
    },
    watch:{
        dialog(){
            if(this.loader == true){
                this.dialog = true
            }
        }
    }
}
</script>

<style scoped>
.dialog-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 15px;
}

.v-dialog > .v-card > .v-card__action{
    padding: 15px;
}
.v-card__actions{
    padding: 15px;
}
.v-list{
  padding: 0;
}
.v-dialog{
  overflow: hidden;
}
</style>