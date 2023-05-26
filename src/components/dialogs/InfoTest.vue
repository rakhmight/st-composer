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
                        <tr v-if="test.lastModified">
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
                        <tr v-if="test.remarks && test.remarks.length" style="color:#ff4500">
                            <td><div>Количество ошибок</div></td>
                            <td><div class="text-end"><b>{{ test.remarks.length }}</b></div></td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </div>

            <div class="mb-3 d-flex flex-row align-center" v-if="test.considerDifficulty">
                <v-icon color="green" size="19">mdi-check-circle</v-icon>
                <span class="ml-1" style="font-size: 0.95em;">{{ currentLang.dashboardView[25] }}</span>
            </div>

            <div class="mb-3" v-if="test.ballSystem">
                <div class="d-flex flex-row align-center">
                    <v-icon color="green" size="19">mdi-check-circle</v-icon>
                    <span class="ml-1" style="font-size: 0.95em;">{{ currentLang.dashboardView[26] }}</span>
                </div>
                <div class="d-flex flex-row justify-space-between flex-wrap mt-1">
                    <div class="d-flex flex-row align-center">
                        <v-icon size="19">mdi-minus</v-icon>
                        <span class="ml-1" style="font-size: 0.95em;">{{ currentLang.dashboardView[27] }}: <b>{{ test.ballSystem.min }}</b></span>
                    </div>
                    <div class="d-flex flex-row align-center">
                        <v-icon size="19">mdi-plus</v-icon>
                        <span class="ml-1" style="font-size: 0.95em;">{{ currentLang.dashboardView[29] }}: <b>{{ test.ballSystem.max }}</b></span>
                    </div>
                </div>
            </div>

            <div>
                <div class="d-flex flex-row align-center">
                    <v-icon size="19">mdi-help-circle</v-icon>
                    <span class="ml-1" style="font-size: 0.95em;">{{ currentLang.dashboardView[30] }}: <b>{{ questions }}</b> <span v-if="questions">, {{ currentLang.dashboardView[31] }}:</span></span>
                </div>
                <div class="question-info" v-if="questions">
                    <div>
                        <div style="font-size: 0.95em;"><span style="color: #0d5fd8; font-size: 0.8em;">►</span> {{ currentLang.dashboardView[32] }}: <b>{{ basicQuestions }}</b></div>
                        <div style="font-size: 0.95em;"><span style="color: #444; font-size: 0.8em;">►</span> {{ currentLang.dashboardView[33] }}: <b>{{ questionsWithImages }}</b></div>
                        <div style="font-size: 0.95em;"><span style="color: #0c2242; font-size: 0.8em;">►</span> {{ currentLang.dashboardView[34] }}: <b>{{ questionWithField }}</b></div>
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
                            '#0d5fd8',
                            '#444',
                            '#0c2242'
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
::-webkit-scrollbar {
    width: 6px; /* ширина для вертикального скролла */
    background-color: #b9b9b9;
}
.dialog-content{
    width: 100%;
    padding: 30px;
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden
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