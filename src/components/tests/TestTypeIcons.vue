<template>
    <div>
        <v-tooltip bottom v-if="testType=='basic-question'">
        <template v-slot:activator="{ on, attrs }">
            <v-icon
            v-bind="attrs"
            v-on="on"
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
            >
            mdi-selection-ellipse-arrow-inside
            </v-icon>
        </template>
        <span>Вопрос с выбором области на картинке</span>
        </v-tooltip>
    </div>
</template>

<script>
export default {
    props:{
        type: String,
        map: Number
    },
    data() {
        return {
            testType: this.type,
            currentMap: this.map
        }
    },
    watch:{
        currentMap(){
            console.log(this.currentMap)
        }
    }
}
</script>