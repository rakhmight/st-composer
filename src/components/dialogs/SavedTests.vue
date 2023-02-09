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
            <v-simple-table class="mt-3">
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
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
                    :key="saved.date"
                    >
                    <td>{{ saved.des }}</td>
                    <td>{{ saved.date }}</td>
                    <td>
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            fab
                            text
                            small
                            v-bind="attrs"
                            v-on="on"
                            >
                                <v-icon color="#444">
                                    mdi-eye-outline
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Посмотреть</span>
                        </v-tooltip>
                        |
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            fab
                            text
                            small
                            v-bind="attrs"
                            v-on="on"
                            >
                                <v-icon color="#0167FF">
                                    mdi-arrow-u-down-right
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Использовать как текущий</span>
                        </v-tooltip>
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,

            saves: [
                {
                    des: 'Тесты на темы 123, 213, 312',
                    date: '12.03.2022 20:30',
                    test:{} //отсюда id предмета для определения принадлежности
                },
                {
                    des: 'Подготовил 50 фундаментальных вопросов',
                    date: '15.03.2022 14:40',
                    test:{}
                },
                {
                    des: 'Имеются не согласованные вопросы',
                    date: '06.04.2022 09:30',
                    test:{}
                },
                {
                    des: 'Возможно ошибся с темами',
                    date: '21.04.2022 17:30',
                    test:{}
                },
            ]
        }
    },
}
</script>

<style scoped>
.dialog-content{
    width: 100%;
}
</style>