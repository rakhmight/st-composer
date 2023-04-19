<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            small
            dark
            color="#0167FF"
            v-bind="attrs"
            v-on="on"
            >
              + {{ currentLang.dashboardView[3] }}
            </v-btn>
        </template>

        <v-card style="max-height: 600px;overflow-y: scroll;">
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            {{ currentLang.dashboardView[3] }}
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    <div class="d-flex flex-row">
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-pound"
                        v-model="subjectID"
                        :placeholder="currentLang.dashboardView[4]"
                        :error="subjectIsEmpty"
                        v-if="subjectManually"
                        >
                        </v-text-field>
                        <v-select
                        v-else
                        prepend-icon="mdi-pound"
                        :items="subjectsList"
                        label="Выберите предмет"
                        outlined
                        dense
                        v-model="subjectID"
                        :error="subjectIsEmpty"
                        no-data-text="В подписи нет предметов"
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
                            <span v-if="!subjectManually">Набрать вручную</span>
                            <span v-else>Выбрать из списка подписи</span>
                        </v-tooltip>
                    </div>
                    <div>
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-alpha-t-box-outline"
                        v-model="subjectThemes"
                        :placeholder="currentLang.dashboardView[5]"
                        :error="themesIsEmpty"
                        v-if="subjectManually"
                        >
                        </v-text-field>
                        <v-select
                        v-else
                        prepend-icon="mdi-alpha-t-box-outline"
                        :items="themesList"
                        label="Выберите темы"
                        outlined
                        dense
                        v-model="subjectThemes"
                        :error="themesIsEmpty"
                        no-data-text="Сначала выберите предмет"
                        multiple
                        ></v-select>
                    </div>
                    <div>
                        <v-select
                        prepend-icon="mdi-translate"
                        :items="generalLanguages"
                        label="Выберите основной язык тестов."
                        outlined
                        dense
                        v-model="choisedLanguage"
                        :error="choisedLanguageError"
                        hint="Внимание! В дальнейшем нельзя будет изменить!"
                        ></v-select>
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
                        label="Мультиязычный тест"
                        v-model="multiLang"
                        ></v-checkbox>
                    </div>

                    <div>
                        <v-select
                        prepend-icon="mdi-translate"
                        :items="additionalLanguages"
                        label="Дополнительные языки"
                        outlined
                        dense
                        multiple
                        v-model="choisedLanguages"
                        v-show="multiLang"
                        no-data-text="Сначала выберите основной язык"
                        :error="choisedLanguagesError"
                        ></v-select>
                    </div>

                    <div v-if="haveBall" class="pb-2 pt-2">
                        <ball-settings :min="minBall" :max="maxBall" :settingsFunc="changeSettings" :currect="ballIsCurrect" />
                    </div>
                </div>
            </div>

            <div class="test-errors-box">
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
                    v-if="createSuccess"
                    >
                        {{ currentLang.dashboardView[8] }}
                    </v-alert>
            </div>
            

            <v-divider></v-divider>
            <v-card-actions class="d-flex align-items-center flex-column">
                <v-btn
                color="#0167FF"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="add-btn"
                @click="createTest"
                >
                    {{ currentLang.dashboardView[9] }}
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
// import { ValidationProvider} from 'vee-validate'
import VueSlider from 'vue-slider-component'
import BallSettings from '@/components/dialogs/BallSettings.vue'
import 'vue-slider-component/theme/default.css'
import getCurrentDate from '@/plugins/getCurrentDate'
import { mapGetters, mapMutations } from 'vuex'
import putToHistory from '@/services/putToHistory'
import { operationFromStore } from '@/services/localDB'
import crypt from '@/plugins/crypt'

export default {
    props:{
        renderFunc: Function
    },
    data() {
        return {
            dialog: false,
            errors:[],
            blockBtn: false,
            showProgress: false,
            createSuccess: false,

            subjectID: undefined,
            subjectThemes:undefined,

            haveLevel: false,
            haveBall:false,
            minBall: '0.01',
            maxBall: '1',

            ballIsCurrect: false,
            subjectIsEmpty: false,
            themesIsEmpty: false,

            choisedLanguage: undefined,
            choisedLanguages:[],
            multiLang: false,
            generalLanguages: [
                {text:'Русский', value: 'ru'},
                {text:'English', value: 'eng'},
                {text:"O'zbek", value: 'uz_l'},
                {text:'Ўзбек', value: 'uz_k'},
                {text:'Другой', value: 'custom'},
            ],
            additionalLanguages:[],
            choisedLanguageError: false,
            choisedLanguagesError: false,

            subjectsList: [],
            themesList: [],
            subjectManually: false,
        }
    },
    mounted(){
        this.currentSign.subjects.forEach(subject=>{
            this.subjectsList.push({
                text: subject.name.ru,
                value: subject.id
            })
        })
    },
    methods: {
        ...mapMutations(['updateTestsCounter', 'updateTestID', 'clearSign']),

        changeSettings(type, ctx){
            if(type=='min'){
                this.minBall = ctx
            }else if(type=='max'){
                this.maxBall = ctx
            }else if(type=='currect'){
                this.ballIsCurrect = ctx
            }
        },

        createTest(){
            // уровень валидаторов
            if(!this.subjectID){
                this.subjectIsEmpty = true
                return this.errors.push(this.currentLang.validators[0])
            }

            // проверка предмета
            let subject = (this.subjectID.trim())
            if(!subject){
                this.subjectIsEmpty = true
                this.errors.push(this.currentLang.validators[1])
                return
            }
                        
            // проверка тем
            let themes = (''+this.subjectThemes).trim()
            themes = themes.split(',')
            themes.forEach((item, i, arr)=>{
                arr[i] = item.replace(' ', '')
                arr[i] = +item

                if(!arr[i]){
                    this.themesIsEmpty = true
                    return this.errors.push(this.currentLang.validators[2])
                }
            })
            //повторяющиеся темы
            let themesCounter = 0
            for(let i = 0; i!=themes.length; i++){
                for(let j =0; j!=themes.length; j++){
                    if(themes[i]==themes[j]){
                        themesCounter++
                    }
                    if(themes[i]==themes[j] && themesCounter==2){
                        this.themesIsEmpty = true
                        return this.errors.push(this.currentLang.validators[3])  
                    }
                }
                themesCounter=0
            }
            if(this.themesIsEmpty){
                return
            }

            if(!this.choisedLanguage){
                this.choisedLanguageError = true
                this.errors.push('Выберите основной язык тестов')
                return
            }

            if(this.multiLang){
                if(!this.choisedLanguages.length){
                    this.choisedLanguagesError = true
                    this.errors.push('Выберите дополнительные')
                    return
                }
            }
            

            if(!this.subjectThemes){
                this.themesIsEmpty = true
                return this.errors.push(this.currentLang.validators[4])
            }
            if(!this.ballIsCurrect && this.haveBall){
                return this.errors.push(this.currentLang.validators[5]) 
            }

            // уровень сохранения в LS и перехода к тестам
            if(!this.errors.length){
                // показать прогресс
                this.showProgress = true
                this.blockBtn = true

                //♦ выдача даты
                //♦ получение id
                //♦ развёртывание subjectID

                let test = {
                    id: this.currentTestsCounter+1,
                    languagesSettings:{
                        multilingual: false,
                        languages: []
                    },
                    creationDate: getCurrentDate(),
                    lastModified: undefined,
                    author: this.currentSign.id,
                    subjectID: subject,
                    themes: themes,
                    status: { inProcess: true, isSigned: false, isDeleted: false },
                    history:[putToHistory('create', undefined)],
                    signedDate: undefined,
                    questions:[],
                    signHash: this.currentSign.hash
                }
                if(this.haveBall){
                    test.ballSystem = {
                        min: +this.minBall,
                        max: +this.maxBall,
                    }
                }
                if(this.haveLevel){
                    test.considerDifficulty = true
                }
                if(this.multiLang){
                    test.languagesSettings.multilingual = true
                    test.languagesSettings.languages = [this.choisedLanguage, ...this.choisedLanguages]
                }else{
                    test.languagesSettings.languages.push(this.choisedLanguage)
                }

                // зашифровка questions
                test.questions = crypt([], this.currentSign.keys.symmetric.key, this.currentSign.keys.symmetric.iv, this.currentSign.keys.symmetric.algorithm,this.currentSign.keys.symmetric.notation,this.currentSign.keys.symmetric.encoding)

                this.updateTestsCounter(this.currentTestsCounter+1)

                // положить в DB
                operationFromStore('addTest', {data: test})
                .catch(e=>{
                    console.error(this.currentLang.errors[0], e.message)
                    this.clearSign()
                    return this.$router.push('/')
                })

                // устанавливаем новый стейт текущего теста для workspace
                this.updateTestID(test.id)

                setTimeout(()=>{
                    this.renderFunc()
                    this.createSuccess = true

                    setTimeout(()=>{
                        this.showProgress = false
                        this.blockBtn = false

                        this.$router.push(`/workspace`)
                    },1000)
                },2000)
                //♦ отключить прогресс
                // вернуть всё к нач. значениям
                // перейти к созданным тестам
            }
        }
    },
    computed: mapGetters(['currentTestsCounter', 'currentSign', 'currentLang']),
    watch:{
        subjectID(){
            if(this.subjectID.length){
                this.subjectIsEmpty = false
                this.errors = []
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
        subjectThemes(){
            if(this.subjectThemes.length){
                this.themesIsEmpty = false
                this.errors = []
            }
        },
        subjectManually(){
            if(typeof this.subjectThemes === 'string'){
                let themesArr = this.subjectThemes.split(',')
                this.subjectThemes = []
                themesArr.forEach(theme=>{
                    this.subjectThemes.push(+theme.trim())
                })
            }
        },
        ballIsCurrect(){
            if(this.ballIsCurrect && this.haveBall){
                this.errors = []
            }
        },

        choisedLanguage(){
            this.choisedLanguages = []
            this.additionalLanguages = []
            let languages = [
                {text:'Русский', value: 'ru'},
                {text:'English', value: 'eng'},
                {text:"O'zbek", value: 'uz_l'},
                {text:'Ўзбек', value: 'uz_k'},
            ]

            languages.forEach(lang=>{
                if(lang.value!=this.choisedLanguage){
                    this.additionalLanguages.push(lang)
                }
            })

            if(this.choisedLanguage){
                this.choisedLanguageError = false
                this.errors = []
            }
        },

        choisedLanguages(){
            if(this.multiLang){
                if(this.choisedLanguages.length){
                    this.choisedLanguagesError = false
                    this.errors = []
                }
            }
        },

        multiLang(){
            if(!this.multiLang){
                this.errors = []
            }
        }
    },
    components: {
        // ValidationProvider,
        VueSlider,
        BallSettings
    }
}
</script>

<style scoped>
.v-input--selection-controls{
    padding-top:0;
    margin-top:0
}
.add-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
}

.dialog-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.content__subject-box{
    padding: 30px 30px 0 30px;
    width: 100%;
    display: flex;
}
/* .content__template-box{
    padding: 0 30px;
    width: 100%;
} */

.v-dialog > .v-card > .v-card__action{
    padding: 15px;
}
.v-card__actions{
    padding: 15px;
}

.v-list-item{
    padding: 0;
}
.v-application--is-ltr .v-list-group--sub-group .v-list-group__header {
    padding-left: 0;
}

.test-errors-box{
    width: 100%;
    padding: 0 15px;
}
</style>