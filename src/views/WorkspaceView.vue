<template>
    <div class="wrapper">
        <div class="container">
            <div class="workspace">
                <div class="workspace__tools">1</div>

                <div class="workspace__tools-box"></div>
                <div class="workspace__content">

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
                                    <div class="editor" contenteditable="true"></div>
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
                                >+</v-btn>
                            </div>
                            <div class="test__answers mt-3">
                                <div class="answer">
                                    <div>
                                        <div class="d-flex flex-row mb-2">
                                            <v-icon class="mr-2">mdi-lightbulb-auto</v-icon>
                                            <div class="editor currect-answer" contenteditable="true"></div>
                                        </div>
                                    </div>
                                    <v-file-input
                                        :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp, image/webp, image/svg"
                                        placeholder="Выберите изображение"
                                        label="Загрузить изображение"
                                        outlined
                                        dense
                                        min-width="100%"
                                        prepend-icon="mdi-camera"
                                    ></v-file-input>
                                </div>
                                <div class="answer">
                                    <div>
                                        <div class="d-flex flex-row mb-2">
                                            <v-icon class="mr-2">mdi-lightbulb-auto</v-icon>
                                            <div class="editor" contenteditable="true"></div>
                                        </div>
                                    </div>
                                    <v-file-input
                                        :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp, image/webp, image/svg"
                                        placeholder="Выберите изображение"
                                        label="Загрузить изображение"
                                        outlined
                                        dense
                                        min-width="100%"
                                        prepend-icon="mdi-camera"
                                    ></v-file-input>
                                </div>
                                <div class="answer">
                                    <div>
                                        <div class="d-flex flex-row mb-2">
                                            <v-icon class="mr-2">mdi-lightbulb-auto</v-icon>
                                            <div class="editor" contenteditable="true"></div>
                                        </div>
                                    </div>
                                    <v-file-input
                                        :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp, image/webp, image/svg"
                                        placeholder="Выберите изображение"
                                        label="Загрузить изображение"
                                        outlined
                                        dense
                                        min-width="100%"
                                        prepend-icon="mdi-camera"
                                    ></v-file-input>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rules: [
                value => !value || value.size < 2000000 || 'Размер файла не должен превышать 2МБ',
            ],
			file: '',
            showPreview: false,
            imagePreview: ''
        }
    },
    methods: {
			handleFileUpload( event ){
				/*
					Set the local file variable to what the user has selected.
				*/
				this.file = event

				/*
					Initialize a File Reader object
				*/
				let reader  = new FileReader();

				/*
					Add an event listener to the reader that when the file
					has been loaded, we flag the show preview as true and set the
					image to be what was read from the reader.
				*/
				reader.addEventListener("load", function () {
					this.showPreview = true;
					this.imagePreview = reader.result;
				}.bind(this), false);

				/*
					Check to see if the file is not empty.
				*/
				if( this.file ){
					/*
						Ensure the file is an image file.
					*/
					if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
						/*
							Fire the readAsDataURL method which will read the file in and
							upon completion fire a 'load' event which we will listen to and
							display the image in the preview.
						*/
						reader.readAsDataURL( this.file );
					}
				}
			}
    },
}
</script>

<style>
.workspace{
    width: 100%;
    height: 100%;
    padding-top: 30px;
    display: grid;
    grid-template-columns: 270px auto;
    position: relative;
}


.workspace__tools{
    width: 270px;
    position:fixed;
    height: 84vh;
    background-color: aliceblue;
    border-radius: 5px;
    padding: 15px;
}

.workspace__content{
    margin-bottom: 30px;
    padding-left: 40px;
    text-align: justify;
    display: grid;
    grid-template-rows: auto;
    gap: 40px;
}

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


.test__answers{
    display: grid;
    grid-template-columns: repeat(auto-fill, 47%);
    justify-content: space-between;
    gap: 30px;
}
.answer{
    display: flex;
    flex-direction: column;
}
.answer>.editor{
    max-height: auto;
}
.currect-answer{
    background-color: rgb(190, 255, 210);
}
</style>