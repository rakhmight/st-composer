<template>
    <div class="wrapper">
        <div class="auth__wrapper">
            <component :is="currentTab"></component>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OwnSignForm from '@/components/OwnSignForm.vue'
import FreeSignForm from '@/components/FreeSignForm.vue'

export default {
    components:{
        OwnSignForm,
        FreeSignForm
    },
    computed: mapGetters(['currentTab'])
}
</script>

<style>
.auth__wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
}
.card{
    width: 550px;
    min-height: 300px;
    background-color: #fff;
    margin-top: 170px;
    border-radius: 15px;
    padding: 20px;
}
.v-icon.v-icon::after{
    width: auto;
}
.v-dialog > .v-card > .v-card__text{
    color: #000
}
.auth__file-input.v-input{
    min-width: 100%;
}
</style>