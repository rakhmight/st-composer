<template>
    <div class="wrapper">
        <div class="container">
            <div class="workspace">
                <div class="workspace__sidebar">
                    <div>
                        <div class="d-flex flex-row align-center justify-space-between" style="background-color: #0d5fd8;padding:7px 5px;border-radius: 5px 5px 0 0;">
                            <div class="d-flex flex-row align-center">
                                <v-icon size="20" color="#fff" class="mr-1">
                                    mdi-content-paste
                                </v-icon>
                                <h4 style="color:#fff">Содержание</h4>
                            </div>
                        </div>
                        <div class="workspace__map">
                            <div class="map-elem"
                            > 
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
                                                Вопрос
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="cursor: pointer;"
                                        v-for="(question,i) in questions"
                                        :key="question.id"
                                        :to-question="question.id"
                                        class="map-orient"
                                        >
                                            <td style="width:20px">
                                                <test-type-icons :type="question.type" :questionID="question.id" :questions="questions"/>
                                            </td>
                                            <td style="color:#000">{{ i+1 }}</td>
                                            <td>
                                                <p class="body-2 map-small" style="color:#484848">
                                                    <span v-if="question.questionCtx">{{ question.questionCtx }}</span>
                                                    <span style="color:#888;" v-else>Не заполнено</span>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                            </div>
                        </div>
                    </div>

                    <v-btn
                    small
                    width="270"
                    color="#0d5fd8"
                    dark
                    class="mt-5"
                    @click="goToBack"
                    >
                        <v-icon color="#fff" class="mr-1">mdi-arrow-left-thin</v-icon>
                        Вернуться назад
                    </v-btn>
                </div>

                <div class="workspace__sidebar-box"></div>
                
                <div class="workspace__content">

                    <!-- ШАБЛОН ВОПРОСА -->
                    <saved-question
                    v-for="(question,i) in questions"
                    :question="question"
                    :serialNumber="i+1"
                    :key="i"
                    :questions="questions"
                    :testParams="testParams"
                    />
                    <!--  -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TestTypeIcons from '@/components/tests/TestTypeIcons.vue'
import SavedQuestion from '@/components/saved/SavedQuestion.vue'

export default {
    data() {
        return {
            questions: [],
            params: undefined,
            testParams: undefined
        }
    },
    computed: mapGetters(['getTestID']),
    methods:{
        goToBack(){
            this.$router.push('/dashboard')
        },

        mapOriented(){
            const questions = document.querySelectorAll('.map-orient')

            for(let i = 0; i!=questions.length; i++){
                let questionID = questions[i].getAttribute('to-question')
                let desiredQuestion = document.querySelector(`.question_${questionID}`)

                questions[i].addEventListener('click', ()=>{
                    if(desiredQuestion){
                        desiredQuestion.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        })
                    }
                })
            }
        },
    },
    mounted() {
        this.params = JSON.parse(this.getTestID)

        let savings = JSON.parse(localStorage.getItem(`saving-${this.params.testID}`))
        let saving

        savings.filter(el=>{
            if(el.id==this.params.savingID){
                saving = el
            }
        })

        this.questions = saving.questions
        this.testParams = saving.params
        console.log(saving)

        // Параметры теста

        // MAP
        setTimeout(()=>{
            this.mapOriented()
        }, 500)
        
    },
    components:{
        TestTypeIcons,
        SavedQuestion
    }
}
</script>

<style scoped>
.workspace{
    width: 100%;
    height: 100%;
    padding-top: 30px;
    display: grid;
    grid-template-columns: 270px auto;
    position: relative;
}

.workspace__sidebar{
    width: 270px;
    position:fixed;
    z-index: 9;
}
.workspace__map{
    min-width: 100%;
    min-height: 30vh;
    max-height: 60vh;
    background-color: aliceblue;
    border-radius: 0 0 5px 5px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-bottom: #0d5fd8 5px solid;
}

.workspace__content{
    margin-bottom: 90px;
    padding-left: 40px;
    text-align: justify;
    display: grid;
    grid-template-rows: auto;
    gap: 40px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th{
    padding: 0 5px;
}

.v-data-table__wrapper{
    overflow: visible;
}
.map-small{
    width: 195px;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    box-orient: vertical;
    overflow: hidden;
}

.question__template{
    width: 100%;
    height: 40vw;
    background-color: #aaaaaa80;
    color: #888;
    border-radius: 5px;
    scroll-margin-top:90px;
}
</style>