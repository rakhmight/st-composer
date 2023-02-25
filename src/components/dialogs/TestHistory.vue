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
            <v-icon color="#0167FF" size="20">mdi-clock-time-eight-outline</v-icon>
            <span style="color:#0167FF">История</span>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
            История действий и изменений теста
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    <div class="content__subject-info mb-5">
                        <div><span style="color:#0167FF"><b>► </b></span> - создание</div>
                        <div><span style="color:blueviolet"><b>► </b></span> - изменение</div>
                        <div><span style="color:#ad8011"><b>► </b></span> - сохранение</div>
                        <div><span style="color:#27900dfa"><b>► </b></span> - подписание</div>
                        <div><span style="color:#ff4500"><b>► </b></span> - удаление</div>
                    </div>
                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">
                                Предыдущее значение
                            </th>
                            <th class="text-center">Дата</th>
                            <th class="text-left">
                                Новое значение
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="(action, i) in test.history"
                            :key="i"
                            >
                            <td v-if="action.type=='change' && action.des=='ballInterval'"><span style="color:blueviolet"><b>► </b></span>Интервал между баллами: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='minBall'"><span style="color:blueviolet"><b>► </b></span>Минимальный балл: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='maxBall'"><span style="color:blueviolet"><b>► </b></span>Максимальный балл: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='ball-dissabled'"><span style="color:blueviolet"><b>► </b></span>Система баллов <span style="color: red">отключена</span></td>
                            <td v-if="action.type=='change' && action.des=='ball-enabled'"><span style="color:blueviolet"><b>► </b></span>Система баллов <span style="color: green">включена</span></td>
                            <td v-if="action.type=='change' && action.des=='difficulty-dissabled'"><span style="color:blueviolet"><b>► </b></span>Учитывание сложности <span style="color: red">отключено</span></td>
                            <td v-if="action.type=='change' && action.des=='difficulty-enabled'"><span style="color:blueviolet"><b>► </b></span>Учитывание сложности <span style="color: green">включено</span></td>
                            <td v-if="action.type=='change' && action.des=='themes'"><span style="color:blueviolet"><b>► </b></span>Темы: <b>{{ action.oldData.join(', ') }}</b></td>
                            <td v-if="action.type=='change' && action.des=='subject'"><span style="color:blueviolet"><b>► </b></span>Предмет: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='create'"><span style="color:#0167FF"><b>► Тест создан</b></span></td>
                            <td v-if="action.type=='save'"><span style="color:#ad8011"><b>► Ручное сохранение</b></span></td>
                            <td v-if="action.type=='sign'"><span style="color:#27900dfa"><b>► Тест подписан</b></span></td>
                            <td v-if="action.type=='delete'"><span style="color:#ff4500"><b>► Тест удалён</b></span></td>
                            <td v-if="action.type=='restore'"><span style="color:blue"><b>► Подставлено сохранение</b></span></td>

                            <td v-if="action.type=='change' && action.des!='difficulty-dissabled' && action.des!='difficulty-enabled' && action.des!='ball-dissabled' && action.des!='ball-enabled'" class="text-center">→<br>{{ action.date.date }} {{ action.date.time }}</td>
                            <td v-else class="text-center">{{ action.date.date }} {{ action.date.time }}</td>

                            <td v-if="action.type=='change' && action.des!='themes'"><b>{{ action.newData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='themes'"><b>{{ action.newData.join(', ') }}</b></td>
                            <td v-if="action.type=='restore'"><b>от даты: {{ action.des }}</b></td>
                            <td v-if="action.type!='change' && action.type!='restore'"></td>  
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:{
        test: Object
    },
    data() {
        return {
            dialog: false
        }
    },
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
    max-height: 500px;
    overflow-y: scroll;
}

.content__subject-info{
    display: grid;
    grid-template-columns: repeat(auto-fill, 110px);
    gap:15px;
    justify-content: space-between;
    font-size: 0.9em;
}
</style>