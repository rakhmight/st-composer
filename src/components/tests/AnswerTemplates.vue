<template>
    <div class="answer">
        <div class="d-flex flex-row">
            <v-divider vertical class="mr-3" color="#bbb"></v-divider>
            <div style="flex:auto">
                <div style="position: relative">
                    <v-textarea
                        dense
                        outlined
                        :placeholder="answer.isCurrect ? 'Напишите верный ответ': 'Напишите отвлекающий ответ'"
                        rows="2"
                        prepend-icon="mdi-lightbulb-auto"
                        v-model="answerCtx"
                        :success="answer.isCurrect"
                    ></v-textarea>

                    <v-checkbox
                    v-if="isMultiple && currentAnswer.id!=1"
                    v-model="isCurrect"
                    color="success"
                    hide-details
                    style="position: absolute; top:35px;"
                ></v-checkbox>
                </div>

                <div v-if="questionType=='question-with-images'">
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
                </div>
            </div>
            
            <div>
                <v-icon v-if="currentAnswer.id!=1 && currentAnswer.id!=2 && currentAnswer.id!=3" color="red" @click="deleteAnswer" size="25" class="mt-5">mdi-close-circle</v-icon>
            </div>
        </div>
        <div class="d-flex justify-center" v-if="questionType=='question-with-images'">
            <v-img width="300" height="150" contain v-bind:src="imagePreview" v-show="showPreview"/>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        answer: Object,
        type: String,
        answerFunc: Function,
        questionID: Number,
        isMultiple: Boolean,
    },
    data() {
        return {
            rules: [
                value => !value || value.size < 2000000 || 'Размер файла не должен превышать 2МБ',
            ],
			file: '',
            showPreview: false,
            imagePreview: '',

            questionType: this.type,
            answerCtx: this.answer.answerCtx,
            currentAnswer: this.answer,
            isCurrect: this.answer.isCurrect,
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

        deleteAnswer(){
            this.answerFunc('delete', null, this.questionID, this.currentAnswer.id)
        }
    },
    watch:{
        answerCtx(){
            this.answerFunc('answerCtx', this.answerCtx, this.questionID, this.currentAnswer.id)
        },

        isCurrect(){
            this.answerFunc('answerIsCurrect', this.isCurrect, this.questionID, this.currentAnswer.id)
        },

        isMultiple(){
            if(!this.isMultiple){
                this.isCurrect = false
            }
        }
    },
}
</script>

<style scoped>
.answer{
    display: flex;
    flex-direction: column;
}    
</style>