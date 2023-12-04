<template>
    <div class="guide-template" v-if="subtitles.length">
        <div class="guide-content">
            <page-title
            :title="page.title"
            :icon="page.icon"
            />

            <subtitle :title="subtitles[0].title" :mark="subtitles[0].mark" />
            <paragraph :ctx="'Релиз программы'" />

            <subtitle :title="subtitles[1].title" :mark="subtitles[1].mark" />
            <paragraph :ctx="'Список изменений:'" />
            <simple-list :list="['Оптимизирован процесс отрисовки вопросов', 'Обновлёна реализация функции сохранения теста', 'Добавлен перевод интерфейса на узбекский язык']" />

            <subtitle :title="subtitles[2].title" :mark="subtitles[2].mark" />
            <paragraph :ctx="'Список изменений:'" />
            <simple-list :list="['Добавлена возможность загрузки тестов, подготовленных в word файле', 'Реализована возможность просмотра расширенной статистики (кол-во вопросов по темам, сложностям) теста', 'Изменён алгоритм симметричного шифрования при сохранении тестов' , 'Исправлены некоторые ошибки']" />

            <subtitle :title="subtitles[3].title" :mark="subtitles[3].mark" />
            <paragraph :ctx="'Список изменений:'" />
            <simple-list :list="['Добавлена проверка на одинаковые ответы внутри одного вопроса при подписании теста', 'Добавлена проверка на пропорцианальность ответов по длине между собой (разница не должна превышать 30 символов)', 'Добавлена функция, нормализирующая строки', 'Обновлён процесс нормализации строк при загрузке теста из word файла']" />

            <subtitle :title="subtitles[4].title" :mark="subtitles[4].mark" />
            <paragraph :ctx="'Список изменений:'" />
            <simple-list :list="['Добавлена проверка на совпадающие ответы между одинаковыми вопросами (при повторении более 2 ответов)', 'Увеличена разница длины ответов при проверки на их пропорцианальность (с 30 до 50)', 'Исправлены некоторые ошибки']" />

            <subtitle :title="subtitles[5].title" :mark="subtitles[5].mark" />
            <paragraph :ctx="'Список изменений:'" />
            <simple-list :list="['Добавлена проверка на наличие правильного ответа в вопросе', 'Добавлена возможность экспорта тестов (для работы с других компьютеров)', 'Обновлён порядок проверки подписи при её загрузке', 'Исправлены некоторые ошибки']" />
            
            <subtitle :title="subtitles[6].title" :mark="subtitles[6].mark" />
            <paragraph :ctx="'Список изменений:'" />
            <simple-list :list="['Добавлена проверка на похожие ответы между похожими и одинаковыми вопросами (выявление при 80% совпадении)', 'Обновлена функция, нормализирующая строки: реализована нормализация специальных симвмолов (повторяющихся символов)']" />

            <subtitle :title="subtitles[7].title" :mark="subtitles[7].mark" />
            <paragraph :ctx="'Список изменений:'" />
            <simple-list :list="['Обновлена визуализация найденных ошибок при подписании теста', 'Увеличена разница длины ответов при проверки на их пропорцианальность (с 50 до 70)', 'Увеличен показатель вероятности при проверке на похожие ответы между похожими и одинаковыми вопросами (с 80% до 85%)', 'Добавлены таймеры тестов (сроки жизни)', 'Подготовлена инструкция по использованию ПО', 'Проверка на идентичность и схожесть ответов в одинаковых и похожих вопросах осуществляется, если длина ответа больше 30 символов', 'Добавлена проверка на неизвестные символы (�)']" />
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
                    v-for="subtitle in subtitles"
                    :key="subtitle.mark"
                    class="subtitle-map-item"
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
                { title: 'Весрия 1.0.0', mark: 'p13-st-1' },
                { title: 'Весрия 1.1.0', mark: 'p13-st-2' },
                { title: 'Весрия 1.2.0', mark: 'p13-st-3' },
                { title: 'Весрия 1.3.0', mark: 'p13-st-4' },
                { title: 'Весрия 1.4.0', mark: 'p13-st-5' },
                { title: 'Весрия 1.5.0', mark: 'p13-st-6' },
                { title: 'Весрия 1.6.0', mark: 'p13-st-7' },
                { title: 'Весрия 1.7.0', mark: 'p13-st-8' },
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
