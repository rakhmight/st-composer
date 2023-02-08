<template>    <v-dialog
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
        <v-icon color="#0167FF" size="20">mdi-content-save-outline</v-icon>
        <span style="color:#0167FF">Сохранения</span>
        </v-btn>
    </template>

    <v-card>
        <v-card-title
        class="text-h5 lighten-2 d-flex flex-row justify-space-between"
        >
        Сохранения выполненные вручную
        <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
        </v-card-title>

        <v-divider></v-divider>

        <div class="dialog-content">
            1
        </div>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
}
</script>

<style scoped>
.dialog-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>