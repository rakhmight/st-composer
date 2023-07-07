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
            color="#0c2242"
            class="mt-5"
            :disabled="loader || saveProcessFinally.value"
            >
                <v-icon color="#fff" class="mr-1">mdi-draw</v-icon>
                <span :style="!loader ? 'color: #fff' : 'color: #888'">Подписать тесты</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
                Процедура подписания теста
            <v-icon color="red" @click="dialog=false" size="30" v-if="!signProcedure">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content mt-5 mb-5 pr-5 pl-5" v-if="!checkingLoader && !signProcedure && !emptyTestError">
                <p class="text-body-1" style="color: #000;text-indent: 25px;">После подписания теста его можно будет выгрузить в виде файла. Процедура запускает таймер в <b>15</b> дневный срок, после чего тест будет <span style="color: #e83b07"><b>автоматически удалён</b></span> с устройства. В течении этого срока будет возможна дальнейшая работа над вопросами теста и его повторное подписание (без изменения срока автоудаления), которое обновит выгружаемый файл.</p>
                <p class="text-body-1 mt-2" style="color: #000;text-indent: 25px;">Процесс подписания тестов подготавливает тест к выгрузке: оптимизирует тест с его вопросами и шифрует его. Рассшифровка теста возможна только на сервере системы SmartTesting.</p>
            </div>
            <div class="dialog-content d-flex flex-column align-center justify-center" style="height: 25vh;" v-if="checkingLoader">
                <v-progress-circular
                :size="50"
                color="#0c2242"
                indeterminate
                ></v-progress-circular>
                <span class="mt-3 text-center" style="font-size: 0.95em;">
                    Запущена процедура подписания теста.
                    <br>
                    <v-icon color="orange" size="18" class="mr-1">mdi-alert-outline</v-icon>
                    Это может занять время.
                </span>
            </div>
            <div class="dialog-content d-flex flex-column align-center justify-center" style="height: 25vh;" v-if="emptyTestError">
                <v-icon color="warning" size="40">mdi-alert-circle-outline</v-icon>
                <span class="text-h6">Нельзя подписать пустой тест</span>
            </div>
            <div class="dialog-content d-flex flex-column align-center justify-center" style="height: 25vh;" v-if="success">
                <v-icon color="#0c2242" size="40">mdi-check</v-icon>
                <span class="text-h6">Тест успешно подписан</span>
            </div>
            <div class="dialog-content mt-5 mb-5 pr-5 pl-5" v-if="!checkingLoader && errors.length && !emptyTestError">
                <div
                v-for="(error, i) in errors"
                :key="i"
                class="d-flex flex-row align-center"
                >
                    <v-icon size="19" color="#e83b07" v-if="error.type=='q-field-ru' || error.type=='q-field-custom' || error.type=='q-field-eng' || error.type=='q-field-uz_l' || error.type=='q-field-uz_k' || error.type=='q-field-fr' || error.type=='q-field-de'">mdi-help-circle-outline</v-icon>
                    <v-icon size="19" color="#e83b07" v-if="error.type=='a-field-ru' || error.type=='a-field-custom' || error.type=='a-field-eng' || error.type=='a-field-uz_l' || error.type=='a-field-uz_k'">mdi-lightbulb-auto</v-icon>
                    <v-icon size="19" color="#e83b07" v-if="error.type=='image'">mdi-camera</v-icon>
                    <v-icon size="19" color="#e83b07" v-if="error.type=='pos'">mdi-selection-ellipse-arrow-inside</v-icon>
                    <v-icon size="19" color="#e83b07" v-if="error.type=='theme'">mdi-alpha-t-box-outline</v-icon>
                    <v-icon size="19" color="#e83b07" v-if="error.type=='difficulty'">mdi-chart-line</v-icon>
                    <v-icon size="19" color="#e83b07" v-if="error.type=='remarks'">mdi-alert-circle-outline</v-icon>
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
                <span style="color: #fff">Подписать тест</span>
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

export default {
    props:{
        loader: Boolean,
        currentTest: Object,
        questions: Array,
        stopSavingLoop: Function,
        saveProcessFinally: Object,
        remarks: undefined | Array
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
    computed: mapGetters(['currentSign']),
    methods:{
        async signTest(){
            if(!this.questions.length){
                return this.emptyTestError = true
            } else{
                this.emptyTestError = false
            }
            this.errors = []
            this.signProcedure = true
            this.checkingLoader = true
            // проверка на незаполненные поля и не отмеченные темы, сложность
            this.questions.forEach(question=>{
                if(this.currentTest.languagesSettings.languages.indexOf('custom')!=-1){
                    if(!question.questionCtx.custom){
                        this.errors.push({type: 'q-field-custom', ctx: `Не заполнено поле вопроса на иностранном языке, ID: ${question.id}`})
                    }
                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            if(!answer.answerCtx.custom && !answer.imagePreview.length){
                                this.errors.push({type: 'a-field-custom', ctx: `Не заполнено поле ответа на иностранном языке, ID вопроса: ${question.id}, № ответа: ${x+1}`})
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('ru')!=-1){
                    if(!question.questionCtx.ru){
                        this.errors.push({type: 'q-field-ru', ctx: `Не заполнено поле вопроса на русском языке, ID: ${question.id}`})
                    }
                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            if(!answer.answerCtx.ru && !answer.imagePreview.length){
                                this.errors.push({type: 'a-field-ru', ctx: `Не заполнено поле ответа на русском языке, ID вопроса: ${question.id}, № ответа: ${x+1}`})
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('eng')!=-1){
                    if(!question.questionCtx.eng){
                        this.errors.push({type: 'q-field-eng', ctx: `Не заполнено поле вопроса на английском языке, ID: ${question.id}`})
                    }
                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            if(!answer.answerCtx.eng && !answer.imagePreview.length){
                                this.errors.push({type: 'a-field-eng', ctx: `Не заполнено поле ответа на английском языке, ID вопроса: ${question.id}, № ответа: ${x+1}`})
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('uz_l')!=-1){
                    if(!question.questionCtx.uz_l){
                        this.errors.push({type: 'q-field-uz_l', ctx: `Не заполнено поле вопроса на узбекском (латиница) языке, ID: ${question.id}`})
                    }
                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            if(!answer.answerCtx.uz_l && !answer.imagePreview.length){
                                this.errors.push({type: 'a-field-uz_l', ctx: `Не заполнено поле ответа на узбекском (латиница) языке, ID вопроса: ${question.id}, № ответа: ${x+1}`})
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('uz_k')!=-1){
                    if(!question.questionCtx.uz_k){
                        this.errors.push({type: 'q-field-uz_k', ctx: `Не заполнено поле вопроса на узбекском (кирилица) языке, ID: ${question.id}`})
                    }
                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            if(!answer.answerCtx.uz_k && !answer.imagePreview.length){
                                this.errors.push({type: 'a-field-uz_k', ctx: `Не заполнено поле ответа на узбекском (кирилица) языке, ID вопроса: ${question.id}, № ответа: ${x+1}`})
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('fr')!=-1){
                    if(!question.questionCtx.fr){
                        this.errors.push({type: 'q-field-fr', ctx: `Не заполнено поле вопроса на французском языке, ID: ${question.id}`})
                    }
                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            if(!answer.answerCtx.fr && !answer.imagePreview.length){
                                this.errors.push({type: 'a-field-fr', ctx: `Не заполнено поле ответа на французском языке, ID вопроса: ${question.id}, № ответа: ${x+1}`})
                            }
                        })
                    }
                }
                if(this.currentTest.languagesSettings.languages.indexOf('de')!=-1){
                    if(!question.questionCtx.de){
                        this.errors.push({type: 'q-field-de', ctx: `Не заполнено поле вопроса на немецком языке, ID: ${question.id}`})
                    }
                    if(question.type=='basic-question' || question.type=='question-with-images'){
                        question.answers.forEach((answer, x)=>{
                            if(!answer.answerCtx.de && !answer.imagePreview.length){
                                this.errors.push({type: 'a-field-de', ctx: `Не заполнено поле ответа на немецком языке, ID вопроса: ${question.id}, № ответа: ${x+1}`})
                            }
                        })
                    }
                }
                
                if(question.type=='basic-question' || question.type=='question-with-images'){
                    // if(question.type=='question-with-images'){
                    //     if(!question.imagePreview.length){
                    //         this.errors.push({type: 'image', ctx: `Не прикриплена картинка в вопросе, ID вопроса: ${question.id}`})
                    //     }
                    // }
                    // question.answers.forEach((answer, x)=>{
                    //     if(question.type=='question-with-images' && !answer.imagePreview.length){
                    //         this.errors.push({type: 'image', ctx: `Не прикриплена картинка в ответе, ID вопроса: ${question.id}, № ответа: ${x+1}`})
                    //     }
                    // })
                } else if(question.type=='question-with-field'){
                        if(!question.imagePreview.length){
                            this.errors.push({type: 'image', ctx: `Не прикриплена картинка в вопросе, ID вопроса: ${question.id}`})
                        }
                        if(!question.answer[1].y){
                            this.errors.push({type: 'pos', ctx: `Не отмечена область на картинке, ID вопроса: ${question.id}`})
                        }
                }

                if(!question.theme){
                    this.errors.push({type: 'theme', ctx: `Не выбрана тема, ID вопроса: ${question.id}`})
                }
                if(this.currentTest.considerDifficulty){
                    if(!question.difficulty){
                        this.errors.push({type: 'difficulty', ctx: `Не выбрана сложность, ID вопроса: ${question.id}`})
                    }
                }
            })

            // проверка на remarks
            if(this.remarks){
                if(this.remarks.length){
                   
                    this.errors.push({type: 'remarks', ctx: `Исправьте замечания перед подписанием`}) 
                }
            }

            if(this.errors.length){
                this.checkingLoader = false
                return
            }

            // остановка авто сохранения
            this.blockBtn = true
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
                                status: {...this.currentTest.status, isSigned: true},
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
        }
    },
    watch:{
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
