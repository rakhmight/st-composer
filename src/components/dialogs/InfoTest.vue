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
        <span style="color:#0167FF">Информация</span>
        </v-btn>
    </template>

    <v-card>
        <v-card-title
        class="text-h5 lighten-2 d-flex flex-row justify-space-between"
        >
        Информация о тесте
        <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
        </v-card-title>

        <v-divider></v-divider>

        <div class="dialog-content">
            <div class="main-info mb-3">
                <div class="d-flex flex-column">
                    <div>Тест создан</div>
                    <div v-if="test.lastChange">Последнее изменение внесено</div>
                    <div class="mb-3">Автор</div>
                    <div>ID предмета</div>
                    <div>Темы</div>
                </div>
                <div class="d-flex flex-column">
                    <div class="text-end"><b style="color:#0167FF">{{ test.creationDate.date }} {{ test.creationDate.time }}</b></div>
                    <div class="text-end"><b style="color:#444">{{ test.lastChange.date }} {{ test.lastChange.time }}</b></div>
                    <div class="text-end mb-3"><b>{{ test.author.fullname }}</b></div>
                    <div class="text-end"><b>{{ test.subjectID }}</b></div>
                    <div class="text-end"><b>{{ test.themes.join(', ') }}</b></div>
                </div>
            </div>

            <div class="mb-3" v-if="test.considerDifficulty">
                <v-icon color="green">mdi-check-circle</v-icon>
                В тесте учитывается сложность вопросов
            </div>

            <div class="mb-3" v-if="test.ballSystem">
                <v-icon color="green">mdi-check-circle</v-icon>
                Ответы оцениваются по балльной шкале
                <div class="d-flex flex-row justify-space-between flex-wrap">
                    <div><v-icon>mdi-minus</v-icon>Минимальный балл: <b>{{ test.ballSystem.min }}</b></div>
                    <div><v-icon>mdi-vector-line</v-icon>Интервал между баллами: <b>{{ test.ballSystem.interval }}</b></div>
                    <div><v-icon>mdi-plus</v-icon>Максимальный балл: <b>{{ test.ballSystem.max }}</b></div>
                </div>
            </div>

            <div>
                <v-icon>mdi-help-circle</v-icon>
                Общее количество вопросов: <b>{{ test.questions.length }}</b> <span v-if="test.questions.length">, из них:</span>
                <div class="question-info" v-if="test.questions.length">
                    <div>
                        <div><span style="color:rgb(255, 99, 132)">►</span> текстовых вопросов: <b>100</b></div>
                        <div><span style="color:rgb(54, 162, 235)">►</span> вопросов с изображениями: <b>30</b></div>
                        <div><span style="color:rgb(255, 205, 86)">►</span> вопросов с выбранной областью: <b>20</b></div>
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

export default {
    props:{
        id: Number,
        test: Object
    },
    data() {
        return {
            dialog: false,
            chartAvaible:false,
            testID: this.id
        }
    },
    mounted() {
        // Расчитать вопросы по их виду
        if(this.test.questions.length){
            
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
                            'текстовые',
                            'с изображением',
                            'с выбранной областью'
                        ],
                        datasets: [{
                            data: [100, 30, 20],
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