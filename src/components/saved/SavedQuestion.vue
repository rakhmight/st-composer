<template>
    <div
    class="test"
    :class="`question_${question.id}`"
    :id="question.id"
    >
        <div class="test__header d-flex flex-row justify-space-between mb-2" style="position: relative;">
            <div class="d-flex flex-row">
                <v-icon size="16" color="#888" class="mr-1">mdi-pound</v-icon>
                <p style="color: #888" class="mr-5">Вопрос {{ serialNumber }} (п/п) | {{ question.id }} (ID)</p>

                <test-type-icons :type="question.type" :questionID="question.id" :questions="questions"/>

            </div>
            <div class="d-flex flex-row">
                <v-icon size="16" color="#888" class="mr-1">mdi-clock-time-eight-outline</v-icon>
                <p style="color: #888">Последнее изменение: {{ question.lastModified.date }} {{ question.lastModified.time }}</p>
            </div>
        </div>

        <v-divider color="#bbb"></v-divider>

        <div class="test__question-box mt-3 mb-6">
            <!-- Вопрос, картинка, параметры темы, балла, сложности -->
            <div class="mb-6">
                <p>Сущность вопроса:</p>
                <div class="d-flex flex-row align-start">
                    <v-icon class="mr-2 mt-2" :color="question.questionCtx ? '#0d5fd8' : ''">mdi-help-circle-outline</v-icon>
                    <div class="questionCtx" v-if="question.questionCtx">{{ question.questionCtx }}</div>
                    <div class="questionCtxEmpty" v-else>Не заполнено</div>
                </div>
            </div>

            <div class="d-flex flex-row justify-space-between">
                <div>
                    <div class="d-flex flex-row mb-3">
                        <v-icon class="mr-2" :color="question.theme ? '#0d5fd8' : ''">mdi-alpha-t-box-outline</v-icon>
                        <div>
                            Тема:
                            <span style="color:#0d5fd8" v-if="question.theme">{{ question.theme }}</span>
                            <span style="color:#888" v-else>(не указана)</span>
                        </div>
                    </div>

                    <div class="d-flex flex-row mb-3" v-if="testParams.considerDifficulty">
                        <v-icon class="mr-2" :color="question.difficulty ? '#0d5fd8' : ''">mdi-chart-line</v-icon>
                        <div>
                            Сложность:
                            <span style="color:#0d5fd8" v-if="question.difficulty && question.difficulty==1">лёгкий</span>
                            <span style="color:#0d5fd8" v-if="question.difficulty && question.difficulty==2">средний</span>
                            <span style="color:#0d5fd8" v-if="question.difficulty && question.difficulty==3">сложный</span>
                            <span style="color:#888" v-if="!question.difficulty">(не указана)</span>
                        </div>
                    </div>

                    <div class="d-flex flex-row mb-3" v-if="testParams.ballSystem">
                        <v-icon class="mr-2" :color="question.ball ? '#0d5fd8' : ''">mdi-circle-double</v-icon>
                        <div>
                            Балл:
                            <span style="color:#0d5fd8">{{ question.ball }}</span>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-row" v-if="question.type=='question-with-images'"> 
                        <v-icon class="mr-2" :color="question.imagePreview ? '#0d5fd8' : ''">mdi-camera</v-icon>
                        <div>
                            Изображение:
                            <span></span>
                        </div>
                    </div>
                </div>

                <div v-if="question.type=='question-with-images'">
                    <div v-if="question.imagePreview">
                        <v-img
                        max-height="200"
                        max-width="400"
                        :src="question.imagePreview"
                        contain
                        transition="scale-transition"
                        ></v-img>
                    </div>
                    <!-- Изображение, или: -->
                    <div class="imgEmpty" v-else>
                        <v-img
                        max-height="150"
                        max-width="150"
                        src="@/assets/media/spider-web.png"
                        contain
                        transition="scale-transition"
                        ></v-img>
                    </div>
                </div>
            </div>
        </div>

        <v-divider color="#bbb"></v-divider>

        <div class="test__answers-box mt-3" v-if="question.type!='question-with-field'">
            <!-- Обычные ответы, ответы с изображениями -->
            <div v-for="answer in question.answers" class="d-flex flex-column align-center" style="width:100%">
                <div style="width:100%" class="d-flex flex-row">
                    <v-divider color="#888" vertical class="mr-2"></v-divider>
                    <div class="d-flex flex-row align-start" style="width:100%">
                        <v-icon class="mt-2 mr-2" :color="answer.isCurrect ? '#51c551' : ''">mdi-lightbulb-auto</v-icon>
                        <div class="answerCtx" v-if="answer.answerCtx && !answer.isCurrect">{{ answer.answerCtx }}</div>
                        <div class="answerCtx" v-if="answer.answerCtx && answer.isCurrect" style="border: 2px solid #51c551">{{ answer.answerCtx }}</div>
                        <div class="answerCtxEmpty" v-if="!answer.answerCtx">Не заполнено</div>
                    </div>
                </div>

                <div v-if="question.type=='question-with-images'">
                    <v-img
                    v-if="answer.imagePreview"
                    max-height="200"
                    max-width="400"
                    :src="answer.imagePreview"
                    contain
                    transition="scale-transition"
                    class="mt-3"
                    ></v-img>
                    <div class="imgEmpty mt-3" v-else>
                        <v-img
                        max-height="150"
                        max-width="150"
                        src="@/assets/media/spider-web.png"
                        contain
                        transition="scale-transition"
                        ></v-img>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="test__answers-box mt-3" v-else style="position: relative;">
            <!-- Картинка с областью выделения -->
        </div>
    </div>
</template>

<script>
import TestTypeIcons from '@/components/tests/TestTypeIcons.vue'

export default {
    props:{
        question: Object,
        serialNumber: Number,
        testParams: Object,
        questions: Array,
    },
    components:{
        TestTypeIcons
    }
}
</script>

<style scoped>
.test{
    background-color: aliceblue;
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0px 0px 5px 5px #4444441c;
    scroll-margin-top:90px;
    min-width: 1020px;
}

.questionCtx{
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #888;
    width: 100%;
}
.questionCtxEmpty{
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    border: 1px solid #888;
    color: #888;
}

.imgEmpty{
    border: 1px solid #888;
    width: 400px;
    height: 200px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.test__answers-box{
    display: grid;
    grid-template-columns: repeat(auto-fill, 47%);
    justify-content: space-between;
    gap: 30px;
    width: 100%;
}
.answerCtx{
    padding:10px;
    border-radius: 5px;
    border: 1px solid #888;
    width: 100%;
}
.answerCtxEmpty{
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    border: 1px solid #888;
    color: #888;
}
</style>