<template>
    <div class="guide-template" v-if="subtitles.length">
        <div class="guide-content">
            <page-title
            :title="page.title"
            :icon="page.icon"
            />

            <subtitle :title="subtitles[0].title" :mark="subtitles[0].mark" />
            <subtitle :title="subtitles[1].title" :mark="subtitles[1].mark" />
            <subtitle :title="subtitles[2].title" :mark="subtitles[2].mark" />
        </div>

        <div class="guide-subtitles mb-6">
            <div style="position: fixed; width: 250px">
                <div class="mb-6">
                    <p class="mb-2 mt-2" style="font-size: 1em; color: #777;">Содержание</p>
                    <v-divider class="mt-2"></v-divider>
                </div>

                <div class="d-flex align-center mb-1" style="gap:5px">
                    <v-icon size="16" color="#777">{{ page.icon }}</v-icon>
                    <span style="font-size: 0.8em; text-transform: uppercase; font-weight: 600; color: #777">{{ page.title }}</span>
                </div>

                <div>
                    <div
                    class="subtitle-map-item"
                    v-for="subtitle in subtitles"
                    :key="subtitle.mark"
                    @click="goToSubtitle(subtitle.mark)"
                    >
                        <v-icon style="margin-top: 5px" size="8" color="var(--main-color)">mdi-circle</v-icon>
                        <span style="color: #666; font-size: 0.8em;">{{ subtitle.title }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import PageTitle from '../ui/PageTitle.vue';
import Subtitle from '../ui/Subtitle.vue';
import Paragraph from '../ui/Paragraph.vue';
import Prompt from '../ui/Prompt.vue';
import GuideImage from '../ui/GuideImage.vue';
import NumericList from '../ui/NumericList.vue';
import SimpleList from '../ui/SimpleList.vue';

export default {
    props: {
        page: Object,
        goToSubtitle: Function
    },
    data(){
        return {
            subtitles: []
        }
    },
    mounted(){
        this.prepareSubtitles()
    },
    methods:{
        prepareSubtitles(){
            this.subtitles = [
                { title: 'Импорт теста', mark: 'p12-st-1' },
                { title: 'Эспорт теста', mark: 'p12-st-2' },
                { title: 'Возвращённые тесты', mark: 'p12-st-3' }
            ]
        }
    },
    components: {
        PageTitle,
        Subtitle,
        Paragraph,
        Prompt,
        GuideImage,
        NumericList,
        SimpleList
    },
}
</script>
