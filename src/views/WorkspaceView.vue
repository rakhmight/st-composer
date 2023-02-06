<template>
    <div class="wrapper">
        <div class="container">
            <div class="workspace">
                <div class="workspace__map">1</div>

                <div class="workspace__map-box"></div>
                <div class="workspace__content">

                    <!--  -->
                    <question />

                </div>

                <div class="workspace__tools-box">
                    <div class="workspace__tools">
                        <div>
                            <v-btn
                                small
                                dark
                                color="#105ae0"
                                class="mr-8"
                                >
                                    <v-icon size="20">mdi-plus</v-icon>
                                    Добавить вопрос
                            </v-btn>

                            <v-menu
                            top
                            offset-y
                            max-width="250"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    small
                                    dark
                                    color="#105ae0"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon
                                    size="22"
                                    >mdi-gesture-double-tap</v-icon>
                                    Интерактивное задание
                                    <v-icon
                                    size="22"
                                    >mdi-menu-down</v-icon>
                                </v-btn>
                                </template>

                                <v-list
                                class="header__list"
                                >
                                <v-btn
                                class="header__btn" 
                                small color="#eaeaea" 
                                v-for="(task, i) in tasks"
                                :key="i"
                                :disabled="task.isDisabled"
                                >
                                    <span v-if="!task.isDisabled" style="color:#0167FF">{{task.name}}</span>
                                    <span v-else style="color:#888">{{task.name}}</span>
                                </v-btn>
                                </v-list>
                            </v-menu>
                        </div>

                        
                        <v-btn
                            small
                            dark
                            text
                            class="caption"
                            >
                                <v-icon size="20" class="mr-1">mdi-book-open-page-variant-outline</v-icon>
                                Инструкция по эксплуатации
                                <v-icon size="16">mdi-open-in-new</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Question from '@/components/tests/Question.vue'

export default {
    data() {
        return {
            tasks:[
                {name:'выбор области на картинке', isDisabled: false, action(){}},
                {name:'скоро', isDisabled: true, action(){}}
            ],

            questions:[
                {number:1, type: 'basic'},
                // {number:2, type: 'interactive-field'}
            ]
        }
    },
    components:{
        Question
    }
}
</script>

<style>
.workspace{
    width: 100%;
    height: 100%;
    padding-top: 30px;
    display: grid;
    grid-template-columns: 270px auto;
    position: relative;
}


.workspace__map{
    width: 270px;
    position:fixed;
    height: 70vh;
    background-color: aliceblue;
    border-radius: 5px;
    padding: 15px;
}

.workspace__content{
    margin-bottom: 90px;
    padding-left: 40px;
    text-align: justify;
    display: grid;
    grid-template-rows: auto;
    gap: 40px;
}

.workspace__tools-box{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height: 60px;
    background-color: #414141;
    padding:10px;
    display: flex;
    align-items: center;
}

.workspace__tools{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>