<template>
    <div
    class="test"
    :class="`question_${question.id}`"
    :id="question.id"
    >
        <div class="test__header d-flex flex-row justify-space-between mb-2" style="position: relative;">
            <div class="d-flex flex-row">
                <v-icon size="16" color="#888" class="mr-1">mdi-pound</v-icon>
                <p style="color: #888" class="mr-5">{{ currentLang.savedTestView[24] }} {{ serialNumber }} (п/п) | {{ question.id }} {{ currentLang.savedTestView[25] }}</p>

                <test-type-icons :type="question.type" :questionID="question.id" :questions="questions"/>

            </div>
            <div class="d-flex flex-row align-center">
                <v-icon size="16" color="#888" class="mr-1">mdi-clock-time-eight-outline</v-icon>
                <p style="color: #888">{{ currentLang.savedTestView[26] }}: {{ question.lastModified.date }} {{ question.lastModified.time }}</p>
            </div>
        </div>

        <v-divider color="#bbb"></v-divider>

        <div class="test__question-box mt-3 mb-6">
            <!-- Вопрос, картинка, параметры темы, балла, сложности -->
            <div class="mb-6">
                <p>{{ currentLang.savedTestView[27] }}:</p>
                <div class="d-flex flex-row align-start">
                    <v-icon class="mr-2 mt-2" :color="question.questionCtx ? '#0d5fd8' : ''">mdi-help-circle-outline</v-icon>

                    <div style="width: 100%; gap:15px" class="d-flex flex-column">
                        <div class="d-flex flex-row" style="width: 100%" v-if="testParams.languagesSettings.languages.indexOf('custom')!=-1">
                            <div class="questionCtx" v-if="question.questionCtx.custom">{{ question.questionCtx.custom }}</div>
                            <div class="questionCtxEmpty" v-else>Not filled</div>
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-img
                                v-bind="attrs"
                                v-on="on"
                                src="@/assets/media/global.png"
                                width="30"
                                height="30"
                                class="mt-2 ml-2"
                                v-if="testParams.languagesSettings.languages.length>1"
                                ></v-img>
                            </template>
                                <span>Question field in <b><u>foreign</u></b> language</span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex flex-row" style="width: 100%" v-if="testParams.languagesSettings.languages.indexOf('fr')!=-1">
                            <div class="questionCtx" v-if="question.questionCtx.fr">{{ question.questionCtx.fr }}</div>
                            <div class="questionCtxEmpty" v-else>{{ currentLang.savedTestView[28] }}</div>
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-img
                                v-bind="attrs"
                                v-on="on"
                                src="@/assets/media/france.png"
                                width="30"
                                height="30"
                                class="mt-2 ml-2"
                                v-if="testParams.languagesSettings.languages.length>1"
                                ></v-img>
                            </template>
                            <span>Boîte à questions en <b><u>français</u></b></span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex flex-row" style="width: 100%" v-if="testParams.languagesSettings.languages.indexOf('de')!=-1">
                            <div class="questionCtx" v-if="question.questionCtx.de">{{ question.questionCtx.de }}</div>
                            <div class="questionCtxEmpty" v-else>{{ currentLang.savedTestView[28] }}</div>
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-img
                                v-bind="attrs"
                                v-on="on"
                                src="@/assets/media/germany.png"
                                width="30"
                                height="30"
                                class="mt-2 ml-2"
                                v-if="testParams.languagesSettings.languages.length>1"
                                ></v-img>
                            </template>
                            <span>Fragefeld auf <b><u>Deutsch</u></b></span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex flex-row" style="width: 100%" v-if="testParams.languagesSettings.languages.indexOf('ru')!=-1">
                            <div class="questionCtx" v-if="question.questionCtx.ru">{{ question.questionCtx.ru }}</div>
                            <div class="questionCtxEmpty" v-else>{{ currentLang.savedTestView[28] }}</div>
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-img
                                v-bind="attrs"
                                v-on="on"
                                src="@/assets/media/russia.png"
                                width="30"
                                height="30"
                                class="mt-2 ml-2"
                                v-if="testParams.languagesSettings.languages.length>1"
                                ></v-img>
                            </template>
                            <span>Поле вопроса на <b><u>русском</u></b> языке</span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex flex-row" style="width: 100%" v-if="testParams.languagesSettings.languages.indexOf('eng')!=-1">
                            <div class="questionCtx" v-if="question.questionCtx.eng">{{ question.questionCtx.eng }}</div>
                            <div class="questionCtxEmpty" v-else>Not filled</div>
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-img
                                v-bind="attrs"
                                v-on="on"
                                src="@/assets/media/united-states.png"
                                width="30"
                                height="30"
                                class="mt-2 ml-2"
                                v-if="testParams.languagesSettings.languages.length>1"
                                ></v-img>
                            </template>
                                <span>Question field in <b><u>english</u></b> language</span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex flex-row" style="width: 100%" v-if="testParams.languagesSettings.languages.indexOf('uz_l')!=-1">
                            <div class="questionCtx" v-if="question.questionCtx.uz_l">{{ question.questionCtx.uz_l }}</div>
                            <div class="questionCtxEmpty" v-else>To'ldirilmagan</div>
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-img
                                v-bind="attrs"
                                v-on="on"
                                src="@/assets/media/uzbekistan.png"
                                width="30"
                                height="30"
                                class="mt-2 ml-2"
                                v-if="testParams.languagesSettings.languages.length>1"
                                ></v-img>
                            </template>
                                <span><b><u>O'zbek</u></b> tilida savollar qutisi (lotincha)</span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex flex-row" style="width: 100%" v-if="testParams.languagesSettings.languages.indexOf('uz_k')!=-1">
                            <div class="questionCtx" v-if="question.questionCtx.uz_k">{{ question.questionCtx.uz_k }}</div>
                            <div class="questionCtxEmpty" v-else>Тўлдирилмаган</div>
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-img
                                v-bind="attrs"
                                v-on="on"
                                src="@/assets/media/uzbekistan.png"
                                width="30"
                                height="30"
                                class="mt-2 ml-2"
                                v-if="testParams.languagesSettings.languages.length>1"
                                ></v-img>
                            </template>
                                <span><b><u>Ўзбек</u></b> тилида саволлар қутиси (кирилча)</span>
                            </v-tooltip>
                        </div>
                    </div>

                </div>
            </div>

            <div class="d-flex flex-row justify-space-between">
                <div>
                    <div class="d-flex flex-row mb-3">
                        <v-icon class="mr-2" :color="question.theme ? '#0d5fd8' : ''">mdi-alpha-t-box-outline</v-icon>
                        <div>
                            {{ currentLang.savedTestView[29] }}:
                            <span style="color:#0d5fd8" v-if="question.theme">{{ question.theme }}</span>
                            <span style="color:#888" v-else>({{ currentLang.savedTestView[30] }})</span>
                        </div>
                    </div>

                    <div class="d-flex flex-row mb-3" v-if="testParams.considerDifficulty">
                        <v-icon class="mr-2" :color="question.difficulty ? '#0d5fd8' : ''">mdi-chart-line</v-icon>
                        <div>
                            {{ currentLang.savedTestView[31] }}:
                            <span style="color:#0d5fd8" v-if="question.difficulty && question.difficulty==1">{{ currentLang.savedTestView[32] }}</span>
                            <span style="color:#0d5fd8" v-if="question.difficulty && question.difficulty==2">{{ currentLang.savedTestView[33] }}</span>
                            <span style="color:#0d5fd8" v-if="question.difficulty && question.difficulty==3">{{ currentLang.savedTestView[34] }}</span>
                            <span style="color:#888" v-if="!question.difficulty">({{ currentLang.savedTestView[30] }})</span>
                        </div>
                    </div>

                    <div class="d-flex flex-row mb-3" v-if="testParams.ballSystem">
                        <v-icon class="mr-2" :color="question.ball ? '#0d5fd8' : ''">mdi-circle-double</v-icon>
                        <div>
                            {{ currentLang.savedTestView[35] }}:
                            <span style="color:#0d5fd8">{{ question.ball }}</span>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-row" v-if="question.type=='question-with-images'"> 
                        <v-icon class="mr-2" :color="question.imagePreview ? '#0d5fd8' : ''">mdi-camera</v-icon>
                        <div>
                            {{ currentLang.savedTestView[36] }}:
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
            <div
            v-for="(answer, i) in question.answers"
            :key="i"
            class="d-flex flex-column align-center"
            style="width:100%"
            >
                <div style="width:100%" class="d-flex flex-row">
                    <v-divider color="#888" vertical class="mr-2"></v-divider>
                    <div class="d-flex flex-row align-start" style="width:100%">
                        <v-icon class="mt-2 mr-2" :color="answer.isCurrect ? '#51c551' : ''">mdi-lightbulb-auto</v-icon>

                        <div class="d-flex flex-column" style="width: 100%; gap:15px">
                            <div style="position: relative;" v-if="testParams.languagesSettings.languages.indexOf('custom')!=-1">
                                <div class="answerCtx" v-if="answer.answerCtx.custom && !answer.isCurrect">{{ answer.answerCtx.custom }}</div>
                                <div class="answerCtx" v-if="answer.answerCtx.custom && answer.isCurrect" style="border: 2px solid #51c551">{{ answer.answerCtx.custom }}</div>
                                <div class="answerCtxEmpty" v-if="!answer.answerCtx.custom">Not filled</div>
                                <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-img
                                    v-bind="attrs"
                                    v-on="on"
                                    v-if="testParams.languagesSettings.languages.length>1"
                                    src="@/assets/media/global.png"
                                    width="22"
                                    height="22"
                                    class="mt-2"
                                    style="position:absolute; top:-18px;right:-10px"
                                    ></v-img>
                                </template>
                                    <span>Answer field in <b><u>foreign</u></b> language</span>
                                </v-tooltip>
                            </div>

                            <div style="position: relative;" v-if="testParams.languagesSettings.languages.indexOf('fr')!=-1">
                                <div class="answerCtx" v-if="answer.answerCtx.fr && !answer.isCurrect">{{ answer.answerCtx.fr }}</div>
                                <div class="answerCtx" v-if="answer.answerCtx.fr && answer.isCurrect" style="border: 2px solid #51c551">{{ answer.answerCtx.fr }}</div>
                                <div class="answerCtxEmpty" v-if="!answer.answerCtx.fr">{{ currentLang.savedTestView[37] }}</div>
                                <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-img
                                    v-bind="attrs"
                                    v-on="on"
                                    v-if="testParams.languagesSettings.languages.length>1"
                                    src="@/assets/media/france.png"
                                    width="22"
                                    height="22"
                                    class="mt-2"
                                    style="position:absolute; top:-18px;right:-10px"
                                    ></v-img>
                                </template>
                                    <span>Champ de réponse en <b><u>français</u></b></span>
                                </v-tooltip>
                            </div>

                            <div style="position: relative;" v-if="testParams.languagesSettings.languages.indexOf('de')!=-1">
                                <div class="answerCtx" v-if="answer.answerCtx.de && !answer.isCurrect">{{ answer.answerCtx.de }}</div>
                                <div class="answerCtx" v-if="answer.answerCtx.de && answer.isCurrect" style="border: 2px solid #51c551">{{ answer.answerCtx.de }}</div>
                                <div class="answerCtxEmpty" v-if="!answer.answerCtx.de">{{ currentLang.savedTestView[37] }}</div>
                                <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-img
                                    v-bind="attrs"
                                    v-on="on"
                                    v-if="testParams.languagesSettings.languages.length>1"
                                    src="@/assets/media/germany.png"
                                    width="22"
                                    height="22"
                                    class="mt-2"
                                    style="position:absolute; top:-18px;right:-10px"
                                    ></v-img>
                                </template>
                                    <span>Antwortfeld auf <b><u>Deutsch</u></b></span>
                                </v-tooltip>
                            </div>

                            <div style="position: relative;" v-if="testParams.languagesSettings.languages.indexOf('ru')!=-1">
                                <div class="answerCtx" v-if="answer.answerCtx.ru && !answer.isCurrect">{{ answer.answerCtx.ru }}</div>
                                <div class="answerCtx" v-if="answer.answerCtx.ru && answer.isCurrect" style="border: 2px solid #51c551">{{ answer.answerCtx.ru }}</div>
                                <div class="answerCtxEmpty" v-if="!answer.answerCtx.ru">{{ currentLang.savedTestView[37] }}</div>
                                <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-img
                                    v-bind="attrs"
                                    v-on="on"
                                    v-if="testParams.languagesSettings.languages.length>1"
                                    src="@/assets/media/russia.png"
                                    width="22"
                                    height="22"
                                    class="mt-2"
                                    style="position:absolute; top:-18px;right:-10px"
                                    ></v-img>
                                </template>
                                    <span>Поле ответа на <b><u>русском</u></b> языке</span>
                                </v-tooltip>
                            </div>

                            <div style="position: relative;" v-if="testParams.languagesSettings.languages.indexOf('eng')!=-1">
                                <div class="answerCtx" v-if="answer.answerCtx.eng && !answer.isCurrect">{{ answer.answerCtx.eng }}</div>
                                <div class="answerCtx" v-if="answer.answerCtx.eng && answer.isCurrect" style="border: 2px solid #51c551">{{ answer.answerCtx.eng }}</div>
                                <div class="answerCtxEmpty" v-if="!answer.answerCtx.eng">Not filled</div>
                                <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-img
                                    v-bind="attrs"
                                    v-on="on"
                                    v-if="testParams.languagesSettings.languages.length>1"
                                    src="@/assets/media/united-states.png"
                                    width="22"
                                    height="22"
                                    class="mt-2"
                                    style="position:absolute; top:-18px;right:-10px"
                                    ></v-img>
                                </template>
                                    <span>Answer field in <b><u>english</u></b> language</span>
                                </v-tooltip>
                            </div>

                            <div style="position: relative;" v-if="testParams.languagesSettings.languages.indexOf('uz_l')!=-1">
                                <div class="answerCtx" v-if="answer.answerCtx.uz_l && !answer.isCurrect">{{ answer.answerCtx.uz_l }}</div>
                                <div class="answerCtx" v-if="answer.answerCtx.uz_l && answer.isCurrect" style="border: 2px solid #51c551">{{ answer.answerCtx.uz_l }}</div>
                                <div class="answerCtxEmpty" v-if="!answer.answerCtx.uz_l">To'ldirilmagan</div>
                                <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-img
                                    v-bind="attrs"
                                    v-on="on"
                                    v-if="testParams.languagesSettings.languages.length>1"
                                    src="@/assets/media/uzbekistan.png"
                                    width="22"
                                    height="22"
                                    class="mt-2"
                                    style="position:absolute; top:-18px;right:-10px"
                                    ></v-img>
                                </template>
                                    <span><b><u>O'zbek</u></b> tilida javoblar qutisi (lotincha)</span>
                                </v-tooltip>
                            </div>

                            <div style="position: relative;" v-if="testParams.languagesSettings.languages.indexOf('uz_k')!=-1">
                                <div class="answerCtx" v-if="answer.answerCtx.uz_k && !answer.isCurrect">{{ answer.answerCtx.uz_k }}</div>
                                <div class="answerCtx" v-if="answer.answerCtx.uz_k && answer.isCurrect" style="border: 2px solid #51c551">{{ answer.answerCtx.uz_k }}</div>
                                <div class="answerCtxEmpty" v-if="!answer.answerCtx.uz_k">Тўлдирилмаган</div>
                                <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-img
                                    v-bind="attrs"
                                    v-on="on"
                                    v-if="testParams.languagesSettings.languages.length>1"
                                    src="@/assets/media/uzbekistan.png"
                                    width="22"
                                    height="22"
                                    class="mt-2"
                                    style="position:absolute; top:-18px;right:-10px"
                                    ></v-img>
                                </template>
                                    <span><b><u>Ўзбек</u></b> тилида жавоблар қутиси (кирилча)</span>
                                </v-tooltip>
                            </div>
                        </div>
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
        
        <div class="mt-3 d-flex flex-column justify-center" v-else style="position: relative;">
            <!-- Картинка с областью выделения -->
            <div class="d-flex flex-row mb-2">
                <v-icon class="mr-2" :color="question.imagePreview ? '#0d5fd8' : ''">mdi-focus-field</v-icon>
                <div>
                    {{ currentLang.savedTestView[38] }}:
                    <span style="color:#0d5fd8">{{ question.answer[0].fault }}</span>
                    <span v-if="!question.imagePreview" style="color:#888"> ({{ currentLang.savedTestView[39] }})</span>
                    <span v-if="question.imagePreview && !question.answer[1].x" style="color:#888"> ({{ currentLang.savedTestView[40] }})</span>
                </div>
            </div>
            <div v-if="question.imagePreview">
                <v-img
                width="955"
                height="540"
                contain
                v-bind:src="question.imagePreview"
                :class="`img_${question.id}`"
                style="border: 3px solid #0d5fd8;margin:0 auto; position: relative;"
                />
            </div>

            <div class="fieldEmpty" v-else>
                <v-img
                width="500"
                height="300"
                contain
                src="@/assets/media/spider-web.png"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TestTypeIcons from '@/components/tests/TestTypeIcons.vue'
import { mapGetters } from 'vuex'

export default {
    props:{
        question: Object,
        serialNumber: Number,
        testParams: Object,
        questions: Array,
    },
    computed: mapGetters(['currentLang']),
    mounted() {
        if(this.question.type=='question-with-field' && this.question.imagePreview){
            let target = document.querySelector(`.img_${this.question.id}`)

            if(this.question.answer.length==2){
                if(this.question.answer[1] && this.question.answer[1].x){
                    let field = document.createElement('div')
                    field.classList.add(`target-${this.question.id}`)
                    field.style.padding = this.question.answer[0].fault+'px'
                    field.style.backgroundColor = 'red'
                    field.style.opacity = '0.5'
                    field.style.position = 'absolute'
                    field.style.zIndex = 10
                    field.style.left = this.question.answer[1].x-this.question.answer[0].fault+'px'
                    field.style.top =  this.question.answer[1].y-this.question.answer[0].fault+'px'

                    target.appendChild(field)
                }
            }else{
                this.question.answer.filter(el=>{
                    if(el.hasOwnProperty('x') && el.x){
                        let field = document.createElement('div')
                        field.classList.add(`target-${this.question.id}`)
                        field.style.padding = this.question.answer[0].fault+'px'
                        field.style.backgroundColor = 'red'
                        field.style.opacity = '0.5'
                        field.style.position = 'absolute'
                        field.style.zIndex = 10
                        field.style.left = el.x-this.question.answer[0].fault+'px'
                        field.style.top =  el.y-this.question.answer[0].fault+'px'

                        target.appendChild(field)
                    }
                })
            }
        }
    },
    methods:{
        getCurrentQuestion(question){
            if(this.testParams.languagesSettings.languages[0] == 'ru'){
                return question.ru
            } else if(this.testParams.languagesSettings.languages[0] == 'eng'){
                return question.eng
            } else if(this.testParams.languagesSettings.languages[0] == 'uz_l'){
                return question.uz_l
            } else if(this.testParams.languagesSettings.languages[0] == 'uz_k'){
                return question.uz_k
            } else if(this.testParams.languagesSettings.languages[0] == 'custom'){
                return question.custom
            }
        },
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
    width: 200px;
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

.fieldEmpty{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 955px;
    height: 540px;
    border: 1px solid #888;
    color: #888;
    margin: 0 auto;
}
</style>