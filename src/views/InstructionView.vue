<template>
    <div class="wrapper">

        <div class="guide">
            <div class="guide-map-shadow"></div>
            <div class="guide-map">

                <p class="mt-5 mb-2" style="font-size: 1.1em; color: #fff; padding: 0 20px">Инструкция пользования</p>

                <div class="w-full d-flex flex-column" v-if="pages.length && page">
                    <div
                    v-for="item in pages"
                    :key="item.page"
                    class="map-item"
                    :style="page.page == item.page ? 'background: rgba(255, 255, 255, 0.089)' : ''"
                    @click="changePage(item)"
                    >
                        <v-icon size="20" :color="page.page == item.page ? '#fff' : '#d4d4d4'">{{ item.icon }}</v-icon>
                        <span :style="page.page == item.page ? 'color: #fff' : 'color: #d4d4d4'">{{ item.title }}</span>
                    </div>
                </div>
            
                <div class="d-flex w-full justify-center mt-10">
                    <v-btn
                    small
                    width="220"
                    color="#0d5fd8"
                    @click="$router.go(-1)"
                    >
                        <v-icon color="#fff" class="mr-1">mdi-arrow-left-thin</v-icon>
                        <span style="color: #fff">{{ currentLang.workspaceView[7] }}</span>
                    </v-btn>
                </div>
            </div>

            <div class="w-full h-full" v-if="page">
                <create-test-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'create-test'" />
                <workbench-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'workbench'" />
                <word-upload-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'word-upload'" />
                <test-saving-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'test-saving'" />

                <test-signing-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'test-signing'" />
                <test-saves-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'test-saves'" />
                <test-edit-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'test-edit'" />
                <test-info-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'test-info'" />
                <test-history-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'test-history'" />
                <test-deleting-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'test-deleting'" />
                <export-import-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'export-import'" />
                <timers-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'timers'" />

                <versions-history-guide :goToSubtitle="goToSubtitle" :page="page" v-if="page.page == 'versions'" />
                <smart-testing-v2 :page="page" v-if="page.page == 'st2'" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CreateTestGuide from '@/components/tutorial/pages/CreateTestGuide.vue';
import WorkbenchGuide from '@/components/tutorial/pages/WorkbenchGuide.vue';
import WordUploadGuide from '@/components/tutorial/pages/WordUploadGuide.vue'
import TestSavingGuide from '@/components/tutorial/pages/TestSavingGuide.vue'
import TestSigningGuide from '@/components/tutorial/pages/TestSigningGuide.vue';
import TestSavesGuide from '@/components/tutorial/pages/TestSavesGuide.vue';
import TestEditGuide from '@/components/tutorial/pages/TestEditGuide.vue';
import TestInfoGuide from '@/components/tutorial/pages/TestInfoGuide.vue';
import TestHistoryGuide from '@/components/tutorial/pages/TestHistoryGuide.vue';
import TestDeletingGuide from '@/components/tutorial/pages/TestDeletingGuide.vue';
import ExportImportGuide from '@/components/tutorial/pages/ExportImportGuide.vue';
import TimersGuide from '@/components/tutorial/pages/TimersGuide.vue';

import VersionsHistoryGuide from '@/components/tutorial/pages/VersionsHistoryGuide.vue';
import SmartTestingV2 from '@/components/tutorial/pages/SmartTestingV2.vue';

export default {
    components: {
        CreateTestGuide,
        VersionsHistoryGuide,
        SmartTestingV2,
        WorkbenchGuide,
        WordUploadGuide,
        TestSavingGuide,
        TestSigningGuide,
        TestSavesGuide,
        TestEditGuide,
        TestInfoGuide,
        TestHistoryGuide,
        TestDeletingGuide,
        ExportImportGuide,
        TimersGuide
    },
    mounted() {
        if(!this.currentSign){
          return this.$router.push('/')
        }

        this.preparePages()
        this.page = this.pages[0]
    },
    methods:{
        preparePages(){
            this.pages = [
                { page: 'create-test', title: 'Создание теста', icon: 'mdi-pencil-plus'},
                { page: 'workbench', title: 'Окно редактирования', icon: 'mdi-frequently-asked-questions'},
                { page: 'word-upload', title: 'Загрузка word файла', icon: 'mdi-file-word'},
                { page: 'test-saving', title: 'Сохранение теста', icon: 'mdi-content-save'},
                { page: 'test-signing', title: 'Подписание теста', icon: 'mdi-draw'},
                { page: 'test-saves', title: 'Экземпляры теста', icon: 'mdi-content-save-all'},
                { page: 'test-edit', title: 'Изменение параметров теста', icon: 'mdi-cog'},
                { page: 'test-info', title: 'Информация о тесте', icon: 'mdi-information'},
                { page: 'test-history', title: 'История теста', icon: 'mdi-history'},
                { page: 'test-deleting', title: 'Удаление теста', icon: 'mdi-delete'},
                { page: 'export-import', title: 'Эскпорт и импорт', icon: 'mdi-swap-vertical'},
                { page: 'timers', title: 'Таймеры', icon: 'mdi-timer-outline'},
                { page: 'versions', title: 'История версий', icon: 'mdi-alpha-v-circle'},
                { page: 'st2', title: 'SmartTesting v.2.0', icon: 'mdi-new-box'},
            ]
        },

        changePage(page){
            this.page = page
        },

        goToSubtitle(subtitle){
            document.getElementById(subtitle).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }
    },
    computed: mapGetters(['currentSign', 'currentLang']),
    data(){
        return {
            page: undefined,
            pages: []
        }
    },
}
</script>

<style>
.guide{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 300px auto;
    position: relative;
}

.guide-map{
    position:fixed;
    left: 0;
    min-height: 100%;
    min-width: 300px;
    background: #1f3763;
}

.map-item{
    width: 100%;
    display: flex;
    gap: 8px;
    padding: 6px 20px;
    align-content: center;
    font-size: 0.95em
}
.map-item:hover{
    cursor: pointer;
    color: #fff;
    background: rgba(255, 255, 255, 0.041);
}


/*  */

.guide-template{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row
}

.guide-content{
    width: 100%;
    height: 100%;
    padding: 22px 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.guide-subtitles{
    width: 350px;
    height: 100%;
    padding: 22px 15px 22px 0;
}

.subtitle-map-item{
    display: flex;
    align-items: flex-start;
    gap: 5px;
    padding: 5px 7px;
}
.subtitle-map-item:hover{
    cursor: pointer;
    background: #47474713
}
</style>