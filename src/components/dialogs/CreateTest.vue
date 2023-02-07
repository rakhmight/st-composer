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
            class="text-h5 lighten-2"
            >
            Создать тест
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
                        <div>
                            <v-text-field
                            dense
                            outlined
                            v-model="minBall"
                            :counter="4"
                            :rules="[rules.emptyValue, rules.valueLength, rules.invalidValue, rules.valueIsNumber, rules.valueNotZero]"
                            prepend-icon="mdi-minus-thick"
                            label="Укажите минимальный балл"
                            ></v-text-field>
                            <v-text-field
                            dense
                            outlined
                            v-model="maxBall"
                            :counter="4"
                            :rules="[rules.emptyValue, rules.valueLength, rules.invalidValue, rules.valueIsNumber, rules.valueNotZero]"
                            prepend-icon="mdi-plus-thick"
                            label="Укажите максимальный балл"
                            ></v-text-field>
                        </div>
                        <v-text-field
                        dense
                        outlined
                        v-model="ballInterval"
                        :counter="4"
                            :rules="[rules.emptyValue, rules.valueLength, rules.invalidValue, rules.valueIsNumber, rules.valueNotZero]"
                        label="интервал между баллами"
                        ></v-text-field>
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
import VueSlider from 'vue-slider-component'
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
            
            minBall: '0.01',
            maxBall: '1',
            ballInterval: '0.01',

            rules: {
                valueIsNumber: v => {
                    const pattern = /^[0-9]*\.?[0-9]*$/
                    return pattern.test(v) || 'Введённое значение должно быть числом'
                },
                valueNotZero: v => {
                    return v!=0 || 'Введённое значение должно быть больше 0'
                },

                valueLength: v => {
                    return v.length <= 4 || 'Значение не может быть больше 4-ёх значного числа (включая дробь)'
                },
                invalidValue: v => {
                    const start = /^0[0-9]+/
                    const pattern = /^0(?=\.)/
                    if(v.match(start)){
                        return 'Указано не валидное число'
                    }
                    return true
                },
                emptyValue: v => {
                    return v.length!=0 || 'Обязательное поле для заполнения'
                }
            },

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
    components: {
        // ValidationProvider,
        VueSlider
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