<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <div
            v-bind="attrs"
            v-on="on"
            class="dashboard__btn"
            >
            <v-icon color="#0167FF" size="19">mdi-pencil-outline</v-icon>
            <span class="ml-1">{{ currentLang.dashboardView[45] }}</span>
            </div>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            {{ currentLang.dashboardView[46] }}
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    
                    <div class="d-flex flex-column">
                        <label class="body-2">{{ currentLang.dashboardView[47] }}:</label>
                        <div class="d-flex flex-row mt-2">
                            <v-text-field
                            dense
                            outlined
                            prepend-icon="mdi-pound"
                            v-model="subjectID"
                            :value="subjectID"
                            :placeholder="currentLang.dashboardView[4]"
                            :error="subjectEr"
                            v-if="subjectManually"
                            >
                            </v-text-field>
                            <v-select
                            v-else
                            menuProps="auto"
                            prepend-icon="mdi-pound"
                            :items="subjectsList"
                            :label="currentLang.additional[5]"
                            outlined
                            dense
                            v-model="subjectID"
                            :error="subjectEr"
                            :no-data-text="currentLang.additional[6]"
                            style="max-width: 95%"
                            ></v-select>

                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="#0167FF"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            icon
                            @click="subjectManually = !subjectManually"
                            class="ml-2"
                            style="margin-top: 2px;"
                            >
                                <v-icon v-if="!subjectManually">mdi-pencil</v-icon>
                                <v-icon v-else>mdi-playlist-check</v-icon>
                            </v-btn>
                        </template>
                            <span v-if="!subjectManually">{{ currentLang.additional[7] }}</span>
                            <span v-else>{{ currentLang.additional[8] }}</span>
                        </v-tooltip>
                        </div>
                    </div>
                    <div>
                        <label class="body-2">{{ currentLang.dashboardView[48] }}:</label>
                        <div class="mt-2">
                            <v-text-field
                            dense
                            outlined
                            prepend-icon="mdi-alpha-t-box-outline"
                            v-model="themes"
                            :value="themes"
                            :placeholder="currentLang.dashboardView[5]"
                            :error="themesEr"
                            v-if="subjectManually"
                            >
                            </v-text-field>
                            <v-select
                            v-else
                            menuProps="auto"                            
                            prepend-icon="mdi-alpha-t-box-outline"
                            :items="themesList"
                            :label="currentLang.additional[9]"
                            outlined
                            dense
                            v-model="themes"
                            :error="themesEr"
                            :no-data-text="currentLang.additional[10]"
                            multiple
                            ></v-select>
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-space-between">
                        <v-checkbox
                        v-model="haveLevel"
                        :label="currentLang.dashboardView[6]"
                        ></v-checkbox>
                        
                        <v-checkbox
                        v-model="haveBall"
                        :label="currentLang.dashboardView[7]"
                        ></v-checkbox>
                    </div>
                    <div>
                        <v-checkbox
                        :label="currentLang.additional[13]"
                        v-model="multiLang"
                        ></v-checkbox>
                    </div>

                    <div>
                        <v-select
                        prepend-icon="mdi-translate"
                        :items="additionalLanguages"
                        :label="currentLang.additional[14]"
                        outlined
                        dense
                        multiple
                        v-model="choisedLanguages"
                        v-show="multiLang"
                        :error="choisedLanguagesError"
                        ></v-select>
                    </div>

                    <div v-if="haveBall" class="pb-2 pt-2">
                        <ball-settings :min="minBall" :max="maxBall" :settingsFunc="changeSettings" />

                        <!-- Использовать для ошибки -->
                        <div class="d-flex flex-row mt-3 align-start">
                            <v-icon color="error" class="mr-2 mt-1">mdi-alert-circle-outline</v-icon>
                            <div style="font-size: 0.9em;">{{ currentLang.dashboardView[49] }}</div>
                        </div>
                    </div>
                </div>
                
            </div>

            <v-divider></v-divider>
            <v-card-actions class="d-flex align-items-center flex-column">

            <div class="dialog-errors-box">
                <v-alert
                color="red"
                dense
                dismissible
                elevation="3"
                type="error"
                class="subtitle-2"
                v-for="(error, i) in errors"
                :key="i"
                >{{ error }}</v-alert>

                <v-alert
                dense
                dismissible
                elevation="3"
                type="success"
                class="subtitle-2"
                v-if="editSuccess"
                >{{ currentLang.dashboardView[50] }}</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0167FF"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="edit-btn"
                @click="saveChanges"
            >
                {{ currentLang.dashboardView[51] }}
            </v-btn>
            </v-card-actions>

            <v-progress-linear
            indeterminate
            color="#0167FF"
            background-color="#85aeea"
            height="5"
            v-if="showProgress"
            ></v-progress-linear>
        </v-card>
    </v-dialog>
</template>

<script>
import BallSettings from '@/components/dialogs/BallSettings.vue'
import putToHistory from '@/services/putToHistory'
import { operationFromStore } from '@/services/localDB'
import { mapGetters } from 'vuex'

export default {
    props:{
        test: Object,
        renderFunc: Function
    },
    data() {
        return {
            dialog: false,
            editSuccess: false,
            errors: [],
            blockBtn: false,
            showProgress: false,

            subjectID: this.test.subjectID,
            themes: undefined,

            minBall: 0.01+'',
            maxBall: 1+'',
            haveLevel: this.test.considerDifficulty,
            haveBall: undefined,

            subjectEr: false,
            themesEr: false,

            ballIsCurrect: false,

            oldSubjectID: this.test.subjectID,
            oldThemes: this.test.themes,
            oldLevel: this.test.considerDifficulty,
            oldMinBall: undefined,
            oldMaxBall: undefined,
            oldInterval: undefined,
            oldBallSystem: undefined,

            subjectManually: false,
            subjectsList: [],
            themesList: [],
            multiLang: this.test.languagesSettings.multilingual,
            oldMultiLang: this.test.languagesSettings.multilingual,
            choisedLanguagesError: false,
            additionalLanguages: [],
            choisedLanguages: [],
            oldChoisedLanguages: this.test.languagesSettings.languages
        }
    },
    computed: mapGetters(['currentLang', 'currentSign']),
    methods:{
        changeSettings(type, ctx){
            if(type=='min'){
                this.minBall = ctx
            }else if(type=='max'){
                this.maxBall = ctx
            }else if(type=='currect'){
                this.ballIsCurrect = ctx
            }
        },

        saveChanges(){
            let counter = 0
            let output = {}
            let history = []

            // валидаторы
            if(!this.subjectID){
                this.subjectEr = true
                return this.errors.push(this.currentLang.validators[0])
            }
            let subject = (''+this.subjectID).trim()
            if(!subject){
                this.subjectEr = true
                return this.errors.push(this.currentLang.validators[1])
            }
            if(!this.themes){
                this.themesEr = true
                return this.errors.push(this.currentLang.validators[4])
            }

            if(this.multiLang && this.choisedLanguages.length<=1){
                this.choisedLanguagesError = true
                return this.errors.push('Выберите дополнительные языки')
            }

            let themes = (''+this.themes).trim()
            themes = themes.split(',')
            themes.forEach((item, i, arr)=>{
                arr[i] = item.replace(' ', '')
                arr[i] = +arr[i]

                if(!arr[i]){
                    this.themesEr = true
                    return this.errors.push(this.currentLang.validators[2])
                }
            })
            // повторяющиеся темы
            let themesCounter = 0
            for(let i = 0; i!=themes.length; i++){
                for(let j =0; j!=themes.length; j++){
                    if(themes[i]==themes[j]){
                        themesCounter++
                    }
                    if(themes[i]==themes[j] && themesCounter==2){
                        this.themesEr = true
                        return this.errors.push(this.currentLang.validators[3])  
                    }
                }
                themesCounter=0
            }

            if(this.haveBall){
                if(!this.ballIsCurrect){
                    return this.errors.push(this.currentLang.validators[5])
                }
            }

            let langsAreChanged = false
            let langsMultipleChanged = false
            output.languagesSettings = this.test.languagesSettings
            this.choisedLanguages.forEach(lang=>{
                let langExist = this.oldChoisedLanguages.indexOf(lang)
                if(langExist==-1){
                    counter++
                    langsAreChanged = true
                }
            })
            this.oldChoisedLanguages.forEach(lang=>{
                let langExist = this.choisedLanguages.indexOf(lang)
                if(langExist==-1){
                    counter++
                    langsAreChanged = true
                }
            })

            if(this.multiLang != this.oldMultiLang){
                counter++
                langsMultipleChanged = true
            }

            if(langsMultipleChanged){
                output.languagesSettings.multilingual = this.multiLang
                if(!this.multiLang){
                    output.languagesSettings.languages = [this.oldChoisedLanguages[0]]
                    this.choisedLanguages = [this.oldChoisedLanguages[0]]
                    history.push(putToHistory('change', 'multilingual-dissabled'))
                } else {
                    history.push(putToHistory('change', 'multilingual-enabled'))
                }
            }

            if(langsAreChanged) {
                output.languagesSettings.languages = this.choisedLanguages
                history.push(putToHistory('change', 'languages', this.oldChoisedLanguages, this.choisedLanguages))
            }


            // наблюдатели изменений и counter
            if(this.subjectID != this.oldSubjectID){
                counter++
                output.subjectID = this.subjectID
                history.push(putToHistory('change', 'subject', this.oldSubjectID, this.subjectID))
            }

            // темы
            let checkThemes = this.themes
            function arrayToString(arr){
                let output = (''+arr).trim()
                output = output.split(',')
                output.forEach((item,i,arr)=>{
                    arr[i] = item.replace(' ', '')
                    arr[i] = +arr[i]
                })

                return output
            }
            
            if(typeof checkThemes==='string'){
                checkThemes = arrayToString(checkThemes)
            }
            if(checkThemes.join(',') != (this.oldThemes.join(',')).replace(' ','')){
                counter++
                output.themes = themes
                history.push(putToHistory('change', 'themes', this.oldThemes, themes))
            }

            if(this.themesEr){
                return
            }

            // проверка уровней
            if(this.oldLevel!=this.haveLevel){
                output.considerDifficulty = this.haveLevel
                counter++
                if(this.haveLevel){
                    history.push(putToHistory('change', 'difficulty-enabled'))
                }else{
                    history.push(putToHistory('change', 'difficulty-dissabled'))
                }
            }

            if(this.haveBall && this.oldMinBall!=this.minBall){
                output.ballSystem={}
                output.ballSystem.min = +this.minBall
                output.ballSystem.max = +this.maxBall
                counter++
                history.push(putToHistory('change', 'minBall', this.oldMinBall, this.minBall))
            }
            if(this.haveBall && this.oldMaxBall!=this.maxBall){
                output.ballSystem={}
                output.ballSystem.min = +this.minBall
                output.ballSystem.max = +this.maxBall
                counter++
                history.push(putToHistory('change', 'maxBall', this.oldMaxBall, this.maxBall))
            }

            if(this.haveBall && this.haveBall!=this.oldBallSystem){
                output.ballSystem={}
                output.ballSystem.min = +this.minBall
                output.ballSystem.max = +this.maxBall
                
                counter++
                history.push(putToHistory('change', 'ball-enabled'))
            }
            if(!this.haveBall && this.haveBall!=this.oldBallSystem){
                output.ballSystem = undefined
                counter++
                this.minBall = 0.01+''
                this.maxBall = 1+''
                history.push(putToHistory('change', 'ball-dissabled'))
            }

            // сохранение
            if(counter){
                let test
                operationFromStore('getByTestID',{id: this.test.id})
                .then(result=>{
                    let historyToPut = [
                        ...result.history,
                        ...history
                    ]
                    test = {
                        ...result,
                        ...output,
                        history:historyToPut
                    }
                })
                .then(()=>{
                    operationFromStore('deleteTest',{id: this.test.id})
                    operationFromStore('addTest',{data:test})
                })
                .catch(e=>{
                console.error(this.currentLang.errors[0], e.message)
                this.$router.push('/')
                })

                this.showProgress = true
                this.blockBtn = true

                setTimeout(()=>{
                    this.editSuccess = true
                    this.showProgress = false
                    this.renderFunc(test)
                    
                    this.oldSubjectID = this.subjectID
                    this.oldThemes = themes
                    this.oldLevel = this.haveLevel
                    this.oldBallSystem = this.haveBall
                    this.oldChoisedLanguages = this.choisedLanguages
                    this.oldMultiLang = this.multiLang
                    this.choisedLanguages = this.choisedLanguages

                    if(this.oldBallSystem){
                        this.oldMinBall = this.minBall
                        this.oldMaxBall = this.maxBall
                    }

                    setTimeout(()=>{
                        this.blockBtn = false
                        this.editSuccess = false
                    },2000)
                },2000)
            }else{
                return this.errors.push(this.currentLang.validators[6])
            }
        }
    },
    watch:{
        ballIsCurrect(){
            if(this.ballIsCurrect && this.haveBall){
                this.errors = []
            }
        },

        subjectID(){
            let themes = this.themes
            this.themes = []
            this.subjectEr = false
            this.errors = []

            if(typeof themes === 'string'){
                let themesArr = themes.split(',')
                themesArr.forEach(theme=>{
                    this.themes.push(+theme.trim())
                })
            } else {
                this.themes = themes
            }

            if(this.currentSign.subjects.length){
                this.themesList = []
                let subject = this.currentSign.subjects.find(subject=> subject.id==this.subjectID)
                subject.themes.forEach(theme=>{
                    this.themesList.push({
                        text: theme.name.ru,
                        value: theme.id
                    })
                })
            }
        },
        subjectManually(){
            if(typeof this.themes === 'string'){
                let themesArr = this.themes.split(',')
                this.themes = []
                themesArr.forEach(theme=>{
                    this.themes.push(+theme.trim())
                })
            }
        },
        multiLang(){
            this.choisedLanguagesError = false
            this.errors = []    
        },
        choisedLanguages(){
            this.choisedLanguagesError = false
            this.errors = []  
        }, 
        themes(){
            this.themesEr = false
            this.errors = []
        },
        haveLevel(){
            this.errors = []
        },
        haveBall(){
            this.errors = []
        },

        dialog(){
            if(!this.dialog){
                this.subjectID = this.oldSubjectID
                this.themes = this.oldThemes
                this.errors = []
            }
        },

        // Будущая валидация мин, макс, интервал
        // minBall(){
        //     if(!isNaN(+this.minBall)){
        //         this.test.questions.filter(el=>{
                    
        //         })
        //     }
        // }
    },
    mounted() {
        if(this.test.languagesSettings.languages[0]!='ru'){
            this.additionalLanguages.push({
                text: 'Русский',
                value: 'ru'
            })
        }
        // if(this.test.languagesSettings.languages[0]!='eng'){
        //     this.additionalLanguages.push({
        //         text: 'English',
        //         value: 'eng'
        //     })
        // }
        if(this.test.languagesSettings.languages[0]!='uz_l'){
            this.additionalLanguages.push({
                text: "O'zbek",
                value: 'uz_l'
            })
        }
        if(this.test.languagesSettings.languages[0]!='uz_k'){
            this.additionalLanguages.push({
                text: 'Ўзбек',
                value: 'uz_k'
            })
        }
        // if(this.test.languagesSettings.languages[0]!='de'){
        //     this.additionalLanguages.push({
        //         text: 'Deutsch',
        //         value: 'de'
        //     })
        // }
        // if(this.test.languagesSettings.languages[0]!='fr'){
        //     this.additionalLanguages.push({
        //         text: 'French',
        //         value: 'fr'
        //     })
        // }
        this.choisedLanguages = this.test.languagesSettings.languages

        if(this.currentSign.subjects.length){
            this.currentSign.subjects.forEach(subject=>{
                this.subjectsList.push({
                    text: subject.name.ru,
                    value: subject.id
                })
            })
            this.themes = this.test.themes

            let subject = this.currentSign.subjects.find(subject=> subject.id==this.subjectID)
            subject.themes.forEach(theme=>{
                this.themesList.push({
                    text: theme.name.ru,
                    value: theme.id
                })
            })
        }

        if(this.test.considerDifficulty){
            this.haveLevel =  true
        }

        if(this.test.ballSystem){
            this.oldMinBall=this.minBall = this.test.ballSystem.min+''
            this.oldMaxBall=this.maxBall = this.test.ballSystem.max+''
            this.haveBall = true
            this.oldBallSystem = true
        }else{
            this.haveBall = false
            this.oldBallSystem = false
        }
    },
    components:{
        BallSettings
    }
}
</script>

<style scoped>
::-webkit-scrollbar {
    width: 6px; /* ширина для вертикального скролла */
    background-color: #b9b9b9;
}
.v-input--selection-controls{
    padding-top:0;
    margin-top:0
}
.edit-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
} 

.dialog-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 50vh;
    overflow-y: auto;
    overflow-x: hidden
}
.content__subject-box{
    padding: 30px;
    width: 100%;
    display: flex;
}
.content__template-box{
    padding: 30px;
    width: 100%;
}

.v-dialog > .v-card > .v-card__action{
    padding: 15px;
}
.v-card__actions{
    padding: 15px;
}

.v-select-list{
    overflow-y: auto;
    max-height: 200px;
}
</style>