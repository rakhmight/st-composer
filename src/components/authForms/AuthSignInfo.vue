<template>

    <v-dialog
    v-model="dialog"
    width="800"
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
            {{ currentLang.authView[8] }}
            </v-card-title>

            <v-card-text>
                <b>{{ currentLang.authView[9] }}</b> - {{ currentLang.authView[10] }}
            </v-card-text>
            <v-card-text>
                {{ currentLang.authView[11] }}
                <ul>
                    <li>{{ currentLang.authView[12] }}</li>
                    <li>{{ currentLang.authView[13] }}</li>
                    <li>{{ currentLang.authView[14] }}</li>
                    <li>{{ currentLang.authView[15] }}</li>
                </ul>
            </v-card-text>
            <v-card-text>
                {{ currentLang.authView[16] }}
            </v-card-text>
            <v-card-text>
            <span style="color:#0167FF">{{ currentLang.authView[17] }}</span><br>{{ currentLang.authView[18] }} <b style="color: orangered">{{ currentLang.authView[19] }}</b>
            </v-card-text>
            <v-card-text>
            <span style="color:#0167FF">{{ currentLang.authView[20] }}</span><br>{{ currentLang.authView[21] }} <b style="color: orangered">{{ currentLang.authView[23] }}</b>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="#0167FF"
                text
                @click="dialog = false"
                small
            >
                {{ currentLang.authView[22] }}
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            dialog: false,
        }
    },
    computed: mapGetters(['currentLang']),
}
</script>

<style>
    
</style>