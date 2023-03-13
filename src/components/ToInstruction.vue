<template>
    <v-btn
    small
    text
    class="caption"
    @click="goToInstruction"
    :disabled="!asyncComplate"
    >
       <v-icon v-if="currentRoute != 'dashboard'" size="20" class="mr-1" color="#fff">mdi-book-open-page-variant-outline</v-icon>
       <v-icon v-else size="20" class="mr-1" color="#0167ff">mdi-book-open-page-variant-outline</v-icon>
       <span v-if="currentRoute != 'dashboard'" style="color: #fff">{{ currentLang.instructionView[0] }}</span>
       <span v-else style="color: #0167ff">{{ currentLang.instructionView[0] }}</span>
       <v-icon  v-if="currentRoute != 'dashboard'" size="16" color="#fff">mdi-open-in-new</v-icon>
       <v-icon  v-else size="16" color="#0167ff">mdi-open-in-new</v-icon>
    </v-btn>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props:{
        saveFunc: Function,
        asyncComplate: Boolean
    },
    data() {
        return {
            currentRoute: this.$route.name
        }
    },
    computed: mapGetters(['currentLang']),
    methods:{
        goToInstruction(){
            if(this.saveFunc){
                this.saveFunc({forcedSave:true})
            }
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