<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            small
            width="270"
            color="#2b2b2b"
            class="mt-5"
            v-bind="attrs"
            v-on="on"
            :disabled="!asyncComplate"
            >
                <v-icon color="#fff" class="mr-1">mdi-arrow-u-down-right</v-icon>
                <span :style="asyncComplate ? 'color: #fff' : 'color: #888'">{{ currentLang.savedTestView[41] }}</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            {{ currentLang.savedTestView[42] }}
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">

                    <div class="mb-5 d-flex flex-row align-start">
                        <v-icon class="mr-3">mdi-information-outline</v-icon>
                        <div>{{ currentLang.savedTestView[43] }}</div>
                    </div>
                    
                    <div class="d-flex flex-column">
                        <label class="body-2">{{ currentLang.savedTestView[44] }}</label>
                        <div class="d-flex flex-row">
                            <v-textarea
                            dense
                            rows="2"
                            outlined
                            prepend-icon="mdi-comment-outline"
                            v-model="comment"
                            :placeholder="currentLang.savedTestView[45]"
                            :error="savingEr"
                            >
                            </v-textarea>
                        </div>
                    </div>

                    <div>
                        <v-checkbox
                        v-model="deleteSaving"
                        :label="currentLang.savedTestView[46]"
                        color="#0d5fd8"
                    ></v-checkbox>
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
                >{{ currentLang.savedTestView[47] }}</v-alert>
            </div>

            <v-spacer></v-spacer>

            <div>
                <v-btn
                color="#0d5fd8"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="delete-btn mr-5"
                @click="savingQuestions"
            >
                {{ currentLang.savedTestView[48] }}
            </v-btn>
            <v-btn
                color="#2b2b2b"
                small
                justify="center"
                width="250"
                :disabled="blockBtn"
                class="delete-btn"
                @click="replaceTests"
            >
                {{ currentLang.savedTestView[49] }}
            </v-btn>
            </div>

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
import restoreSaved from '@/services/restoreSaved'
import { operationFromStore } from '@/services/localDB'
import { mapMutations, mapGetters } from 'vuex'

export default {
    props:{
        saving: Object,
        questions: Array,

        asyncComplate: Boolean
    },
    data() {
        return {
            dialog: false,
            savingSuccess: false,
            errors: [],
            blockBtn: false,
            showProgress: false,
            savingEr: false,
            comment: '',
            deleteSaving: false
        }
    },
    computed: mapGetters(['currentLang']),
    methods:{
        ...mapMutations(['updateTestID']),

        savingQuestions(){

            // валидаторы
            if(!this.comment){
                this.errors.push(this.currentLang.validators[9])
                this.savingEr = true
                return
            }
            if(this.comment.length<=7){
                this.errors.push(this.currentLang.validators[10])
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
            operationFromStore('getByTestID', {id: +this.saving.testID})
            .then(result=>{
                // Параметры текущего теста: учитывание баллов, темы, сложность, id предмета
                test = result
                
                params = {
                    subjectID: test.subjectID,
                    themes: test.themes,
                    languagesSettings: test.languagesSettings
                }
                if(test.ballSystem){
                    params.ballSystem = test.ballSystem
                }
                if(test.considerDifficulty){
                    params.considerDifficulty = test.considerDifficulty
                }

                output={
                    id: +_id,
                    questions: test.questions,
                    comment: this.comment,
                    date: getCurrentDate(),
                    params,
                    testID: +this.saving.testID
                }
            })
            .then(()=>{
                operationFromStore('addSaving', {data: output})
                .then(()=>{
                    //подстановка
                    restoreSaved(+this.saving.testID, this.saving, {presaving: true})
                })
                .then(()=>{
                    if(this.deleteSaving){
                        // удаление текущего сохранения
                        operationFromStore('deleteSaving', {id: this.saving.id})
                    }
                })
                .then(()=>{
                    // завершение
                    setTimeout(()=>{
                        this.showProgress = false
                        this.savingSuccess = true
                        setTimeout(()=>{
                            this.dialog = false
                            this.savingSuccess = false
                            this.blockBtn = false
                            this.comment = ''

                            //перенаправление
                            this.updateTestID(this.saving.testID)
                            this.$router.push('/workspace')
                        },2000)
                    },2000)
                })
                .catch(e=>{
                    console.error(this.currentLang.errors[0], e.message)
                    this.$router.push('/')
                })
            })
            .catch(e=>{
                console.error(this.currentLang.errors[0], e.message)
                this.$router.push('/')
            })
        },

        async replaceTests(){
            //подстановка
            await restoreSaved(+this.saving.testID, this.saving)
            
            if(this.deleteSaving){
                // await удаление текущего сохранения
                await operationFromStore('deleteSaving', {id: this.saving.id})
            }

            // сохранение
            this.blockBtn = true
            this.showProgress = true

            // завершение
            await setTimeout(()=>{
                this.showProgress = false
                this.savingSuccess = true
                setTimeout(()=>{
                    this.dialog = false
                    this.savingSuccess = false
                    this.blockBtn = false
                    this.comment = ''

                    //перенаправление
                    this.updateTestID(this.saving.testID)
                    this.$router.push('/workspace')
                },2000)
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

.v-input--selection-controls{
    margin:0;
    padding:0
}
</style>