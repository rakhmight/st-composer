<template>
    <div class="test">
        <div class="test__header d-flex flex-row justify-space-between mb-2">
            <div class="d-flex flex-row">
                <v-icon size="16" color="#888" class="mr-1">mdi-pound</v-icon>
                <p style="color: #888">Вопрос n</p>
            </div>
            <div class="d-flex flex-row">
                <v-icon size="16" color="#888" class="mr-1">mdi-clock-time-eight-outline</v-icon>
                <p style="color: #888">Последнее изменение: 00.00.0000 в 00:00</p>
            </div>
        </div>

        <v-divider color="#bbb"></v-divider>

        <div class="test__question-box mt-3">
            <div>
                <p style="color: #888">Сущность вопроса:</p>
                <div class="d-flex flex-row align-start">
                    <v-textarea
                    dense
                    outlined
                    placeholder="Опишите вопрос"
                    rows="2"
                    prepend-icon="mdi-help-circle-outline"
                    v-model="questionCtx"
                    ></v-textarea>
                </div>
            </div>

            <div>
                <!-- range -->
                <vue-slider
                    ref="slider"
                    v-model="value"
                    v-bind="options"
                ></vue-slider>
            </div>

            <div class="test__question-param">
                <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp, image/webp, image/svg"
                placeholder="Выберите изображение"
                label="Загрузить изображение"
                outlined
                dense
                min-width="100%"
                prepend-icon="mdi-camera"
                @change="handleFileUpload( $event )"
                @click:clear="showPreview=false"
                @click="showPreview=false"
                ></v-file-input>

                <v-select
                :items="themes"
                placeholder="Тема"
                outlined
                dense
                v-model="theme"
                :success="theme!=undefined"
                ></v-select>

                <v-select
                :items="difficultys"
                placeholder="Сложность"
                outlined
                dense
                v-model="difficulty"
                :success="difficulty!=undefined"
                ></v-select>
            </div>
            <div class="d-flex justify-center">
                <v-img width="600" height="300" contain v-bind:src="imagePreview" v-show="showPreview" class="mb-3"/>
            </div>
        </div>

        <v-divider color="#bbb"></v-divider>

        <div class="test__answers-box mt-3">
            <div class="d-flex flex-row justify-space-between align-center">
                <p style="color: #888">Ответы:</p>
                <v-btn
                fab
                dark
                color="#0167FF"
                small
                @click="addAnswer"
                >+</v-btn>
            </div>
            <v-alert
            color="red"
            dense
            dismissible
            elevation="3"
            type="error"
            class="subtitle-2 mt-2"
            v-for="error in errors"
            >{{ error }}</v-alert>
            <div class="test__answers mt-3">

                <!--  -->
                <answer v-for="answer in getAnswers" :key="answer.number" :number="answer.number"/>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Answer from '@/components/tests/Answer.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

let marks = [0,0.5,1]

export default {
    data() {
        return {
            rules: [
                value => !value || value.size < 2000000 || 'Размер файла не должен превышать 2МБ',
            ],
			file: '',
            showPreview: false,
            imagePreview: '',
            errors:[],
            themes:[123,231,312],
            difficultys:[
                {value:1, text:'Лёгкий'},
                {value:2, text:'Средний'},
                {value:3, text:'Трудный'}
            ],

            questionCtx:'',
            theme: undefined,
            difficulty: undefined,

            
    	    value: 0,
            options: {
                dotSize: 14,
                width: 'auto',
                height: 4,
                contained: false,
                direction: 'ltr',
                data: null,
                dataLabel: 'label',
                dataValue: 'value',
                min: 0.01,
                max: 1,
                interval: 0.01,
                disabled: false,
                clickable: true,
                duration: 0.5,
                adsorb: false,
                lazy: false,
                tooltip: 'active',
                tooltipPlacement: 'top',
                tooltipFormatter: void 0,
                useKeyboard: false,
                keydownHook: null,
                dragOnClick: false,
                enableCross: true,
                fixed: false,
                minRange: void 0,
                maxRange: void 0,
                order: true,
                marks: marks,
                dotOptions: void 0,
                dotAttrs: void 0,
                process: true,
                dotStyle: void 0,
                railStyle: void 0,
                processStyle: void 0,
                tooltipStyle: void 0,
                stepStyle: void 0,
                stepActiveStyle: void 0,
                labelStyle: void 0,
                labelActiveStyle: void 0,
            }
        }
    },
    methods: {
		handleFileUpload( event ){
			this.file = event
			let reader  = new FileReader()

			reader.addEventListener("load", function () {
				this.showPreview = true
				this.imagePreview = reader.result
			}.bind(this), false)

			if( this.file ){
				if ( /\.(jpe?g|png|svg|webp)$/i.test( this.file.name ) ) {
					reader.readAsDataURL( this.file )
				}
			}
		},

        addAnswer(){
            let nextAnswer = this.getAnswers.length+1
            if(this.getAnswers.length >= 6){
                return this.errors.push('Ответов не может быть больше 6')
            }
            this.getAnswers.push({number: nextAnswer})
        }
    },
    computed: mapGetters(['getAnswers']),
    components:{
        Answer,
        VueSlider
    }
}
</script>

<style>
.test{
    background-color: aliceblue;
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0px 0px 5px 5px #4444441c;
}

.test__answers{
    display: grid;
    grid-template-columns: repeat(auto-fill, 47%);
    justify-content: space-between;
    gap: 30px;
}

.test__question-param{
    display: grid;
    grid-template-columns: 2fr 1fr 0.5fr;
    justify-content: space-between;
    gap: 30px;
}
</style>