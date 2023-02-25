<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            small
            dark
            color="#656565"
            class="mr-8"
            v-bind="attrs"
            v-on="on"
            @click="saveFunc"
            >
                <v-icon size="20" class="mr-1">mdi-content-save-outline</v-icon>
                Сохранить как экземпляр
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            Сохранение текущих тестов как экземпляр
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    
                    <div class="d-flex flex-column">
                            <label class="body-2">Напишите комментарий к текущему сохранению</label>
                            <div class="d-flex flex-row">
                                <v-textarea
                                dense
                                rows="2"
                                outlined
                                prepend-icon="mdi-comment-outline"
                                v-model="comment"
                                placeholder="Комментарий к сохранению"
                                :error="savingEr"
                                >
                                </v-textarea>
                            </div>
                        </div>
                </div>
                
            </div>

            <v-divider></v-divider>
            <v-card-actions class="d-flex align-items-center flex-column">

            <div class="dialog-errors-box">
                <v-alert
                color="red"
                dense
                dismissible
                elevation="3"
                type="error"
                class="subtitle-2"
                v-for="(error, i) in errors"
                :key="i"
                >{{ error }}</v-alert>

                <v-alert
                dense
                dismissible
                elevation="3"
                type="success"
                class="subtitle-2"
                v-if="savingSuccess"
                >Текущие вопросы сохранены в экземпляр</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0d5fd8"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="delete-btn"
                @click="savingQuestions"
            >
                Сохранить экземпляр
            </v-btn>
            </v-card-actions>

            <v-progress-linear
            indeterminate
            color="#0167FF"
            background-color="#85aeea"
            height="5"
            v-if="showProgress"
            ></v-progress-linear>
        </v-card>
    </v-dialog>
</template>

<script>
import getCurrentDate from '@/plugins/getCurrentDate'
import { operationFromStore } from '@/services/localDB'

export default {
    props:{
        questions: Array,
        testID: Number,
        saveFunc: Function
    },
    data() {
        return {
            dialog: false,
            savingSuccess: false,
            errors: [],
            blockBtn: false,
            showProgress: false,
            savingEr: false,
            comment: ''
        }
    },
    methods:{
        savingQuestions(){

            // валидаторы
            if(!this.comment){
                this.errors.push('Напишите комментарий сохраняемому экземпляру')
                this.savingEr = true
                return
            }
            if(this.comment.length<=7){
                this.errors.push('Слишком короткий комментарий. Длина комментария должна быть больше 7')
                this.savingEr = true
                return
            }


            // сохранение
            this.blockBtn = true
            this.showProgress = true
            // генерация уникального id
            let _date = new Date();
            let _components = [
                _date.getYear(),
                _date.getMonth(),
                _date.getDate(),
                _date.getHours(),
                _date.getMinutes(),
                _date.getSeconds(),
                _date.getMilliseconds()
            ];

            let _id = _components.join("")

            let test, params, output
            operationFromStore('getByTestID', {id: +this.testID})
            .then(result=>{
                // Параметры текущего теста: учитывание баллов, темы, сложность, id предмета
                test = result
                
                params = {
                    subjectID: test.subjectID,
                    themes: test.themes
                }
                if(test.ballSystem){
                    params.ballSystem = test.ballSystem
                }
                if(test.considerDifficulty){
                    params.considerDifficulty = test.considerDifficulty
                }

                output={
                    id: +_id,
                    testID: +this.testID,
                    questions: this.questions,
                    comment: this.comment,
                    date: getCurrentDate(),
                    params
                }
            })
            .then(()=>{
                operationFromStore('addSaving', {data: output})
            })
            .catch(e=>{
            console.error('(DB) Ошибка! БД не инициализированно. Подробнее: ', e.message)
            this.$router.push('/')
            })

            // завершение
            setTimeout(()=>{
                this.showProgress = false
                this.savingSuccess = true
                setTimeout(()=>{
                    this.dialog = false
                    this.savingSuccess = false
                    this.blockBtn = false
                    this.comment = ''
                },3000)
            },2000)
        }
    },
    watch:{
        comment(){
            this.errors = []
            this.savingEr = false
        }
    }
}
</script>

<style scoped>
.delete-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
} 

.dialog-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.content__subject-box{
    padding: 30px;
    width: 100%;
    display: flex;
}
.content__template-box{
    padding: 30px;
    width: 100%;
}

.v-dialog > .v-card > .v-card__action{
    padding: 15px;
}
.v-card__actions{
    padding: 15px;
}
.v-list{
  padding: 0;
}
.v-dialog{
  overflow: hidden;
}
</style>