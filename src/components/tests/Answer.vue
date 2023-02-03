<template>
    <div class="answer">
        <div>
            <div class="d-flex flex-row mb-2">
                <v-icon class="mr-2">mdi-lightbulb-auto</v-icon>
                {{ ctx }}
                <div class="editor" :class="{'currect-answer': id == 1}" contenteditable="true" :placeholder="id==1 ? 'Напишите верный ответ': 'Напишите отвлекающий ответ'"></div>
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
            <v-img width="300" height="150" contain v-bind:src="imagePreview" v-show="showPreview"/>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        number: Number
    },
    data() {
        return {
            rules: [
                value => !value || value.size < 2000000 || 'Размер файла не должен превышать 2МБ',
            ],
			file: '',
            showPreview: false,
            imagePreview: '',
            id: this.number
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
		}
    },
}
</script>

<style scoped>
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