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
                                <h4 style="color:#fff">Содержание</h4>
                            </div>
                        </div>
                        <div class="saved__map">
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
                                                    <span v-if="question.questionCtx">{{ question.questionCtx }}</span>
                                                    <span style="color:#888;" v-else>Не заполнено</span>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                            </div>
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
                        Вернуться назад
                    </v-btn>
                </div>

                <div class="saved__sidebar-box"></div>
                
                <div class="saved__content">

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

                </div>

                <div class="saved__tools-box" :style="!showFullInfo ? 'height: 64px' : 'height: 300px'">
                    <div class="d-flex flex-row align-center justify-space-between" style="width: 100%">
                        <div style="width: 100%" v-if="!showFullInfo">
                            <div class="d-flex flex-row">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-comment-outline</v-icon>
                                <div class="small-comment"><span style="color:#bbb">Комментарий к сохранению:</span> {{ savingComment }}</div>
                            </div>
                            <div class="d-flex flex-row">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-calendar-range</v-icon>
                                <div><span style="color:#bbb">Дата сохранения:</span> {{ savingDate.date }} {{ savingDate.time }}</div>
                            </div>
                        </div>

                        <div v-if="showFullInfo" class="d-flex flex-row">
                            <v-icon color="#fff" class="mr-1" size="19">mdi-information-outline</v-icon>
                            Подробная информация о сохранённом экземпляре теста
                        </div>
                        
                        <v-tooltip left>
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
                        <span v-if="!showFullInfo">Подробнее</span>
                        <span v-else>Скрыть</span>
                        </v-tooltip>
                    </div>

                    <!-- Подробно -->
                    <v-divider color="#fff" class="mt-2"></v-divider>

                    <div class="mt-3 info-content">
                        <div>
                            <div class="d-flex flex-row align-start">
                                <v-icon color="#fff" class="mr-1 mt-1" size="19">mdi-comment-outline</v-icon>
                                <div class=""><span style="color:#bbb">Комментарий к сохранению:</span> {{ savingComment }}</div>
                            </div>
                            <div class="d-flex flex-row mt-1">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-calendar-range</v-icon>
                                <div><span style="color:#bbb">Дата сохранения:</span> {{ savingDate.date }} {{ savingDate.time }}</div>
                            </div>
                            <div class="d-flex flex-row mt-3">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-pound</v-icon>
                                <div><span style="color:#bbb">ID предмета:</span> {{ testParams.subjectID ? testParams.subjectID : 'null' }}</div>
                            </div>
                            <div class="d-flex flex-row mt-1">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-pound</v-icon>
                                <div><span style="color:#bbb">ID тем:</span> {{ testParams.themes ? testParams.themes.join(', ') : 'null' }}</div>
                            </div>
                        </div>

                        <v-divider color="#fff" class="mt-2" vertical></v-divider>

                        <div>
                            <div class="d-flex flex-column mt-1">
                                <div class="d-flex flex-row">
                                    <v-icon color="#fff" class="mr-1" size="19">mdi-help-circle-outline</v-icon>
                                    <div><span style="color:#bbb">Количество вопросов:</span> {{ questions.length }}</div>
                                </div>
                                <div class="ml-5">
                                    <div><span style="color:#bbb">• текстовых вопросов:</span> {{ basicQuestions }}</div>
                                    <div><span style="color:#bbb">• вопросов с изображениями:</span> {{ questionsWithImages }}</div>
                                    <div><span style="color:#bbb">• вопросов с выбранной областью:</span> {{ questionWithField }}</div>
                                </div>
                            </div>

                            <div class="d-flex flex-row mt-3" v-if="testParams.considerDifficulty">
                                <v-icon color="#fff" class="mr-1" size="19">mdi-check-circle</v-icon>
                                <div>В тесте учитывается сложность вопросов</div>
                            </div>

                            <div class="d-flex flex-column mt-3" v-if="testParams.ballSystem">
                                <div class="d-flex flex-row">
                                    <v-icon color="#fff" class="mr-1" size="19">mdi-check-circle</v-icon>
                                    <div>В тесте учитывается сложность вопросов</div>
                                </div>
                                <div class="d-flex flex-row justify-space-between flex-wrap">
                                    <div>
                                        <v-icon color="#fff" size="19" class="mr-1">mdi-minus</v-icon>
                                        <span style="color:#bbb">минимальный балл:</span>
                                        {{ testParams.ballSystem.min }}
                                    </div>
                                    <div><v-icon color="#fff" size="19" class="mr-1">mdi-vector-line</v-icon><span style="color:#bbb">интервал между баллами:</span>  {{ testParams.ballSystem.interval }}</div>
                                    <div><v-icon color="#fff" size="19" class="mr-1">mdi-plus</v-icon><span style="color:#bbb">максимальный балл:</span>  {{ testParams.ballSystem.max }}</div>
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

export default {
    data() {
        return {
            questions: [],
            params: undefined,
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
            basicQuestions: 0
        }
    },
    computed: mapGetters(['getTestID']),
    methods:{
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
    },
    mounted() {
        this.params = JSON.parse(this.getTestID)

        let savings = JSON.parse(localStorage.getItem(`saving-${this.params.testID}`))
        let saving

        savings.filter(el=>{
            if(el.id==this.params.savingID){
                saving = el
            }
        })

        this.questions = saving.questions
        this.testParams = saving.params
        this.savingComment = saving.comment
        this.savingDate = saving.date
        console.log(saving)

        // Параметры теста

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
        
    },
    components:{
        TestTypeIcons,
        SavedQuestion
    }
}
</script>

<style scoped>
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
    width: 185px;
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
</style>