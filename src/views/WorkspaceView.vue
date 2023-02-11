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
                                                <test-type-icons :type="question.type" :map="currentMap"/>
                                            </td>
                                            <td>{{ i+1 }}</td>
                                            <td>
                                                <p class="body-2" style="color:#484848" :class="{'map-small': !showFullMap, 'map-full':showFullMap}">
                                                    <span v-if="question.questionCtx">{{ question.questionCtx }}</span>
                                                    <span style="color:#888" v-else>Пока не заполнено</span>
                                                </p>
                                            </td>
                                            <td v-if="showFullMap" style="min-width:20vw">
                                                <p
                                                v-for="answer in question.answers"
                                                class="body-2"
                                                :style="answer.id==1 ? 'color:green' : 'color:#484848'"
                                                >
                                                    • {{ answer.answerCtx }}
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
                    v-for="question in questions"
                    :key="question.id"

                    :question="question"

                    :questions="questions"
                    :deleteFunc="deleteQuestion"
                    :questionCtxFunc="chengeQuestionCtx"
                    />

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

            currentMap:0,
            showFullMap: false
        }
    },
    methods:{
        createQuestion(type){
            this.questions.push({
                id: this.questionsCounter+1,
                type,
                questionCtx:'',
                answers: [{id:1, answerCtx:'asdasd'}, {id:2, answerCtx:'343434'}, {id:3, answerCtx:'+++++'}],
                theme: undefined,
                difficulty: undefined,
                ball:0.01
            })
            this.questionsCounter++
        },

        deleteQuestion(id){
            this.questions.filter(el => {
                if(el.id==id){
                    let index = this.questions.indexOf(el)
                    this.questions.splice(index, 1)
                }
            })
        },

        chengeQuestionCtx(ctx, id){
            this.questions.filter(el =>{
                if(el.id==id){
                    let index = this.questions.indexOf(el)
                    this.questions[index].questionCtx = ctx
                }
            })
        },

        mapOriented(){
            const questions = document.querySelectorAll('.map-orient')

            for(let i = 0; i!=questions.length; i++){
                let questionID = questions[i].getAttribute('to-question')
                let desiredQuestion = document.querySelector(`.question_${questionID}`)

                questions[i].addEventListener('click', ()=>{
                    desiredQuestion.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    })
                    this.currentMap = +questionID
                })
            }
        }
    },
    mounted(){
        this.mapOriented()
    },
    watch:{
        questions(){
            setTimeout(()=>{
                this.mapOriented()
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
    box-shadow: 0px 0px 5px 5px #3131314b;
}
.workspace__map-full{
    overflow-x: scroll;
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
    width: 90vw;
    z-index: 9;
    overflow:hidden
}
</style>