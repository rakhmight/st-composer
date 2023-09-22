<template>
    <div class="wrapper">
        <div class="container">
            <div class="instruction">
                <div class="todo">
                    <h3 style="text-align: center">ToDo:</h3>

                    <p style="color: black">Приношу свои извинения, но у меня не дотянулись руки, чтобы написать соответсвующию инструкцию по эксплуатации данного ПО. Эта программа написана на "скорую руку" и нелепо, но если <b>мне дадут время и ресурсы</b>, то в версии 2 система SmartTesting станет уникальной в своём роде. <br><br>Презентация SmartTesting v.2 доступна по ссылке: https://drive.google.com/file/d/1V3d5I723w4ZU8UJgNbQU0gBVwqiriGiq/view?usp=sharing</p>
                </div>

                <a
                @click="$router.go(-1)"
                class="mt-10"
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
        if(!this.currentSign){
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