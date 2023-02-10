<template>
    <div class="wrapper">
        <div class="container">
            <div class="workspace">
                <div class="workspace__map">
                    <div
                    v-for="question in questions"
                    :to-question="question.id"
                    style="cursor:pointer"
                    class="tests-list-elem"
                    >
                        • {{ question.id }}
                    </div>
                </div>

                <div class="workspace__map-box"></div>
                
                <div class="workspace__content">

                    <!--  -->
                    <question
                    v-for="(question,i) in questions"
                    :key="question.id"
                    :id="question.id"
                    :type="question.type"
                    :number="i+1"
                    :deleteFunc="deleteQuestion"
                    />

                    <div v-if="questions.length==0" class="d-flex flex-column justify-center align-center" style="height:400px;background-color: #aaaaaa80;border-radius: 5px;">
                        <v-img
                        max-height="200"
                        max-width="200"
                        src="@/assets/media/spider-web.png"
                        contain
                        transition="scale-transition"
                        ></v-img>
                        <h2 style="color:#888" class="mt-5">ВОПРОСОВ ПОКА НЕТ</h2>
                    </div>

                </div>

                <div class="workspace__tools-box">
                    
                        <!-- TOOLS -->
                        <tools :allTasks="tasks" :createFunc="createQuestion"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Question from '@/components/tests/QuestionTemplates.vue'
import Tools from '@/components/tests/Tools.vue'

export default {
    data() {
        return {
            tasks:[
                {name:'вопрос с картинками', isDisabled: false, type: 'question-with-images'},
                {name:'выбор области на картинке', isDisabled: false, type: 'question-with-field'},
                {name:'скоро', isDisabled: true,}
            ],
            questions:[
                // basic-question, question-with-images, question-with-field
                // {id:1, type: 'basic-question'}, 
                // {id:2, type: 'question-with-images'},
                // {id:3, type: 'basic-question'},
            ],
            questionsCounter: 0,
            questionsDeleted: true,
        }
    },
    methods:{
        createQuestion(type){
            this.questions.push({
                id: this.questionsCounter+1,
                type
            })
            this.questionsCounter++
        },

        deleteQuestion(id){
            this.questions.filter(el => {
                if(el.id==id){
                    let index = this.questions.indexOf(el)
                    this.questions.splice(index, 1)
                }
            })
        },

        mapOriented(){
            const questions = document.querySelectorAll('.tests-list-elem')

            for(let i = 0; i!=questions.length; i++){
                let questionID = questions[i].getAttribute('to-question')
                let desiredQuestion = document.querySelector(`.question_${questionID}`)

                questions[i].addEventListener('click', ()=>{
                    console.log(1);
                    desiredQuestion.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' 
                    })
                })
            }

            // 1. Последний элемент он не видит
            // 2. Сделать механический плавный спуск по пиксельно
            // 3. отработать layout
        }
    },
    mounted(){
        this.mapOriented()
    },
    watch:{
        questions(){
            this.mapOriented()
        }
    },
    components:{
        Question,
        Tools
    }
}
</script>

<style>
.workspace{
    width: 100%;
    height: 100%;
    padding-top: 30px;
    display: grid;
    grid-template-columns: 270px auto;
    position: relative;
}


.workspace__map{
    width: 270px;
    position:fixed;
    height: 70vh;
    background-color: aliceblue;
    border-radius: 5px;
    padding: 15px;
    overflow-y: scroll;
}

.workspace__content{
    margin-bottom: 90px;
    padding-left: 40px;
    text-align: justify;
    display: grid;
    grid-template-rows: auto;
    gap: 40px;
}

.workspace__tools-box{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height: 60px;
    background-color: #2b2b2b;
    padding:10px;
    display: flex;
    align-items: center;
    z-index:9;
}

.workspace__tools{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>