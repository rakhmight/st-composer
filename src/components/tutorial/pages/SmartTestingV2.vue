<template>
    <div class="guide-template">
        <div class="guide-content" width="100%">
            <page-title
            :title="page.title"
            :icon="page.icon"
            />

            <div class="mt-15 d-flex flex-column" style="gap: 20px">
                <guide-image-full :src="'presentation/st2-1.jpg'" />
                <guide-image-full :src="'presentation/st2-2.jpg'" />
                <guide-image-full :src="'presentation/st2-3.jpg'" />
                <guide-image-full :src="'presentation/st2-4.jpg'" />
                <guide-image-full :src="'presentation/st2-5.jpg'" />
                <guide-image-full :src="'presentation/st2-6.jpg'" />
                <guide-image-full :src="'presentation/st2-7.jpg'" />
                <guide-image-full :src="'presentation/st2-8.jpg'" />
                <guide-image-full :src="'presentation/st2-9.jpg'" />
                <guide-image-full :src="'presentation/st2-10.jpg'" />
                <guide-image-full :src="'presentation/st2-11.jpg'" />
                <guide-image-full :src="'presentation/st2-12.jpg'" />
                <guide-image-full :src="'presentation/st2-13.jpg'" />
                <guide-image-full :src="'presentation/st2-14.jpg'" />
                <guide-image-full :src="'presentation/st2-15.jpg'" />
                <guide-image-full :src="'presentation/st2-16.jpg'" />
                <guide-image-full :src="'presentation/st2-17.jpg'" />
                <guide-image-full :src="'presentation/st2-18.jpg'" />
                <guide-image-full :src="'presentation/st2-19.jpg'" />
                <guide-image-full :src="'presentation/st2-20.jpg'" />
                <guide-image-full :src="'presentation/st2-21.jpg'" />
                <guide-image-full :src="'presentation/st2-22.jpg'" />
            </div>
        </div>
    </div>
</template>


<script>
import PageTitle from '../ui/PageTitle.vue';
import GuideImage from '../ui/GuideImage.vue';
import GuideImageFull from '../ui/GuideImageFull.vue';

export default {
    props: {
        page: Object
    },
    components: {
        PageTitle,
        GuideImageFull
    },
}
</script>
