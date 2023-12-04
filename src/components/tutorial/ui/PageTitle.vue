<template>
    <div style="margin-bottom: -40px">
        <div class="d-flex align-center" style="gap:10px">
            <v-icon size="26" color="var(--main-color)">{{ icon }}</v-icon>
            <span style="font-size: 1.2em; text-transform: uppercase; font-weight: 600;">{{ title }}</span>
        </div>

        <v-divider class="mt-3"></v-divider>
    </div>
</template>

<script>
export default {
    props:{
        icon: String,
        title: String
    }
}
</script>
