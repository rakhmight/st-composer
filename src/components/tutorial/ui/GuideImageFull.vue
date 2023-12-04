<template>
    <div class="w-full d-flex justify-center">
        <v-img
        :src="`/assets/guide/${src}`"
        max-width="60vw"
        max-height="75vh"
        ></v-img>
    </div>
</template>

<script>
export default {
    props:{
        src: String
    }
}
</script>
