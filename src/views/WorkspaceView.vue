<template>
    <div class="wrapper">
        <div class="container">
            <div class="workspace">
                <div class="workspace__sidebar">
                    <div :class="{'full-map':showFullMap}">
                        <div class="d-flex flex-row align-center justify-space-between" style="background-color: #0d5fd8;padding:7px 5px;border-radius: 5px 5px 0 0;">
                            <div class="d-flex flex-row align-center">
                                <v-icon size="20" color="#fff" class="mr-1">
                                    mdi-content-paste
                                </v-icon>
                                <h4 style="color:#fff">Содержание</h4>
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
                            <span>Показать полностью</span>
                            </v-tooltip>

                        </div>
                        <div v-if="questions.length==0" class="workspace__map-empty d-flex flex-column justify-center align-center" style="border-radius: 0 0 5px 5px;">
                            <v-img
                            max-height="120"
                            max-width="120"
                            src="@/assets/media/no-questions.png"
                            contain
                            transition="scale-transition"
                            style="opacity: 0.5;"
                            ></v-img>
                        </div>
                        <div v-else class="workspace__map" :class="{'.workspace__map-full': showFullMap}">
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
                                            <th class="text-left" v-if="showFullMap">
                                                Ответы
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
                                                <test-type-icons :type="question.type" :questionID="question.id" :questions="questions" :visible="visibleQuestions"/>
                                            </td>
                                            <td :style="question.id==visibleQuestions[0] || question.id==visibleQuestions[1] || question.id==visibleQuestions[2] || question.id==visibleQuestions[3] || question.id==visibleQuestions[4] || question.id==visibleQuestions[5] || question.id==visibleQuestions[6] || question.id==visibleQuestions[7] || question.id==visibleQuestions[8] || question.id==visibleQuestions[9] ? 'color:#0d5fd8;font-weight: bolder' : 'color:#000'">{{ i+1 }}</td>
                                            <td>
                                                <p class="body-2" style="color:#484848" :class="{'map-small': !showFullMap, 'map-full':showFullMap}">
                                                    <span v-if="question.questionCtx">{{ question.questionCtx }}</span>
                                                    <span style="color:#888;" v-else>Пока не заполнено</span>
                                                </p>
                                            </td>
                                            <td v-if="showFullMap" style="min-width:20vw; max-width:20vw; word-break: break-all;">
                                                <p
                                                v-for="answer in question.answers"
                                                :key="answer.id"
                                                class="body-2"
                                                :style="answer.id==1 ? 'color:green' : 'color:#484848'"
                                                >
                                                    • {{ answer.answerCtx }}
                                                </p>
                                                <p
                                                v-if="question.type=='question-with-field'"
                                                >
                                                    x: {{ question.answer.x }}<br>y: {{ question.answer.y }}
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
                    >
                        <v-icon color="#fff" class="mr-1">mdi-arrow-left-thin</v-icon>
                        Вернуться назад
                    </v-btn>
                </div>

                <div class="workspace__sidebar-box"></div>
                
                <div class="workspace__content">

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
                    />

                    <!-- <div
                    v-else
                    :class="`question_${question.id}`"
                    class="test question__template d-flex flex-column justify-center align-center"
                    :id="question.id"
                    >
                        <v-icon
                        color="#888"
                        size="150"
                        class="mb-3"
                        >
                            mdi-help-rhombus-outline
                        </v-icon>
                        <h2 class="mb-2">
                            Вопрос #{{ i+1 }} (ID: {{ question.id }}) в пассивном режиме
                        </h2>
                        <v-btn
                        dense
                        small
                        dark
                        color="#0d5fd8"
                        @click="changeVisibleQuestions(question.id)"
                        >
                            Активировать
                        </v-btn>

                    </div> -->

                    <div v-if="questions.length==0" class="d-flex flex-column justify-center align-center" style="height:400px;background-color: #aaaaaa80;border-radius: 5px;">
                        <v-img
                        max-height="200"
                        max-width="200"
                        src="@/assets/media/spider-web.png"
                        contain
                        transition="scale-transition"
                        ></v-img>
                        <h2 style="color:#888" class="mt-5">ВОПРОСОВ ПОКА НЕТ</h2>
                    </div>

                </div>

                <div class="workspace__tools-box">
                    
                        <!-- TOOLS -->
                        <tools :allTasks="tasks" :createFunc="createQuestion"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Question from '@/components/tests/QuestionTemplates.vue'
import Tools from '@/components/tests/Tools.vue'
import TestTypeIcons from '@/components/tests/TestTypeIcons.vue'

export default {
    data() {
        return {
            tasks:[
                {name:'вопрос с картинками', isDisabled: false, type: 'question-with-images'},
                {name:'выбор области на картинке', isDisabled: false, type: 'question-with-field'},
                {name:'скоро', isDisabled: true,}
            ],
            questions:[
                // basic-question, question-with-images, question-with-field
                // {id:1, type: 'basic-question'}, 
                // {id:2, type: 'question-with-images'},
                // {id:3, type: 'basic-question'},
            ],
            questionsCounter: 0,
            questionsDeleted: true,

            showFullMap: false,
            
            visibleQuestions:[1,2,3,4,5,6,7,8,9,10]
        }
    },
    methods:{
        createQuestion(type){
            let question = {
                id: this.questionsCounter+1,
                type,
                questionCtx:'',
                theme: undefined,
                difficulty: undefined,
                ball:0.01
            }

            if(type=='question-with-field'){
                // позже реализовать логику обнуления x и y если нет картинки
                question.answer = {x:undefined, y:undefined, fault: 20}
            }
            else{
                if(type=='question-with-images'){
                    question.answers = [{id:1, img:''}, {id:2, img:''}, {id:3, img:''}]
                } else{
                    question.answers = [{id:1, answerCtx:''}, {id:2, answerCtx:''}, {id:3, answerCtx:''}, {id:4, answerCtx:''}]
                }
            }

            this.questions.push(question)
            this.questionsCounter++
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
        },

        changeQuestion(type, ctx, id, aID){
            this.questions.filter(el =>{
                if(el.id==id){
                    let index = this.questions.indexOf(el)

                    if(type=='questionCtx'){
                        this.questions[index].questionCtx = ctx
                    }else if(type=='ball'){
                        this.questions[index].ball = ctx
                    }else if(type=='theme'){
                        this.questions[index].theme = ctx
                    }else if(type=='difficulty'){
                        this.questions[index].difficulty = ctx
                    }else if(type=='answer-answerCtx'){
                        this.questions[index].answers.filter(el => {
                            if(el.id == aID){
                                let aIndex = this.questions[index].answers.indexOf(el)
                                this.questions[index].answers[aIndex].answerCtx = ctx
                            }
                        })
                    }else if(type=='answer-delete'){
                        this.questions[index].answers.filter(el => {
                            if(el.id == aID){
                                let aIndex = this.questions[index].answers.indexOf(el)
                                this.questions[index].answers.splice(aIndex, 1)
                            }
                        })
                    }else if(type=='answer-add'){
                        this.questions[index].answers.push({
                            id: aID,
                            answerCtx: ''
                        })
                    }else if(type=='field-answer'){
                        this.questions[index].answer.y = ctx.y
                        this.questions[index].answer.x = ctx.x
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
                    } else{
                        // поменять visibleQuestions
                        for(let j = 0; j<=10; j++){
                            this.visibleQuestions[j] = +questionID + j
                        }
                        this.visibleQuestions.push()
                        this.visibleQuestions.pop()
                    }
                })
            }
        },


        // changeVisibleQuestions(id){
        //     this.visibleQuestions.current = id
        // }
    },
    mounted(){
        this.mapOriented()
    },
    watch:{
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
}


.workspace__sidebar{
    width: 270px;
    position:fixed;
    z-index: 9;
}
.workspace__map{
    min-width: 100%;
    min-height: 30vh;
    max-height: 67vh;
    background-color: aliceblue;
    border-radius: 0 0 5px 5px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-bottom: #0d5fd8 5px solid;
}
/* .workspace__map-full{
    overflow-x: scroll;
} */
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
    width: 90vw;
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