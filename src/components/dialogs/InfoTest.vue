<template>    <v-dialog
    v-model="dialog"
    width="700"
    >
    <template v-slot:activator="{ on, attrs }">
        <div
        v-bind="attrs"
        v-on="on"
        class="dashboard__btn"
        >
        <v-icon color="#0167FF" size="19">mdi-information</v-icon>
        <span class="ml-1">{{ currentLang.dashboardView[18] }}</span>
        </div>
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
                
                <v-simple-table dense>
                    <template v-slot:default>
                    <tbody>
                        <tr>
                            <td>{{ currentLang.dashboardView[20] }}</td>
                            <td><div class="text-end"><b style="color:#0167FF">{{ test.creationDate.date }} {{ test.creationDate.time }}</b></div></td>
                        </tr>
                        <tr>
                            <td><div v-if="test.lastModified">{{ currentLang.dashboardView[21] }}</div></td>
                            <td><div class="text-end" v-if="test.lastModified"><b style="color:#444">{{ test.lastModified.date }} {{ test.lastModified.time }}</b></div></td>
                        </tr>
                        <tr v-if="test.status.isSigned">
                            <td><div v-if="test.status.isSigned">Дата подписания</div></td>
                            <td><div class="text-end" v-if="test.status.isSigned"><b style="color:#0C2242">{{ getDate(test.signedDate) }}</b></div></td>
                        </tr>
                        <tr>
                            <td><div>{{ currentLang.dashboardView[22] }}</div></td>
                            <td><div class="text-end"><b>{{ getAuthor(test.author) }}</b></div></td>
                        </tr>
                        <tr>
                            <td><div>{{ currentLang.dashboardView[23] }}</div></td>
                            <td><div class="text-end"><b>{{ getSubject(test.subjectID) }}</b></div></td>
                        </tr>
                        <tr>
                            <td><div>{{ currentLang.dashboardView[24] }}</div></td>
                            <td><div class="text-end"><b>{{ getThemes(test.subjectID,test.themes) }}</b></div></td>
                        </tr>
                        <tr>
                            <td><div>Языки</div></td>
                            <td><div class="text-end"><b>{{ getLanguages(test.languagesSettings.languages) }}</b></div></td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </div>

            <div class="mb-3" v-if="test.considerDifficulty">
                <v-icon color="green">mdi-check-circle</v-icon>
                {{ currentLang.dashboardView[25] }}
            </div>

            <div class="mb-3" v-if="test.ballSystem">
                <v-icon color="green">mdi-check-circle</v-icon>
                {{ currentLang.dashboardView[26] }}
                <div class="d-flex flex-row justify-space-between flex-wrap mt-1">
                    <div><v-icon>mdi-minus</v-icon>{{ currentLang.dashboardView[27] }}: <b>{{ test.ballSystem.min }}</b></div>
                    <div><v-icon>mdi-plus</v-icon>{{ currentLang.dashboardView[29] }}: <b>{{ test.ballSystem.max }}</b></div>
                </div>
            </div>

            <div>
                <v-icon>mdi-help-circle</v-icon>
                {{ currentLang.dashboardView[30] }}: <b>{{ questions }}</b> <span v-if="questions">, {{ currentLang.dashboardView[31] }}:</span>
                <div class="question-info" v-if="questions">
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
import { getSubject, getAuthor, getThemes, getLanguages } from '@/plugins/getInfo'

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

            questionsWithImages: this.test.testInfo.qwi,
            questionWithField: this.test.testInfo.qwf,
            basicQuestions: this.test.testInfo.bq,
            questions: this.test.testInfo.totalQuestions
        }
    },
    computed: mapGetters(['currentLang', 'currentSign']),
    methods:{
        getAuthor (id){
            return getAuthor(id, this.currentSign)
        },

        getSubject(id){
            return getSubject(id, this.currentSign.subjects)
        },

        getThemes(sub, thems){
            return getThemes(sub, thems, this.currentSign)
        },

        getLanguages(langs){
            return getLanguages(langs)
        },

        getDate(date){
            if(date.getMonth() < 9){
                return `${date.getDate()}.0${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
            } else{
                return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
            }
        }
    },
    watch:{
        dialog(){
            if(this.dialog && !this.chartAvaible && this.questions){
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