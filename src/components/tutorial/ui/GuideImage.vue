<template>
    <div class="w-full d-flex justify-center">
        <v-img
        :src="`/assets/guide/${src}`"
        max-width="85vh"
        max-height="50vh"
        contain
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
