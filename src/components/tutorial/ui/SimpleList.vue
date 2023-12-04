<template>
    <div>
        <div v-for="item in list" :key="item" class="d-flex" style="gap: 10px">
            <span class="ctx" style="font-weight: 600; color: var(--main-color)">-</span>
            <span class="ctx" v-html="item"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array
    }
}
</script>

<style scoped>
.ctx{
    color: #000;
    font-size: 0.95em;
    text-align: justify;
}

.ctx:hover{
    cursor:default;
}
</style>
