<template>    <v-dialog
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
        <v-icon color="#0167FF" size="20">mdi-information</v-icon>
        <span style="color:#0167FF">{{ currentLang.dashboardView[18] }}</span>
        </v-btn>
    </template>

    <v-card>
        <v-card-title
        class="text-h5 lighten-2 d-flex flex-row justify-space-between"
        >
        {{ currentLang.dashboardView[19] }}
        <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
        </v-card-title>

        <v-divider></v-divider>

        <div class="dialog-content">
            <div class="main-info mb-3">
                <div class="d-flex flex-column">
                    <div>{{ currentLang.dashboardView[20] }}</div>
                    <div v-if="test.lastModified">{{ currentLang.dashboardView[21] }}</div>
                    <div class="mb-3">{{ currentLang.dashboardView[22] }}</div>
                    <div>{{ currentLang.dashboardView[23] }}</div>
                    <div>{{ currentLang.dashboardView[24] }}</div>
                </div>
                <div class="d-flex flex-column">
                    <div class="text-end"><b style="color:#0167FF">{{ test.creationDate.date }} {{ test.creationDate.time }}</b></div>
                    <div class="text-end" v-if="test.lastModified"><b style="color:#444">{{ test.lastModified.date }} {{ test.lastModified.time }}</b></div>
                    <div class="text-end mb-3"><b>{{ test.author.fullname }}</b></div>
                    <div class="text-end"><b>{{ test.subjectID }}</b></div>
                    <div class="text-end"><b>{{ test.themes.join(', ') }}</b></div>
                </div>
            </div>

            <div class="mb-3" v-if="test.considerDifficulty">
                <v-icon color="green">mdi-check-circle</v-icon>
                {{ currentLang.dashboardView[25] }}
            </div>

            <div class="mb-3" v-if="test.ballSystem">
                <v-icon color="green">mdi-check-circle</v-icon>
                {{ currentLang.dashboardView[26] }}
                <div class="d-flex flex-row justify-space-between flex-wrap">
                    <div><v-icon>mdi-minus</v-icon>{{ currentLang.dashboardView[27] }}: <b>{{ test.ballSystem.min }}</b></div>
                    <div><v-icon>mdi-vector-line</v-icon>{{ currentLang.dashboardView[28] }}: <b>{{ test.ballSystem.interval }}</b></div>
                    <div><v-icon>mdi-plus</v-icon>{{ currentLang.dashboardView[29] }}: <b>{{ test.ballSystem.max }}</b></div>
                </div>
            </div>

            <div>
                <v-icon>mdi-help-circle</v-icon>
                {{ currentLang.dashboardView[30] }}: <b>{{ test.questions.length }}</b> <span v-if="test.questions.length">, {{ currentLang.dashboardView[31] }}:</span>
                <div class="question-info" v-if="test.questions.length">
                    <div>
                        <div><span style="color:rgb(255, 99, 132)">►</span> {{ currentLang.dashboardView[32] }}: <b>{{ basicQuestions }}</b></div>
                        <div><span style="color:rgb(54, 162, 235)">►</span> {{ currentLang.dashboardView[33] }}: <b>{{ questionsWithImages }}</b></div>
                        <div><span style="color:rgb(255, 205, 86)">►</span> {{ currentLang.dashboardView[34] }}: <b>{{ questionWithField }}</b></div>
                    </div>
                    <div class="canvas-box">
                        <!-- Нужно создавать canvas с помощью скрипта -->
                        <canvas :id="`questionsChart-${testID}`" width="250" height="250"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </v-card>
</v-dialog>
</template>

<script>
import Chart from 'chart.js/auto'
import { mapGetters } from 'vuex'

export default {
    props:{
        id: Number,
        test: Object,
    },
    data() {
        return {
            dialog: false,
            chartAvaible:false,
            testID: this.id,

            questionsWithImages: 0,
            questionWithField: 0,
            basicQuestions: 0
        }
    },
    computed: mapGetters(['currentLang']),
    mounted() {
        //Расчитать вопросы по их виду
        if(this.test.questions.length){
            for(let i =0; i!=this.test.questions.length; i++){
                if(this.test.questions[i].type=='basic-question'){
                    this.basicQuestions++                    
                }else if(this.test.questions[i].type=='question-with-images'){
                    this.questionsWithImages++
                }else if(this.test.questions[i].type=='question-with-field'){
                    this.questionWithField++
                }
            }
        }
    },
    watch:{
        dialog(){
            if(this.dialog && !this.chartAvaible && this.test.questions.length){
                setTimeout(()=> {
                    const ctx = document.querySelector(`#questionsChart-${this.testID}`)
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                        labels: [
                            this.currentLang.dashboardView[35],
                            this.currentLang.dashboardView[36],
                            this.currentLang.dashboardView[37],
                        ],
                        datasets: [{
                            data: [this.basicQuestions, this.questionsWithImages, this.questionWithField],
                            backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
                        }]
                        },
                        options: {
                            plugins: {
                                legend: {
                                    display: false,
                                }
                            }
                        }
                    })
                    this.chartAvaible = true
                },500)
            }
        }
    }
}
</script>

<style scoped>
.dialog-content{
    width: 100%;
    padding: 30px;
}

.main-info{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:30px;
    justify-content: start;
}

.question-info{
    display: grid;
    grid-template-columns: 1.2fr 0.7fr;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
}

.canvas-box{
    width: 100%;
    height: auto;
}
</style>