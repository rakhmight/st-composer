<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            small
            v-bind="attrs"
            v-on="on"
            class="dashboard__btn"
            >
            <v-icon color="#0167FF" size="20">mdi-pencil-outline</v-icon>
            <span style="color:#0167FF">Изменить</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            Изменить параметры теста
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    
                    <div class="d-flex flex-column">
                        <label class="body-2">Изменение ID предмета:</label>
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-pound"
                        v-model="subjectID"
                        :value="subjectID"
                        placeholder="ID предмета"
                        :error="subjectEr"
                        >
                        </v-text-field>
                    </div>
                    <div>
                        <label class="body-2">Изменение тем:</label>
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-alpha-t-box-outline"
                        v-model="themes"
                        :value="themes"
                        placeholder="Укажите темы через запятую"
                        :error="themesEr"
                        >
                        </v-text-field>
                    </div>
                    <div class="d-flex flex-row justify-space-between">
                        <v-checkbox
                        v-model="haveLevel"
                        label="Учитывать уровень сложности?"
                        ></v-checkbox>
                        
                        <v-checkbox
                        v-model="haveBall"
                        label="Учитывать балльную систему?"
                        ></v-checkbox>
                    </div>

                    <div v-if="haveBall" class="pb-2 pt-2">
                        <ball-settings :min="minBall" :max="maxBall" :interval="ballInterval" :settingsFunc="changeSettings" />
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
                v-if="editSuccess"
                >Изменения сохранены</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0167FF"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="edit-btn"
                @click="saveChanges"
            >
                Сохранить изменения
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
import BallSettings from '@/components/dialogs/BallSettings.vue'
import putToHistory from '@/services/putToHistory'

export default {
    props:{
        test: Object,
        renderFunc: Function
    },
    data() {
        return {
            dialog: false,
            editSuccess: false,
            errors: [],
            blockBtn: false,
            showProgress: false,

            subjectID: this.test.subjectID,
            themes: this.test.themes.join(', '),

            minBall: '0.01',
            maxBall: '1',
            ballInterval: '0.01',
            haveLevel: this.test.considerDifficulty,
            haveBall: undefined,

            subjectEr: false,
            themesEr: false,

            ballIsCurrect: false,

            oldSubjectID: this.test.subjectID,
            oldThemes: this.test.themes,
            oldLevel: this.test.considerDifficulty,
            oldMinBall: undefined,
            oldMaxBall: undefined,
            oldInterval: undefined,
            oldBallSystem: undefined
        }
    },
    methods:{
        changeSettings(type, ctx){
            if(type=='min'){
                this.minBall = ctx
            }else if(type=='max'){
                this.maxBall = ctx
            }else if(type=='interval'){
                this.ballInterval = ctx
            }else if(type=='currect'){
                this.ballIsCurrect = ctx
            }
        },

        saveChanges(){
            let test = JSON.parse(localStorage.getItem(`test-${this.test.id}`))
            let counter = 0
            let output = {}
            let history = [...test.history]

            // валидаторы
            if(!this.subjectID){
                this.subjectEr = true
                return this.errors.push('Не указан ID предмета')
            }
            let subject = +((''+this.subjectID).trim())
            if(!subject){
                this.subjectEr = true
                return this.errors.push('Указан некорректный ID предмета')
            }
            if(!this.themes){
                this.themesEr = true
                return this.errors.push('Не указаны ID тем')
            }
            let themes = (''+this.themes).trim()
            themes = themes.split(',')
            themes.forEach((item, i, arr)=>{
                arr[i] = item.replace(' ', '')
                arr[i] = +arr[i]

                if(!arr[i]){
                    this.themesEr = true
                    return this.errors.push('Указаны некорректные ID тем')
                }
            })

            if(this.haveBall){
                if(!this.ballIsCurrect){
                    return this.errors.push('Не верно указаны параметры баллов')
                }
            }

            // наблюдатели изменений и counter
            if(this.subjectID != this.oldSubjectID){
                counter++
                output.subjectID = +this.subjectID
                history.push(putToHistory('change', 'subject', +this.oldSubjectID, +this.subjectID))
            }
            if(this.themes != this.oldThemes.join(', ')){
                counter++
                output.themes = themes
                history.push(putToHistory('change', 'themes', this.oldThemes, themes))
            }
            if(this.themesEr){
                return
            }

            if(this.oldLevel!=this.haveLevel){
                output.considerDifficulty = this.haveLevel
                counter++
                if(this.haveLevel){
                    history.push(putToHistory('change', 'difficulty-enabled'))
                }else{
                    history.push(putToHistory('change', 'difficulty-dissabled'))
                }
            }

            if(this.haveBall && this.oldMinBall!=this.minBall){
                output.ballSystem={}
                output.ballSystem.min = this.minBall
                output.ballSystem.max = this.maxBall
                output.ballSystem.interval = this.ballInterval
                counter++
                history.push(putToHistory('change', 'minBall', this.oldMinBall, this.minBall))
            }
            if(this.haveBall && this.oldMaxBall!=this.maxBall){
                output.ballSystem={}
                output.ballSystem.min = this.minBall
                output.ballSystem.max = this.maxBall
                output.ballSystem.interval = this.ballInterval
                counter++
                history.push(putToHistory('change', 'maxBall', this.oldMaxBall, this.maxBall))
            }

            if(this.haveBall && this.oldInterval!=this.ballInterval){
                output.ballSystem={}
                output.ballSystem.min = this.minBall
                output.ballSystem.max = this.maxBall
                output.ballSystem.interval = this.ballInterval
                counter++
                history.push(putToHistory('change', 'ballInterval', this.oldInterval, this.ballInterval))
            }

            if(this.haveBall && this.haveBall!=this.oldBallSystem){
                output.ballSystem={}
                output.ballSystem.min = this.minBall
                output.ballSystem.max = this.maxBall
                output.ballSystem.interval = this.ballInterval
                
                counter++
                history.push(putToHistory('change', 'ball-enabled'))
            }
            if(!this.haveBall && this.haveBall!=this.oldBallSystem){
                output.ballSystem = undefined
                counter++
                this.minBall = '0.01'
                this.maxBall = '1'
                this.ballInterval = '0.01'
                history.push(putToHistory('change', 'ball-dissabled'))
            }

            // сохранение
            if(counter){
                this.showProgress = true
                this.blockBtn = true

                let toSave = {
                    ...test,
                    ...output,
                    history
                }

                console.log(toSave)
                localStorage.removeItem(`test-${this.test.id}`)
                localStorage.setItem(`test-${this.test.id}`, JSON.stringify(toSave))

                setTimeout(()=>{
                    this.editSuccess = true
                    this.showProgress = false
                    this.renderFunc(toSave)
                    
                    this.oldSubjectID = this.subjectID
                    this.oldThemes = themes
                    this.oldLevel = this.haveLevel
                    this.oldBallSystem = this.haveBall

                    if(this.oldBallSystem){
                        this.oldMinBall = this.minBall
                        this.oldMaxBall = this.maxBall
                        this.oldInterval = this.ballInterval
                    }

                    setTimeout(()=>{
                        this.blockBtn = false
                        this.editSuccess = false
                    },2000)
                },2000)
            }else{
                return this.errors.push('Не были введены изменения для текущего теста')
            }
        }
    },
    watch:{
        ballIsCurrect(){
            if(this.ballIsCurrect && this.haveBall){
                this.errors = []
            }
        },

        subjectID(){
            this.subjectEr = false
            this.errors = []
        },
        themes(){
            this.themesEr = false
            this.errors = []
        },
        haveLevel(){
            this.errors = []
        },
        haveBall(){
            this.errors = []
        },

        dialog(){
            if(!this.dialog){
                this.subjectID = this.oldSubjectID
                this.themes = this.oldThemes
            }
        }
    },
    mounted() {
        if(this.test.considerDifficulty){
            this.haveLevel =  true
        }

        if(this.test.ballSystem){
            this.oldMinBall,this.minBall = this.test.ballSystem.min
            this.oldMaxBall,this.maxBall = this.test.ballSystem.max
            this.oldInterval,this.ballInterval = this.test.ballSystem.interval
            this.haveBall = true
            this.oldBallSystem = true
        }else{
            this.haveBall = false
            this.oldBallSystem = false
        }
    },
    components:{
        BallSettings
    }
}
</script>

<style scoped>
.edit-btn.theme--light.v-btn {
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
</style>