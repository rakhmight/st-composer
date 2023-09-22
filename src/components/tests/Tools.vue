<template>
    <div class="workspace__tools">
        <div class="autosave" v-if="loaderState">
            <v-tooltip right color="#00000073">
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on" class="d-flex flex-row align-center">
                    
                    <v-checkbox v-model="autosavingEnable"></v-checkbox>
                    <p style="color: #888">{{ currentLang.workspaceView[41] }}</p>
                </div>
            </template>
            <span>{{ currentLang.workspaceView[42] }}</span>
            </v-tooltip>
        </div>

        <div>
            <v-btn
                small
                dark
                color="#0d5fd8"
                class="mr-8"
                @click="createQuestion('basic-question')"
                :disabled="!loaderState || blockAddQBtn || saveProcessFinally.value"
                >
                    <v-icon size="20">mdi-plus</v-icon>
                    {{ currentLang.workspaceView[43] }}
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
                    :disabled="!loaderState || saveProcessFinally.value"
                >
                    <v-icon
                    size="22"
                    >mdi-gesture-double-tap</v-icon>
                    {{ currentLang.workspaceView[44] }}
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
                :disabled="task.isDisabled || blockAddQBtn || saveProcessFinally.value"
                >
                    <span v-if="task.isDisabled || !blockAddQBtn || !saveProcessFinally.value" style="color:#0167FF">{{task.name}}</span>
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
            <saving-questions :questions="allQuestions" :testID="currentTestID" :saveFunc="saveFunction" :asyncComplate="loaderState" :saveProcessFinally="saveProcessFinally"/>
            
            <v-tooltip top color="#0c2242">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                v-bind="attrs"
                v-on="on"
                small
                color="#696969"
                @click="saveFunction({forcedSave:true, manual: true})"
                :disabled="!loaderState || saveProcessFinally.value"
                >
                <v-icon
                color="#fff"
                size="19"
                >mdi-content-save-outline</v-icon>
                </v-btn>
            </template>
            <span>{{ currentLang.additional[27] }}</span>
            </v-tooltip>
        </div> 

        <!-- INSTRUCTION -->
        <div class="d-flex flex-row">
            <v-menu
            top
            offset-y
            max-width="250"
            v-if="showParse"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    dark
                    color="#444"
                    v-bind="attrs"
                    v-on="on"
                    class="mr-8"
                >
                    <v-img
                    src="@/assets/media/uzbekistan.png"
                    width="20"
                    height="20"
                    ></v-img>
                    <span class="ml-1" v-if="parseMode=='lotin-kiril'">Lotin→Кирил</span>
                    <span class="ml-1" v-else>Кирил→Lotin</span>
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
                color="#444"
                @click="changeParseMode('lotin-kiril')"
                >
                    <span style="color:#fff">Lotin→Кирил</span>
                </v-btn>
                <v-btn
                class="header__btn" 
                small
                color="#444"
                @click="changeParseMode('kiril-lotin')"
                >
                    <span style="color:#fff">Кирил→Lotin</span>
                </v-btn>
                </v-list>
            </v-menu>

            <!-- <to-instruction :saveFunc="saveFunction" :asyncComplate="loaderState" :saveProcessFinally="saveProcessFinally"></to-instruction> -->
        </div>

    </div>
</template>

<script>
import ToInstruction from '@/components/ToInstruction.vue'
import SavingQuestions from '@/components/dialogs/SavingQuestions.vue'
import { mapGetters } from 'vuex'

export default {
    props:{
        loaderState: Boolean,
        allTasks: Array,
        createFunc: Function,
        saveFunction: Function,
        
        allQuestions: Array,
        currentTestID: Number,
        blockAddQBtn: Boolean,

        parseMode: String,
        changeParseMode: Function,
        showParse: Boolean,
        saveProcessFinally: Object,
        switchAutosaving: Function
    },
    data() {
        return {
            tasks: this.allTasks,
            autosavingEnable: true
        }
    },
    computed: mapGetters(['currentLang']),
    methods:{
        createQuestion(type){
            this.createFunc(type)
        }
    },
    components:{
        ToInstruction,
        SavingQuestions
    },
    watch:{
        autosavingEnable(){
            if(this.autosavingEnable){
                this.switchAutosaving('on')
            } else {
                this.switchAutosaving('off')
            }
        }
    }
}
</script>

<style>
    .workspace__tools{
        position: relative;
    }

    .autosave{
        position: absolute;
        top: -70px;
        left: 0;
    }
</style>