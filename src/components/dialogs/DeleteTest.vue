<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            small
            v-bind="attrs"
            v-on="on"
            class="dashboard__btn"
            >
            <v-icon color="#ff4500" size="20">mdi-trash-can-outline</v-icon>
            <span style="color:#ff4500">Удалить</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2"
            >
            Подтверждение удаления теста
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    
                    <div class="d-flex flex-column">
                            <label class="body-2">Напишите ID предмета: <b>#ID</b></label>
                            <div class="d-flex flex-row">
                                <v-icon class="mr-1">mdi-pound</v-icon>
                                <input class="input" type="text" placeholder="ID предмета" v-model="subjectID">
                            </div>
                        </div>
                </div>
                
            </div>

            <v-divider></v-divider>
            <v-card-actions class="d-flex align-items-center flex-column">

            <div class="dialog-errors-box">
                <v-alert
                color="red"
                dense
                dismissible
                elevation="3"
                type="error"
                class="subtitle-2"
                v-for="error in errors"
                >{{ error }}</v-alert>

                <v-alert
                dense
                dismissible
                elevation="3"
                type="success"
                class="subtitle-2"
                v-if="deleteSuccess"
                >Тест удалён</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="red"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="delete-btn"
            >
                Удалить
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
            deleteSuccess: false,
            errors: [],
            blockBtn: false,
            showProgress: false,
            subjectID: undefined
        }
    },
}
</script>

<style scoped>
.delete-btn.theme--light.v-btn {
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
.v-list{
  padding: 0;
}
.v-dialog{
  overflow: hidden;
}
</style>