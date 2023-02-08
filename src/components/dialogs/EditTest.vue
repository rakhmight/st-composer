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
            <v-icon color="#0167FF" size="20">mdi-pencil-outline</v-icon>
            <span style="color:#0167FF">Изменить</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            Изменить параметры теста
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    
                    <div class="d-flex flex-column">
                        <label class="body-2">Изменение ID предмета: {{ oldID }} → {{ newID }}</label>
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-pound"
                        v-model="newID"
                        placeholder="ID предмета"
                        >
                        </v-text-field>
                    </div>
                    <div>
                        <label class="body-2">Изменение тем: {{ oldThemes }} → {{ newThemes }}</label>
                        <v-text-field
                        dense
                        outlined
                        prepend-icon="mdi-alpha-t-box-outline"
                        v-model="newThemes"
                        placeholder="Укажите темы через запятую"
                        >
                        </v-text-field>
                    </div>
                    <div class="d-flex flex-row justify-space-between">
                        <v-checkbox
                        v-model="haveLevel"
                        label="Учитывать уровень сложности?"
                        ></v-checkbox>
                        
                        <v-checkbox
                        v-model="haveBall"
                        label="Учитывать балльную систему?"
                        ></v-checkbox>
                    </div>

                    <div v-if="haveBall" class="pb-2 pt-2 ball-box">
                        <ball-settings :toEdit="{oldMinBall,oldMaxBall,oldInterval}" :mode="'edit'"></ball-settings>
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
                v-if="editSuccess"
                >Изменения сохранены</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="#0167FF"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="edit-btn"
                @click="LOG"
            >
                Сохранить изменения
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
import BallSettings from '@/components/dialogs/BallSettings.vue'

export default {
    data() {
        return {
            dialog: false,
            editSuccess: false,
            errors: [],
            blockBtn: false,
            showProgress: false,

            newID: undefined,
            oldID: 'some',
            newThemes: undefined,
            oldThemes: 'some',
            newMinBall: undefined,

            oldMinBall: '0.1',
            oldMaxBall: '10',
            oldInterval: '0.1',
            haveLevel: true,
            haveBall: true
        }
    },
    methods: {
        LOG(){
            if(this.$store.getters.getMinBall == this.oldMinBall){
                return this.errors.push('Новое значение совпадает со старым')
            }

            console.log(this.$store.getters.getMinBall)

            this.$store.commit('updateMin', this.$store.getters.getMinBall)
        }
    },
    mounted() {
        this.$store.commit('updateMin', this.oldMinBall)
    }, 
    components:{
        BallSettings
    }
}
</script>

<style scoped>
.edit-btn.theme--light.v-btn {
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