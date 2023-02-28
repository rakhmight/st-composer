<template>
    <div class="answer">
        <div class="d-flex flex-row">
            <v-divider vertical class="mr-3" color="#bbb"></v-divider>
            <div style="flex:auto">
                <div style="position: relative">
                    <v-textarea
                        dense
                        outlined
                        :placeholder="answer.isCurrect ? currentLang.workspaceView[39] : currentLang.workspaceView[40]"
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
                        :placeholder="currentLang.workspaceView[28]"
                        :label="currentLang.workspaceView[29]"
                        outlined
                        dense
                        min-width="100%"
                        prepend-icon="mdi-camera"
                        @change="handleFileUpload( $event )"
                        @click:clear="imagePreview=''"
                        @click="imagePreview=''"
                    ></v-file-input>
                </div>
            </div>
            
            <div>
                <v-icon v-if="currentAnswer.id!=1 && currentAnswer.id!=2 && currentAnswer.id!=3" color="red" @click="deleteAnswer" size="25" class="mt-5">mdi-close-circle</v-icon>
            </div>
        </div>
        <div class="d-flex justify-center" v-if="questionType=='question-with-images'"  style="position: relative;">
            <div class="delete-pic" v-show="showPreview">
                <v-icon color="red" @click="imagePreview=''" size="25" v-show="showPreview">mdi-close-circle</v-icon>
            </div>
            <v-img width="300" height="150" contain v-bind:src="imagePreview" v-show="showPreview"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
                value => !value || value.size < 20000000 || this.currentLang.workspaceView[16],
            ],
			file: '',
            showPreview: false,
            imagePreview: this.answer.imagePreview,

            questionType: this.type,
            answerCtx: this.answer.answerCtx,
            currentAnswer: this.answer,
            isCurrect: this.answer.isCurrect,
        }
    },
    computed: mapGetters(['currentLang']),
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
            if(!this.isMultiple && this.currentAnswer.id!=1){
                this.isCurrect = false
            }
        },
        imagePreview(){
            if(!this.imagePreview){
                this.showPreview = false
            }else{
                this.showPreview = true
            }

            this.answerFunc('answer-imagePreview', this.imagePreview, this.questionID, this.currentAnswer.id)
        },
    },
    mounted() {
        if(this.imagePreview){
            this.showPreview = true
        }
    },
}
</script>

<style scoped>
.answer{
    display: flex;
    flex-direction: column;
}

.delete-pic{
    position: absolute;
    right: 0;
    cursor: pointer;
    z-index: 9;
}
</style>