<template>
    <div class="wrapper">
        <div class="container">
            <div class="instruction">
                <div class="todo">
                    <h3 style="text-align: center">ToDo'шечка:</h3>
                    <ul>
                        <li>заставить пахать перевод</li>
                        <li>реализовать интерактивное задание связанное с рисованием</li>
                        <li>да прибудет подпись! Локальное шифрование тестов при хранении на устройстве</li>
                        <li>реализовать событие подписания теста (с full валидацией и оптимизацией тестов)</li>
                        <li>отдельное хранилище в БД для подписанных тестов (уже зашифрованных 2 ключами)</li>
                        <li>реализация возможности выгрузки теста и функционал автоудаления подписанных тестов в течении 10 дней</li>
                        <li>работа со свободной подписью</li>
                        <li>работа с импортом тестов</li>
                        <li>исправить свои рукоблудства (баги)</li>
                        <li>написать нормальную инструкцию</li>
                    </ul>
                </div>

                <div class="mt-10">
                    Developed with <v-icon color="red">mdi-heart</v-icon> by Diyor Rakhimov
                </div>

                <a
                @click="$router.go(-1)"
                >
                Назад
                </a>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    mounted() {
        if(!this.currentSign.id){
          return this.$router.push('/')
        }
    },
    computed: mapGetters(['currentSign']),
}
</script>

<style>
/* TEMP */
    .instruction{
        margin: 0 auto;
        width: 80%;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>