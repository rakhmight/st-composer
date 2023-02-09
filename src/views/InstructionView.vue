<template>
    <div class="wrapper">
        <div class="container">
            <div class="instruction">
                <a @click="root">root</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        root(){
            this.$router.push('/')
        }
    }
}
</script>

<style>
    
</style>