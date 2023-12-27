<template>
    

    <tr
    style="cursor: pointer;"
    class="map-orient"
    @click="changeCurrentQuestion(question.id)"
    >
        <td style="width:20px">
            <div v-if="currentTest.remarks">
                <v-tooltip bottom v-if="question.type=='basic-question' && !haveRemark">
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

                <v-tooltip bottom v-if="question.type=='question-with-images' && !haveRemark">
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

                <v-tooltip bottom v-if="question.type=='question-with-field' && !haveRemark">
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

                
                <v-tooltip bottom v-if="haveRemark">
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

</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            haveRemark: false
        }
    },
    props:{
        currentTest: Object,
        question: Object,
        getCurrentQuestion: Function,
        getCurrentAnswer: Function,
        currentQuestion: Object,
        showFullMap: Boolean,
        changeCurrentQuestion: Function
    },
    computed: mapGetters(['currentLang']),
    mounted(){
        this.haveRemarks()
    },
    watch:{
        'currentTest.remarks.length'(){
            this.haveRemarks()
        }
    },
    methods:{
        haveRemarks(){
            if(this.question && this.currentTest.remarks && this.currentTest.remarks.length){
                const remark = this.currentTest.remarks.find(remark=>remark.question==this.question.id)

                if(remark) this.haveRemark = true
                else this.haveRemark = false
            }
        },
    }
}
</script>
