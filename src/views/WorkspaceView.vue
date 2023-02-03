<template>
    <div class="wrapper">
        <div class="container">
            <div class="workspace">
                <div class="workspace__tools">1</div>

                <div class="workspace__tools-box"></div>
                <div class="workspace__content">

                    <!--  -->
                    <question />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Question from '@/components/tests/Question.vue'

export default {
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


.workspace__tools{
    width: 270px;
    position:fixed;
    height: 84vh;
    background-color: aliceblue;
    border-radius: 5px;
    padding: 15px;
}

.workspace__content{
    margin-bottom: 30px;
    padding-left: 40px;
    text-align: justify;
    display: grid;
    grid-template-rows: auto;
    gap: 40px;
}
</style>