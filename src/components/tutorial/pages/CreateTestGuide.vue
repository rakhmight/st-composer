<template>
    <div class="guide-template" v-if="subtitles.length">
        <div class="guide-content">
            <page-title
            :title="page.title"
            :icon="page.icon"
            />

            <subtitle :title="subtitles[0].title" :mark="subtitles[0].mark" />
            <paragraph :ctx="
                `Для создания нового теста необходимо  нажать на кнопку <span style='color: var(--main-color)'><b>Создать тест</b></span>, расположенную на правом верхнем углу главной панели.`
            " />
            <guide-image :src="'1.png'" />
            <paragraph :ctx="
                `После нажатия откроется окно. В окне нужно указать параметры нового теста:`
            " />
            <guide-image :src="'2.png'" />
            <numeric-list :list="[
                `<b>Предмет</b>, по которому подготавливается тест - его нужно выбрать из списка или набрать вручную <span style='color:#555'>(при нажатии на кнопку справа вместо списка появится поле ввода)</span>`
            ]" />
            <guide-image :src="'5.png'" />
            <guide-image :src="'6.png'" />
            <numeric-list :start="2" :list="[
                `<b>Темы</b>, по которым подготавливается тест - их нужно выбрать из списка или набрать вручную <span style='color:#555'>(при наборе вручную необходимо написать идентификатор предмета)</span>`,
            ]" />
            <guide-image :src="'7.png'" />
            <guide-image :src="'8.png'" />
            <numeric-list :start="3" :list="[
                `<b>Основной язык теста</b> - т.е. язык, на котором вы будете составлять тест <span style='color:#555'>(доступные языки: <i>русский, английский, узбекская латиница, узбекская кирилица, немецкий, французский, иностранный/другой</i>)</span>`
            ]" />
            <guide-image :src="'9.png'" />
            <numeric-list :start="4" :list="[
                `<b>Учитывание сложности</b> - при включении этого параметра каждому вопросу станет возможно назначение сложности <span style='color:#555'>(сложности: <i>лёгкий, средний, сложный</i>)</span>`,
                `<b>Бальная система</b> - если включить данный параметр будет возможно устанавливать полученный балл за правильный ответ каждому вопросу в тесте. При этом необходимо будет дополнительно настроить максимальный и минимальный балл, который будет возможно установить вопросу`,
            ]" />
            <guide-image :src="'3.png'" />
            <guide-image :src="'4.png'" />
            <numeric-list :start="6" :list="[
                `<b>Дополнительные языки теста</b> - если выбрать параметр <span style='color: var(--main-color)'>Мультиязычный тест</span> и выбрать предпочитаемые языки из списка <span style='color:#555'>(будут представлены все языки, кроме основного)</span>, то станет возможным написание тестов сразу на выбранных языках <span style='color:#555'>(в окне редактирования теста появятся дополнительные поля для каждого языка)</span>`
            ]" />
            <guide-image :src="'10.png'" />
            <guide-image :src="'11.png'" />
            <prompt :type="'info'" :ctx="
                `При включении в список используемых языков <b>узбекскую латиницу</b> одновременно с <b>кирилицей</b> в рабочем окне <span style='color:#555'>(окно, где составляются тесты)</span>  появиться обязательный режим синхронного перевода. Программа сама будет переводить латиницу в кирилицу и наоборот - вам предлогаеться выбрать лишь режим перевода <span style='color:#555'>(с латиницы ‣ на кирилицу, с кирилицы ‣ на латиницу)</span>.<br>Если один из них был ваыбран как основной язык, то режим синхронного перевода будет подстроен под него.`
            " :media="['12.png', '13.png']" />
            <paragraph :ctx="
                `После установки всех необходимых настроек и нажатия кнопки <span style='color: var(--main-color)'><b>Создать</b></span> на главной панели появиться карточка этого теста, а вас перекинет в окно редактирования теста.`
            " />

            <subtitle :title="subtitles[1].title" :mark="subtitles[1].mark" />
            <paragraph :ctx="
                `Все созданные и импортированные тесты отображаються на главной панели в виде карточек. Через них осуществляются различного рода взаимодействия с тестами, такие как: переход в окно редактирования теста, просмотр информации и статистики о тесте, изменение основных параметров теста, просмотр истории действий в текущем тесте, работа с сохранёнными экземплярами теста, удаление теста, экспортирование, а также его выгрузка после подписания.`
            " />
            <guide-image :src="'14.png'" />
            <numeric-list :list="[
                `Кнопка, которая открывает меню со списком различных действий, которые можно реализовать с текущим тестом`,
                `Кнопка, с помощью которой можно перейти в окно для редактирования текущего теста`,
            ]" />
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
                { title: 'Первые шаги: создание теста', mark: 'p1-st-1' },
                { title: 'Рабочая карточка теста', mark: 'p1-st-2' }
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
