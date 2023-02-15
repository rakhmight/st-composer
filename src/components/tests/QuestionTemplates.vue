<template>
    <div class="test" :class="`question_${currentQuestion.id}`" :id="currentQuestion.id">
        <div class="test__header d-flex flex-row justify-space-between mb-2" style="position: relative;">
            <div class="d-flex flex-row">
                <v-icon size="16" color="#888" class="mr-1">mdi-pound</v-icon>
                <p style="color: #888" class="mr-5">Вопрос {{ serialNumber }} (п/п) | {{ currentQuestion.id }} (ID)</p>

                <!--  -->
                <test-type-icons :type="currentQuestion.type" :questionID="currentQuestion.id" :questions="allQuestions"/>

            </div>
            <div class="d-flex flex-row">
                <v-icon size="16" color="#888" class="mr-1">mdi-clock-time-eight-outline</v-icon>
                <p style="color: #888">Последнее изменение: 00.00.0000 в 00:00</p>
                
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
                <span>Удалить</span>
                </v-tooltip>
            </div>

            <div class="confirm-delete" v-if="showConfirmWithDelete">
                <v-btn
                small
                color="#ff5f3b"
                dark
                @click="deleteQuestion(currentQuestion.id)"
                >
                    Уверены?
                </v-btn>
            </div>
        </div>

        <v-divider color="#bbb"></v-divider>

        <div class="test__question-box mt-3">
            <div>
                <p style="color: #888">Сущность вопроса:</p>
                <div class="d-flex flex-row align-start">
                    <v-textarea
                    dense
                    outlined
                    placeholder="Опишите вопрос"
                    rows="2"
                    prepend-icon="mdi-help-circle-outline"
                    v-model="questionCtx"
                    ></v-textarea>
                </div>
            </div>

            <div class="mb-10 pl-3 pr-3">
                <!-- range -->
                <p style="color: #888" class="mb-1">Балл за правильный ответ: <b style="color:green">{{ ball }}</b></p>
                <vue-slider
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
                placeholder="Выберите изображение"
                label="Загрузить изображение"
                outlined
                dense
                min-width="100%"
                prepend-icon="mdi-camera"
                @change="handleFileUpload( $event )"
                @click:clear="showPreview=false"
                @click="showPreview=false"
                ></v-file-input>

                <v-select
                :items="themes"
                placeholder="Тема"
                outlined
                dense
                v-model="theme"
                :success="theme!=undefined"
                ></v-select>

                <v-select
                :items="difficultys"
                placeholder="Сложность"
                outlined
                dense
                v-model="difficulty"
                :success="difficulty!=undefined"
                ></v-select>
            </div>
            <div class="d-flex justify-center">
                <v-img v-if="currentQuestion.type=='question-with-images'" width="600" height="300" contain v-bind:src="imagePreview" v-show="showPreview" class="mb-3"/>
            </div>

            <div class="mb-5 d-flex flex-row justify-space-between">
                <!--  -->
                <v-switch
                v-model="multipleAnswers"
                :label="currentQuestion.type!='question-with-field' ? 'Несколько ответов' : 'Несколько верных областей'"
                color="#0d5fd8"
                hide-details
                dense
                ></v-switch>

                <v-btn
                small
                dark
                color="#4e4e4e"
                v-if="currentQuestion.type=='question-with-field'"
                >
                <v-icon
                size="15"
                class="mr-1"
                color="#fff"
                >
                    mdi-cancel
                </v-icon>
                очистить
                </v-btn>
            </div>
        </div>

        <v-divider color="#bbb"></v-divider>

        <div class="test__answers-box mt-3" v-if="currentQuestion.type!='question-with-field'">
            <div class="d-flex flex-row justify-space-between align-center">
                <p style="color: #888">Ответы:</p>
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
        
        <div class="test__answers-box mt-3" v-else>
            <p style="color: #888">
                <span style="font-style: italic;color:#0d5fd8">Рекомендуемое разрешение изображения 1920:1080px (либо соотношение 16:9)</span><br>
                Отметьте нужный участок в области: X = {{ answer.x }} | Y = {{ answer.y }}
            </p>
            <div class="mt-3" v-if="showPreview">
                <v-img width="955" height="540" contain v-bind:src="imagePreview" v-show="showPreview" :class="`img_${currentQuestion.id}`" style="border: 3px solid #0d5fd8; margin:0 auto; position: relative;" @click="getPosition()"/>
            </div>
            <div v-else  class="mt-3 d-flex justify-center align-center">
                <v-img width="400" height="300" contain src="@/assets/media/upload.png" style="opacity: 0.5;" />
            </div>

            <div v-if="showPreview" class="mt-5 pb-6">
                <p style="color: #888">Приемлемый радиус погрешности ответа: <b>{{ answer.fault }}</b></p>
                
                <vue-slider
                    ref="slider"
                    v-model="answer.fault"
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

export default {
    props:{
        question: Object,
        deleteFunc: Function,
        questions: Array,

        questionFunc: Function,
    },
    data() {
        return {
            // Question start params ==============
            rules: [
                value => !value || value.size < 2000000 || 'Размер файла не должен превышать 2МБ',
            ],
			file: '',
            showPreview: false,
            imagePreview: '',
            errors:[],
            themes:[123,231,312],
            difficultys:[
                {value:1, text:'Лёгкий'},
                {value:2, text:'Средний'},
                {value:3, text:'Трудный'}
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
                max: 1,
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
                marks: [0.01,1],
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
    mounted() {
        this.checkIndex()

        if(this.answer){
            if(this.answer.x){
                this.summonField()
            }
        }

        if(this.currentQuestion.type != 'question-with-field'){
            this.answersCounter = this.question.answers.length
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
                return this.errors.push('Ответов не может быть больше 6')
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

            this.answer.y = clickY - obj.top
            this.answer.x = clickX - obj.left

            this.summonField()
        },

        summonField(){
            let removeEl = document.querySelector(`#target-${this.currentQuestion.id}`)
            if(removeEl){
                removeEl.remove()
            }

            let field = document.createElement('div')
            field.id=`target-${this.currentQuestion.id}`
            field.style.padding = this.answer.fault+'px'
            field.style.backgroundColor = 'red'
            field.style.opacity = '0.5'
            field.style.position = 'absolute'

            let target = document.querySelector(`.img_${this.currentQuestion.id}`)
            let obj = this.getCoords(target)

            field.style.left = this.answer.x-this.answer.fault+'px'
            field.style.top =  this.answer.y-this.answer.fault+'px'
            field.style.zIndex = 10  

            target.appendChild(field)
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
            this.questionFunc('theme', this.ball, this.currentQuestion.id)
        },
        difficulty(){
            this.questionFunc('difficulty', this.ball, this.currentQuestion.id)
        },
        answer(){
            this.questionFunc('field-answer', this.answer, this.currentQuestion.id)
                let removeEl = document.querySelector(`#target-${this.currentQuestion.id}`)
                if(removeEl){
                    removeEl.remove()
                }
        },

        allQuestions(){
            this.checkIndex()
        },

        showPreview(){
            if(!this.showPreview){
                let removeEl = document.querySelector(`#target-${this.currentQuestion.id}`)
                if(removeEl){
                    removeEl.remove()
                }

                this.answer.y = undefined
                this.answer.x = undefined
            }
        },

        multipleAnswers(){
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
</style>