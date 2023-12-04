<template>
    <p :id="mark" class="subtitle">{{ title }}</p>
</template>

<script>
export default {
    props:{
        title: String,
        mark: String
    }
}
</script>

<style scoped>
.subtitle {
    color: var(--main-color);
    font-size: 1.2em;
    margin-top: 40px;
    padding: 7px 15px;
    background-color: #c6cad6;
    border-left: 5px solid var(--main-color);
    scroll-margin-top:90px;
}

.subtitle:hover{
    text-decoration: underline;
    cursor: pointer;
}
</style>
