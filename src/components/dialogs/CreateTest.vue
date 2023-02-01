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

        <v-card>
            <v-card-title
            class="text-h5 lighten-2"
            >
            Создать тест
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box">
                    <v-icon class="mr-1">mdi-pound</v-icon>
                    <input class="input" type="text" placeholder="ID предмета" v-model="subjectID">
                </div>
                <v-divider width="80%" center></v-divider>
                <div class="content__template-box">
                    <h4 style="text-align: center">Параметры шаблона <span style="color: #777;font-size:0.8em">(необязательно)</span></h4>
                    <div class="content__template-inputs d-flex flex-row justify-space-around mt-3">
                        <div class="d-flex flex-column">
                            <label for="questions-count" class="body-2">Количество вопросов</label>
                            <div class="d-flex flex-row">
                                <v-icon class="mr-1">mdi-help</v-icon>
                                <input id="questions-count" class="input" type="number">
                            </div>
                        </div>
                        <div class="d-flex flex-column">
                            <label for="answers-count" class="body-2">Количество ответов на вопрос</label>
                            <div class="d-flex flex-row">
                                <v-icon class="mr-1">mdi-lightbulb-auto</v-icon>
                                <input id="answers-count" class="input" type="number">
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

export default {
    data() {
        return {
            dialog: false,
            errors:[],
            blockBtn: false,
            showProgress: false,
            subjectID: undefined
        }
    },
    methods: {
       
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
    padding: 30px;
    width: 100%;
    display: flex;
}
.content__template-box{
    padding: 30px;
    width: 100%;
}

.v-dialog > .v-card > .v-card__action{
    padding: 15px;
}
.v-card__actions{
    padding: 15px;
}
</style>