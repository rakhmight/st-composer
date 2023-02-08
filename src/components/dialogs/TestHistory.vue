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
                            v-for="action in actions"
                            :key="action.date"
                            >
                            <td v-if="action.type=='change' && action.des=='ballInterval'"><span style="color:blueviolet"><b>► </b></span>Интервал между баллами: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='minBall'"><span style="color:blueviolet"><b>► </b></span>Минимальный балл: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='maxBall'"><span style="color:blueviolet"><b>► </b></span>Максимальный балл: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='themes'"><span style="color:blueviolet"><b>► </b></span>Темы: <b>{{ action.oldData.join(', ') }}</b></td>
                            <td v-if="action.type=='change' && action.des=='subject'"><span style="color:blueviolet"><b>► </b></span>Предмет: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='create'"><span style="color:#0167FF"><b>► Тест создан</b></span></td>
                            <td v-if="action.type=='save'"><span style="color:#ad8011"><b>► Ручное сохранение</b></span></td>
                            <td v-if="action.type=='sign'"><span style="color:#27900dfa"><b>► Тест подписан</b></span></td>
                            <td v-if="action.type=='delete'"><span style="color:#ff4500"><b>► Тест удалён</b></span></td>

                            <td v-if="action.type=='change'" class="text-center">→<br>{{ action.date }}</td>
                            <td v-if="action.type!='change'" class="text-center">{{ action.date }}</td>

                            <td v-if="action.type=='change' && action.des!='themes'"><b>{{ action.newData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='themes'"><b>{{ action.newData.join(', ') }}</b></td>
                            <td v-if="action.type!='change'"></td>  
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
    data() {
        return {
            dialog: false,
            
            actions: [
                {
                    oldData: undefined,
                    newData: undefined,
                    type: 'create', 
                    des: undefined, 
                    date: '10.06.2022 12:30',
                },
                {
                    oldData: 0.01,
                    newData: 0.1,
                    type: 'change', 
                    des: 'ballInterval',
                    date: '12.06.2022 12:30',
                },
                {
                    oldData: 0.01,
                    newData: 0.1,
                    type: 'change', // change, delete, create, save, sign
                    des: 'minBall', // ballInterval, minBall, maxBall, themes, subject
                    date: '13.06.2022 12:30',
                },
                {
                    oldData: 1,
                    newData: 10,
                    type: 'change',
                    des: 'maxBall',
                    date: '14.06.2022 12:31',
                },
                {
                    oldData: [123,213,312],
                    newData: [789,879,978],
                    type: 'change',
                    des: 'themes',
                    date: '15.06.2022 12:31',
                },
                {
                    oldData: 12345,
                    newData: 98760,
                    type: 'change',
                    des: 'subject',
                    date: '16.06.2022 12:31',
                },
                {
                    oldData: undefined,
                    newData: undefined,
                    type: 'save',
                    des: undefined,
                    date: '17.06.2022 12:32',
                },
                {
                    oldData: undefined,
                    newData: undefined,
                    type: 'sign',
                    des: undefined,
                    date: '20.06.2022 12:30',
                },
                {
                    oldData: undefined,
                    newData: undefined,
                    type: 'delete',
                    des: undefined,
                    date: '21.06.2022 12:30',
                },
            ],
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