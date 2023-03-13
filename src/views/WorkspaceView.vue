<template>
    <div class="wrapper">
        <div class="container">
            <div class="workspace">
                <div class="workspace__sidebar">
                    <div :class="{'full-map':showFullMap}" :style="showFullMap ? 'width: 90vw' : 'width: 270px'" style="transition: width 0.3s ease-in-out;">
                        <div class="d-flex flex-row align-center justify-space-between" style="background-color: #0d5fd8;padding:7px 5px;border-radius: 5px 5px 0 0;">
                            <div class="d-flex flex-row align-center">
                                <v-icon size="20" color="#fff" class="mr-1">
                                    mdi-content-paste
                                </v-icon>
                                <h4 style="color:#fff">{{ currentLang.workspaceView[0] }}</h4>
                            </div>

                            <v-tooltip bottom v-if="questions.length">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="showFullMap=!showFullMap"
                                >
                                    <v-icon color="#fff" v-if="!showFullMap">mdi-arrow-right-thin</v-icon>
                                    <v-icon color="#fff" v-else>mdi-arrow-left-thin</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ currentLang.workspaceView[1] }}</span>
                            </v-tooltip>

                        </div>
                        <div v-if="questions.length==0 && !loader" class="workspace__map-empty d-flex flex-column justify-center align-center" style="border-radius: 0 0 5px 5px;">
                            <v-img
                            max-height="120"
                            max-width="120"
                            src="@/assets/media/no-questions.png"
                            contain
                            transition="scale-transition"
                            style="opacity: 0.5;"
                            ></v-img>
                        </div>
                        <div class="workspace__map" v-if="questions.length && !loader" :class="{'.workspace__map-full': showFullMap}">
                            <div class="map-elem"> 
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
                                                {{ currentLang.workspaceView[2] }}
                                            </th>
                                            <th class="text-left" v-if="showFullMap">
                                                {{ currentLang.workspaceView[3] }}
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
                                            <td :style="question.id==visibleQuestions[0] || question.id==visibleQuestions[1] || question.id==visibleQuestions[2] || question.id==visibleQuestions[3] || question.id==visibleQuestions[4] || question.id==visibleQuestions[5] || question.id==visibleQuestions[6] || question.id==visibleQuestions[7] || question.id==visibleQuestions[8] || question.id==visibleQuestions[9] ? 'color:#0d5fd8;font-weight: bolder' : 'color:#000'">{{ i+1 }}</td>
                                            <td>
                                                <p class="body-2" style="color:#484848" :class="{'map-small': !showFullMap, 'map-full':showFullMap}">
                                                    <span v-if="question.questionCtx">{{ question.questionCtx }}</span>
                                                    <span style="color:#888;" v-else>{{ currentLang.workspaceView[4] }}</span>
                                                </p>
                                            </td>
                                            <td v-if="showFullMap" style="min-width:20vw; max-width:20vw; word-break: break-all;">
                                                <p
                                                v-for="answer in question.answers"
                                                :key="answer.id"
                                                class="body-2"
                                                :style="answer.isCurrect ? 'color:green' : 'color:#484848'"
                                                >
                                                    • {{ answer.answerCtx }}
                                                </p>
                                                <p
                                                v-if="question.type=='question-with-field'"
                                                >
                                                    <span v-if="question.answer[1].x" style="color: green">{{ currentLang.workspaceView[5] }}</span>
                                                    <span v-else>{{ currentLang.workspaceView[6] }}</span>
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
                    class="mt-5"
                    @click="goToBack"
                    :disabled="!asyncComplate"
                    >
                        <v-icon color="#fff" class="mr-1">mdi-arrow-left-thin</v-icon>
                        <span :style="asyncComplate ? 'color: #fff' : 'color: #888'">{{ currentLang.workspaceView[7] }}</span>
                    </v-btn>
                </div>

                <div class="workspace__sidebar-box"></div>
                
                <div class="workspace__content">
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

                    <!--  -->
                    <question
                    v-for="(question, i) in questions"
                    :key="question.id"
                    v-if="(questions[i].id)==visibleQuestions[0] || (questions[i].id)==visibleQuestions[1] || (questions[i].id)==visibleQuestions[2] || (questions[i].id)==visibleQuestions[3] || (questions[i].id)==visibleQuestions[4] || (questions[i].id)==visibleQuestions[5] || (questions[i].id)==visibleQuestions[6] || (questions[i].id)==visibleQuestions[7] || (questions[i].id)==visibleQuestions[8] || (questions[i].id)==visibleQuestions[9]"
                   

                    :question="question"
                    :questions="questions"
                    :visible="visibleQuestions"
                    :deleteFunc="deleteQuestion"

                    :questionFunc="changeQuestion"
                    :params="testParams"
                    />

                    <div v-if="questions.length && !loader">
                        <p style="color:#444; text-align: center;">{{ currentLang.workspaceView[8] }}</p>
                    </div>

                    <div v-if="questions.length==0 && !loader" class="d-flex flex-column justify-center align-center" style="height:400px;background-color: #aaaaaa80;border-radius: 5px;">
                        <v-img
                        max-height="200"
                        max-width="200"
                        src="@/assets/media/spider-web.png"
                        contain
                        transition="scale-transition"
                        ></v-img>
                        <h2 style="color:#888" class="mt-5">{{ currentLang.workspaceView[9] }}</h2>
                    </div>

                </div>

                <div class="workspace__tools-box">
                    
                        <!-- TOOLS -->
                        <tools :loaderState='loader' :allTasks="tasks" :createFunc="createQuestion" :saveFunction="saveProcess" :currentTestID="+getTestID" :allQuestions="questions" :asyncComplate="asyncComplate" :blockAddQBtn="blockAddQBtn"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Question from '@/components/tests/QuestionTemplates.vue'
import Tools from '@/components/tests/Tools.vue'
import TestTypeIcons from '@/components/tests/TestTypeIcons.vue'
import { mapGetters } from 'vuex'
import getCurrentDate from '@/plugins/getCurrentDate'
import { operationFromStore } from '@/services/localDB'

export default {
    data() {
        return {
            currentTest: undefined,
            tasks:[
                {name:'', isDisabled: false, type: 'question-with-images'},
                {name:'', isDisabled: false, type: 'question-with-field'},
                {name:'', isDisabled: true,}
            ],
            questions: [],
            questionsCounter: 0,
            questionsDeleted: true,

            showFullMap: false,
            testParams: {},
            
            visibleQuestions:[1,2,3,4,5,6,7,8,9,10],
            savingInterval: undefined,

            loader: true,
            loaderValue: 0,
            loaderInterval: {},

            // util
            allowToSaveTheme: false,
            asyncComplate: false,
            blockAddQBtn: false
        }
    },
    methods:{
        createQuestion(type){
            this.blockAddQBtn = true
            let question = {
                id: this.questionsCounter+1,
                type,
                questionCtx:'',
                theme: undefined,
                difficulty: undefined,
                ball:0.01,
                multipleAnswers: false,
                lastModified: getCurrentDate(),
            }

            if(type=='question-with-field'){
                // позже реализовать логику обнуления x и y если нет картинки
                question.imagePreview = ''
                question.answer = [{fault: 20},{x:undefined, y:undefined}]
            }
            else{
                if(type=='question-with-images'){
                    question.imagePreview = ''
                    question.answers = [{id:1, imagePreview:'', isCurrect:true}, {id:2, imagePreview:'', isCurrect:false}, {id:3, imagePreview:'', isCurrect:false}]
                } else{
                    question.answers = [{id:1, answerCtx:'', isCurrect:true}, {id:2, answerCtx:'', isCurrect:false}, {id:3, answerCtx:'', isCurrect:false}, {id:4, answerCtx:'', isCurrect:false}]
                }
            }

            this.questions.push(question)
            this.questionsCounter++
            this.saveProcess()
        },

        deleteQuestion(id){
            this.questions.filter(el => {
                if(el.id==id){
                    let index = this.questions.indexOf(el)
                    this.questions.splice(index, 1)
                }
            })

            this.visibleQuestions.filter(el=>{
                if(el==id){
                    let index = this.visibleQuestions.indexOf(el)
                    let counter = id+1

                    for(let i = index; i != this.visibleQuestions.length; i++){
                        let isAvaible = false

                        if(counter>this.questionsCounter){
                            this.visibleQuestions[i]=counter
                            counter++
                        }else{
                            this.questions.filter(e=>{
                                if(e.id==counter){
                                    this.visibleQuestions[i]=counter
                                    isAvaible = true
                                }
                            })
                            
                            if(!isAvaible){
                                counter++
                                i--
                            }else{
                                counter++
                            }
                        }
                    }
                }
            })

            
            this.saveProcess()
        },

        changeQuestion(type, ctx, id, aID){
            this.questions.filter(el =>{
                if(el.id==id){
                    let index = this.questions.indexOf(el)

                    if(type=='questionCtx'){
                        this.questions[index].questionCtx = ctx
                        this.questions[index].lastModified = getCurrentDate()
                    }else if(type=='ball'){
                        this.questions[index].ball = ctx
                        this.questions[index].lastModified = getCurrentDate()
                    }else if(type=='theme'){
                        this.questions[index].theme = ctx
                        this.questions[index].lastModified = getCurrentDate()
                        if(this.allowToSaveTheme){
                            this.saveProcess({forcedSave:true})
                        }
                    }else if(type=='difficulty'){
                        this.questions[index].difficulty = ctx
                        this.questions[index].lastModified = getCurrentDate()
                        this.saveProcess({forcedSave:true})
                    }else if(type=='answer-answerCtx'){
                        this.questions[index].answers.filter(el => {
                            if(el.id == aID){
                                let aIndex = this.questions[index].answers.indexOf(el)
                                this.questions[index].answers[aIndex].answerCtx = ctx
                            }
                        })
                        this.questions[index].lastModified = getCurrentDate()
                    }else if(type=='answer-delete'){
                        this.questions[index].answers.filter(el => {
                            if(el.id == aID){
                                let aIndex = this.questions[index].answers.indexOf(el)
                                this.questions[index].answers.splice(aIndex, 1)
                            }
                        })
                        this.questions[index].lastModified = getCurrentDate()
                        this.saveProcess({forcedSave:true})
                    }else if(type=='answer-add'){
                        this.questions[index].answers.push({
                            id: aID,
                            answerCtx: '',
                            isCurrect: false
                        })
                        this.questions[index].lastModified = getCurrentDate()
                        this.saveProcess({forcedSave:true})
                    }else if(type=='field-answer'){
                        this.questions[index].answer = ctx
                        this.questions[index].lastModified = getCurrentDate()
                        this.saveProcess({forcedSave:true})
                    }else if(type=='multipleAnswers'){
                        this.questions[index].multipleAnswers = ctx
                        this.questions[index].lastModified = getCurrentDate()
                    }else if(type=='answers'){
                        this.questions[index].answers = ctx
                        this.questions[index].lastModified = getCurrentDate()
                        this.saveProcess({forcedSave:true})
                    }else if(type=='answer-answerIsCurrect'){
                        this.questions[index].answers.filter(el => {
                            if(el.id == aID){
                                let aIndex = this.questions[index].answers.indexOf(el)
                                this.questions[index].answers[aIndex].isCurrect = ctx
                            }
                        })
                        this.questions[index].lastModified = getCurrentDate()
                        this.saveProcess({forcedSave:true})
                    }else if(type=='imagePreview'){
                        this.questions[index].imagePreview = ctx
                        this.questions[index].lastModified = getCurrentDate()
                        this.saveProcess({forcedSave:true})
                    }else if(type=='answer-imagePreview'){
                        this.questions[index].answers.filter(el => {
                            if(el.id == aID){
                                let aIndex = this.questions[index].answers.indexOf(el)
                                this.questions[index].answers[aIndex].imagePreview = ctx
                            }
                        })
                        this.questions[index].lastModified = getCurrentDate()
                        this.saveProcess({forcedSave:true})
                    }
                }
            })
        },

        mapOriented(){
            const questions = document.querySelectorAll('.map-orient')

            for(let i = 0; i!=questions.length; i++){
                let questionID = questions[i].getAttribute('to-question')
                let desiredQuestion = document.querySelector(`.question_${questionID}`)

                questions[i].addEventListener('click', ()=>{
                    if(questionID==this.visibleQuestions[0] || questionID==this.visibleQuestions[1] || questionID==this.visibleQuestions[2] || questionID==this.visibleQuestions[3] || questionID==this.visibleQuestions[4] || questionID==this.visibleQuestions[5] || questionID==this.visibleQuestions[6] || questionID==this.visibleQuestions[7] || questionID==this.visibleQuestions[8] || questionID==this.visibleQuestions[9]){
                        if(desiredQuestion){
                            desiredQuestion.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    }
                    else{

                        this.countMap(questionID)
                        // погрешность
                        this.questions.push('')
                        this.questions.pop()

                    }
                })
            }
        },

        countMap(number){
            this.visibleQuestions = []

            let counter = number
            for(let j = 0; j!=this.questions[this.questions.length-1].id; j++){
                if(this.visibleQuestions.length!=10){
                    this.questions.filter(el=>{
                        if(el.id==counter){
                            this.visibleQuestions.push(el.id)
                        }
                    })
                    counter++
                }
            }


            if(this.visibleQuestions.length!=10){
                if(this.questions.length==1){
                    counter = this.questions[0].id+1
                }else{
                    counter = this.visibleQuestions[this.visibleQuestions.length-1]
                }
                while(this.visibleQuestions.length!=10){
                    this.visibleQuestions.push(counter)
                    counter++
                }
            }
            
            // погрешность
            this.questions.push('')
            this.questions.pop()
        },

        saveProcess(params){
            if(params){
                if(params.newTest){
                    this.blockAddQBtn = true
                    this.currentTest = params.newTest 
                }
            }

            if(this.onWorkProcess && this.$route.path == '/workspace' && this.blockAddQBtn || this.onWorkProcess && this.$route.path == '/workspace' && params && params.forcedSave){
                this.currentTest.lastModified = getCurrentDate()
                let output = {
                    ...this.currentTest,
                    questions: this.questions
                }

                operationFromStore('deleteTest',{id: +this.getTestID})
                .then(()=>{
                    operationFromStore('addTest',{data: output})
                    .then(()=>{
                        setTimeout(()=>{
                            this.blockAddQBtn = false
                        }, 500)
                    })
                })
                .then(()=>{
                    if(params){
                        if(params.route){
                            this.$router.push('/dashboard')
                        }
                    }
                })
                .catch(e=>{
                    console.error(this.currentLang.errors[0],e)
                })
                console.info('(i) process is saved')
            }
        },

        goToBack(){
            this.blockAddQBtn = true
            this.saveProcess({route: true})
        }
    },
    computed: mapGetters(['onWorkProcess','getTestID', 'currentLang']),
    mounted(){
        this.tasks[0].name= this.currentLang.workspaceView[10]
        this.tasks[1].name= this.currentLang.workspaceView[11]
        this.tasks[2].name= this.currentLang.workspaceView[12]

        // Loader
        this.loaderInterval = setInterval(() => {
            if (this.loaderValue === 100) {
                clearInterval(this.loaderInterval)
            }
            this.loaderValue += 5
        }, 100)

        // текущий ID теста
        if(!this.getTestID){
            this.$router.push('/dashboard')
        }

        // Авто сохранение каждые 10 сек.
        this.savingInterval = setInterval(()=>{
            this.saveProcess()
        }, 10000)
    },
    watch:{
        loaderValue(){
            if(this.loaderValue==100){
                operationFromStore('getByTestID',{id:+this.getTestID})
                .then(result=>{            
                    this.currentTest = result

                    this.questions = this.currentTest.questions
                    this.testParams = {
                        id: this.currentTest.id,
                        themes: this.currentTest.themes,
                        considerDifficulty: this.currentTest.considerDifficulty,
                        ballSystem: this.currentTest.ballSystem
                    }

                    this.loader = false
                    clearInterval(this.loaderInterval)
                    
                    setTimeout(()=>{
                        this.allowToSaveTheme = true
                    }, 1000)

                    this.asyncComplate = true

                    if(this.questions.length){
                        this.questionsCounter = this.questions[this.questions.length-1].id
                    }
                })
                .then(()=>{
                    // установление map
                    if(this.questions.length){
                        this.countMap(this.questions[0].id)
                    }
                })
                .then(()=>{
                    // событие MAP
                    this.mapOriented()
                })
                .catch(e=>{
                console.error(this.currentLang.errors[0], e.message)
                this.$router.push('/')
                })
            }
        },

        questions(){
            setTimeout(()=>{
                this.mapOriented()
            },300)
        },
        visibleQuestions(){
            setTimeout(()=>{
                this.mapOriented()

                document.querySelector(`.question_${this.visibleQuestions[0]}`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            },300)
        }
    },
    beforeDestroy(){
        clearInterval(this.savingInterval)
        clearInterval(this.loaderInterval)
    },
    components:{
        Question,
        Tools,
        TestTypeIcons
    }
}
</script>

<style>
.workspace{
    width: 100%;
    height: 100%;
    padding-top: 30px;
    display: grid;
    grid-template-columns: 270px auto;
    position: relative;
    left: 0;
    top:0;
}


.workspace__sidebar{
    width: 270px;
    position:fixed;
    z-index: 9;
    transition: width 0.4s ease-in-out;
}
.workspace__map{
    min-width: 100%;
    min-height: 30vh;
    max-height: 60vh;
    background-color: aliceblue;
    border-radius: 0 0 5px 5px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-bottom: #0d5fd8 5px solid;
}
.workspace__map-empty{
    height: 30vh;
    background-color: #aaaaaa80;
    border-radius: 5px;
}

.workspace__content{
    margin-bottom: 90px;
    padding-left: 40px;
    text-align: justify;
    display: grid;
    grid-template-rows: auto;
    gap: 40px;
}

.workspace__tools-box{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height: 60px;
    background-color: #2b2b2b;
    padding:10px;
    display: flex;
    align-items: center;
    z-index:20;
}

.workspace__tools{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th{
    padding: 0 5px;
}

.v-data-table__wrapper{
    overflow: visible;
}
.map-small{
    width: 195px;
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
.map-full{
    max-width: 55vw;
    word-wrap: break-word;
    overflow: hidden;
}

.full-map{
    z-index: 9;
    overflow:hidden
}

.question__template{
    width: 100%;
    height: 40vw;
    background-color: #aaaaaa80;
    color: #888;
    border-radius: 5px;
    scroll-margin-top:90px;
}
</style>