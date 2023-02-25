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
            <v-simple-table  v-if="saves.length && !loader">
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left pt1 pb1" width="350px" max-width="350px">
                        Описание
                    </th>
                    <th class="text-left">
                        Дата
                    </th>
                    <th class="text-left">
                        Действие
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="saved in saves"
                    :key="saved.id"
                    >
                    <td width="350px" max-width="350px" class="pt1 pb1">{{ saved.comment }}</td>
                    <td>{{ saved.date.date }} {{ saved.date.time }}</td>
                    <td>
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            fab
                            text
                            small
                            v-bind="attrs"
                            v-on="on"
                            @click="goToSaved(saved.id)"
                            >
                                <v-icon color="#444">
                                    mdi-eye-outline
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Перейти к сохранению</span>
                        </v-tooltip>
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>

            <div v-if="!saves.length && !loader" class="d-flex flex-column align-center">
                <v-img
                max-height="120"
                max-width="120"
                src="@/assets/media/spider-web.png"
                contain
                transition="scale-transition"
                ></v-img>
                <h3 style="color: #888" class="mt-2">Сохранений пока нет</h3>
            </div>

            <div class="d-flex justify-center mt-10" v-if="loader">
                <v-progress-circular
                :size="40"
                :width="3"
                color="#0167ff"
                indeterminate
                ></v-progress-circular>
          </div>
        </div>
    </v-card>
</v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import { operationFromStore } from '@/services/localDB'

export default {
    props:{
        id: Number
    },
    data() {
        return {
            dialog: false,
            loader: true,

            saves: []
        }
    },
    methods: {
        ...mapMutations(['updateTestID']),

        goToSaved(id){
            this.updateTestID(id)
            this.$router.push(`/saved`)
        }
    },
    mounted(){

        operationFromStore('getAllSavings', {sort:{id: this.id}})
        .then(result=>{
          this.saves = result
          this.loader=false
        })
        .catch(e=>{
          console.error('(DB) Ошибка! БД не инициализированно. Подробнее: ', e.message)
          this.$router.push('/')
        })
    }
}
</script>

<style scoped>

.dialog-content{
    width: 100%;
    padding: 30px;
}
</style>