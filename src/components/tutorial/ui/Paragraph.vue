<template>
    <p class="ctx" v-html="ctx"></p>
</template>

<script>
export default {
    props:{
        ctx: String
    }
}
</script>

<style scoped>
.ctx{
    color: #000;
    font-size: 0.95em;
    text-align: justify;
    text-indent: 30px;
}

.ctx:hover{
    cursor:default;
}
</style>

