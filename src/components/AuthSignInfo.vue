<template>

    <v-dialog
    v-model="dialog"
    width="600"
    >
            <template v-slot:activator="{ on, attrs }">
                <v-icon
                v-bind="attrs"
                v-on="on"
                color="#0167FF"
                >
                    mdi-information
                </v-icon>
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
                mdi-information
            </v-icon>
            Подпись и как её получить
            </v-card-title>

            <v-card-text>
            <b>Подпись</b> - файл, содержащий в себе необходимые реквизиты, которые в дальнейшим будут использованы для указания автора тестов, аунтификации кафедры автора и в шифровании написанных тестов. Подпись используется для определения источника тестов.
            </v-card-text>
            <v-card-text>
            Подпись состоит из:
            <ul>
                <li>ID автора</li>
                <li>ID кафедры, к которой автор прикреплён</li>
                <li>открытый ключ шифрования</li>
            </ul>
            </v-card-text>
            <v-card-text>
            Подпись для работы со сборщиком системы Smart Testing выдаётся в Тестовом Центре. Подписи генерируются сервером системы тестирования Smart Testing.
            </v-card-text>
            <v-card-text>
            <span style="color:#0167FF">Кто может получить подпись?</span><br>Подписи выдаются преподавательскому составу Академии МВД. <b style="color: orangered">Распространение подписи запрещено.</b>
            </v-card-text>
            <v-card-text>
            <span style="color:#0167FF">Свободная подпись</span><br>Энтузиастам и лицам, изъявившим желание написать тесты на свободную тему, предоставлена возможность использования свободной подписи. При её использовании желательно указать своё полное имя, псевдоним либо же использовать подпись в анонимном порядке.
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

<style>
    
</style>