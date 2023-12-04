<template>
    <div>
        <div v-for="(item,i) in list" :key="i" class="d-flex" style="gap: 10px">
            <span class="ctx" style="font-weight: 600; color: var(--main-color)">{{ !start ? i+1 : start+i }}.</span>
            <span class="ctx" v-html="item"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array,
        start: Number
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
