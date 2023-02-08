<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            small
            dark
            color="#0167FF"
            v-bind="attrs"
            v-on="on"
            >
              + Создать тест
            </v-btn>
        </template>

        <v-card style="max-height: 600px;overflow-y: scroll;">
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            Создать тест
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    <div>
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-pound"
                        v-model="subjectID"
                        placeholder="ID предмета"
                        >
                        </v-text-field>
                    </div>
                    <div>
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-alpha-t-box-outline"
                        v-model="subjectThemes"
                        placeholder="Укажите темы через запятую"
                        >
                        </v-text-field>
                    </div>
                    <div class="d-flex flex-row justify-space-between">
                        <v-checkbox
                        v-model="haveLevel"
                        label="Учитывать уровень сложности?"
                        ></v-checkbox>
                        
                        <v-checkbox
                        v-model="haveBall"
                        label="Учитывать балльную систему?"
                        ></v-checkbox>
                    </div>

                    <div v-if="haveBall" class="pb-2 pt-2 ball-box">
                        <ball-settings :mode="'create'"></ball-settings>
                    </div>
                </div>

                <v-divider width="100%"></v-divider>

                <div class="content__template-box">
                    
                    <v-checkbox
                    v-model="useTemplate"
                    label="Использовать шаблон?"
                    ></v-checkbox>

                    <div v-if="useTemplate" class="pb-8">
                        <h4 style="text-align: center">Параметры шаблона</h4>
                        <div class="content__template-inputs d-flex flex-column justify-space-around mt-3">
                            <div class="d-flex flex-column" style="margin-bottom:40px">
                                <div>
                                    <v-icon class="mr-1">mdi-help</v-icon>
                                    <label for="questions-count" class="body-2">Количество простых вопросов</label>
                                </div>
                                <vue-slider
                                    ref="slider"
                                    v-model="questionsCount"
                                    v-bind="questionsOptions"
                                ></vue-slider>
                            </div>
                            <div class="d-flex flex-column">
                                <div>
                                    <v-icon class="mr-1">mdi-lightbulb-auto</v-icon>
                                    <label for="questions-count" class="body-2">Количество ответов на вопрос</label>
                                </div>
                                <vue-slider
                                    ref="slider"
                                    v-model="answersCount"
                                    v-bind="answersOptions"
                                ></vue-slider>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <v-divider></v-divider>
            <v-card-actions class="d-flex align-items-center flex-column">
                
            <div class="test-errors-box">
                <v-alert
                color="red"
                dense
                dismissible
                elevation="3"
                type="error"
                class="subtitle-2"
                v-for="error in errors"
                >{{ error }}</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0167FF"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="add-btn"
                @click="LOG"
            >
                Создать
            </v-btn>
            </v-card-actions>

            <v-progress-linear
            indeterminate
            color="#0167FF"
            background-color="#85aeea"
            height="5"
            v-if="showProgress"
            ></v-progress-linear>
        </v-card>
    </v-dialog>
</template>

<script> 
// import { ValidationProvider} from 'vee-validate'
import { mapGetters } from 'vuex'
import VueSlider from 'vue-slider-component'
import BallSettings from '@/components/dialogs/BallSettings.vue'
import 'vue-slider-component/theme/default.css'

export default {
    data() {
        return {
            dialog: false,
            errors:[],
            blockBtn: false,
            showProgress: false,
            subjectID: undefined,
            subjectThemes:undefined,
            haveLevel: false,
            haveBall:false,
            useTemplate: false,

            questionsCount: 10,
            answersCount: 3,
            questionsOptions: {
                dotSize: 14,
                width: 'auto',
                height: 4,
                contained: false,
                direction: 'ltr',
                dataLabel: 'label',
                dataValue: 'value',
                min: 10,
                max: 1000,
                interval: 10,
                disabled: false,
                clickable: true,
                duration: 0.2,
                adsorb: false,
                lazy: false,
                tooltip: 'active',
                tooltipPlacement: 'top',
                useKeyboard: false,
                dragOnClick: false,
                enableCross: true,
                fixed: false,
                order: true,
                marks: [10,100,200,300,400,500,600,700,800,900,1000]
            },
            answersOptions: {
                dotSize: 14,
                width: 'auto',
                height: 4,
                contained: false,
                direction: 'ltr',
                dataLabel: 'label',
                dataValue: 'value',
                min: 3,
                max: 6,
                interval: 1,
                disabled: false,
                clickable: true,
                duration: 0.2,
                adsorb: false,
                lazy: false,
                tooltip: 'active',
                tooltipPlacement: 'top',
                useKeyboard: false,
                dragOnClick: false,
                enableCross: true,
                fixed: false,
                order: true,
                marks: [3,4,5,6]
            }
        }
    },
    computed: mapGetters(['getMinBall', 'getMaxBall', 'getBallInterval']), // скоро понадобится
    methods: {
        LOG(){
            console.log(this.$store.getters.getMinBall)

            this.$store.commit('updateMin', '0.01')
        }
    },
    components: {
        // ValidationProvider,
        VueSlider,
        BallSettings
    }
}
</script>

<style scoped>
.add-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
}

.dialog-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.content__subject-box{
    padding: 30px 30px 0 30px;
    width: 100%;
    display: flex;
}
.content__template-box{
    padding: 0 30px;
    width: 100%;
}

.ball-box{
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
    justify-content: space-between;
    gap: 40px;
}

.v-dialog > .v-card > .v-card__action{
    padding: 15px;
}
.v-card__actions{
    padding: 15px;
}

.v-list-item{
    padding: 0;
}
.v-application--is-ltr .v-list-group--sub-group .v-list-group__header {
    padding-left: 0;
}
</style>