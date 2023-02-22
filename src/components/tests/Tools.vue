<template>
    <div class="workspace__tools">
        <div class="autosave">
            <v-tooltip right color="#00000073">
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on" class="d-flex flex-row align-center">
                    <v-progress-circular color="primary" indeterminate size="15" width="2"></v-progress-circular>
                    <p style="color: #888" class="ml-2">Автосохранение</p>
                </div>
            </template>
            <span>Автоматическиое сохранение тестов каждые 10 секунд</span>
            </v-tooltip>
        </div>

        <div>
            <v-btn
                small
                dark
                color="#0d5fd8"
                class="mr-8"
                @click="createQuestion('basic-question')"
                >
                    <v-icon size="20">mdi-plus</v-icon>
                    Добавить вопрос
            </v-btn>

            <v-menu
            top
            offset-y
            max-width="250"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    dark
                    color="#0d5fd8"
                    v-bind="attrs"
                    v-on="on"
                    class="mr-8"
                >
                    <v-icon
                    size="22"
                    >mdi-gesture-double-tap</v-icon>
                    Интерактивное задание
                    <v-icon
                    size="22"
                    >mdi-menu-down</v-icon>
                </v-btn>
                </template>

                <v-list
                >
                <v-btn
                class="header__btn" 
                small
                color="#eaeaea" 
                v-for="(task, i) in tasks"
                @click="createQuestion(task.type)"
                :key="i"
                :disabled="task.isDisabled"
                >
                    <span v-if="!task.isDisabled" style="color:#0167FF">{{task.name}}</span>
                    <span v-else style="color:#888">{{task.name}}</span>
                </v-btn>
                </v-list>
            </v-menu>

            <!-- <v-btn
                small
                dark
                color="#656565"
                class="mr-8"
                >
                    <v-icon size="20" class="mr-1">mdi-content-save-outline</v-icon>
                    Сохранить как экземпляр
            </v-btn> -->
            <saving-questions :questions="allQuestions" :testID="currentTestID" :saveFunc="saveProcess"/>
        </div> 

        <!-- INSTRUCTION -->
        <to-instruction :saveFunction="saveProcess"></to-instruction>

    </div>
</template>

<script>
import ToInstruction from '@/components/ToInstruction.vue'
import SavingQuestions from '@/components/dialogs/SavingQuestions.vue'


export default {
    props:{
        allTasks: Array,
        createFunc: Function,
        saveFunction: Function,
        
        allQuestions: Array,
        currentTestID: Number
    },
    data() {
        return {
            tasks: this.allTasks
        }
    },
    methods:{
        createQuestion(type){
            this.createFunc(type)
        },
        saveProcess(){
            this.saveFunction()
        }
    },
    components:{
        ToInstruction,
        SavingQuestions
    }
}
</script>

<style>
    .workspace__tools{
        position: relative;
    }

    .autosave{
        position: absolute;
        top: -50px;
        left: 0;
    }
</style>