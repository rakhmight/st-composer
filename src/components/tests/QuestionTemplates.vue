<template>
    <div class="test" :class="`question_${currentQuestion.id}`" :id="currentQuestion.id">
        <div class="test__header d-flex flex-row justify-space-between mb-2" style="position: relative;">
            <div class="d-flex flex-row">
                <v-icon size="16" color="#888" class="mr-1">mdi-pound</v-icon>
                <p style="color: #888" class="mr-5">{{ currentLang.workspaceView[20] }} {{ serialNumber }} (п/п) | {{ currentQuestion.id }} {{ currentLang.workspaceView[21] }}</p>

                <!--  -->
                <test-type-icons :type="currentQuestion.type" :questionID="currentQuestion.id" :questions="allQuestions"/>

            </div>
            <div class="d-flex flex-row">
                <v-icon size="16" color="#888" class="mr-1">mdi-clock-time-eight-outline</v-icon>
                <p style="color: #888">{{ currentLang.workspaceView[22] }}: {{ question.lastModified.date }} {{ question.lastModified.time }}</p>
                
                <v-tooltip bottom color="error">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon
                    class="ml-8"
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                    @click="launchConfirm"
                    >
                    mdi-close
                    </v-icon>
                </template>
                <span>{{ currentLang.workspaceView[23] }}</span>
                </v-tooltip>
            </div>

            <div class="confirm-delete" v-if="showConfirmWithDelete">
                <v-btn
                small
                color="#ff5f3b"
                dark
                @click="deleteQuestion(currentQuestion.id)"
                >
                    {{ currentLang.workspaceView[24] }}
                </v-btn>
            </div>
        </div>

        <v-divider color="#bbb"></v-divider>

        <div class="test__question-box mt-3">
            <div>
                <p style="color: #888">{{ currentLang.workspaceView[25] }}:</p>
                <div class="d-flex flex-row align-start">
                    <v-textarea
                    dense
                    outlined
                    :placeholder="currentLang.workspaceView[26]"
                    rows="2"
                    prepend-icon="mdi-help-circle-outline"
                    v-model="questionCtx"
                    ></v-textarea>
                </div>
            </div>

            <div class="mb-10" v-if="params.ballSystem">
                <!-- range -->
                <div class="d-flex flex-row mb-1">
                    <v-icon class="mr-2">mdi-circle-double</v-icon>
                    <p style="color: #888" class="mb-1">{{ currentLang.workspaceView[27] }}: <b style="color:green">{{ ball }}</b></p>
                </div>
                <vue-slider
                class="pl-3 pr-3"
                    ref="slider"
                    v-model="ball"
                    v-bind="options"
                ></vue-slider>
            </div>

            <div class="test__question-param" :class="{'params-3': currentQuestion.type=='question-with-images' || currentQuestion.type=='question-with-field', 'params-2': currentQuestion.type=='basic-question'}"> 
                <!-- 
                    3params 
                    2params
                    1params
                -->
                <v-file-input
                v-if="currentQuestion.type=='question-with-images' || currentQuestion.type=='question-with-field'"
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp, image/webp, image/svg"
                :placeholder="currentLang.workspaceView[28]"
                :label="currentLang.workspaceView[29]"
                outlined
                dense
                min-width="100%"
                prepend-icon="mdi-camera"
                @change="handleFileUpload( $event )"
                @click:clear="imagePreview=''"
                @click="imagePreview=''"
                ></v-file-input>

                <v-select
                :items="themes"
                :placeholder="currentLang.workspaceView[30]"
                outlined
                dense
                v-model="theme"
                prepend-icon="mdi-alpha-t-box-outline"
                ></v-select>

                <v-select
                v-if="params.considerDifficulty"
                :items="difficultys"
                :placeholder="currentLang.workspaceView[31]"
                outlined
                dense
                v-model="difficulty"
                prepend-icon="mdi-chart-line"
                ></v-select>
            </div>
            <div class="d-flex justify-center" style="position: relative;">
                <div class="delete-pic" v-show="showPreview" v-if="currentQuestion.type=='question-with-images'">
                    <v-icon color="red" @click="imagePreview=''" size="25" v-show="showPreview">mdi-close-circle</v-icon>
                </div>
                <v-img v-if="currentQuestion.type=='question-with-images'" width="600" height="300" contain v-bind:src="imagePreview" v-show="showPreview" class="mb-3"/>
            </div>

            <div class="mb-5 d-flex flex-row justify-space-between">
                <!--  -->
                <v-switch
                v-model="multipleAnswers"
                :label="currentQuestion.type!='question-with-field' ? currentLang.workspaceView[32] : currentLang.workspaceView[33]"
                color="#0d5fd8"
                hide-details
                dense
                ></v-switch>

                <v-btn
                small
                dark
                color="#4e4e4e"
                v-if="currentQuestion.type=='question-with-field' && multipleAnswers"
                @click="clearFields"
                >
                <v-icon
                size="15"
                class="mr-1"
                color="#fff"
                >
                    mdi-cancel
                </v-icon>
                {{ currentLang.workspaceView[34] }}
                </v-btn>
            </div>
        </div>

        <v-divider color="#bbb"></v-divider>

        <div class="test__answers-box mt-3" v-if="currentQuestion.type!='question-with-field'">
            <div class="d-flex flex-row justify-space-between align-center">
                <p style="color: #888">{{ currentLang.workspaceView[35] }}:</p>
                <v-btn
                fab
                dark
                color="#0167FF"
                small
                @click="addAnswer"
                >+</v-btn>
            </div>
            <v-alert
            color="red"
            dense
            dismissible
            elevation="3"
            type="error"
            class="subtitle-2 mt-2"
            v-for="(error, i) in errors"
            :key="i"
            >{{ error }}</v-alert>

            <div class="test__answers mt-3">

                <!--  -->
                <answer
                v-if="currentQuestion.type!='question-with-field'"
                v-for="answer in answers"
                :answer="answer"
                :key="answer.id"
                :type="currentQuestion.type"
                :answerFunc="changeAnswer"
                :questionID="currentQuestion.id"

                :isMultiple="multipleAnswers"
                />
            </div>
        </div>
        
        <div class="test__answers-box mt-3" v-else style="position: relative;">
            <p style="color: #888">
                <span style="font-style: italic;color:#0d5fd8">{{ currentLang.workspaceView[36] }}</span><br>
                {{ currentLang.workspaceView[37] }}
            </p>
            <div class="delete-pic" v-show="showPreview" v-if="currentQuestion.type=='question-with-field'">
                <v-icon color="red" @click="imagePreview=''" size="25" v-show="showPreview">mdi-close-circle</v-icon>
            </div>
            <div class="mt-3" v-if="showPreview">
                <v-img width="955" height="540" contain v-bind:src="imagePreview" v-show="showPreview" :class="`img_${currentQuestion.id}`" style="border: 3px solid #0d5fd8; margin:0 auto; position: relative;" @click="getPosition()"/>
            </div>
            <div v-else  class="mt-3 d-flex justify-center align-center">
                <v-img width="400" height="300" contain src="@/assets/media/upload.png" style="opacity: 0.5;" />
            </div>

            <div v-if="showPreview" class="mt-5 pb-6">
                <p style="color: #888">{{ currentLang.workspaceView[38] }}: <b>{{ answer[0].fault }}</b></p>
                
                <vue-slider
                    ref="slider"
                    v-model="answer[0].fault"
                    v-bind="faultOptions"
                    class="pr-3 pl-3"
                ></vue-slider>
            </div>
        </div>
    </div>
</template>

<script>
import Answer from '@/components/tests/AnswerTemplates.vue'
import TestTypeIcons from '@/components/tests/TestTypeIcons.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { mapGetters } from 'vuex'

export default {
    props:{
        question: Object,
        deleteFunc: Function,
        questions: Array,

        questionFunc: Function,
        params: Object
    },
    data() {
        return {
            // Question start params ==============
            rules: [
                value => !value || value.size < 20000000 || this.currentLang.workspaceView[16],
            ],
			file: '',
            showPreview: false,
            imagePreview: this.question.imagePreview,
            errors:[],
            themes:this.params.themes,
            difficultys:[
                {value:1, text: ''},
                {value:2, text: ''},
                {value:3, text: ''}
            ],
            options: {
                dotSize: 14,
                width: 'auto',
                height: 4,
                contained: false,
                direction: 'ltr',
                dataLabel: 'label',
                dataValue: 'value',
                min: 0.01,
                max: 100,
                interval: 0.01,
                disabled: false,
                clickable: true,
                adsorb: false,
                lazy: false,
                tooltip: 'active',
                tooltipPlacement: 'top',
                useKeyboard: false,
                dragOnClick: false,
                enableCross: true,
                fixed: false,
                order: true,
                process: true,
            },
            faultOptions: {
                dotSize: 14,
                width: 'auto',
                height: 4,
                contained: false,
                direction: 'ltr',
                dataLabel: 'label',
                dataValue: 'value',
                min: 10,
                max: 50,
                interval: 1,
                disabled: false,
                clickable: true,
                adsorb: false,
                lazy: false,
                tooltip: 'active',
                tooltipPlacement: 'top',
                useKeyboard: false,
                dragOnClick: false,
                enableCross: true,
                fixed: false,
                order: true,
                marks: [10,15,20,25,30,35,40,45,50],
                process: true,
            },
            answersCounter: 0,
            showConfirmWithDelete: false,
            serialNumber: 0,
            allQuestions: this.questions,
            // ===================================

            // Question in props
            currentQuestion: this.question,

            // сделать динамичными  - нач. значения
            answers: this.question.answers,
            questionCtx: this.question.questionCtx,
            theme: this.question.theme,
            difficulty: this.question.difficulty,
    	    ball: this.question.ball,
    	    multipleAnswers: this.question.multipleAnswers,

            answer: this.question.answer
        }
    },
    computed: mapGetters(['currentLang']),
    mounted() {
        this.difficultys[0].text = this.currentLang.workspaceView[17]
        this.difficultys[1].text = this.currentLang.workspaceView[18]
        this.difficultys[2].text = this.currentLang.workspaceView[19]

        this.checkIndex()

        if(this.currentQuestion.type != 'question-with-field'){
            this.answersCounter = this.question.answers.length
        }else{
            if(this.question.answer.length>=3){
                this.multipleAnswers = true
            }
        }

        if(this.imagePreview){
            this.showPreview = true
        
            setTimeout(()=>{
                if(this.answer){
                    this.summonField()
                }
            },500)
        }

        // балловая система
        if(this.params.ballSystem){
            this.options.min = +this.params.ballSystem.min
            this.options.max = +this.params.ballSystem.max
            this.options.interval = +this.params.ballSystem.interval
            this.options.marks = [+this.params.ballSystem.min, +this.params.ballSystem.max]

            if(this.ball<+this.params.ballSystem.min){
                this.ball = +this.params.ballSystem.min
            }
            if(this.ball>+this.params.ballSystem.max){
                this.ball = +this.params.ballSystem.max
            }
        }

        // проверка темы
        let themesCounter = 0
        this.params.themes.filter(el=>{
            if(el==this.theme){
                themesCounter++
            }
        })

        if(!themesCounter){
            this.theme = undefined
        }
    },
    methods: {
		handleFileUpload( event ){
			this.file = event
			let reader  = new FileReader()

			reader.addEventListener("load", function () {
				this.showPreview = true
				this.imagePreview = reader.result
			}.bind(this), false)

			if( this.file ){
				if ( /\.(jpe?g|png|svg|webp)$/i.test( this.file.name ) ) {
					reader.readAsDataURL( this.file )
				}
			}
		},

        deleteQuestion(id){
            this.deleteFunc(id)
        },

        addAnswer(){
            if(this.currentQuestion.answers.length >= 6){
                return this.errors.push(this.currentLang.validators[8])
            }
            
            let nextID=++this.answersCounter
            this.questionFunc('answer-add', null, this.currentQuestion.id, nextID)
        },

        changeAnswer(type, ctx, id, aID){
            if(type=='delete'){
                if(aID!=1 || aID!=2 || aID!=3){
                    this.questionFunc('answer-delete', ctx, id, aID)
                }
            } else if(type=='answerCtx'){
                this.questionFunc('answer-answerCtx', ctx, id, aID)
            } else if(type=='answerIsCurrect'){
                this.questionFunc('answer-answerIsCurrect', ctx, id, aID)
            } else if(type=='answer-imagePreview'){
                this.questionFunc('answer-imagePreview', ctx, id, aID)
            }
        },

        launchConfirm(){
            this.showConfirmWithDelete = true
            setTimeout(()=> this.showConfirmWithDelete = false, 3000)
        },
        checkIndex(){
            this.questions.filter(el => {
                if(el.id==this.currentQuestion.id){
                    this.serialNumber = this.questions.indexOf(el)+1
                    
                }
            })
        },

        getCoords(elem) {
                let box = elem.getBoundingClientRect();

                return {
                    top: Math.floor(box.top + pageYOffset),
                    left: Math.floor(box.left + pageXOffset)
                };

        },

        getPosition(){
            // Определение координат клика
            let clickX,clickY = 0
            let field = window.event
        
            if (field.pageX || field.pageY){
                clickX = field.pageX
                clickY = field.pageY
            } else if (field.clientX || field.clientY){
                clickX = field.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
                clickY = field.clientY + document.body.scrollTop + document.documentElement.scrollTop
            }

            // Определение координат элемента
            let target = document.querySelector(`.img_${this.currentQuestion.id}`)
            let obj = this.getCoords(target)

            if(!this.multipleAnswers){
                this.answer[1].y = clickY - obj.top
                this.answer[1].x = clickX - obj.left

                this.summonField()
            }else{
                if(this.answer[1]){
                    if(this.answer[1].x){
                        this.answer.push({
                            y: clickY - obj.top,
                            x: clickX - obj.left
                        })
                    } else{
                        this.answer[1].y = clickY - obj.top
                        this.answer[1].x = clickX - obj.left
                    }
                }else{
                    this.answer.push({
                        y: clickY - obj.top,
                        x: clickX - obj.left
                    })  
                }

                this.summonField()
            }

            this.answer.push('')
            this.answer.pop()
        },

        summonField(){
            let target = document.querySelector(`.img_${this.currentQuestion.id}`)

            if(!this.multipleAnswers){
                let removeEl = document.querySelectorAll(`.target-${this.currentQuestion.id}`)
                if(removeEl){
                    for(let i = 0; i!=removeEl.length; i++){
                        removeEl[i].remove()
                    }
                }

                if(this.answer[1] && this.answer[1].x){
                    let field = document.createElement('div')
                    field.classList.add(`target-${this.currentQuestion.id}`)
                    field.style.padding = this.answer[0].fault+'px'
                    field.style.backgroundColor = 'red'
                    field.style.opacity = '0.5'
                    field.style.position = 'absolute'
                    field.style.zIndex = 10
                    field.style.left = this.answer[1].x-this.answer[0].fault+'px'
                    field.style.top =  this.answer[1].y-this.answer[0].fault+'px'

                    target.appendChild(field)
                }
            }else{
                let removeEl = document.querySelectorAll(`.target-${this.currentQuestion.id}`)
                if(removeEl){
                    for(let i = 0; i!=removeEl.length; i++){
                        removeEl[i].remove()
                    }
                }

                this.answer.filter(el=>{
                    if(el.hasOwnProperty('x') && el.x){
                        let field = document.createElement('div')
                        field.classList.add(`target-${this.currentQuestion.id}`)
                        field.style.padding = this.answer[0].fault+'px'
                        field.style.backgroundColor = 'red'
                        field.style.opacity = '0.5'
                        field.style.position = 'absolute'
                        field.style.zIndex = 10
                        field.style.left = el.x-this.answer[0].fault+'px'
                        field.style.top =  el.y-this.answer[0].fault+'px'

                        target.appendChild(field)
                    }
                })
            }
        },

        clearFields(){
            this.answer = [this.answer[0], {x: undefined, y:undefined}]
            this.summonField()
        }
    },
    watch:{
        questionCtx(){
            this.questionFunc('questionCtx', this.questionCtx, this.currentQuestion.id)
        },
        ball(){
            this.questionFunc('ball', this.ball, this.currentQuestion.id)
        },
        theme(){
            this.questionFunc('theme', this.theme, this.currentQuestion.id)
        },
        difficulty(){
            this.questionFunc('difficulty', this.difficulty, this.currentQuestion.id)
        },
        answer(){
            this.questionFunc('field-answer', this.answer, this.currentQuestion.id)
        },
        imagePreview(){
            if(!this.imagePreview){
                this.showPreview = false
                
                if(this.currentQuestion.type=='question-with-field'){
                    if(!this.multipleAnswers){
                        let removeEl = document.querySelector(`.target-${this.currentQuestion.id}`)
                        if(removeEl){
                            removeEl.remove()
                        }

                        [1].y = undefined
                        this.answer[1].x = undefined
                    } else{
                        let removeEl = document.querySelectorAll(`.target-${this.currentQuestion.id}`)
                        if(removeEl){
                            for(let i = 0; i!=removeEl.length; i++){
                                removeEl[i].remove()
                            }
                        }

                        this.answer = [
                            {fault:20},
                            {x: undefined, y: undefined}
                        ]
                    }

                    // прописать и для multi
                }
            }else{
                this.showPreview = true
            }
            this.questionFunc('imagePreview', this.imagePreview, this.currentQuestion.id)
        },

        allQuestions(){
            this.checkIndex()
        },

        multipleAnswers(){
            if(this.currentQuestion.type!='question-with-field'){
                this.questionFunc('multipleAnswers', this.multipleAnswers, this.currentQuestion.id)

                //if false сделать правильным только 1 ответ
                if(!this.multipleAnswers){
                    this.answers.forEach(function(item, i, arr) {
                        if(i!=0){
                            arr[i].isCurrect = false
                        }
                    })

                    this.questionFunc('answers',  this.answers, this.currentQuestion.id)
                }
            } else{
                if(!this.multipleAnswers){
                    // При переключении удалять все области кроме первой
                    if(this.answer[1].x){
                        this.answer = [
                            this.answer[0],
                            this.answer[1]
                        ]
                    } else{
                        this.answer = [
                            this.answer[0],
                            {x: undefined, y:undefined}
                        ]
                    }
                    
                    this.summonField()
                }

            }
        }
    },
    components:{
        Answer,
        VueSlider,
        TestTypeIcons
    }
}
</script>

<style>
.test{
    background-color: aliceblue;
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0px 0px 5px 5px #4444441c;
    scroll-margin-top:90px;
    min-width: 1020px;
}

.test__answers{
    display: grid;
    grid-template-columns: repeat(auto-fill, 47%);
    justify-content: space-between;
    gap: 30px;
}

.test__question-param{
    width: 100%;
}

.params-3{
    display: grid;
    grid-template-columns: 2fr 1fr 0.5fr;
    justify-content: space-between;
    gap: 30px;
}
.params-2{
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    gap: 30px;
}

.confirm-delete{
    position: absolute;
    right:30px;
    top:-2px;
}

.v-input--selection-controls{
    margin-top: 0;
}

.delete-pic{
    position: absolute;
    right: 0;
    cursor: pointer;
    z-index: 9;
}
</style>