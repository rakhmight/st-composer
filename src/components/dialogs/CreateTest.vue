<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            small
            dark
            color="#0167FF"
            v-bind="attrs"
            v-on="on"
            >
              + {{ currentLang.dashboardView[3] }}
            </v-btn>
        </template>

        <v-card style="max-height: 600px;overflow-y: scroll;">
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            {{ currentLang.dashboardView[3] }}
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    <div>
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-pound"
                        v-model="subjectID"
                        :placeholder="currentLang.dashboardView[4]"
                        :error="subjectIsEmpty"
                        >
                        </v-text-field>
                    </div>
                    <div>
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-alpha-t-box-outline"
                        v-model="subjectThemes"
                        :placeholder="currentLang.dashboardView[5]"
                        :error="themesIsEmpty"
                        >
                        </v-text-field>
                    </div>
                    <div class="d-flex flex-row justify-space-between">
                        <v-checkbox
                        v-model="haveLevel"
                        :label="currentLang.dashboardView[6]"
                        ></v-checkbox>
                        
                        <v-checkbox
                        v-model="haveBall"
                        :label="currentLang.dashboardView[7]"
                        ></v-checkbox>
                    </div>

                    <div v-if="haveBall" class="pb-2 pt-2">
                        <ball-settings :min="minBall" :max="maxBall" :interval="ballInterval" :settingsFunc="changeSettings" :currect="ballIsCurrect" />
                    </div>
                </div>
            </div>

            <div class="test-errors-box">
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
                    v-if="createSuccess"
                    >
                        {{ currentLang.dashboardView[8] }}
                    </v-alert>
            </div>
            

            <v-divider></v-divider>
            <v-card-actions class="d-flex align-items-center flex-column">
                <v-btn
                color="#0167FF"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="add-btn"
                @click="createTest"
                >
                    {{ currentLang.dashboardView[9] }}
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
// import { ValidationProvider} from 'vee-validate'
import VueSlider from 'vue-slider-component'
import BallSettings from '@/components/dialogs/BallSettings.vue'
import 'vue-slider-component/theme/default.css'
import getCurrentDate from '@/plugins/getCurrentDate'
import { mapGetters, mapMutations } from 'vuex'
import putToHistory from '@/services/putToHistory'
import { operationFromStore } from '@/services/localDB'

export default {
    props:{
        renderFunc: Function
    },
    data() {
        return {
            dialog: false,
            errors:[],
            blockBtn: false,
            showProgress: false,
            createSuccess: false,

            subjectID: undefined,
            subjectThemes:undefined,

            haveLevel: false,
            haveBall:false,
            minBall: '0.01',
            maxBall: '1',
            ballInterval: '0.01',

            ballIsCurrect: false,
            subjectIsEmpty: false,
            themesIsEmpty: false
        }
    },
    methods: {
        ...mapMutations(['updateTestsCounter', 'updateTestID']),

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

        createTest(){
            // ?????????????? ??????????????????????
            if(!this.subjectID){
                this.subjectIsEmpty = true
                return this.errors.push(this.currentLang.validators[0])
            }

            // ???????????????? ????????????????
            let subject = +(this.subjectID.trim())
            if(!subject){
                this.subjectIsEmpty = true
                this.errors.push(this.currentLang.validators[1])
                return
            }
                        
            // ???????????????? ??????
            let themes = (''+this.subjectThemes).trim()
            themes = themes.split(',')
            themes.forEach((item, i, arr)=>{
                arr[i] = item.replace(' ', '')
                arr[i] = +item

                if(!arr[i]){
                    this.themesIsEmpty = true
                    return this.errors.push(this.currentLang.validators[2])
                }
            })
            //?????????????????????????? ????????
            let themesCounter = 0
            for(let i = 0; i!=themes.length; i++){
                for(let j =0; j!=themes.length; j++){
                    if(themes[i]==themes[j]){
                        themesCounter++
                    }
                    if(themes[i]==themes[j] && themesCounter==2){
                        this.themesIsEmpty = true
                        return this.errors.push(this.currentLang.validators[3])  
                    }
                }
                themesCounter=0
            }
            if(this.themesIsEmpty){
                return
            }

            if(!this.subjectThemes){
                this.themesIsEmpty = true
                return this.errors.push(this.currentLang.validators[4])
            }
            if(!this.ballIsCurrect && this.haveBall){
                return this.errors.push(this.currentLang.validators[5]) 
            }

            // ?????????????? ???????????????????? ?? LS ?? ???????????????? ?? ????????????
            if(!this.errors.length){
                // ???????????????? ????????????????
                this.showProgress = true
                this.blockBtn = true

                //??? ???????????? ????????
                //??? ?????????????????? id
                //??? ?????????????????????????? subjectID

                let test = {
                    id: this.currentTestsCounter+1,
                    creationDate: getCurrentDate(),
                    lastModified: undefined,
                    author: {id: this.currentSign.owner, fullname: this.currentSign.fullname},
                    subjectID: subject,
                    themes: themes,
                    status: { inProcess: true, isSigned: false, isDeleted: false },
                    history:[putToHistory('create', undefined)],
                    signedDate: undefined,
                    questions:[]
                }
                if(this.haveBall){
                    test.ballSystem = {
                        min: this.minBall,
                        max: this.maxBall,
                        interval: this.ballInterval
                    }
                }
                if(this.haveLevel){
                    test.considerDifficulty = true
                }

                this.updateTestsCounter(this.currentTestsCounter+1)

                // ???????????????? ?? DB
                operationFromStore('addTest', {data: test})
                .catch(e=>{
                console.error(this.currentLang.errors[0], e.message)
                this.$router.push('/')
                })

                // ?????????????????????????? ?????????? ?????????? ???????????????? ?????????? ?????? workspace
                this.updateTestID(test.id)

                setTimeout(()=>{
                    this.renderFunc()
                    this.createSuccess = true

                    setTimeout(()=>{
                        this.showProgress = false
                        this.blockBtn = false

                        this.$router.push(`/workspace`)
                    },1000)
                },2000)
                //??? ?????????????????? ????????????????
                // ?????????????? ?????? ?? ??????. ??????????????????
                // ?????????????? ?? ?????????????????? ????????????
            }
        }
    },
    computed: mapGetters(['currentTestsCounter', 'currentSign', 'currentLang']),
    watch:{
        subjectID(){
            if(this.subjectID.length){
                this.subjectIsEmpty = false
                this.errors = []
            }
        },
        subjectThemes(){
            if(this.subjectThemes.length){
                this.themesIsEmpty = false
                this.errors = []
            }
        },
        ballIsCurrect(){
            if(this.ballIsCurrect && this.haveBall){
                this.errors = []
            }
        }
    },
    components: {
        // ValidationProvider,
        VueSlider,
        BallSettings
    }
}
</script>

<style scoped>
.add-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
}

.dialog-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.content__subject-box{
    padding: 30px 30px 0 30px;
    width: 100%;
    display: flex;
}
/* .content__template-box{
    padding: 0 30px;
    width: 100%;
} */

.v-dialog > .v-card > .v-card__action{
    padding: 15px;
}
.v-card__actions{
    padding: 15px;
}

.v-list-item{
    padding: 0;
}
.v-application--is-ltr .v-list-group--sub-group .v-list-group__header {
    padding-left: 0;
}

.test-errors-box{
    width: 100%;
    padding: 0 15px;
}
</style>