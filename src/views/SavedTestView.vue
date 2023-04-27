<template>
    <div class="wrapper">
        <div class="container">
            <div class="saved">
                <div class="saved__sidebar">
                    <div>
                        <div class="d-flex flex-row align-center justify-space-between" style="background-color: #0d5fd8;padding:7px 5px;border-radius: 5px 5px 0 0;">
                            <div class="d-flex flex-row align-center">
                                <v-icon size="20" color="#fff" class="mr-1">
                                    mdi-content-paste
                                </v-icon>
                                <h4 style="color:#fff">{{ currentLang.savedTestView[0] }}</h4>
                            </div>
                        </div>
                        <div v-if="questions.length==0 && !loader" class="saved__map-empty d-flex flex-column justify-center align-center" style="border-radius: 0 0 5px 5px;">
                            <v-img
                            max-height="120"
                            max-width="120"
                            src="@/assets/media/no-questions.png"
                            contain
                            transition="scale-transition"
                            style="opacity: 0.5;"
                            ></v-img>
                        </div>
                        <div class="saved__map" v-if="questions.length && !loader">
                            <div class="map-elem"
                            > 
                                <v-simple-table dense>
                                    <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                
                                            </th>
                                            <th class="text-left">
                                                #
                                            </th>
                                            <th class="text-left">
                                                Вопрос
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="cursor: pointer;"
                                        v-for="(question,i) in questions"
                                        :key="question.id"
                                        :to-question="question.id"
                                        class="map-orient"
                                        >
                                            <td style="width:20px">
                                                <test-type-icons :type="question.type" :questionID="question.id" :questions="questions"/>
                                            </td>
                                            <td style="color:#000">{{ i+1 }}</td>
                                            <td>
                                                <p class="body-2 map-small" style="color:#484848">
                                                    <span v-if="question.questionCtx.ru || question.questionCtx.eng || question.questionCtx.uz_l || question.questionCtx.uz_k || question.questionCtx.custom">{{ getCurrentQuestion(question.questionCtx) }}</span>
                                                    <span style="color:#888;" v-else>Не заполнено</span>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                            </div>
                        </div>
                        <div style="height: 237px; background-color: #aaaaaa80; border-radius: 0 0 5px 5px;" v-if="loader" class="d-flex justify-center align-center">
                            <v-progress-circular
                            :size="50"
                            :width="5"
                            color="#888"
                            indeterminate
                            ></v-progress-circular>
                        </div>
                    </div>

                    <v-btn
                    small
                    width="270"
                    color="#0d5fd8"
                    dark
                    class="mt-5"
                    @click="goToBack"
                    >
                        <v-icon color="#fff" class="mr-1">mdi-arrow-left-thin</v-icon>
                        {{ currentLang.savedTestView[1] }}
                    </v-btn>

                   <!--  -->
                   <presave-test :state="initPresave" :saving="saving" :asyncComplate="asyncComplate"/>
                </div>

                <div class="saved__sidebar-box"></div>
                
                <div class="saved__content">

                    <div class="d-flex justify-center" style="margin-top:200px" v-if="loader">
                        <v-progress-circular
                        :rotate="360"
                        :size="100"
                        :width="10"
                        :model-value="loaderValue"
                        color="#0167ff"
                        >
                        {{ loaderValue }} %
                        </v-progress-circular>
                    </div>

                    <!-- ШАБЛОН ВОПРОСА -->
                    <saved-question
                    v-for="(question,i) in questions"
                    :question="question"
                    :serialNumber="i+1"
                    :key="i"
                    :questions="questions"
                    :testParams="testParams"
                    />
                    <!--  -->

                    <div v-if="questions.length==0 && !loader" class="d-flex flex-column justify-center align-center" style="height:400px;background-color: #aaaaaa80;border-radius: 5px;">
                        <v-img
                        max-height="200"
                        max-width="200"
                        src="@/assets/media/spider-web.png"
                        contain
                        transition="scale-transition"
                        ></v-img>
                        <h2 style="color:#888" class="mt-5">{{ currentLang.savedTestView[2] }}</h2>
                        <h4 style="color:#888">{{ currentLang.savedTestView[3] }}</h4>
                    </div>

                </div>

                <div class="saved__tools-box" :style="!showFullInfo ? 'height: 64px' : 'height: 300px'">
                    <div class="d-flex flex-row align-center justify-space-between" style="width: 100%">
                        <div style="width: 100%" v-if="!showFullInfo">
                            <div class="d-flex flex-row">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-comment-outline</v-icon>
                                <div class="small-comment"><span style="color:#bbb">{{ currentLang.savedTestView[4] }}: </span>
                                    {{ savingComment }}
                                    <v-progress-circular
                                    v-if="loader"
                                    :size="18"
                                    :width="1"
                                    color="#fff"
                                    indeterminate
                                    ></v-progress-circular>
                                    </div>
                            </div>
                            <div class="d-flex flex-row">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-calendar-range</v-icon>
                                <div><span style="color:#bbb">{{ currentLang.savedTestView[5] }}: </span>
                                    {{ savingDate.date }} {{ savingDate.time }}
                                    <v-progress-circular
                                    v-if="loader"
                                    :size="18"
                                    :width="1"
                                    color="#fff"
                                    indeterminate
                                    ></v-progress-circular>
                                </div>
                            </div>
                        </div>

                        <div v-if="showFullInfo" class="d-flex flex-row">
                            <v-icon color="#fff" class="mr-1" size="19">mdi-information-outline</v-icon>
                            {{ currentLang.savedTestView[6] }}
                        </div>
                        
                        <div class="d-flex flex-row align-center">
                            <v-btn
                            small
                            class="mr-2"
                            color="error"
                            v-if="showDeleteBtn"
                            @click="deleteSaving"
                            >
                            {{ currentLang.savedTestView[7] }}
                            </v-btn>

                            <div class="mr-10" v-if="asyncComplate">
                                <v-tooltip top color="error">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                    v-bind="attrs"
                                    v-on="on"
                                    color="error"
                                    size="25"
                                    @click="showDeleteBtn=true"
                                    >
                                    mdi-delete-outline
                                    </v-icon>
                                </template>
                                <span>{{ currentLang.savedTestView[8] }}</span>
                                </v-tooltip>
                            </div>

                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                v-if="!showFullInfo"
                                v-bind="attrs"
                                v-on="on"
                                color="#fff"
                                size="30"
                                @click="showFullInfo=!showFullInfo"
                                >
                                mdi-chevron-up
                                </v-icon>
                                <v-icon
                                v-else
                                v-bind="attrs"
                                v-on="on"
                                color="#fff"
                                size="30"
                                @click="showFullInfo=!showFullInfo"
                                >
                                mdi-chevron-down
                                </v-icon>
                            </template>
                            <span v-if="!showFullInfo">{{ currentLang.savedTestView[9] }}</span>
                            <span v-else>{{ currentLang.savedTestView[10] }}</span>
                            </v-tooltip>
                        </div>
                    </div>

                    <!-- Подробно -->
                    <v-divider color="#fff" class="mt-2"></v-divider>
                    
                    <div v-if="loader" class="d-flex justify-center align-center" style="width: 100%; height: 100%;">
                        <v-progress-circular
                        :size="50"
                        :width="3"
                        color="#fff"
                        indeterminate
                        ></v-progress-circular>
                    </div>

                    <div class="mt-3 info-content" v-if="!loader">
                        <div>
                            <div class="d-flex flex-row align-start">
                                <v-icon color="#fff" class="mr-1 mt-1" size="19">mdi-comment-outline</v-icon>
                                <div class=""><span style="color:#bbb">{{ currentLang.savedTestView[11] }}:</span> {{ savingComment }}</div>
                            </div>
                            <div class="d-flex flex-row mt-1">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-calendar-range</v-icon>
                                <div><span style="color:#bbb">{{ currentLang.savedTestView[12] }}:</span> {{ savingDate.date }} {{ savingDate.time }}</div>
                            </div>
                            <div class="d-flex flex-row mt-3">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-pound</v-icon>
                                <div><span style="color:#bbb">{{ currentLang.savedTestView[13] }}:</span> {{ testParams.subjectID ? getSubject(testParams.subjectID) : 'null' }}</div>
                            </div>
                            <div class="d-flex flex-row mt-1">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-pound</v-icon>
                                <div><span style="color:#bbb">{{ currentLang.savedTestView[14] }}:</span> {{ testParams.themes ? getThemes(testParams.subjectID, testParams.themes) : 'null' }}</div>
                            </div>
                            <div class="d-flex flex-row mt-1">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-translate</v-icon>
                                <div><span style="color:#bbb">Языки:</span> {{ testParams.languagesSettings ? getLanguages(testParams.languagesSettings.languages) : 'null' }}</div>
                            </div>
                        </div>

                        <v-divider color="#fff" class="mt-2" vertical></v-divider>

                        <div>
                            <div class="d-flex flex-column mt-1">
                                <div class="d-flex flex-row">
                                    <v-icon color="#fff" class="mr-1" size="19">mdi-help-circle-outline</v-icon>
                                    <div><span style="color:#bbb">{{ currentLang.savedTestView[15] }}:</span> {{ questions.length }}</div>
                                </div>
                                <div class="ml-5">
                                    <div><span style="color:#bbb">• {{ currentLang.savedTestView[16] }}:</span> {{ basicQuestions }}</div>
                                    <div><span style="color:#bbb">• {{ currentLang.savedTestView[17] }}:</span> {{ questionsWithImages }}</div>
                                    <div><span style="color:#bbb">• {{ currentLang.savedTestView[18] }}:</span> {{ questionWithField }}</div>
                                </div>
                            </div>

                            <div class="d-flex flex-row mt-3" v-if="testParams.considerDifficulty">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-check-circle</v-icon>
                                <div>{{ currentLang.savedTestView[19] }}</div>
                            </div>

                            <div class="d-flex flex-column mt-3" v-if="testParams.ballSystem">
                                <div class="d-flex flex-row">
                                    <v-icon color="#fff" class="mr-1" size="19">mdi-check-circle</v-icon>
                                    <div>{{ currentLang.savedTestView[20] }}</div>
                                </div>
                                <div class="d-flex flex-row justify-space-between flex-wrap">
                                    <div>
                                        <v-icon color="#fff" size="19" class="mr-1">mdi-minus</v-icon>
                                        <span style="color:#bbb">{{ currentLang.savedTestView[21] }}:</span>
                                        {{ testParams.ballSystem.min }}
                                    </div>
                                    <div><v-icon color="#fff" size="19" class="mr-1">mdi-plus</v-icon><span style="color:#bbb">{{ currentLang.savedTestView[23] }}:</span>  {{ testParams.ballSystem.max }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TestTypeIcons from '@/components/tests/TestTypeIcons.vue'
import SavedQuestion from '@/components/saved/SavedQuestion.vue'
import PresaveTest from '@/components/dialogs/PresaveTest.vue'
import { operationFromStore } from '@/services/localDB'
import encrypt from '@/plugins/encrypt'
import { getSubject, getAuthor, getThemes, getLanguages } from '@/plugins/getInfo'

export default {
    data() {
        return {
            initPresave: false,
            questions: [],
            params: {
                testID: undefined
            },
            testParams: {
                subjectID: undefined,
                themes: undefined
            },
            savingComment: undefined,
            savingDate: {
                date: undefined,
                time: undefined
            },
            showFullInfo: false,

            questionsWithImages: 0,
            questionWithField: 0,
            basicQuestions: 0,

            saving: undefined,

            loader: true,
            loaderValue: 0,
            loaderInterval: {},

            asyncComplate: false,

            showDeleteBtn: false
        }
    },
    computed: mapGetters(['getTestID', 'currentLang', 'currentSign']),
    methods:{
        
        getCurrentQuestion(question){
            if(this.testParams.languagesSettings.languages[0] == 'ru'){
                return question.ru
            } else if(this.testParams.languagesSettings.languages[0] == 'eng'){
                return question.eng
            } else if(this.testParams.languagesSettings.languages[0] == 'uz_l'){
                return question.uz_l
            } else if(this.testParams.languagesSettings.languages[0] == 'uz_k'){
                return question.uz_k
            } else if(this.testParams.languagesSettings.languages[0] == 'custom'){
                return question.custom
            }
        },
        getSubject(id){
            return getSubject(id, this.currentSign.subjects)
        },
        getThemes(id, themes){
            return getThemes(id, themes, this.currentSign)
        },
        getLanguages(langs){
            return getLanguages(langs)
        },
        goToBack(){
            this.$router.push('/dashboard')
        },

        mapOriented(){
            const questions = document.querySelectorAll('.map-orient')

            for(let i = 0; i!=questions.length; i++){
                let questionID = questions[i].getAttribute('to-question')
                let desiredQuestion = document.querySelector(`.question_${questionID}`)

                questions[i].addEventListener('click', ()=>{
                    if(desiredQuestion){
                        desiredQuestion.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        })
                    }
                })
            }
        },

        deleteSaving(){
            operationFromStore('deleteSaving', {id: +this.getTestID})
            .then(()=>{
                this.$router.push('/dashboard')
            })
        }
    },
    mounted() {
        // Loader
        this.loaderInterval = setInterval(() => {
            if (this.loaderValue == 100) {
                clearInterval(this.loaderInterval)
            }
            this.loaderValue += 5
        }, 100)

        if(!this.currentSign.id){
            return this.$router.push('/')
        }

        if(!this.getTestID){
            return this.$router.push('/')
        }
    },
    watch:{
        loaderValue(){
            if(this.loaderValue==100){
                operationFromStore('getBySavingID', {id: +this.getTestID})
                .then(async (result)=>{
                        this.saving = result

                        let questionsData
                        try {
                            questionsData = await encrypt(this.saving.questions, this.currentSign.keys.symmetric.key, this.currentSign.keys.symmetric.iv, this.currentSign.keys.symmetric.algorithm,this.currentSign.keys.symmetric.notation,this.currentSign.keys.symmetric.encoding)  
                        } catch (error) {
                            // запись в логи
                            console.error(error);
                            console.error('Sign is not valid');
                            this.clearSign()
                            this.$router.push('/')
                            return
                        }

                        this.questions = JSON.parse(questionsData)
                        this.testParams = this.saving.params
                        this.savingComment = this.saving.comment
                        this.savingDate = this.saving.date

                        if(this.saving.questions){
                            // MAP
                            setTimeout(()=>{
                                this.mapOriented()
                            }, 500)

                            //Расчитать вопросы по их виду
                            if(this.questions.length){
                                for(let i =0; i!=this.questions.length; i++){
                                    if(this.questions[i].type=='basic-question'){
                                        this.basicQuestions++                    
                                    }else if(this.questions[i].type=='question-with-images'){
                                        this.questionsWithImages++
                                    }else if(this.questions[i].type=='question-with-field'){
                                        this.questionWithField++
                                    }
                                }
                            }
                        }

                        this.loader = false
                        clearInterval(this.loaderInterval)

                        this.asyncComplate = true
                })
                .catch(e=>{
                console.error(this.currentLang.errors[0], e.message)
                this.$router.push('/')
                })
            }
        },

        showDeleteBtn(){
            if(this.showDeleteBtn){
                setTimeout(()=>{
                    this.showDeleteBtn = false
                },2000)
            }
        }
    },
    beforeDestroy(){
        clearInterval(this.loaderInterval)
    },
    components:{
        TestTypeIcons,
        SavedQuestion,
        PresaveTest
    }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.saved{
    width: 100%;
    height: 100%;
    padding-top: 30px;
    display: grid;
    grid-template-columns: 270px auto;
    position: relative;
}

.saved__sidebar{
    width: 270px;
    position:fixed;
    z-index: 9;
}
.saved__map{
    min-width: 100%;
    min-height: 30vh;
    max-height: 60vh;
    background-color: aliceblue;
    border-radius: 0 0 5px 5px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-bottom: #0d5fd8 5px solid;
}

.saved__content{
    margin-bottom: 90px;
    padding-left: 40px;
    text-align: justify;
    display: grid;
    grid-template-rows: auto;
    gap: 40px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th{
    padding: 0 5px;
}
.map-small{
    width: 175px;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    box-orient: vertical;
    overflow: hidden;
}

#app > div.v-application--wrap > main > div > div > div > div > div.saved__sidebar > div > div.saved__map > div > div > div{
    overflow-x: hidden;
    overflow-y: hidden;
}

.saved__tools-box{
    color: #fff;
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    background-color: #2b2b2b;
    padding:10px;
    z-index:20;
    transition: height 0.3s ease-in-out;
}

.small-comment{
    width: 80%;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    box-orient: vertical;
    overflow: hidden;
}

.info-content{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3px 1fr;
    gap: 15px;
}
.saved__map-empty{
    height: 30vh;
    background-color: #aaaaaa80;
    border-radius: 5px;
}

.v-progress-circular[data-v-55fbcf34]{
    margin: 0
}
</style>