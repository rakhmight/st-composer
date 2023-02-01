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
            class="text-h5 lighten-2"
            >
            История действий и изменений теста
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">
                                Действие
                            </th>
                            <th class="text-left">
                                Дата
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="action in actions"
                            :key="action.name"
                            >
                            <td>{{ action.name }}</td>
                            <td>{{ action.date }}</td>
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
                name: 'Frozen Yogurt',
                date: 159,
            },
            {
                name: 'Ice cream sandwich',
                date: 237,
            },
            {
                name: 'Eclair',
                date: 262,
            },
            {
                name: 'Cupcake',
                date: 305,
            },
            {
                name: 'Gingerbread',
                date: 356,
            },
            {
                name: 'Cupcake',
                date: 305,
            },
            {
                name: 'Gingerbread',
                date: 356,
            },
            {
                name: 'Cupcake',
                date: 305,
            },
            {
                name: 'Gingerbread',
                date: 356,
            },
            {
                name: 'Cupcake',
                date: 305,
            },
            {
                name: 'Gingerbread',
                date: 356,
            },
            {
                name: 'Cupcake',
                date: 305,
            },
            {
                name: 'Gingerbread',
                date: 356,
            },
            {
                name: 'Cupcake',
                date: 305,
            },
            {
                name: 'Gingerbread',
                date: 356,
            },
            {
                name: 'Cupcake',
                date: 305,
            },
            {
                name: 'Gingerbread',
                date: 356,
            },
            {
                name: 'Gingerbread',
                date: 356,
            },
            {
                name: 'Cupcake',
                date: 305,
            },
            {
                name: 'Gingerbread',
                date: 356,
            },
            {
                name: 'Cupcake',
                date: 305,
            },
            {
                name: 'Gingerbread',
                date: 356,
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
</style>