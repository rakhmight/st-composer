<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            v-bind="attrs"
            v-on="on"
            small
            width="270"
            color="#2f5286"
            class="mt-5"
            :disabled="loader || saveProcessFinally.value"
            >
                <v-icon color="#fff" class="mr-1" style="font-size: 20px;">mdi-file</v-icon>
                <span :style="!loader ? 'color: #fff' : 'color: #888'">{{ currentLang.additional[70] }}</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            {{ currentLang.additional[71] }}
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <!-- CONTENT -->
            <div style="padding: 30px">
                <div class="d-flex" style="gap: 15px">
                    <v-file-input
                    style="width: 100%;"
                    accept="application/doc"
                    show-size
                    counter
                    clearable
                    :label="currentLang.additional[72]"
                    dense
                    outlined
                    v-model="wordFile"
                    @change="handleWordUpload()"
                    :error="fileError.status"
                    :error-messages="fileError.msg"
                    :loading="loadFile"
                    color="var(--main-color)"
                    ></v-file-input>

                    <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        class="mt-1"
                        color="#0167FF"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="copySubjectID()"
                        >
                            <v-icon size="20">mdi-content-copy</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ currentLang.additional[128] }}</span>
                    </v-tooltip>  
                </div>          

                <div class="mt-3">
                    <v-alert
                    dense
                    dismissible
                    elevation="3"
                    type="success"
                    class="subtitle-2"
                    v-if="createSuccess"
                    >
                        {{ currentLang.additional[73] }}
                    </v-alert>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
const WordExtractor = require("word-extractor");
import getCurrentDate from '@/plugins/getCurrentDate'
import { sanitizeString } from '@/utils/sanitizeString'
import { mapGetters } from 'vuex'
import uzbekLangParser from '@/plugins/uzbekLangParser'

export default {
    props: {
        loader: Boolean,
        saveProcessFinally: Object,
        currentTest: Object,
        questionsCounter: Number,
        addQuestionsFromWordFile: Function
    },
    computed: mapGetters(['currentLang']),
    data(){
        return {
            dialog: false,
            blockBtn: false,

            wordFile: undefined,
            loadFile: false,
            fileError: {
                value: false,
                msg: undefined
            },
            createSuccess: false,

            
            questionCtxTemp:{
                de: undefined,
                fr: undefined,
                ru: undefined,
                eng: undefined,
                uz_l: undefined,
                uz_k: undefined,
                custom: undefined
            }
        }
    },
    methods: {
        copySubjectID(){
            navigator.clipboard.writeText(this.currentTest.subjectID)
        },

        handleWordUpload(){
            this.blockBtn = true
            this.loadFile = true
            this.fileError.status = false
            this.fileError.msg = undefined
            const ctx = this

			let reader  = new FileReader()

            reader.addEventListener("load", async function () {
                function toBuffer(arrayBuffer) {
                    const buffer = Buffer.alloc(arrayBuffer.byteLength);
                    const view = new Uint8Array(arrayBuffer);
                    for (let i = 0; i < buffer.length; ++i) {
                        buffer[i] = view[i];
                    }
                    return buffer;
                }

                this.loadFile= false
                const buffer = toBuffer(reader.result)

                const extractor = new WordExtractor();
                const extracted = extractor.extract(buffer);

                extracted.then(function(doc) {
                    const docBody = doc.getBody()
                    const docData = docBody.split("\n")
                    const rawData = []
                    const questions =[]

                    let currentLang = undefined
                    let currentTheme = undefined
                    let questionsCounter = ctx.questionsCounter + 1
                    let currentQuestion = undefined
                    let nextStr = null
                    let nextAnswerIsCorrect = false

                    let answersImg = []
                    for(let str of docData){
                        console.log(str);

                        if(str.length){
                            str = str.replace(/ +/g, ' ').trim()
                            
                            if(str.length){
                                rawData.push(str)

                                // Language
                                if(str === rawData[0]){

                                        if(str === 'ru' || str === 'uz_l' || str === 'uz_k' || str === 'de' || str === 'fr' || str === 'eng' || str === 'custom'){
                                            if(ctx.currentTest.languagesSettings.languages.indexOf(str)!=-1) currentLang = str
                                            else{
                                                ctx.fileError.status = true
                                                ctx.fileError.msg = `${ctx.currentLang.additional[89]}: ${str}`
                                                return
                                            }
                                            
                                        }
                                        else{
                                            ctx.fileError.status = true
                                            ctx.fileError.msg = ctx.currentLang.additional[90]
                                            return
                                        }

                                        continue
                                }
                                
                                // Subject ID
                                if(str === rawData[1]){
                                        if(str !== ctx.currentTest.subjectID) {
                                            ctx.fileError.status = true
                                            ctx.fileError.msg = ctx.currentLang.additional[74]
                                            return
                                        }

                                        continue
                                }

                                // Theme ID
                                if(str[0]==='&'){
                                        const theme = str.replace('&', '')
                                        if(!isNaN(+theme)){
                                            if(ctx.currentTest.themes.indexOf(+theme)!=-1){
                                                currentTheme = theme
                                            } else {
                                                ctx.fileError.status = true
                                                ctx.fileError.msg = `${ctx.currentLang.additional[91]}: ${str}`
                                                return
                                            }
                                        }else {
                                            ctx.fileError.status = true
                                            ctx.fileError.msg = `${ctx.currentLang.additional[92]}: ${str}`
                                            return
                                        }

                                        continue
                                }

                                // Question ID & difficulty
                                if(str[0]==='#'){
                                        const difficulty = str.replace('#', '')
                                        if(isNaN(+difficulty)){
                                            ctx.fileError.status = true
                                            ctx.fileError.msg = `${ctx.currentLang.additional[75]}: ${str}`
                                            return
                                        }

                                        currentQuestion = questionsCounter
                                        questions.push({
                                            id: currentQuestion,
                                            questionCtx: { ...ctx.questionCtxTemp },
                                            type: 'question-with-images',
                                            theme: +currentTheme,
                                            difficulty: +difficulty,
                                            ball:0.01,
                                            multipleAnswers: false,
                                            lastModified: getCurrentDate(),
                                            imagePreview: '',
                                            answers: []
                                        })

                                        nextStr = 'question'
                                        questionsCounter += 1 
                                        answersImg = []
                                        continue
                                }

                                if(str[0]==='@'){
                                        const answer = str.replace('@', '')
                                        if(isNaN(+answer)){
                                            ctx.fileError.status = true
                                            ctx.fileError.msg = `${ctx.currentLang.additional[76]}: ${str}`
                                            return
                                        }

                                        nextAnswerIsCorrect = answer > 0
                                        nextStr = 'answer'
                                        continue
                                }

                                if(nextStr === 'question'){
                                        const question = questions.find(q => q.id === currentQuestion)
                                        const questionIndex = questions.indexOf(question)

                                        str = sanitizeString(str)

                                        if( currentLang === 'ru' ) questions[questionIndex].questionCtx.ru = str
                                        else if( currentLang === 'uz_k' ) questions[questionIndex].questionCtx.uz_k = str
                                        else if( currentLang === 'uz_l' ) questions[questionIndex].questionCtx.uz_l = str
                                        else if( currentLang === 'eng' ) questions[questionIndex].questionCtx.eng = str
                                        else if( currentLang === 'de' ) questions[questionIndex].questionCtx.de = str
                                        else if( currentLang === 'fr' ) questions[questionIndex].questionCtx.fr = str
                                        else if( currentLang === 'custom' ) questions[questionIndex].questionCtx.custom = str

                                        // uz parser
                                        if(currentLang === 'uz_k') questions[questionIndex].questionCtx.uz_l = uzbekLangParser(str, 'kiril')
                                        else if(currentLang === 'uz_l') questions[questionIndex].questionCtx.uz_k = uzbekLangParser(str, 'lotin')

                                        nextStr = null
                                }
                                else if(nextStr === 'answer'){
                                        const question = questions.find(q => q.id === currentQuestion)
                                        const questionIndex = questions.indexOf(question)

                                        str = sanitizeString(str)

                                        if(!answersImg.find(a => a == str)){
                                            questions[questionIndex].answers.push({
                                                imagePreview:'',
                                                answerCtx: {
                                                    ru: currentLang === 'ru' ? str : undefined,
                                                    eng: currentLang === 'eng' ? str : undefined,
                                                    uz_l: currentLang === 'uz_l' ? str : undefined,
                                                    uz_k: currentLang === 'uz_k' ? str : undefined,
                                                    custom: currentLang === 'custom' ? str : undefined,
                                                    fr: currentLang === 'fr' ? str : undefined,
                                                    de: currentLang === 'de' ? str : undefined
                                                },
                                                isCurrect: nextAnswerIsCorrect
                                            })

                                            // uz parser
                                            if(currentLang === 'uz_k') questions[questionIndex].answers[questions[questionIndex].answers.length-1].answerCtx.uz_l = uzbekLangParser(str, 'kiril')
                                            else if(currentLang === 'uz_l') questions[questionIndex].answers[questions[questionIndex].answers.length-1].answerCtx.uz_k = uzbekLangParser(str, 'lotin')

                                            nextStr = null
                                            answersImg.push(str)
                                        } else {
                                            ctx.fileError.status = true
                                            ctx.fileError.msg = `${ctx.currentLang.additional[77]}: ${str}`
                                            return
                                        }
                                } else {
                                    console.log(nextStr);
                                    ctx.fileError.status = true
                                    ctx.fileError.msg = `${ctx.currentLang.additional[78]}: ${str}`
                                    return
                                }
                            }
                            
                        }
                    }

                    // Разбор ответов
                    if(questions.length){
                        for(let question of questions){
                            const answers = [ ...question.answers ]

                            const outputAnswers = []
                            let correctAnswersCounter = 0
                            answers.sort((item) => item.isCurrect ? -1 : 1)

                            let counter = 0
                            answers.map((item) => {
                                outputAnswers.push({ ...item, id: counter+1})
                                if(item.isCurrect) correctAnswersCounter++
                                counter++
                            })
                            
                            if(outputAnswers.length < 4){
                                while(outputAnswers.length!=4){
                                    outputAnswers.push({
                                        id: counter+1,
                                        imagePreview:'',
                                        answerCtx: {
                                            ru: undefined,
                                            eng: undefined,
                                            uz_l: undefined,
                                            uz_k: undefined,
                                            custom: undefined,
                                            fr: undefined,
                                            de: undefined
                                        },
                                        isCurrect: false
                                    })
                                    counter++
                                }
                            }

                            question.answers = outputAnswers
                            if(correctAnswersCounter>1) question.multipleAnswers = true
                        }
                    } else {
                        ctx.fileError.status = true
                        ctx.fileError.msg = this.currentLang.additional[79]
                        return
                    }

                    console.log(questions)
                    ctx.createSuccess = true
                    setTimeout(() => {
                        ctx.dialog = false
                        ctx.createSuccess = false
                        setTimeout(() => ctx.addQuestionsFromWordFile(questions), 200 )
                    }, 1000)
                });


			}.bind(this), false)

            if(this.wordFile){
                if ( /\.(doc|docx)$/i.test( this.wordFile.name ) ) {
					reader.readAsArrayBuffer(this.wordFile)
				} else{
                    this.fileError.status = true
                    this.fileError.msg = this.currentLang.additional[80]
                    return
                }
            } else {
                this.loadFile= false
                return
            }
        }
    }
}
</script>