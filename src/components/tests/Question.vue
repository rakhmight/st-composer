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

        <v-divider></v-divider>

        <div class="test__question-box mt-3 mb-3">
            <div class="mb-3">
                <p style="color: #888">Сущность вопроса:</p>
                <div class="d-flex flex-row">
                    <v-icon class="mr-2">mdi-help-circle-outline</v-icon>
                    <div class="editor" contenteditable="true" placeholder="Опишите вопрос"></div>
                </div>
            </div>
            <div>
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
                    ></v-file-input>
            </div>
            <div class="d-flex justify-center">
                <v-img width="600" height="300" contain v-bind:src="imagePreview" v-show="showPreview"/>
            </div>
        </div>

        <v-divider></v-divider>

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
        Answer
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

.editor{
    background-color: rgb(220, 220, 252);
    padding: 10px;
    word-break: break-all;
    border-radius: 5px;
    width: 100%;
}
.editor:focus{
    outline: none;
}
.editor[placeholder]:empty:before {
	content: attr(placeholder);
	color: #777; 
}
.editor[placeholder]:empty:focus:before {
	content: '';
}

.test__answers{
    display: grid;
    grid-template-columns: repeat(auto-fill, 47%);
    justify-content: space-between;
    gap: 30px;
}    
</style>