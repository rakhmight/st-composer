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
        <span>{{ currentLang.workspaceView[13] }}</span>
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
        <span>{{ currentLang.workspaceView[14] }}</span>
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
        <span>{{ currentLang.workspaceView[15] }}</span>
        </v-tooltip>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props:{
        type: String,
        questionID: Number,
        questions: Array,
    },
    computed: mapGetters(['currentLang']),
    data() {
        return {
            testType: this.type,
            allQuestions: this.questions,
            thisQuestion: this.questionID,
            currentMap: 0,
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
        }
    },
    mounted() {
        this.watchMap()
    },
}
</script>