<template>
    <v-dialog
        v-model="dialog"
        width="750"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            v-bind="attrs"
            v-on="on"
            small
            width="270"
            color="#0c2242"
            class="mt-5"
            :disabled="loader || saveProcessFinally.value"
            >
                <v-icon color="#fff" class="mr-1">mdi-draw</v-icon>
                <span :style="!loader ? 'color: #fff' : 'color: #888'">{{ currentLang.additional[38] }}</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
                {{ currentLang.additional[39] }}
            <v-icon color="red" @click="dialog=false" size="30" v-if="!signProcedure">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content mt-5 mb-5 pr-5 pl-5" v-if="!checkingLoader && !signProcedure && !emptyTestError && !errors.length">
                <p class="text-body-1" style="color: #000;text-indent: 25px;">{{ currentLang.additional[40] }}</p>
                <p class="text-body-1 mt-2" style="color: #000;text-indent: 25px;">{{ currentLang.additional[41] }}</p>
            </div>
            <div class="dialog-content d-flex flex-column align-center justify-center" style="height: 25vh;" v-if="checkingLoader">
                <v-progress-circular
                :size="50"
                color="#0c2242"
                indeterminate
                ></v-progress-circular>
                <span class="mt-3 text-center" style="font-size: 0.95em;">
                    {{ currentLang.additional[42] }}
                    <br>
                    <v-icon color="orange" size="18" class="mr-1">mdi-alert-outline</v-icon>
                    {{ currentLang.additional[43] }}
                </span>
            </div>
            <div class="dialog-content d-flex flex-column align-center justify-center" style="height: 25vh;" v-if="emptyTestError">
                <v-icon color="warning" size="40">mdi-alert-circle-outline</v-icon>
                <span class="text-h6">{{ currentLang.additional[44] }}</span>
            </div>
            <div class="dialog-content d-flex flex-column align-center justify-center" style="height: 25vh;" v-if="success">
                <v-icon color="#0c2242" size="40">mdi-check</v-icon>
                <span class="text-h6">{{ currentLang.additional[45] }}</span>
            </div>
            <div class="dialog-content mt-5 mb-5 pr-5 pl-5 d-flex flex-column" style="gap: 7px" v-if="!checkingLoader && errors.length && !emptyTestError">
                <div
                v-for="(error, i) in errors"
                :key="i"
                class="d-flex flex-row align-start"
                >
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='q-field-ru' || error.type=='q-field-custom' || error.type=='q-field-eng' || error.type=='q-field-uz_l' || error.type=='q-field-uz_k' || error.type=='q-field-fr' || error.type=='q-field-de'">mdi-help-circle-outline</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='a-field-ru' || error.type=='a-field-custom' || error.type=='a-field-eng' || error.type=='a-field-uz_l' || error.type=='a-field-uz_k'">mdi-lightbulb</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='image'">mdi-camera</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='pos'">mdi-selection-ellipse-arrow-inside</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='theme'">mdi-alpha-t-box-outline</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='difficulty'">mdi-chart-line</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='remarks'">mdi-alert-circle-outline</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='answers-proportional'">mdi-alert</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='answers-doubled'">mdi-repeat</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='question-doubled'">mdi-ab-testing</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='correct-answer'">mdi-alpha-a</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='question-similar'">mdi-percent</v-icon>
                    <v-icon style="margin-top: 2px;" size="19" color="#e83b07" v-if="error.type=='incorrect-symbol'">mdi-symbol</v-icon>
                    <p
                    class="text-body-1 mr-2 ml-2"
                    style="color: #000;"
                    >{{ error.ctx }}</p>
                    <div style="width: 18px; height: 18px;">
                        <v-img src="@/assets/media/global.png" v-if="error.type=='q-field-custom' || error.type=='a-field-custom'"></v-img>
                        <v-img src="@/assets/media/russia.png" v-if="error.type=='q-field-ru' || error.type=='a-field-ru'"></v-img>
                        <v-img src="@/assets/media/france.png" v-if="error.type=='q-field-fr' || error.type=='a-field-fr'"></v-img>
                        <v-img src="@/assets/media/germany.png" v-if="error.type=='q-field-de' || error.type=='a-field-de'"></v-img>
                        <v-img src="@/assets/media/united-states.png" v-if="error.type=='q-field-eng' || error.type=='a-field-eng'"></v-img>
                        <v-img src="@/assets/media/uzbekistan.png" v-if="error.type=='q-field-uz_l' || error.type=='a-field-uz_l'"></v-img>
                        <v-img src="@/assets/media/uzbekistan.png" v-if="error.type=='q-field-uz_k' || error.type=='a-field-uz_k'"></v-img>
                    </div>
                </div>
            </div>

            <v-divider></v-divider>
            <v-card-actions class="d-flex align-items-center flex-column">

            <v-spacer></v-spacer>
            <v-btn
                color="#0c2242"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="delete-btn"
                @click="signTest"
            >
                <span style="color: #fff">{{ currentLang.additional[38] }}</span>
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import asyncCrypt from '@/plugins/asyncCrypt'
import { mapGetters } from 'vuex'
import { operationFromStore } from '@/services/localDB'
import crypt from '@/plugins/crypt'
import { sanitizeString } from '@/utils/sanitizeString'
import { stringsMatching, prepareString } from '@/utils/stringsMatching'

export default {
    props:{
        loader: Boolean,
        currentTest: Object,
        questions: Array,
        stopSavingLoop: Function,
        saveProcessFinally: Object,
        remarks: undefined | Array,
        saveProcess: Function,
        remarksHandler: Function,
        changeCurrentQuestion: Function,
        currentQuestion: Object
    },
    data(){
        return {
            dialog: false,
            blockBtn: false,
            success: false,
            errors: [],
            checkingLoader: false,
            signProcedure: false,
            emptyTestError: false
        }
    },
    computed: mapGetters(['currentSign', 'currentLang']),
    methods:{
        async signTest(){
            if(!this.questions.length){
                return this.emptyTestError = true
            } else{
                this.emptyTestError = false
            }
            this.signProcedure = true
            this.checkingLoader = true
            this.blockBtn = true

            setTimeout(()=>{
                this.checkingError()

                if(this.errors.length){
                    this.changeCurrentQuestion(this.currentQuestion.id)
                    this.checkingLoader = false
                    this.blockBtn = false
                    return
                }

                // остановка авто сохранения
                // this.saveProcess({forcedSave:true, manual: true})
                this.stopSavingLoop()

                setTimeout(async ()=>{
                    if(!this.currentTest.status.isSigned){
                        const date = new Date()
                        const timer = {
                            id: date.getTime(),
                            date: new Date(),
                            testID: this.currentTest.id
                        }
                        // добавление нов элемента в БД timers
                        await operationFromStore('addTimer', {data: timer})
                    }

                    await asyncCrypt(JSON.stringify(this.questions), this.currentSign.keys.assymetric.publicKey.toString('utf8'))
                    .then(async (data)=>{
                        // сборка теста для выгрузки
                        const signedDate = new Date()
                        const usefulHistory = []
                        this.currentTest.history.forEach(item=>{
                            if(item.type=='signed' || item.type=='rejected-inspector' || item.type=='rejected-admin'){
                                usefulHistory.push(item)
                            }else if(item.type=='import'){
                                usefulHistory.push({date: item.date.full, type: 'import'})
                            }
                        })

                        const test = {
                            id: this.currentTest.id,
                            fileDate: signedDate.getTime(),
                            author: this.currentSign.id,
                            signHash: this.currentSign.hash,
                            params:{
                                themes: this.currentTest.themes,
                                subject: this.currentTest.subjectID,
                                languagesSettings: this.currentTest.languagesSettings,
                                ballSystem: this.currentTest.ballSystem,
                                considerDifficulty: this.currentTest.considerDifficulty,
                            },
                            testInfo: this.currentTest.testInfo,
                            questions: data,
                            history: [
                                {date: this.currentTest.history[0].date.full, type: 'create'},
                                {date: signedDate, type: 'signed'},
                                ...usefulHistory
                            ]
                        }

                        if(this.currentTest.testImage){
                            test.testImage = this.currentTest.testImage
                        }

                        // Удаление прежнего signed
                        await operationFromStore('deleteSigned', {id: this.currentTest.id})
                        .then(async ()=>{
                        // добавление теста в БД signed
                        await operationFromStore('addSigned', {data: test})
                            .then(async ()=>{
                                const history = [...this.currentTest.history, {date: signedDate, type: 'signed'}]
                                const testToSave = {
                                    ...this.currentTest,
                                    history,
                                    questions: crypt(this.questions, this.currentSign.keys.symmetric.key, this.currentSign.keys.symmetric.iv, this.currentSign.keys.symmetric.algorithm,this.currentSign.keys.symmetric.notation,this.currentSign.keys.symmetric.encoding),
                                    status: {...this.currentTest.status, isSigned: true}
                                }
                                if(!this.currentTest.status.isSigned){
                                    testToSave.signedDate = signedDate
                                }
                                // изменение текущих тестов (isSigned, signedDate, history)
                                await operationFromStore('deleteTest',{id: this.currentTest.id})
                                .then(async ()=>{
                                    await operationFromStore('addTest',{data: testToSave})
                                    .then(()=>{
                                        this.checkingLoader = false
                                        this.success = true
                                        console.info('(i) process is saved after signing')

                                        setTimeout(()=>{
                                            this.$router.push('/dashboard')
                                        },3000)
                                    })
                                })
                            })
                        })
                    })
                }, 400)
            }, 500)
        },

        checkingError(){
            this.errors = []

            // проверка на незаполненные поля и не отмеченные темы, сложность
            this.questions.forEach(question=>{
                const qIndex = this.questions.indexOf(question)

                if(this.currentTest.languagesSettings.languages.indexOf('custom')!=-1){
                    if(!question.questionCtx.custom){
                        this.remarksHandler('add', { type: 'q-field-custom', msg: this.currentLang.additional[46], question: question.id})
                        this.errors.push({type: 'q-field-custom', ctx: `${this.currentLang.additional[46]}: ${question.id}`})
                    }
                    else {
                        this.questions[qIndex].questionCtx.custom = sanitizeString(this.questions[qIndex].questionCtx.custom)
                        this.remarksHandler('remove', { type: 'q-field-custom', question: question.id})
                    }

                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            const aIndex = question.answers.indexOf(answer)

                            if(!answer.answerCtx.custom && answer.imagePreview && !answer.imagePreview.length || !answer.answerCtx.custom && !answer.imagePreview){
                                this.remarksHandler('add', { type: `a-field-custom-${x+1}`, msg: `${this.currentLang.additional[47]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`, question: question.id})
                                this.errors.push({type: 'a-field-custom', ctx: `${this.currentLang.additional[47]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`})
                            } else this.remarksHandler('remove', { type: `a-field-custom-${x+1}`, question: question.id})

                            if(answer.answerCtx.custom){
                                this.questions[qIndex].answers[aIndex].answerCtx.custom = sanitizeString(this.questions[qIndex].answers[aIndex].answerCtx.custom)
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('ru')!=-1){
                    if(!question.questionCtx.ru){
                        this.remarksHandler('add', { type: 'q-field-ru', msg: this.currentLang.additional[49], question: question.id})
                        this.errors.push({type: 'q-field-ru', ctx: `${this.currentLang.additional[49]}: ${question.id}`})
                    }
                    else {
                        this.questions[qIndex].questionCtx.ru = sanitizeString(this.questions[qIndex].questionCtx.ru)
                        this.remarksHandler('remove', { type: 'q-field-ru', question: question.id})
                    }

                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            const aIndex = question.answers.indexOf(answer)
                            
                            if(!answer.answerCtx.ru && answer.imagePreview && !answer.imagePreview.length || !answer.answerCtx.ru && !answer.imagePreview){
                                this.remarksHandler('add', { type: `a-field-ru-${x+1}`, msg: `${this.currentLang.additional[50]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`, question: question.id})
                                this.errors.push({type: 'a-field-ru', ctx: `${this.currentLang.additional[50]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`})
                            } else this.remarksHandler('remove', { type: `a-field-ru-${x+1}`, question: question.id})

                            if(answer.answerCtx.ru){
                                this.questions[qIndex].answers[aIndex].answerCtx.ru = sanitizeString(this.questions[qIndex].answers[aIndex].answerCtx.ru)
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('eng')!=-1){
                    if(!question.questionCtx.eng){
                        this.remarksHandler('add', { type: 'q-field-eng', msg: this.currentLang.additional[51], question: question.id})
                        this.errors.push({type: 'q-field-eng', ctx: `${this.currentLang.additional[51]}: ${question.id}`})
                    }
                    else {
                        this.questions[qIndex].questionCtx.eng = sanitizeString(this.questions[qIndex].questionCtx.eng)
                        this.remarksHandler('remove', { type: 'q-field-eng', question: question.id})
                    }

                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            const aIndex = question.answers.indexOf(answer)

                            if(!answer.answerCtx.eng && answer.imagePreview && !answer.imagePreview.length || !answer.answerCtx.eng && !answer.imagePreview){
                                this.remarksHandler('add', { type: `a-field-eng-${x+1}`, msg: `${this.currentLang.additional[52]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`, question: question.id})
                                this.errors.push({type: 'a-field-eng', ctx: `${this.currentLang.additional[52]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`})
                            } else this.remarksHandler('remove', { type: `a-field-eng-${x+1}`, question: question.id})

                            if(answer.answerCtx.eng){
                                this.questions[qIndex].answers[aIndex].answerCtx.eng = sanitizeString(this.questions[qIndex].answers[aIndex].answerCtx.eng)
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('uz_l')!=-1){
                    if(!question.questionCtx.uz_l){
                        this.remarksHandler('add', { type: 'q-field-uz_l', msg: this.currentLang.additional[53], question: question.id})
                        this.errors.push({type: 'q-field-uz_l', ctx: `${this.currentLang.additional[53]}: ${question.id}`})
                    }
                    else {
                        this.questions[qIndex].questionCtx.uz_l = sanitizeString(this.questions[qIndex].questionCtx.uz_l)
                        this.remarksHandler('remove', { type: 'q-field-uz_l', question: question.id})
                    }

                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            const aIndex = question.answers.indexOf(answer)

                            if(!answer.answerCtx.uz_l && answer.imagePreview && !answer.imagePreview.length || !answer.answerCtx.uz_l && !answer.imagePreview){
                                this.remarksHandler('add', { type: `a-field-uz_l-${x+1}`, msg: `${this.currentLang.additional[54]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`, question: question.id})
                                this.errors.push({type: 'a-field-uz_l', ctx: `${this.currentLang.additional[54]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`})
                            } else this.remarksHandler('remove', { type: `a-field-uz_l-${x+1}`, question: question.id})

                            if(answer.answerCtx.uz_l){
                                this.questions[qIndex].answers[aIndex].answerCtx.uz_l = sanitizeString(this.questions[qIndex].answers[aIndex].answerCtx.uz_l)
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('uz_k')!=-1){
                    if(!question.questionCtx.uz_k){
                        this.remarksHandler('add', { type: 'q-field-uz_k', msg: this.currentLang.additional[55], question: question.id})
                        this.errors.push({type: 'q-field-uz_k', ctx: `${this.currentLang.additional[55]}: ${question.id}`})
                    }
                    else {
                        this.questions[qIndex].questionCtx.uz_k = sanitizeString(this.questions[qIndex].questionCtx.uz_k)
                        this.remarksHandler('remove', { type: 'q-field-uz_k', question: question.id})
                    }

                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            const aIndex = question.answers.indexOf(answer)

                            if(!answer.answerCtx.uz_k && answer.imagePreview && !answer.imagePreview.length || !answer.answerCtx.uz_k && !answer.imagePreview){
                                this.remarksHandler('add', { type: `a-field-uz_k-${x+1}`, msg: `${this.currentLang.additional[56]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`, question: question.id})
                                this.errors.push({type: 'a-field-uz_k', ctx: `${this.currentLang.additional[56]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`})
                            } else this.remarksHandler('remove', { type: `a-field-uz_k-${x+1}`, question: question.id})

                            if(answer.answerCtx.uz_k){
                                this.questions[qIndex].answers[aIndex].answerCtx.uz_k = sanitizeString(this.questions[qIndex].answers[aIndex].answerCtx.uz_k)
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('fr')!=-1){
                    if(!question.questionCtx.fr){
                        this.remarksHandler('add', { type: 'q-field-fr', msg: this.currentLang.additional[57], question: question.id})
                        this.errors.push({type: 'q-field-fr', ctx: `${this.currentLang.additional[57]}: ${question.id}`})
                    }
                    else {
                        this.questions[qIndex].questionCtx.fr = sanitizeString(this.questions[qIndex].questionCtx.fr)
                        this.remarksHandler('remove', { type: 'q-field-fr', question: question.id})
                    }

                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            const aIndex = question.answers.indexOf(answer)

                            if(!answer.answerCtx.fr && answer.imagePreview && !answer.imagePreview.length || !answer.answerCtx.fr && !answer.imagePreview){
                                this.remarksHandler('add', { type: `a-field-fr-${x+1}`, msg: `${this.currentLang.additional[58]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`, question: question.id})
                                this.errors.push({type: 'a-field-fr', ctx: `${this.currentLang.additional[58]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`})
                            } else this.remarksHandler('remove', { type: `a-field-fr-${x+1}`, question: question.id})

                            if(answer.answerCtx.fr){
                                this.questions[qIndex].answers[aIndex].answerCtx.fr = sanitizeString(this.questions[qIndex].answers[aIndex].answerCtx.fr)
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('de')!=-1){
                    if(!question.questionCtx.de){
                        this.remarksHandler('add', { type: 'q-field-de', msg: this.currentLang.additional[59], question: question.id})
                        this.errors.push({type: 'q-field-de', ctx: `${this.currentLang.additional[59]}: ${question.id}`})
                    }
                    else {
                        this.questions[qIndex].questionCtx.de = sanitizeString(this.questions[qIndex].questionCtx.de)
                        this.remarksHandler('remove', { type: 'q-field-de', question: question.id})
                    }

                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            const aIndex = question.answers.indexOf(answer)

                            if(!answer.answerCtx.de && answer.imagePreview && !answer.imagePreview.length || !answer.answerCtx.de && !answer.imagePreview){
                                this.remarksHandler('add', { type: `a-field-de-${x+1}`, msg: `${this.currentLang.additional[60]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`, question: question.id})
                                this.errors.push({type: 'a-field-de', ctx: `${this.currentLang.additional[60]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`})
                            } else this.remarksHandler('remove', { type: `a-field-de-${x+1}`, question: question.id})

                            if(answer.answerCtx.de){
                                this.questions[qIndex].answers[aIndex].answerCtx.de = sanitizeString(this.questions[qIndex].answers[aIndex].answerCtx.de)
                            }
                        })
                    }
                }
                
                if(question.type=='basic-question' || question.type=='question-with-images'){
                    // if(question.type=='question-with-images'){
                    //     if(!question.imagePreview.length){
                    //         this.errors.push({type: 'image', ctx: `${this.currentLang.additional[61]}: ${question.id}`})
                    //     }
                    // }
                    // question.answers.forEach((answer, x)=>{
                    //     if(question.type=='question-with-images' && !answer.imagePreview.length){
                    //         this.errors.push({type: 'image', ctx: `${this.currentLang.additional[62]}: ${question.id}, ${this.currentLang.additional[48]}: ${x+1}`})
                    //     }
                    // })
                } else if(question.type=='question-with-field'){
                        if(!question.imagePreview.length){
                            this.remarksHandler('add', { type: 'image', msg: this.currentLang.additional[53], question: question.id})
                            this.errors.push({type: 'image', ctx: `${this.currentLang.additional[53]}: ${question.id}`})
                        } else this.remarksHandler('remove', { type: 'image', question: question.id})
                        if(!question.answer[1].y){
                            this.remarksHandler('add', { type: 'pos', msg: this.currentLang.additional[64], question: question.id})
                            this.errors.push({type: 'pos', ctx: `${this.currentLang.additional[64]}: ${question.id}`})
                        } else this.remarksHandler('remove', { type: 'pos', question: question.id})
                }

                if(!question.theme){
                    this.remarksHandler('add', { type: 'theme', msg: this.currentLang.additional[65], question: question.id})
                    this.errors.push({type: 'theme', ctx: `${this.currentLang.additional[65]}: ${question.id}`})
                } else this.remarksHandler('remove', { type: 'theme', question: question.id})
                if(this.currentTest.considerDifficulty){
                    if(!question.difficulty){
                        this.remarksHandler('add', { type: 'difficulty', msg: this.currentLang.additional[66], question: question.id})
                        this.errors.push({type: 'difficulty', ctx: `${this.currentLang.additional[66]}: ${question.id}`})
                    } else this.remarksHandler('remove', { type: 'difficulty', question: question.id})
                }

                // проверка на неизвестные и некорректные символы в вопросе
                if(question.questionCtx.ru){
                    if(question.questionCtx.ru.indexOf('�') != -1){
                        this.remarksHandler('add', { type: `incorrect-symbol-ru-q`, msg: `${this.currentLang.additional[119]}: ${question.id} ${this.currentLang.additional[121]}`, question: question.id})
                        this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                    } else this.remarksHandler('remove', { type: `incorrect-symbol-ru-q`, question: question.id})
                }
                if(question.questionCtx.eng){
                    if(question.questionCtx.eng.indexOf('�') != -1){
                        this.remarksHandler('add', { type: `incorrect-symbol-eng-q`, msg: `${this.currentLang.additional[119]}: ${question.id} ${this.currentLang.additional[122]}`, question: question.id})
                        this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                    } else this.remarksHandler('remove', { type: `incorrect-symbol-eng-q`, question: question.id})
                }
                if(question.questionCtx.uz_l){
                    if(question.questionCtx.uz_l.indexOf('�') != -1){
                        this.remarksHandler('add', { type: `incorrect-symbol-uz_l-q`, msg: `${this.currentLang.additional[119]}: ${question.id} ${this.currentLang.additional[123]}`, question: question.id})
                        this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                    } else this.remarksHandler('remove', { type: `incorrect-symbol-uz_l-q`, question: question.id})
                }
                if(question.questionCtx.uz_k){
                    if(question.questionCtx.uz_k.indexOf('�') != -1){
                        this.remarksHandler('add', { type: `incorrect-symbol-uz_k-q`, msg: `${this.currentLang.additional[119]}: ${question.id} ${this.currentLang.additional[124]}`, question: question.id})
                        this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                    } else this.remarksHandler('remove', { type: `incorrect-symbol-uz_k-q`, question: question.id})
                }
                if(question.questionCtx.custom){
                    if(question.questionCtx.custom.indexOf('�') != -1){
                        this.remarksHandler('add', { type: `incorrect-symbol-custom-q`, msg: `${this.currentLang.additional[119]}: ${question.id} ${this.currentLang.additional[125]}`, question: question.id})
                        this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                    } else this.remarksHandler('remove', { type: `incorrect-symbol-custom-q`, question: question.id})
                }
                if(question.questionCtx.fr){
                    if(question.questionCtx.fr.indexOf('�') != -1){
                        this.remarksHandler('add', { type: `incorrect-symbol-fr-q`, msg: `${this.currentLang.additional[119]}: ${question.id} ${this.currentLang.additional[126]}`, question: question.id})
                        this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                    } else this.remarksHandler('remove', { type: `incorrect-symbol-fr-q`, question: question.id})
                }
                if(question.questionCtx.de){
                    if(question.questionCtx.de.indexOf('�') != -1){
                        this.remarksHandler('add', { type: `incorrect-symbol-de-q`, msg: `${this.currentLang.additional[119]}: ${question.id} ${this.currentLang.additional[127]}`, question: question.id})
                        this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                    } else this.remarksHandler('remove', { type: `incorrect-symbol-de-q`, question: question.id})
                }

                // проверка на пропорциональность ответов
                // проверка на одинаковые ответы
                // проверка на существование правильного ответа в вопросе
                // проверка на неизвестные и некорректные символы в ответе
                if(question.type=='basic-question' || question.type=='question-with-images'){
                    const answersLength = question.answers.map((answer) => {
                        return {
                            ru: answer.answerCtx.ru ? answer.answerCtx.ru.length : null,
                            eng: answer.answerCtx.eng ? answer.answerCtx.eng.length : null,
                            uz_l: answer.answerCtx.uz_l ? answer.answerCtx.uz_l.length : null,
                            uz_k: answer.answerCtx.uz_k ? answer.answerCtx.uz_k.length : null,
                            custom: answer.answerCtx.custom ? answer.answerCtx.custom.length : null,
                            de: answer.answerCtx.de ? answer.answerCtx.de.length : null,
                            fr: answer.answerCtx.fr ? answer.answerCtx.fr.length : null,
                        }
                    })
                    const answersImages = question.answers.map((answer) => {

                        if(answer.answerCtx.ru){
                            if(answer.answerCtx.ru.indexOf('�') != -1){
                                this.remarksHandler('add', { type: `incorrect-symbol-ru-a-${answer.id}`, msg: `${this.currentLang.additional[119]}: ${question.id}, ${this.currentLang.additional[120]} ${answer.id} ${this.currentLang.additional[121]}`, question: question.id})
                                this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                            } else this.remarksHandler('remove', { type: `incorrect-symbol-ru-a-${answer.id}`, question: question.id})
                        }
                        if(answer.answerCtx.eng){
                            if(answer.answerCtx.eng.indexOf('�') != -1){
                                this.remarksHandler('add', { type: `incorrect-symbol-eng-a-${answer.id}`, msg: `${this.currentLang.additional[119]}: ${question.id}, ${this.currentLang.additional[120]} ${answer.id} ${this.currentLang.additional[122]}`, question: question.id})
                                this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                            } else this.remarksHandler('remove', { type: `incorrect-symbol-eng-a-${answer.id}`, question: question.id})
                        }
                        if(answer.answerCtx.uz_l){
                            if(answer.answerCtx.uz_l.indexOf('�') != -1){
                                this.remarksHandler('add', { type: `incorrect-symbol-uz_l-a-${answer.id}`, msg: `${this.currentLang.additional[119]}: ${question.id}, ${this.currentLang.additional[120]} ${answer.id} ${this.currentLang.additional[123]}`, question: question.id})
                                this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                            } else this.remarksHandler('remove', { type: `incorrect-symbol-uz_l-a-${answer.id}`, question: question.id})
                        }
                        if(answer.answerCtx.uz_k){
                            if(answer.answerCtx.uz_k.indexOf('�') != -1){
                                this.remarksHandler('add', { type: `incorrect-symbol-uz_k-a-${answer.id}`, msg: `${this.currentLang.additional[119]}: ${question.id}, ${this.currentLang.additional[120]} ${answer.id} ${this.currentLang.additional[124]}`, question: question.id})
                                this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                            } else this.remarksHandler('remove', { type: `incorrect-symbol-uz_k-a-${answer.id}`, question: question.id})
                        }
                        if(answer.answerCtx.custom){
                            if(answer.answerCtx.custom.indexOf('�') != -1){
                                this.remarksHandler('add', { type: `incorrect-symbol-custom-a-${answer.id}`, msg: `${this.currentLang.additional[119]}: ${question.id}, ${this.currentLang.additional[120]} ${answer.id} ${this.currentLang.additional[125]}`, question: question.id})
                                this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                            } else this.remarksHandler('remove', { type: `incorrect-symbol-custom-a-${answer.id}`, question: question.id})
                        }
                        if(answer.answerCtx.fr){
                            if(answer.answerCtx.fr.indexOf('�') != -1){
                                this.remarksHandler('add', { type: `incorrect-symbol-fr-a-${answer.id}`, msg: `${this.currentLang.additional[119]}: ${question.id}, ${this.currentLang.additional[120]} ${answer.id} ${this.currentLang.additional[126]}`, question: question.id})
                                this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                            } else this.remarksHandler('remove', { type: `incorrect-symbol-fr-a-${answer.id}`, question: question.id})
                        }
                        if(answer.answerCtx.de){
                            if(answer.answerCtx.de.indexOf('�') != -1){
                                this.remarksHandler('add', { type: `incorrect-symbol-de-a-${answer.id}`, msg: `${this.currentLang.additional[119]}: ${question.id}, ${this.currentLang.additional[120]} ${answer.id} ${this.currentLang.additional[127]}`, question: question.id})
                                this.errors.push({type: 'incorrect-symbol', ctx: `${this.currentLang.additional[119]}: ${question.id}`})
                            } else this.remarksHandler('remove', { type: `incorrect-symbol-de-a-${answer.id}`, question: question.id})
                        }

                        return {
                            ru: answer.answerCtx.ru ? answer.answerCtx.ru : null,
                            eng: answer.answerCtx.eng ? answer.answerCtx.eng : null,
                            uz_l: answer.answerCtx.uz_l ? answer.answerCtx.uz_l : null,
                            uz_k: answer.answerCtx.uz_k ? answer.answerCtx.uz_k : null,
                            custom: answer.answerCtx.custom ? answer.answerCtx.custom : null,
                            de: answer.answerCtx.de ? answer.answerCtx.de : null,
                            fr: answer.answerCtx.fr ? answer.answerCtx.fr : null,
                        }
                    })
                    
                    let hasCorrectAnswer = question.answers.find(a => a.isCurrect)
                    if(!hasCorrectAnswer){
                        this.remarksHandler('add', { type: 'correct-answer', msg: this.currentLang.additional[102], question: question.id})
                        this.errors.push({type: 'correct-answer', ctx: `${this.currentLang.additional[102]}: ${question.id}`})
                    } else this.remarksHandler('remove', { type: 'correct-answer', question: question.id})

                    if(this.currentTest.languagesSettings.languages.indexOf('ru')!=-1){
                        const answersByLang = answersLength.map(answer => answer.ru)
                        const answersImagesByLang = answersImages.map(answer => answer.ru)
                        let hasDouble = false

                        for(let f = 0; f!=answersImagesByLang.length; f++){
                            for(let s = 0; s!=answersImagesByLang.length; s++){
                                if(f!=s && answersImagesByLang[f]){
                                    if(prepareString(answersImagesByLang[s]) && prepareString(answersImagesByLang[f]) && prepareString(answersImagesByLang[f]) == prepareString(answersImagesByLang[s])){
                                        if(!hasDouble){
                                            hasDouble = true
                                            this.remarksHandler('add', { type: 'answers-doubled', msg: this.currentLang.additional[81], question: question.id})
                                            this.errors.push({type: 'answers-doubled', ctx: `${this.currentLang.additional[81]}: ${question.id}`})
                                        }
                                    } else this.remarksHandler('remove', { type: 'answers-doubled', question: question.id})
                                }
                            }
                        }

                        const maxLength = Math.max(...answersByLang)
                        const minLength = Math.min(...answersByLang)

                        if(maxLength-minLength>70){
                            this.remarksHandler('add', { type: 'answers-proportional', msg: this.currentLang.additional[82], question: question.id})
                            this.errors.push({type: 'answers-proportional', ctx: `${this.currentLang.additional[82]}: ${question.id}`})
                        } else this.remarksHandler('remove', { type: 'answers-proportional', question: question.id})
                    }

                    if(this.currentTest.languagesSettings.languages.indexOf('eng')!=-1){
                        const answersByLang = answersLength.map(answer => answer.eng)
                        const answersImagesByLang = answersImages.map(answer => answer.eng)
                        let hasDouble = false

                        for(let f = 0; f!=answersImagesByLang.length; f++){
                            for(let s = 0; s!=answersImagesByLang.length; s++){
                                if(f!=s && answersImagesByLang[f]){
                                    if(prepareString(answersImagesByLang[s]) && prepareString(answersImagesByLang[f]) && prepareString(answersImagesByLang[f]) == prepareString(answersImagesByLang[s])){
                                        if(!hasDouble){
                                            hasDouble = true
                                            this.remarksHandler('add', { type: 'answers-doubled', msg: this.currentLang.additional[81], question: question.id})
                                            this.errors.push({type: 'answers-doubled', ctx: `${this.currentLang.additional[81]}: ${question.id}`})
                                        }
                                    } else this.remarksHandler('remove', { type: 'answers-doubled', question: question.id})
                                }
                            }
                        }

                        const maxLength = Math.max(...answersByLang)
                        const minLength = Math.min(...answersByLang)

                        if(maxLength-minLength>70){
                            this.remarksHandler('add', { type: 'answers-proportional', msg: this.currentLang.additional[83], question: question.id})
                            this.errors.push({type: 'answers-proportional', ctx: `${this.currentLang.additional[83]}: ${question.id}`})
                        } else this.remarksHandler('remove', { type: 'answers-proportional', question: question.id})
                    }

                    if(this.currentTest.languagesSettings.languages.indexOf('uz_l')!=-1){
                        const answersByLang = answersLength.map(answer => answer.uz_l)
                        const answersImagesByLang = answersImages.map(answer => answer.uz_l)
                        let hasDouble = false

                        for(let f = 0; f!=answersImagesByLang.length; f++){
                            for(let s = 0; s!=answersImagesByLang.length; s++){
                                if(f!=s && answersImagesByLang[f]){
                                    if(prepareString(answersImagesByLang[s]) && prepareString(answersImagesByLang[f]) && prepareString(answersImagesByLang[f]) == prepareString(answersImagesByLang[s])){
                                        if(!hasDouble){
                                            hasDouble = true
                                            this.remarksHandler('add', { type: 'answers-doubled', msg: this.currentLang.additional[81], question: question.id})
                                            this.errors.push({type: 'answers-doubled', ctx: `${this.currentLang.additional[81]}: ${question.id}`})
                                        }
                                    } else this.remarksHandler('remove', { type: 'answers-doubled', question: question.id})
                                }
                            }
                        }

                        const maxLength = Math.max(...answersByLang)
                        const minLength = Math.min(...answersByLang)

                        if(maxLength-minLength>70){
                            this.remarksHandler('add', { type: 'answers-proportional', msg: this.currentLang.additional[84], question: question.id})
                            this.errors.push({type: 'answers-proportional', ctx: `${this.currentLang.additional[84]}: ${question.id}`})
                        } else this.remarksHandler('remove', { type: 'answers-proportional', question: question.id})
                    }

                    if(this.currentTest.languagesSettings.languages.indexOf('uz_k')!=-1){
                        const answersByLang = answersLength.map(answer => answer.uz_k)
                        const answersImagesByLang = answersImages.map(answer => answer.uz_k)
                        let hasDouble = false

                        for(let f = 0; f!=answersImagesByLang.length; f++){
                            for(let s = 0; s!=answersImagesByLang.length; s++){
                                if(f!=s && answersImagesByLang[f]){
                                    if(prepareString(answersImagesByLang[s]) && prepareString(answersImagesByLang[f]) && prepareString(answersImagesByLang[f]) == prepareString(answersImagesByLang[s])){
                                        if(!hasDouble){
                                            hasDouble = true
                                            this.remarksHandler('add', { type: 'answers-doubled', msg: this.currentLang.additional[81], question: question.id})
                                            this.errors.push({type: 'answers-doubled', ctx: `${this.currentLang.additional[81]}: ${question.id}`})
                                        }
                                    } else this.remarksHandler('remove', { type: 'answers-doubled', question: question.id})
                                }
                            }
                        }

                        const maxLength = Math.max(...answersByLang)
                        const minLength = Math.min(...answersByLang)

                        if(maxLength-minLength>70){
                            this.remarksHandler('add', { type: 'answers-proportional', msg: this.currentLang.additional[85], question: question.id})
                            this.errors.push({type: 'answers-proportional', ctx: `${this.currentLang.additional[85]}: ${question.id}`})
                        } else this.remarksHandler('remove', { type: 'answers-proportional', question: question.id})
                    }

                    if(this.currentTest.languagesSettings.languages.indexOf('custom')!=-1){
                        const answersByLang = answersLength.map(answer => answer.custom)
                        const answersImagesByLang = answersImages.map(answer => answer.custom)
                        let hasDouble = false

                        for(let f = 0; f!=answersImagesByLang.length; f++){
                            for(let s = 0; s!=answersImagesByLang.length; s++){
                                if(f!=s && answersImagesByLang[f]){
                                    if(prepareString(answersImagesByLang[s]) && prepareString(answersImagesByLang[f]) && prepareString(answersImagesByLang[f]) == prepareString(answersImagesByLang[s])){
                                        if(!hasDouble){
                                            hasDouble = true
                                            this.remarksHandler('add', { type: 'answers-doubled', msg: this.currentLang.additional[81], question: question.id})
                                            this.errors.push({type: 'answers-doubled', ctx: `${this.currentLang.additional[81]}: ${question.id}`})
                                        }
                                    } else this.remarksHandler('remove', { type: 'answers-doubled', question: question.id})
                                }
                            }
                        }
                        const maxLength = Math.max(...answersByLang)
                        const minLength = Math.min(...answersByLang)

                        if(maxLength-minLength>70){
                            this.remarksHandler('add', { type: 'answers-proportional', msg: this.currentLang.additional[86], question: question.id})
                            this.errors.push({type: 'answers-proportional', ctx: `${this.currentLang.additional[86]}: ${question.id}`})
                        } else this.remarksHandler('remove', { type: 'answers-proportional', question: question.id})
                    }

                    if(this.currentTest.languagesSettings.languages.indexOf('de')!=-1){
                        const answersByLang = answersLength.map(answer => answer.de)
                        const answersImagesByLang = answersImages.map(answer => answer.de)
                        let hasDouble = false

                        for(let f = 0; f!=answersImagesByLang.length; f++){
                            for(let s = 0; s!=answersImagesByLang.length; s++){
                                if(f!=s && answersImagesByLang[f]){
                                    if(prepareString(answersImagesByLang[s]) && prepareString(answersImagesByLang[f]) && prepareString(answersImagesByLang[f]) == prepareString(answersImagesByLang[s])){
                                        if(!hasDouble){
                                            hasDouble = true
                                            this.remarksHandler('add', { type: 'answers-doubled', msg: this.currentLang.additional[81], question: question.id})
                                            this.errors.push({type: 'answers-doubled', ctx: `${this.currentLang.additional[81]}: ${question.id}`})
                                        }
                                    } else this.remarksHandler('remove', { type: 'answers-doubled', question: question.id})
                                }
                            }
                        }

                        const maxLength = Math.max(...answersByLang)
                        const minLength = Math.min(...answersByLang)

                        if(maxLength-minLength>70){
                            this.remarksHandler('add', { type: 'answers-proportional', msg: this.currentLang.additional[87], question: question.id})
                            this.errors.push({type: 'answers-proportional', ctx: `${this.currentLang.additional[87]}: ${question.id}`})
                        } else this.remarksHandler('remove', { type: 'answers-proportional', question: question.id})
                    }

                    if(this.currentTest.languagesSettings.languages.indexOf('fr')!=-1){
                        const answersByLang = answersLength.map(answer => answer.fr)
                        const answersImagesByLang = answersImages.map(answer => answer.fr)
                        let hasDouble = false

                        for(let f = 0; f!=answersImagesByLang.length; f++){
                            for(let s = 0; s!=answersImagesByLang.length; s++){
                                if(f!=s && answersImagesByLang[f]){
                                    if(prepareString(answersImagesByLang[s]) && prepareString(answersImagesByLang[f]) && prepareString(answersImagesByLang[f]) == prepareString(answersImagesByLang[s])){
                                        if(!hasDouble){
                                            hasDouble = true
                                            this.remarksHandler('add', { type: 'answers-doubled', msg: this.currentLang.additional[81], question: question.id})
                                            this.errors.push({type: 'answers-doubled', ctx: `${this.currentLang.additional[81]}: ${question.id}`})
                                        }
                                    } else this.remarksHandler('remove', { type: 'answers-doubled', question: question.id})
                                }
                            }
                        }

                        const maxLength = Math.max(...answersByLang)
                        const minLength = Math.min(...answersByLang)

                        if(maxLength-minLength>70){
                            this.remarksHandler('add', { type: 'answers-proportional', msg: this.currentLang.additional[88], question: question.id})
                            this.errors.push({type: 'answers-proportional', ctx: `${this.currentLang.additional[88]}: ${question.id}`})
                        } else this.remarksHandler('remove', { type: 'answers-proportional', question: question.id})
                    }
                }

                // проверка на одинаковые вопросы с одинаковыми ответами
                if(question.type=='basic-question' || question.type=='question-with-images'){
                    if(this.currentTest.languagesSettings.languages.indexOf('ru')!=-1){
                        const duplicateQuestions = []
                        this.questions.map(checkedQ => {
                            if(checkedQ.type=='basic-question' || checkedQ.type=='question-with-images'){
                                if(stringsMatching(checkedQ.questionCtx.ru, question.questionCtx.ru, 90)) duplicateQuestions.push(checkedQ)
                            }
                        })

                        if(duplicateQuestions.length){
                            duplicateQuestions.map(dq=>{
                                if(dq.id != question.id){
                                    let duplicateAnswersCounter = 0
                                    let similarAnswersCounter = 0
                                    dq.answers.map((dqa)=>{
                                        const duplicateAnswer = question.answers.find(a => {
                                            if(a.answerCtx.ru && dqa.answerCtx.ru){
                                                if(a.answerCtx.ru.length>30 && dqa.answerCtx.ru.length>30) return a.answerCtx.ru.toLowerCase() == dqa.answerCtx.ru.toLowerCase()
                                            }
                                        })
                                        if(duplicateAnswer){
                                            duplicateAnswersCounter++
                                        }
                                        
                                        question.answers.map(a => {
                                            if(a.answerCtx.ru && dqa.answerCtx.ru){
                                                if(a.answerCtx.ru.length>30 && dqa.answerCtx.ru.length>30){
                                                    if(stringsMatching(a.answerCtx.ru, dqa.answerCtx.ru, 85)) similarAnswersCounter++
                                                }
                                            }
                                        })
                                    })

                                    if(duplicateAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-doubled', msg:`${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-doubled', ctx: `${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-doubled', question: question.id}) 

                                    if(similarAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-similar', msg:`${this.currentLang.additional[109]}: ${question.id} ~ ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-similar', ctx: `${this.currentLang.additional[109]}: ${question.id} ~ ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-similar', question: question.id}) 
                                }
                            })
                        }
                    }
                    if(this.currentTest.languagesSettings.languages.indexOf('eng')!=-1){
                        const duplicateQuestions = []
                        this.questions.map(checkedQ => {
                            if(checkedQ.type=='basic-question' || checkedQ.type=='question-with-images'){
                                if(stringsMatching(checkedQ.questionCtx.eng, question.questionCtx.eng, 90)) duplicateQuestions.push(checkedQ)
                            }
                        })

                        if(duplicateQuestions.length){
                            duplicateQuestions.map(dq=>{
                                if(dq.id != question.id){
                                    let duplicateAnswersCounter = 0
                                    let similarAnswersCounter = 0
                                    dq.answers.map((dqa)=>{
                                        const duplicateAnswer = question.answers.find(a => {
                                            if(a.answerCtx.eng && dqa.answerCtx.eng){
                                                if(a.answerCtx.eng.length>30 && dqa.answerCtx.eng.length>30) return a.answerCtx.eng.toLowerCase() == dqa.answerCtx.eng.toLowerCase()
                                            }
                                        })
                                        if(duplicateAnswer){
                                            duplicateAnswersCounter++
                                        }

                                        question.answers.map(a => {
                                            if(a.answerCtx.eng && dqa.answerCtx.eng){
                                                if(a.answerCtx.eng.length>30 && dqa.answerCtx.eng.length>30){
                                                    if(stringsMatching(a.answerCtx.eng, dqa.answerCtx.eng, 85)) similarAnswersCounter++
                                                }
                                            }
                                        })
                                    })
                                    
                                    if(duplicateAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-doubled', msg:`${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-doubled', ctx: `${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-doubled', question: question.id}) 

                                    if(similarAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-similar', msg:`${this.currentLang.additional[110]}: ${question.id} ~ ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-similar', ctx: `${this.currentLang.additional[110]}: ${question.id} ~ ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-similar', question: question.id}) 
                                }
                            })
                        }
                    }
                    if(this.currentTest.languagesSettings.languages.indexOf('uz_l')!=-1){
                        const duplicateQuestions = []
                        this.questions.map(checkedQ => {
                            if(checkedQ.type=='basic-question' || checkedQ.type=='question-with-images'){
                                if(stringsMatching(checkedQ.questionCtx.uz_l, question.questionCtx.uz_l, 90)) duplicateQuestions.push(checkedQ)
                            }
                        })

                        if(duplicateQuestions.length){
                            duplicateQuestions.map(dq=>{
                                if(dq.id != question.id){
                                    let duplicateAnswersCounter = 0
                                    let similarAnswersCounter = 0
                                    dq.answers.map((dqa)=>{
                                        const duplicateAnswer = question.answers.find(a => {
                                            if(a.answerCtx.uz_l && dqa.answerCtx.uz_l){
                                                if(a.answerCtx.uz_l.length>30 && dqa.answerCtx.uz_l.length>30) return a.answerCtx.uz_l.toLowerCase() == dqa.answerCtx.uz_l.toLowerCase()
                                            }
                                        })
                                        if(duplicateAnswer){
                                            duplicateAnswersCounter++
                                        }

                                        question.answers.map(a => {
                                            if(a.answerCtx.uz_l && dqa.answerCtx.uz_l){
                                                if(a.answerCtx.uz_l.length>30 && dqa.answerCtx.uz_l.length>30){
                                                    if(stringsMatching(a.answerCtx.uz_l, dqa.answerCtx.uz_l, 85)) similarAnswersCounter++
                                                }
                                            }
                                        })
                                    })

                                    
                                    if(duplicateAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-doubled', msg:`${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-doubled', ctx: `${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-doubled', question: question.id}) 

                                    if(similarAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-similar', msg:`${this.currentLang.additional[111]}: ${question.id} ~ ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-similar', ctx: `${this.currentLang.additional[111]}: ${question.id} ~ ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-similar', question: question.id}) 
                                }
                            })
                        }
                    }
                    if(this.currentTest.languagesSettings.languages.indexOf('uz_k')!=-1){
                        const duplicateQuestions = []
                        this.questions.map(checkedQ => {
                            if(checkedQ.type=='basic-question' || checkedQ.type=='question-with-images'){
                                if(stringsMatching(checkedQ.questionCtx.uz_k, question.questionCtx.uz_k, 90)) duplicateQuestions.push(checkedQ)
                            }
                        })

                        if(duplicateQuestions.length){
                            duplicateQuestions.map(dq=>{
                                if(dq.id != question.id){
                                    let duplicateAnswersCounter = 0
                                    let similarAnswersCounter = 0
                                    dq.answers.map((dqa)=>{
                                        const duplicateAnswer = question.answers.find(a => {
                                            if(a.answerCtx.uz_k && dqa.answerCtx.uz_k){
                                                if(a.answerCtx.uz_k.length>30 && dqa.answerCtx.uz_k.length>30) return a.answerCtx.uz_k.toLowerCase() == dqa.answerCtx.uz_k.toLowerCase()
                                            }
                                        })
                                        if(duplicateAnswer){
                                            duplicateAnswersCounter++
                                        }

                                        question.answers.map(a => {
                                            if(a.answerCtx.uz_k && dqa.answerCtx.uz_k){
                                                if(a.answerCtx.uz_k.length>30 && dqa.answerCtx.uz_k.length>30){
                                                    if(stringsMatching(a.answerCtx.uz_k, dqa.answerCtx.uz_k, 85)) similarAnswersCounter++
                                                }
                                            }
                                        })
                                    })

                                    
                                    if(duplicateAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-doubled', msg:`${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-doubled', ctx: `${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-doubled', question: question.id}) 

                                    if(similarAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-similar', msg:`${this.currentLang.additional[112]}: ${question.id} ~ ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-similar', ctx: `${this.currentLang.additional[112]}: ${question.id} ~ ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-similar', question: question.id}) 
                                }
                            })
                        }
                    }
                    if(this.currentTest.languagesSettings.languages.indexOf('custom')!=-1){
                        const duplicateQuestions = []
                        this.questions.map(checkedQ => {
                            
                            if(checkedQ.type=='basic-question' || checkedQ.type=='question-with-images'){
                                if(stringsMatching(checkedQ.questionCtx.custom, question.questionCtx.custom, 90)) duplicateQuestions.push(checkedQ)
                            }
                        })

                        if(duplicateQuestions.length){
                            duplicateQuestions.map(dq=>{
                                if(dq.id != question.id){
                                    let duplicateAnswersCounter = 0
                                    let similarAnswersCounter = 0
                                    dq.answers.map((dqa)=>{
                                        const duplicateAnswer = question.answers.find(a => {
                                            if(a.answerCtx.custom && dqa.answerCtx.custom){
                                                if(a.answerCtx.custom.length>30 && dqa.answerCtx.custom.length>30) return a.answerCtx.custom.toLowerCase() == dqa.answerCtx.custom.toLowerCase()
                                            }
                                        })
                                        if(duplicateAnswer){
                                            duplicateAnswersCounter++
                                        }

                                        question.answers.map(a => {
                                            if(a.answerCtx.custom && dqa.answerCtx.custom){
                                                if(a.answerCtx.custom.length>30 && dqa.answerCtx.custom.length>30){
                                                    if(stringsMatching(a.answerCtx.custom, dqa.answerCtx.custom, 85)) similarAnswersCounter++
                                                }
                                            }
                                        })
                                    })
                                    
                                    if(duplicateAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-doubled', msg:`${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-doubled', ctx: `${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-doubled', question: question.id}) 

                                    if(similarAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-similar', msg:`${this.currentLang.additional[113]}: ${question.id} ~ ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-similar', ctx: `${this.currentLang.additional[113]}: ${question.id} ~ ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-similar', question: question.id}) 
                                }
                            })
                        }
                    }
                    if(this.currentTest.languagesSettings.languages.indexOf('fr')!=-1){
                        const duplicateQuestions = []
                        this.questions.map(checkedQ => {
                            if(checkedQ.type=='basic-question' || checkedQ.type=='question-with-images'){
                                if(stringsMatching(checkedQ.questionCtx.fr, question.questionCtx.fr, 90)) duplicateQuestions.push(checkedQ)
                            }
                        })

                        if(duplicateQuestions.length){
                            duplicateQuestions.map(dq=>{
                                if(dq.id != question.id){
                                    let duplicateAnswersCounter = 0
                                    let similarAnswersCounter = 0
                                    dq.answers.map((dqa)=>{
                                        const duplicateAnswer = question.answers.find(a => {
                                            if(a.answerCtx.fr && dqa.answerCtx.fr){
                                                if(a.answerCtx.fr.length>30 && dqa.answerCtx.fr.length>30) return a.answerCtx.fr.toLowerCase() == dqa.answerCtx.fr.toLowerCase()
                                            }
                                        })
                                        if(duplicateAnswer){
                                            duplicateAnswersCounter++
                                        }

                                        question.answers.map(a => {
                                            if(a.answerCtx.fr && dqa.answerCtx.fr){
                                                if(a.answerCtx.fr.length>30 && dqa.answerCtx.fr.length>30){
                                                    if(stringsMatching(a.answerCtx.fr, dqa.answerCtx.fr, 85)) similarAnswersCounter++
                                                }
                                            }
                                        })
                                    })
                                    
                                    if(duplicateAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-doubled', msg:`${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-doubled', ctx: `${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-doubled', question: question.id}) 

                                    if(similarAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-similar', msg:`${this.currentLang.additional[114]}: ${question.id} ~ ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-similar', ctx: `${this.currentLang.additional[114]}: ${question.id} ~ ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-similar', question: question.id}) 
                                }
                            })
                        }
                    }
                    if(this.currentTest.languagesSettings.languages.indexOf('de')!=-1){
                        const duplicateQuestions = []
                        this.questions.map(checkedQ => {
                            if(checkedQ.type=='basic-question' || checkedQ.type=='question-with-images'){
                                if(stringsMatching(checkedQ.questionCtx.de, question.questionCtx.de, 90)) duplicateQuestions.push(checkedQ)
                            }
                        })

                        if(duplicateQuestions.length){
                            duplicateQuestions.map(dq=>{
                                if(dq.id != question.id){
                                    let duplicateAnswersCounter = 0
                                    let similarAnswersCounter = 0
                                    dq.answers.map((dqa)=>{
                                        const duplicateAnswer = question.answers.find(a => {
                                            if(a.answerCtx.de && dqa.answerCtx.de){
                                                if(a.answerCtx.de.length>30 && dqa.answerCtx.de.length>30) return a.answerCtx.de.toLowerCase() == dqa.answerCtx.de.toLowerCase()
                                            }
                                        })
                                        if(duplicateAnswer){
                                            duplicateAnswersCounter++
                                        }

                                        question.answers.map(a => {
                                            if(a.answerCtx.de && dqa.answerCtx.de){
                                                if(a.answerCtx.de.length>30 && dqa.answerCtx.de.length>30){
                                                    if(stringsMatching(a.answerCtx.de, dqa.answerCtx.de, 85)) similarAnswersCounter++
                                                }
                                            }
                                        })
                                    })
                                    
                                    if(duplicateAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-doubled', msg:`${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-doubled', ctx: `${this.currentLang.additional[94]}: ${question.id} = ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-doubled', question: question.id}) 

                                    if(similarAnswersCounter > 2 && question.id != dq.id){
                                        this.remarksHandler('add', { type: 'question-similar', msg:`${this.currentLang.additional[115]}: ${question.id} ~ ${dq.id}`, question: question.id})
                                        this.errors.push({type: 'question-similar', ctx: `${this.currentLang.additional[115]}: ${question.id} ~ ${dq.id}`})
                                    } else this.remarksHandler('remove', { type: 'question-similar', question: question.id}) 
                                }
                            })
                        }
                    }
                }
            })

            // проверка на remarks
            if(this.remarks){
                if(this.remarks.length){
                    this.errors.push({type: 'remarks', ctx: this.currentLang.additional[67]}) 
                }
            }
        }
    },
    watch:{
        currentLang(){
            console.log(1);
            this.checkingError()
        },
        'saveProcessFinally.value'(){
            if(this.saveProcessFinally.value){
                this.dialog = false
            }
        },
        dialog(){
            if(this.signProcedure){
                if(!this.dialog){
                    this.dialog = true
                }
            }
        }
    }
}
</script>

<style scoped>
.dialog-content{
    max-height: 60vh;
    overflow-y: auto;
    overflow-x: hidden;
}

::-webkit-scrollbar {
    width: 6px;
    background-color: #b9b9b9;
}
</style>
