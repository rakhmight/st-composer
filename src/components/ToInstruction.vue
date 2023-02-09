<template>
       <v-btn
           small
           text
           class="caption"
           @click="goToInstruction"
           >
               <v-icon v-if="currentRoute != 'dashboard'" size="20" class="mr-1" color="#fff">mdi-book-open-page-variant-outline</v-icon>
               <v-icon v-else size="20" class="mr-1" color="#0167ff">mdi-book-open-page-variant-outline</v-icon>
               <span v-if="currentRoute != 'dashboard'" style="color: #fff">Инструкция по эксплуатации</span>
               <span v-else style="color: #0167ff">Инструкция по эксплуатации</span>
               <v-icon  v-if="currentRoute != 'dashboard'" size="16" color="#fff">mdi-open-in-new</v-icon>
               <v-icon  v-else size="16" color="#0167ff">mdi-open-in-new</v-icon>
       </v-btn>
    <!-- <v-dialog
    v-model="dialog"
    width="750"
    >
            <template v-slot:activator="{ on, attrs }">
            <p
            class="instruction" 
            v-bind="attrs"
            v-on="on"
            style="color:#615f5f"
            >
              Инструкция по эксплуатации
            </p>
            </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 mb-4"
            style="background: #0167FF; color: #fff;"
            >
            <v-icon
            color="#fff"
            class="mr-2"
            >
                mdi-book-open-page-variant-outline
            </v-icon>
            Инструкция по эксплуатации
            </v-card-title>

            <v-card-text>
            При создании теста вам необходимо указать ID предмета (тему, в случае использования свободной подписи). Сборщик Smart Testing предоставит вам необходимые инструменты для написания от простых до интерактивных тестовых заданий.
            <br><span style="color:#0167FF">При написании тестов вводимые данные сохраняются автоматически.</span> После окончания написания тестов стоит запечатать тест.
            </v-card-text>
            <v-card-text>
            <b>Запечатование теста</b> - порядок, при котором генерируется файл с написанными тестами куда так же внедряются дополнительные данные и подпись автора. Запечатование теста сопровождается их выгрузкой.
            </v-card-text>
            <v-card-text>
            Существует возможность просмотреть все действия, выполненных над тестами (создание/изменение предмета/удаление/запечатование/добавление вопросов по дням - proof of work). История изменений при запечатовании тестов внедряется в выгружаемый файл тестов.
            </v-card-text>
            <v-card-text>
            Запечатанные и выгруженные тесты хранятся как сохранённые <span style="color:#0167FF">в течении 10 дней</span> после чего автоматически удаляются. В течении данного срока можно внести необходимые изменения и заново запечатать и выгрузить тесты. Рекомендуется удалять сохранённые копии запечатанных тестов, если нет необходимости больше с ними работать. Запечатанные тесты
            </v-card-text>
            <v-card-text>
            <v-icon size="20" color="#ff4500">mdi-help-circle</v-icon> В случае возникновения сложностей (необходимости в восстановлении тестов) либо выявлении ошибок в ПО необходимо обратиться в тех. поддержку Smart Testing.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="#0167FF"
                text
                @click="dialog = false"
            >
                Понятно
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->

</template>

<script>
export default {
    data() {
        return {
            currentRoute: this.$route.name
        }
    },
    methods:{
        goToInstruction(){
            this.$router.push('/instruction')
        }
    }
}
</script>

<style>
.v-dialog > .v-card > .v-card__text{
    color: #000
}
</style>