<template>
    <div>
        <v-tooltip bottom v-if="testType=='basic-question'">
        <template v-slot:activator="{ on, attrs }">
            <v-icon
            v-bind="attrs"
            v-on="on"
            :color="currentMap==thisQuestion ? '#0167FF' : '#888'"
            >
            mdi-text
            </v-icon>
        </template>
        <span>Простой текстовый вопрос</span>
        </v-tooltip>

        <v-tooltip bottom v-if="testType=='question-with-images'">
        <template v-slot:activator="{ on, attrs }">
            <v-icon
            v-bind="attrs"
            v-on="on"
            :color="currentMap==thisQuestion ? '#0167FF' : '#888'"
            >
            mdi-image-outline
            </v-icon>
        </template>
        <span>Вопрос с картинками</span>
        </v-tooltip>

        <v-tooltip bottom v-if="testType=='question-with-field'">
        <template v-slot:activator="{ on, attrs }">
            <v-icon
            v-bind="attrs"
            v-on="on"
            :color="currentMap==thisQuestion ? '#0167FF' : '#888'"
            >
            mdi-selection-ellipse-arrow-inside
            </v-icon>
        </template>
        <span>Вопрос с выбором области на картинке</span>
        </v-tooltip>
    </div>
</template>

<script>
import { doc } from 'prettier'

export default {
    props:{
        type: String,
        questionID: Number,
        questions: Array,
        visible: Array
    },
    data() {
        return {
            testType: this.type,
            allQuestions: this.questions,
            thisQuestion: this.questionID,
            currentMap: 0,
            visibleQuestions: this.visible
        }
    },
    methods: {
        watchMap(){
            const boxes = document.querySelectorAll('.test')
                const displayed = {}

                let scrollTracking = function (entries) {

                    for (const entry of entries) {
                        displayed[entry.target.id] = entry.intersectionRatio >= 0.5
                    }

                    // get last true and return his id
                    for(let key in displayed){
                        if(displayed[key]){
                            this.currentMap = +key
                        }
                    }
                }

                const observer = new IntersectionObserver(scrollTracking.bind(this), {
                    threshold: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0]
                })
            
                boxes.forEach(element => observer.observe(element))
        },
    },
    watch:{
        allQuestions(){
            setTimeout(() => {
                // current map
                this.watchMap()
            }, 300)
        },

        visibleQuestions(){
            setTimeout(() => {
                // current map
                this.watchMap()
            }, 300)
        }

        // currentMap(){
        // },

        // visibleQuestions(){
        //     if(this.visibleQuestions){
        //         this.changeVisibleFunc(prev, current, next)
        //     }
        // }
    },
    mounted() {
        this.watchMap()

        // if( this.visibleQuestionsSwitch!= this.switch){
        //     console.log(1);
        //     // this.watchMap()
        //     // this.visibleQuestionsSwitch = this.switch
        // }
        // document.addEventListener('scroll',(event)=>{

        //     if(this.visibleMap){
        //         this.visibleQuestions.prev = this.currentMap-1
        //         this.visibleQuestions.current = this.currentMap
        //         this.visibleQuestions.next = this.currentMap+1

        //         console.log(this.visibleQuestions);

        //         // Вынести в workspace и сделать проверку отдельную на скролл проверяя currentMap
        //     }
        // })
    },
}
</script>