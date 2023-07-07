<template>
    <div class="wrapper">
        <div class="container">
            <div class="workspace">

                <map-component
                :loader="loader.value"
                :mapQuestions="mapQuestions"
                :testOptions="testOptions"
                :currentQuestion="currentQuestion"
                :changeCurrentQuestion="changeCurrentQuestion"
                :saveProcess="saveProcess"
                :blockAddQBtnFunc="blockAddQBtnFunc"
                :stopSavingLoop="stopSavingLoop"
                :currentTest="currentTest"
                :questions="questions"
                :saveProcessFinally="saveProcessFinally"
                :remarks="currentTest.remarks"
                />

                <div class="workspace__sidebar-box"></div>
                
                <div class="workspace__content">
                    <div class="d-flex flex-column justify-center align-center" style="height: 60vh" v-if="loader.value">
                        <!-- !! Поменять!!!!! -->
                        <v-progress-circular
                        :size="70"
                        :width="3"
                        color="#0167ff"
                        indeterminate
                        >
                        </v-progress-circular>

                        <span class="mt-3" style="font-size: 0.95em;">{{ loader.text }}</span>
                    </div>

                    <div v-if="currentTest.remarks" style="height: auto">
                        <div
                        style="padding:15px;border: 1px solid #de2f13;border-radius: 5px; gap:10px"
                        class="d-flex flex-row align-center mb-3"
                        v-if="currentTest.remarks.find(remark=>remark.type=='general')"
                        >
                            <v-icon color="#de2f13">mdi-alert-circle-outline</v-icon>
                            <span style="font-size: 0.95em;width:100%">{{ getRemark() }}</span>
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                class="ml-8"
                                color="var(--main-color)"
                                v-bind="attrs"
                                v-on="on"
                                @click="removeRemark('general')"
                                >
                                mdi-check-circle-outline
                                </v-icon>
                            </template>
                            <span>Отметить как выполненное</span>
                            </v-tooltip>
                        </div>
                    </div>

                    <!-- !! 1 Question -->
                    <question-template
                    v-if="!loader.value && questions.length && !saveProcessFinally.value"
                    :currentQuestion="currentQuestion"
                    :testOptions="testOptions"
                    :deleteFunc="deleteQuestion"
                    :questionFunc="changeQuestion"
                    :parseMode="parseMode"
                    :showParse="showParse"
                    :switchCurrentQuestion="switchCurrentQuestion"
                    :remarks="currentTest.remarks"
                    :removeRemark="removeRemark"
                    />

                    <div v-if="questions.length==0 && !loader.value && !saveProcessFinally.value" class="d-flex flex-column justify-center align-center" style="height:70vh;background-color: #aaaaaa80;border-radius: 5px;">
                        <v-img
                        max-height="100"
                        max-width="100"
                        src="@/assets/media/spider-web.png"
                        contain
                        transition="scale-transition"
                        ></v-img>
                        <h3 style="color:#888" class="mt-5">{{ currentLang.workspaceView[9] }}</h3>
                    </div>

                    <div
                    v-if="saveProcessFinally.value"
                    class="d-flex flex-column align-center justify-center"
                    style="width: 100%; height: 60vh;"
                    >
                        <v-progress-circular
                        :size="50"
                        :width="3"
                        color="#0167ff"
                        indeterminate
                        >
                        </v-progress-circular>
                        <span class="mt-3" style="font-size: 0.95em;">{{ saveProcessFinally.ctx }}</span>
                    </div>
                </div>


                <div class="workspace__tools-box">
                    <!-- <tools/> -->
                    <tools
                    :loaderState='!loader.value'
                    :allTasks="tasks"
                    :createFunc="createQuestion"
                    :saveFunction="saveProcess"
                    :currentTestID="+currentTest.id"
                    :allQuestions="questions"
                    :blockAddQBtn="blockAddQBtn"
                    :parseMode="parseMode"
                    :changeParseMode="changeParseMode"
                    :showParse="showParse"
                    :saveProcessFinally="saveProcessFinally"
                    :switchAutosaving="switchAutosaving"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { operationFromStore } from '@/services/localDB'
import encrypt from '@/plugins/encrypt'
import QuestionTemplate from '@/components/tests/QuestionTemplate.vue'
import MapComponent from '@/components/tests/Map.vue'
import getCurrentDate from '@/plugins/getCurrentDate'
import Tools from '@/components/tests/Tools.vue'
import crypt from '@/plugins/crypt'

export default {
    data(){
        return {
            // Main
            mapQuestions: [],
            questions: [],
            currentTest: {},
            currentQuestion: {},

            // Optionaly
            testOptions: {},
            questionsCounter: 0,
            loader: {
                value: true,
                text: undefined,
                step: 'load-from-store',
                counter: 0,
            },
            parseMode: 'lotin-kiril',
            showParse: false,
            switchCurrentQuestion: false,
            tasks:[
                {name:'', isDisabled: false, type: 'question-with-images'},
                {name:'', isDisabled: false, type: 'question-with-field'},
                {name:'', isDisabled: true,}
            ],
            blockAddQBtn: false,
            savingInterval: undefined,

            savingProcessLoop: false,
            saveProcessFinally: {
                value: false,
                ctx: undefined
            }
        }
    },
    computed: mapGetters(['onWorkProcess','getTestID', 'currentLang', 'currentSign']),
    components:{
        QuestionTemplate,
        MapComponent,
        Tools
    },
    mounted(){
        if(!this.currentSign){
            return this.$router.push('/')
        }

        // текущий ID теста
        if(!this.getTestID){
            return this.$router.push('/dashboard')
        }

        // Task Lang
        this.tasks[0].name= this.currentLang.workspaceView[10]
        this.tasks[1].name= this.currentLang.workspaceView[11]
        this.tasks[2].name= this.currentLang.workspaceView[12]

        // Loader
        this.loader.text = 'Загрузка тестов'
        const loaderTextInterval = setInterval(()=>{
            if(this.loader.counter<3){
                this.loader.text = this.loader.text+'.'
                this.loader.counter++
            }else{
                this.loader.counter = 0
                if(this.loader.step == 'load-from-store'){
                    this.loader.text = 'Загрузка тестов'
                } else if (this.loader.step == 'encrypt-questions'){
                    this.loader.text = 'Расшифровка вопросов'
                } else if (this.loader.step == 'prepared-env'){
                    this.loader.text = 'Настройка окружения'
                }
            }
        }, 500)

        // Получение тестов

        setTimeout(()=>{
            operationFromStore('getByTestID',{id:+this.getTestID})
            .then(async (result)=>{            
                this.currentTest = result

                if(this.currentTest.languagesSettings.languages.indexOf('uz_l')!=-1 && this.currentTest.languagesSettings.languages.indexOf('uz_k')!=-1){
                    this.showParse=true
                }

                // Их расшифровка
                let testData
                this.loader.step = 'encrypt-questions'
                try {
                    testData = await encrypt(this.currentTest.questions, this.currentSign.keys.symmetric.key, this.currentSign.keys.symmetric.iv, this.currentSign.keys.symmetric.algorithm,this.currentSign.keys.symmetric.notation,this.currentSign.keys.symmetric.encoding)
                } catch (error) {
                    // запись в логи
                    console.error(error);
                    console.error('Sign is not valid');
                    this.clearSign()
                    this.$router.push('/')
                    return
                }

                // Настройка окружения
                this.loader.step = 'prepared-env'
                this.questions = JSON.parse(testData)
                this.currentQuestion = this.questions[0]

                // Test Options
                const testOptions = {
                    languagesSettings: this.currentTest.languagesSettings,
                    themes: this.currentTest.themes,
                    subjectID: this.currentTest.subjectID,
                }
                if(this.currentTest.ballSystem){
                    testOptions.ballSystem = this.currentTest.ballSystem
                }
                if(this.currentTest.considerDifficulty){
                    testOptions.considerDifficulty = this.currentTest.considerDifficulty
                }
                this.testOptions = testOptions

                // подготовка MAP
                this.questions.forEach(question=>{
                    const element = {
                        id: question.id,
                        questionCtx: question.questionCtx,
                        type: question.type
                    }
                    if(question.type=='question-with-field'){
                        element.answer = question.answer
                    } else if (question.type=='basic-question' || question.type=='question-with-images'){
                        element.answers = question.answers
                    }
                    this.mapQuestions.push(element)
                })

                this.loader.value = false
                clearInterval(loaderTextInterval)

                // установка счётчика вопросов
                if(this.questions.length){
                    this.questionsCounter = this.questions[this.questions.length-1].id
                }
            })
            .catch(e=>{
                console.error(this.currentLang.errors[0], e.message)
                this.$router.push('/')
            })
        },2000)

        // Австосохранение (кажд. 10 мин.)
        this.savingInterval = setInterval(()=>{
            this.saveProcess({forcedSave:true})
        }, 600000)
    },
    methods:{
        ...mapMutations(['clearSign']),
        getRemark(){
            const remark = this.currentTest.remarks.find(remark => remark.type=='general')
            return remark.msg
        },
        removeRemark(type, id){
            if(type=='question'){
                const target = this.currentTest.remarks.find(remark=>remark.question==id)
                const index = this.currentTest.remarks.indexOf(target)
                this.currentTest.remarks.splice(index, 1)
            } else if(type=='general'){
                const target = this.currentTest.remarks.find(remark=>remark.type=='general')
                const index = this.currentTest.remarks.indexOf(target)
                this.currentTest.remarks.splice(index, 1)
            }
        },
        switchAutosaving(mode){
            if(mode=='off'){
                clearInterval(this.savingInterval )
                this.savingInterval = undefined
            }else if(mode=='on'){
                if(!this.savingInterval){
                    // Австосохранение (кажд. 10 мин.)
                    this.savingInterval = setInterval(()=>{
                        this.saveProcess({forcedSave:true})
                    }, 600000)
                }
            }
        },
        stopSavingLoop(){
            // блокируем автосохранение
            this.savingProcessLoop = true
        },
        blockAddQBtnFunc(){
            this.blockAddQBtn = true
        },
        changeCurrentQuestion(id){
            const target = this.questions.find(question => question.id == id)
            this.currentQuestion = target
            this.switchCurrentQuestion = !this.switchCurrentQuestion
            console.log(id);
        },
        changeParseMode(mode){
            this.parseMode = mode
        },

        createQuestion(type){
            this.blockAddQBtn = true
            let question = {
                id: this.questionsCounter+1,
                type,
                questionCtx:{
                    de: undefined,
                    fr: undefined,
                    ru: undefined,
                    eng: undefined,
                    uz_l: undefined,
                    uz_k: undefined,
                    custom: undefined
                },
                theme: undefined,
                difficulty: undefined,
                ball:0.01,
                multipleAnswers: false,
                lastModified: getCurrentDate(),
            }

            this.currentTest.testInfo.totalQuestions++
            if(type=='question-with-field'){
                // позже реализовать логику обнуления x и y если нет картинки
                question.imagePreview = ''
                question.answer = [{fault: 20},{x:undefined, y:undefined}]
                this.currentTest.testInfo.qwf++
            }
            else{
                if(type=='question-with-images'){
                    question.imagePreview = ''
                    question.answers = [
                        {id:1, imagePreview:'', answerCtx:{ ru: undefined,eng: undefined,uz_l: undefined,uz_k: undefined, custom: undefined, fr: undefined, de: undefined}, isCurrect:true},
                        {id:2, imagePreview:'', answerCtx:{ ru: undefined,eng: undefined,uz_l: undefined,uz_k: undefined, custom: undefined, fr: undefined, de: undefined}, isCurrect:false},
                        {id:3, imagePreview:'', answerCtx:{ ru: undefined,eng: undefined,uz_l: undefined,uz_k: undefined, custom: undefined, fr: undefined, de: undefined}, isCurrect:false}
                    ]
                    this.currentTest.testInfo.qwi++
                } else{
                    question.answers = [
                        {id:1, answerCtx:{ ru: undefined,eng: undefined,uz_l: undefined,uz_k: undefined, custom: undefined, fr: undefined, de: undefined}, isCurrect:true},
                        {id:2, answerCtx:{ ru: undefined,eng: undefined,uz_l: undefined,uz_k: undefined, custom: undefined, fr: undefined, de: undefined}, isCurrect:false},
                        {id:3, answerCtx:{ ru: undefined,eng: undefined,uz_l: undefined,uz_k: undefined, custom: undefined, fr: undefined, de: undefined}, isCurrect:false}
                    ]
                    this.currentTest.testInfo.bq++
                }
            }

            this.questions.push(question)
            this.questionsCounter++
            this.mapQuestions.push(question)

            if(this.questions.length==1){
                this.currentQuestion = this.questions[0]
            }
            //this.saveProcess()
            
            this.blockAddQBtn = false
        },

        deleteQuestion(id){
            const target = this.questions.find(question=> question.id==id)
            
            this.currentTest.testInfo.totalQuestions--
            if(target.type=='basic-question'){
                this.currentTest.testInfo.bq--
            } else if(target.type=='question-with-images'){
                this.currentTest.testInfo.qwi--
            } else if(target.type=='question-with-field'){
                this.currentTest.testInfo.qwf--
            }

            const index = this.questions.indexOf(target)
            this.questions.splice(index, 1)
            
            if(this.questions[index]){
                this.currentQuestion = this.questions[index]
            }else if (this.questions[index-1]){
                this.currentQuestion = this.questions[index-1]
            }else if (this.questions[index+1]){
                this.currentQuestion = this.questions[index+1]
            }else{
                this.currentQuestion = {}
            }
            this.switchCurrentQuestion = !this.switchCurrentQuestion

            const mapTarget = this.mapQuestions.find(map=>map.id==id)
            const mapIndex = this.mapQuestions.indexOf(mapTarget)
            this.mapQuestions.splice(mapIndex, 1)

            // this.saveProcess({forcedSave:true})
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
                        // if(this.allowToSaveTheme){
                        //     this.saveProcess({forcedSave:true})
                        // }
                    }else if(type=='difficulty'){
                        this.questions[index].difficulty = ctx
                        this.questions[index].lastModified = getCurrentDate()
                        //this.saveProcess({forcedSave:true})
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
                        //this.saveProcess({forcedSave:true})
                    }else if(type=='answer-add'){
                        this.questions[index].answers.push({
                            id: aID,
                            answerCtx: { ru: undefined,eng: undefined,uz_l: undefined,uz_k: undefined, custom: undefined},
                            isCurrect: false
                        })
                        this.questions[index].lastModified = getCurrentDate()
                        //this.saveProcess({forcedSave:true})
                    }else if(type=='field-answer'){
                        this.questions[index].answer = ctx
                        this.questions[index].lastModified = getCurrentDate()
                        //this.saveProcess({forcedSave:true})
                    }else if(type=='multipleAnswers'){
                        this.questions[index].multipleAnswers = ctx
                        this.questions[index].lastModified = getCurrentDate()
                    }else if(type=='answers'){
                        this.questions[index].answers = ctx
                        this.questions[index].lastModified = getCurrentDate()
                        //this.saveProcess({forcedSave:true})
                    }else if(type=='answer-answerIsCurrect'){
                        this.questions[index].answers.filter(el => {
                            if(el.id == aID){
                                let aIndex = this.questions[index].answers.indexOf(el)
                                this.questions[index].answers[aIndex].isCurrect = ctx
                            }
                        })
                        this.questions[index].lastModified = getCurrentDate()
                        //this.saveProcess({forcedSave:true})
                    }else if(type=='imagePreview'){
                        this.questions[index].imagePreview = ctx
                        this.questions[index].lastModified = getCurrentDate()
                        //this.saveProcess({forcedSave:true})
                    }else if(type=='answer-imagePreview'){
                        this.questions[index].answers.filter(el => {
                            if(el.id == aID){
                                let aIndex = this.questions[index].answers.indexOf(el)
                                this.questions[index].answers[aIndex].imagePreview = ctx
                            }
                        })
                        this.questions[index].lastModified = getCurrentDate()
                        //this.saveProcess({forcedSave:true})
                    }
                }
            })
        },

        async saveProcess(params){
            if(params){
                if(params.route){
                    // блокируем автосохранение
                    this.savingProcessLoop = true

                    this.saveProcessFinally.value=true
                    if(params.newTest){
                        this.saveProcessFinally.ctx = 'Сохранение перед подписанием'
                    } else if(params.route){
                        this.saveProcessFinally.ctx = 'Сохранение перед выходом'
                    }
                    this.blockAddQBtn = true

                    setTimeout(async ()=>{
                        let output
                        clearInterval(this.savingInterval)
                        
                        const testData = crypt(this.questions, this.currentSign.keys.symmetric.key, this.currentSign.keys.symmetric.iv, this.currentSign.keys.symmetric.algorithm,this.currentSign.keys.symmetric.notation,this.currentSign.keys.symmetricencoding)
                        this.currentTest.lastModified = getCurrentDate()
                        output = {
                            ...this.currentTest,
                            questions: testData
                        }

                        await operationFromStore('deleteTest',{id: +this.getTestID})
                        .then(async ()=>{
                            await operationFromStore('addTest',{data: output})
                        })
                        .then(()=>{
                            console.info('(i) process is saved before quit')
                            this.$router.push('/dashboard')
                            this.savingProcessLoop = false
                        })
                        .catch(e=>{
                            console.error(this.currentLang.errors[0],e)
                        })
                    }, 4000)
                }
            }

            if(!this.savingProcessLoop && !params.route){
                this.saveProcessFinally.value = true
                this.savingProcessLoop = true
                if(params.manual){
                    
                this.saveProcessFinally.ctx = 'Сохранение процесса.\nПодождите..'
                } else{
                    this.saveProcessFinally.ctx = 'Автоматическое сохранение.\nПодождите..'
                }

                
                setTimeout(async()=>{

                    // зашифровка
                    const testData = crypt(this.questions, this.currentSign.keys.symmetric.key, this.currentSign.keys.symmetric.iv, this.currentSign.keys.symmetric.algorithm,this.currentSign.keys.symmetric.notation,this.currentSign.keys.symmetric.encoding)

                    if(this.onWorkProcess && this.$route.path == '/workspace' && this.blockAddQBtn || this.onWorkProcess && this.$route.path == '/workspace' && params && params.forcedSave){
                        this.currentTest.lastModified = getCurrentDate()
                        let output = {
                            ...this.currentTest,
                            questions: testData
                        }

                        await operationFromStore('deleteTest',{id: +this.getTestID})
                        .then(async ()=>{
                                await operationFromStore('addTest',{data: output})
                                .then(()=>{
                                    console.info('(i) process is saved')
                                    setTimeout(()=>{
                                        this.blockAddQBtn = false
                                        this.savingProcessLoop = false
                                        this.saveProcessFinally.value = false
                                    }, 2000)
                                })
                        })
                        .catch(e=>{
                            console.error(this.currentLang.errors[0],e)
                        })
                    }
            
                },2000)

            }else {
                return
            }
        },
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
@media screen and (max-height: 400px){
.workspace__map{
    max-height: 40vh;
} 
}
@media screen and (max-height: 900px){
.workspace__map{
    max-height: 55vh;
}
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
    /* gap: 40px; */
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
    z-index:1000;
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