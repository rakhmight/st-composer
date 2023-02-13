<template>
    <div class="answer">
        <div class="d-flex flex-row">
            <v-divider vertical class="mr-3" color="#bbb"></v-divider>
            <div style="flex:auto">
                <div>
                    <v-textarea
                        dense
                        outlined
                        :placeholder="answerID==1 ? 'Напишите верный ответ': 'Напишите отвлекающий ответ'"
                        rows="2"
                        prepend-icon="mdi-lightbulb-auto"
                        v-model="answerCtx"
                        :success="answerID==1"
                    ></v-textarea>
                </div>
                <div>
                    <v-file-input
                        v-if="questionType=='question-with-images'"
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
                <v-icon v-if="answerID!=1 && answerID!=2 && answerID!=3" color="red" @click="deleteAnswer" size="25" class="mt-5">mdi-close-circle</v-icon>
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
        questionID: Number
    },
    data() {
        return {
            rules: [
                value => !value || value.size < 2000000 || 'Размер файла не должен превышать 2МБ',
            ],
			file: '',
            showPreview: false,
            imagePreview: '',

            answerID: this.answer.id,
            questionType: this.type,
            answerCtx: this.answer.answerCtx
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
            this.answerFunc('delete', null, this.questionID, this.answerID)
        }
    },
    watch:{
        answerCtx(){
            this.answerFunc('answerCtx', this.answerCtx, this.questionID, this.answerID)
        }
    }
}
</script>

<style scoped>
.answer{
    display: flex;
    flex-direction: column;
}    
</style>