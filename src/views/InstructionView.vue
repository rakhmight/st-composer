<template>
    <div class="wrapper">
        <div class="container">
            <div class="instruction">
                <a
                @click="$router.go(-1)"
                >Назад</a>
                <br>
                <div>
                    Developed with <v-icon color="red">mdi-heart</v-icon> by Diyor Rakhimov
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
    
</style>