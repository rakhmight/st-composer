<template>
    <div class="answer">
        <div class="d-flex flex-row">
            <v-divider vertical class="mr-3" color="#bbb"></v-divider>
            <div style="flex:auto">
                <div style="position: relative">

                    <div
                    v-if="testOptions.languagesSettings.languages.indexOf('custom')!=-1"
                    style="width:100%; position: relative;"
                    >
                        <v-textarea
                        dense
                        outlined
                        :placeholder="answer.isCurrect ? 'Write the correct answer' : 'Write a distracting answer'"
                        rows="2"
                        prepend-icon="mdi-lightbulb"
                        v-model="answerCtx.custom"
                        :success="answer.isCurrect"
                        ></v-textarea>
                        <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-img
                            v-bind="attrs"
                            v-on="on"
                            v-if="testOptions.languagesSettings.languages.length>1"
                            src="@/assets/media/global.png"
                            width="22"
                            height="22"
                            class="mt-2"
                            style="position:absolute; top:-18px;right:-10px"
                            ></v-img>
                        </template>
                        <span>Answer field in <b><u>foreign</u></b> language</span>
                        </v-tooltip>
                    </div>

                    <div
                    v-if="testOptions.languagesSettings.languages.indexOf('de')!=-1"
                    style="width:100%; position: relative;"
                    >
                        <v-textarea
                        dense
                        outlined
                        :placeholder="answer.isCurrect ? currentLang.workspaceView[39] : currentLang.workspaceView[40]"
                        rows="2"
                        prepend-icon="mdi-lightbulb"
                        v-model="answerCtx.de"
                        :success="answer.isCurrect"
                        ></v-textarea>
                        <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-img
                            v-bind="attrs"
                            v-on="on"
                            v-if="testOptions.languagesSettings.languages.length>1"
                            src="@/assets/media/germany.png"
                            width="22"
                            height="22"
                            class="mt-2"
                            style="position:absolute; top:-18px;right:-10px"
                            ></v-img>
                        </template>
                        <span>Antwortfeld auf <b><u>Deutsch</u></b></span>
                        </v-tooltip>
                    </div>

                    <div
                    v-if="testOptions.languagesSettings.languages.indexOf('fr')!=-1"
                    style="width:100%; position: relative;"
                    >
                        <v-textarea
                        dense
                        outlined
                        :placeholder="answer.isCurrect ? currentLang.workspaceView[39] : currentLang.workspaceView[40]"
                        rows="2"
                        prepend-icon="mdi-lightbulb"
                        v-model="answerCtx.fr"
                        :success="answer.isCurrect"
                        ></v-textarea>
                        <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-img
                            v-bind="attrs"
                            v-on="on"
                            v-if="testOptions.languagesSettings.languages.length>1"
                            src="@/assets/media/france.png"
                            width="22"
                            height="22"
                            class="mt-2"
                            style="position:absolute; top:-18px;right:-10px"
                            ></v-img>
                        </template>
                        <span>Champ de réponse en <b><u>français</u></b></span>
                        </v-tooltip>
                    </div>

                    <div
                    v-if="testOptions.languagesSettings.languages.indexOf('ru')!=-1"
                    style="width:100%; position: relative;"
                    >
                        <v-textarea
                        dense
                        outlined
                        :placeholder="answer.isCurrect ? currentLang.workspaceView[39] : currentLang.workspaceView[40]"
                        rows="2"
                        prepend-icon="mdi-lightbulb"
                        v-model="answerCtx.ru"
                        :success="answer.isCurrect"
                        ></v-textarea>
                        <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-img
                            v-bind="attrs"
                            v-on="on"
                            v-if="testOptions.languagesSettings.languages.length>1"
                            src="@/assets/media/russia.png"
                            width="22"
                            height="22"
                            class="mt-2"
                            style="position:absolute; top:-18px;right:-10px"
                            ></v-img>
                        </template>
                        <span>Поле ответа на <b><u>русском</u></b> языке</span>
                        </v-tooltip>
                    </div>

                    <div
                    v-if="testOptions.languagesSettings.languages.indexOf('eng')!=-1"
                    style="width:100%; position: relative;"
                    >
                        <v-textarea
                        dense
                        outlined
                        :placeholder="answer.isCurrect ? 'Write the correct answer' : 'Write a distracting answer'"
                        rows="2"
                        prepend-icon="mdi-lightbulb"
                        v-model="answerCtx.eng"
                        :success="answer.isCurrect"
                        spellcheck="false"
                        ></v-textarea>
                        <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-img
                            v-bind="attrs"
                            v-on="on"
                            v-if="testOptions.languagesSettings.languages.length>1"
                            src="@/assets/media/united-states.png"
                            width="22"
                            height="22"
                            class="mt-2"
                            style="position:absolute; top:-18px;right:-10px"
                            ></v-img>
                        </template>
                        <span>Answer field in <b><u>english</u></b> language</span>
                        </v-tooltip>
                    </div>

                    <div
                    v-if="testOptions.languagesSettings.languages.indexOf('uz_l')!=-1"
                    style="width:100%; position: relative;"
                    >
                        <v-textarea
                        dense
                        outlined
                        :placeholder="answer.isCurrect ? `To'g'ri javobni yozing` : `Chalg'ituvchi javob yozing`"
                        rows="2"
                        prepend-icon="mdi-lightbulb"
                        v-model="answerCtx.uz_l"
                        :success="answer.isCurrect"
                        spellcheck="false"
                        :disabled="testOptions.languagesSettings.languages.indexOf('uz_l')!=-1 && testOptions.languagesSettings.languages.indexOf('uz_k')!=-1 && parseMode=='kiril-lotin'"
                        ></v-textarea>
                        <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-img
                            v-bind="attrs"
                            v-on="on"
                            v-if="testOptions.languagesSettings.languages.length>1"
                            src="@/assets/media/uzbekistan.png"
                            width="22"
                            height="22"
                            class="mt-2"
                            style="position:absolute; top:-18px;right:-10px"
                            ></v-img>
                        </template>
                        <span><b><u>O'zbek</u></b> tilida javoblar qutisi (lotincha)</span>
                        </v-tooltip>
                    </div>

                    <div
                    v-if="testOptions.languagesSettings.languages.indexOf('uz_k')!=-1"
                    style="width:100%; position: relative;"
                    >
                        <v-textarea
                        dense
                        outlined
                        :placeholder="answer.isCurrect ? `Тўғри жавобни ёзинг` : `Чалғитувчи жавоб ёзинг`"
                        rows="2"
                        prepend-icon="mdi-lightbulb"
                        v-model="answerCtx.uz_k"
                        :success="answer.isCurrect"
                        spellcheck="false"
                        :disabled="testOptions.languagesSettings.languages.indexOf('uz_l')!=-1 && testOptions.languagesSettings.languages.indexOf('uz_k')!=-1 && parseMode=='lotin-kiril'"
                        ></v-textarea>
                        <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-img
                            v-bind="attrs"
                            v-on="on"
                            v-if="testOptions.languagesSettings.languages.length>1"
                            src="@/assets/media/uzbekistan.png"
                            width="22"
                            height="22"
                            class="mt-2"
                            style="position:absolute; top:-18px;right:-10px"
                            ></v-img>
                        </template>
                        <span><b><u>Ўзбек</u></b> тилида жавоблар қутиси (кирилча)</span>
                        </v-tooltip>
                    </div>

                    <v-checkbox
                    v-if="isMultiple && currentAnswer.id!=1"
                    v-model="isCurrect"
                    color="success"
                    hide-details
                    style="position: absolute; top:35px;"
                ></v-checkbox>
                </div>

                <div v-if="questionType=='question-with-images'" style="position: relative;">
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
                    
                    <v-progress-circular
                    v-if="questionType=='question-with-images' && imageLoader"
                    color="#0C2242"
                    style="position: absolute;left:420px;top:8px"
                    size="25"
                    :width="2"
                    indeterminate
                    ></v-progress-circular>
                </div>
            </div>
            
            <div>
                <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">                    
                    <v-icon
                    v-bind="attrs"
                    v-on="on"
                    v-if="currentAnswer.id!=1 && currentAnswer.id!=2 && currentAnswer.id!=3 && currentAnswer.id!=4"
                    color="red"
                    @click="deleteAnswer"
                    size="25"
                    class="mt-5"
                    >mdi-close-circle</v-icon>
                </template>
                <span>{{ currentLang.additional[101] }}</span>
                </v-tooltip>
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
import uzbekLangParser from '@/plugins/uzbekLangParser'
// import { sanitizeString } from '@/utils/sanitizeString'

export default {
    props:{
        answer: Object,
        type: String,
        answerFunc: Function,
        questionID: Number,
        isMultiple: Boolean,
        testOptions: Object,

        parseMode: String,
        showParse: Boolean,
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
            imageLoader: false
        }
    },
    computed: mapGetters(['currentLang']),
    methods: {
		handleFileUpload( event ){
			this.file = event
			let reader  = new FileReader()
            this.imageLoader = true

			reader.addEventListener("load", function () {
				this.showPreview = true
				this.imagePreview = reader.result
                this.imageLoader = false
			}.bind(this), false)

			if( this.file ){
				if ( /\.(jpe?g|png|svg|webp)$/i.test( this.file.name ) ) {
					reader.readAsDataURL( this.file )
				}
			} else {
                this.imageLoader = false
            }
		},

        deleteAnswer(){
            this.answerFunc('delete', null, this.questionID, this.currentAnswer.id)
        }
    },
    watch:{
        'answerCtx.ru'(){
            // this.answerCtx.ru = sanitizeString(this.answerCtx.ru)
            this.answerFunc('answerCtx', this.answerCtx, this.questionID, this.currentAnswer.id)
        },
        'answerCtx.de'(){
            // this.answerCtx.de = sanitizeString(this.answerCtx.de)
            this.answerFunc('answerCtx', this.answerCtx, this.questionID, this.currentAnswer.id)
        },
        'answerCtx.fr'(){
            // this.answerCtx.fr = sanitizeString(this.answerCtx.fr)
            this.answerFunc('answerCtx', this.answerCtx, this.questionID, this.currentAnswer.id)
        },
        'answerCtx.eng'(){
            // this.answerCtx.eng = sanitizeString(this.answerCtx.eng)
            this.answerFunc('answerCtx', this.answerCtx, this.questionID, this.currentAnswer.id)
        },
        'answerCtx.uz_l'(){
            if(this.parseMode=='lotin-kiril' && this.showParse && this.testOptions.languagesSettings.languages.indexOf('uz_l')!=-1 && this.testOptions.languagesSettings.languages.indexOf('uz_k')!=-1){
                this.answerCtx.uz_k = uzbekLangParser(this.answerCtx.uz_l, 'lotin')
            }

            // this.answerCtx.uz_l = sanitizeString(this.answerCtx.uz_l)
            this.answerFunc('answerCtx', this.answerCtx, this.questionID, this.currentAnswer.id)
        },
        'answerCtx.uz_k'(){
            if(this.parseMode=='kiril-lotin' && this.showParse && this.testOptions.languagesSettings.languages.indexOf('uz_l')!=-1 && this.testOptions.languagesSettings.languages.indexOf('uz_k')!=-1){
                this.answerCtx.uz_l = uzbekLangParser(this.answerCtx.uz_k, 'kiril')
            }

            // this.answerCtx.uz_k = sanitizeString(this.answerCtx.uz_k)
            this.answerFunc('answerCtx', this.answerCtx, this.questionID, this.currentAnswer.id)
        },
        'answerCtx.custom'(){
            // this.answerCtx.custom = sanitizeString(this.answerCtx.custom)
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