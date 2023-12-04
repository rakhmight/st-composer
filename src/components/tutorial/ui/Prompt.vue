<template>
    <div class="prompt" :style="type == 'info' ? 'border-color: #0d5fd87d; background: #9db3e61f' : 'border-color: #d8900b8c; background: #dee69d1f'">
        <div class="d-flex align-start" style="gap: 15px">
            <v-icon v-if="type=='info'" color="var(--main-color)" size="20">mdi-information</v-icon>
            <v-icon v-if="type=='warn'" color="#d8900b" size="20">mdi-alert</v-icon>
            <span class="ctx" v-html="ctx"></span>
        </div>

        <div class="d-flex flex-column align-center" style="gap: 7px" v-if="media && media.length"> 
            <v-img
            v-for="(img, i) in media"
            :key="i"
            :src="`/assets/guide/${img}`"
            max-width="85vh"
            max-height="30vh"
            contain
            ></v-img>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        type: String,
        ctx: String,
        media: Array
    }
}
</script>


<style scoped>

.prompt{
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    gap: 15px;
}

.ctx{
    color: #000;
    font-size: 0.9em;
    text-align: justify;
}

.ctx:hover{
    cursor:default;
}
</style>
