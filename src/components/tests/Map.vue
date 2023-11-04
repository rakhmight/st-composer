<template>
    <div class="workspace__sidebar">
        <div :class="{'full-map':showFullMap}" :style="showFullMap ? 'width: 90vw' : 'width: 270px'" style="transition: width 0.3s ease-in-out;">
            <div class="d-flex flex-row align-center justify-space-between" style="background-color: #0d5fd8;padding:7px 5px;border-radius: 5px 5px 0 0;">
                <div class="d-flex flex-row align-center">
                    <v-icon size="20" color="#fff" class="mr-1">
                        mdi-content-paste
                    </v-icon>
                    <h4 style="color:#fff">{{ currentLang.workspaceView[0] }}</h4>
                </div>

                <v-tooltip bottom v-if="mapQuestions.length">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="showFullMap=!showFullMap"
                    >
                        <v-icon color="#fff" v-if="!showFullMap">mdi-arrow-right</v-icon>
                        <v-icon color="#fff" v-else>mdi-arrow-left</v-icon>
                    </v-btn>
                </template>
                <span>{{ currentLang.workspaceView[1] }}</span>
                </v-tooltip>

            </div>
            <div v-if="mapQuestions.length==0 && !loader" class="workspace__map-empty d-flex flex-column justify-center align-center" style="border-radius: 0 0 5px 5px;">
                <v-img
                max-height="80"
                max-width="80"
                src="@/assets/media/no-questions.png"
                contain
                transition="scale-transition"
                style="opacity: 0.5;"
                ></v-img>
            </div>
            <div class="workspace__map" v-if="mapQuestions.length && !loader" :class="{'.workspace__map-full': showFullMap}">
                <div class="map-elem"> 
                    <v-simple-table dense>
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    
                                </th>
                                <th class="text-left">
                                    #
                                </th>
                                <th class="text-left">
                                    {{ currentLang.workspaceView[2] }}
                                </th>
                                <th class="text-left" v-if="showFullMap">
                                    {{ currentLang.workspaceView[3] }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="cursor: pointer;"
                            v-for="question in mapQuestions"
                            :key="question.id"
                            class="map-orient"
                            @click="changeCurrentQuestion(question.id)"
                            >
                                <td style="width:20px">
                                    <div v-if="remarks">
                                        <v-tooltip bottom v-if="question.type=='basic-question' && !remarks.find(remark=>remark.question==question.id)">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                            v-bind="attrs"
                                            v-on="on"
                                            :color="currentQuestion.id==question.id ? '#0167FF' : '#888'"
                                            >
                                            mdi-text
                                            </v-icon>
                                        </template>
                                        <span>{{ currentLang.workspaceView[13] }}</span>
                                        </v-tooltip>

                                        <v-tooltip bottom v-if="question.type=='question-with-images' && !remarks.find(remark=>remark.question==question.id)">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                            v-bind="attrs"
                                            v-on="on"
                                            :color="currentQuestion.id==question.id ? '#0167FF' : '#888'"
                                            >
                                            mdi-image-outline
                                            </v-icon>
                                        </template>
                                        <span>{{ currentLang.workspaceView[14] }}</span>
                                        </v-tooltip>

                                        <v-tooltip bottom v-if="question.type=='question-with-field' && !remarks.find(remark=>remark.question==question.id)">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                            v-bind="attrs"
                                            v-on="on"
                                            :color="currentQuestion.id==question.id ? '#0167FF' : '#888'"
                                            >
                                            mdi-selection-ellipse-arrow-inside
                                            </v-icon>
                                        </template>
                                        <span>{{ currentLang.workspaceView[15] }}</span>
                                        </v-tooltip>

                                        
                                        <v-tooltip bottom v-if="remarks.find(remark=>remark.question==question.id)">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                            v-bind="attrs"
                                            v-on="on"
                                            :color="'red'"
                                            >
                                            mdi-alert-circle-outline
                                            </v-icon>
                                        </template>
                                        <span v-if="question.type=='basic-question'">{{ currentLang.workspaceView[13] }}</span>
                                        <span v-if="question.type=='question-with-images'">{{ currentLang.workspaceView[14] }}</span>
                                        <span v-if="question.type=='question-with-field'">{{ currentLang.workspaceView[15] }}</span>
                                        </v-tooltip>
                                    </div>

                                    <div v-else>
                                        <v-tooltip bottom v-if="question.type=='basic-question'">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                            v-bind="attrs"
                                            v-on="on"
                                            :color="currentQuestion.id==question.id ? '#0167FF' : '#888'"
                                            >
                                            mdi-text
                                            </v-icon>
                                        </template>
                                        <span>{{ currentLang.workspaceView[13] }}</span>
                                        </v-tooltip>

                                        <v-tooltip bottom v-if="question.type=='question-with-images'">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                            v-bind="attrs"
                                            v-on="on"
                                            :color="currentQuestion.id==question.id ? '#0167FF' : '#888'"
                                            >
                                            mdi-image-outline
                                            </v-icon>
                                        </template>
                                        <span>{{ currentLang.workspaceView[14] }}</span>
                                        </v-tooltip>

                                        <v-tooltip bottom v-if="question.type=='question-with-field'">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                            v-bind="attrs"
                                            v-on="on"
                                            :color="currentQuestion.id==question.id ? '#0167FF' : '#888'"
                                            >
                                            mdi-selection-ellipse-arrow-inside
                                            </v-icon>
                                        </template>
                                        <span>{{ currentLang.workspaceView[15] }}</span>
                                        </v-tooltip>
                                    </div>
                                </td>
                                <!-- <td >{{ i+1 }}</td> -->
                                <td >{{ question.id }}</td>
                                <td>
                                    <p class="body-2" style="color:#484848" :class="{'map-small': !showFullMap,'map-full':showFullMap}">
                                        <span v-if="getCurrentQuestion(question.questionCtx)">{{ getCurrentQuestion(question.questionCtx) }}</span>
                                        <span style="color:#888;" v-else>{{ currentLang.workspaceView[4] }}</span>
                                    </p>
                                </td>
                                <td v-if="showFullMap" style="min-width:20vw; max-width:20vw; word-break: break-all;">
                                    <p
                                    v-for="(answer, i) in question.answers"
                                    :key="i"
                                    class="body-2"
                                    :style="answer.isCurrect ? 'color:green' : 'color:#484848'"
                                    >
                                        <span v-if="getCurrentAnswer(answer.answerCtx)">{{ `${i+1}) ` }} {{ getCurrentAnswer(answer.answerCtx) }}</span>
                                        <span v-else style="color:#B3B3B3">{{ `${i+1}) ` }}{{ currentLang.workspaceView[4] }}</span>
                                    </p>
                                    <p
                                    v-if="question.type=='question-with-field'"
                                    >
                                        <span v-if="question.answer[1].x" style="color: green">{{ currentLang.workspaceView[5] }}</span>
                                        <span v-else>{{ currentLang.workspaceView[6] }}</span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </div>
            <div style="height: 237px; background-color: #aaaaaa80; border-radius: 0 0 5px 5px;" v-if="loader" class="d-flex justify-center align-center">
                <v-progress-circular
                :size="50"
                :width="5"
                color="#888"
                indeterminate
                ></v-progress-circular>
            </div>
        </div>

        <v-btn
        small
        width="270"
        color="#0d5fd8"
        class="mt-5"
        @click="goToBack"
        :disabled="loader || saveProcessFinally.value"
        >
            <v-icon color="#fff" class="mr-1">mdi-arrow-left-thin</v-icon>
            <span :style="!loader ? 'color: #fff' : 'color: #888'">{{ currentLang.workspaceView[7] }}</span>
        </v-btn>

        <sign-test
        :loader="loader"
        :stopSavingLoop="stopSavingLoop"
        :currentTest="currentTest"
        :questions="questions"
        :saveProcessFinally="saveProcessFinally"
        :remarks="remarks"
        :saveProcess="saveProcess"
        />

        <import-word-file
        :saveProcessFinally="saveProcessFinally"
        :loader="loader"
        :currentTest="currentTest"
        :questionsCounter="questionsCounter"
        :addQuestionsFromWordFile="addQuestionsFromWordFile"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SignTest from '@/components/dialogs/SignTest.vue'
import ImportWordFile from '@/components/dialogs/ImportWordFile.vue'

export default {
    props:{
        loader: Boolean,
        mapQuestions: Array,
        testOptions: Object,
        goToQuestion: Function,
        currentQuestion: Object,
        changeCurrentQuestion: Function,
        saveProcess: Function,
        blockAddQBtnFunc: Function,
        stopSavingLoop: Function,
        currentTest: Object,
        questions: Array,
        saveProcessFinally: Object,
        remarks: undefined | Array,
        questionsCounter: Number,
        addQuestionsFromWordFile: Function
    },
    data(){
        return {
            showFullMap: false,
        }
    },
    components:{
        SignTest,
        ImportWordFile
    },
    computed: mapGetters(['currentLang']),
    methods:{
        goToBack(){
            this.stopSavingLoop()
            this.blockAddQBtnFunc()
            this.saveProcess({route: true})
        },
        
        getCurrentAnswer(answer){
            if(this.testOptions.languagesSettings.languages[0] == 'ru'){
                if(answer.ru){
                    return answer.ru
                }
                return undefined
            } else if(this.testOptions.languagesSettings.languages[0] == 'eng'){
                if(answer.eng){
                    return answer.eng
                }
                return undefined
            } else if(this.testOptions.languagesSettings.languages[0] == 'uz_l'){
                if(answer.uz_l){
                    return answer.uz_l
                }
            } else if(this.testOptions.languagesSettings.languages[0] == 'uz_k'){
                if(answer.uz_k){
                    return answer.uz_k
                }
                return undefined
            } else if(this.testOptions.languagesSettings.languages[0] == 'custom'){
                if(answer.custom){
                    return answer.custom
                }
                return undefined
            }
        },

        getCurrentQuestion(question){
            if(this.testOptions.languagesSettings.languages[0] == 'ru'){
                return question.ru
            } else if(this.testOptions.languagesSettings.languages[0] == 'eng'){
                return question.eng
            } else if(this.testOptions.languagesSettings.languages[0] == 'uz_l'){
                return question.uz_l
            } else if(this.testOptions.languagesSettings.languages[0] == 'uz_k'){
                return question.uz_k
            } else if(this.testOptions.languagesSettings.languages[0] == 'custom'){
                return question.custom
            }
        },
    }
}
</script>

<style scoped>
::-webkit-scrollbar {
    width: 6px; /* ширина для вертикального скролла */
    background-color: #b9b9b9;
}
</style>