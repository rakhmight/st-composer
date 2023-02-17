<template>
    <div class="ball-box">
        <div>
            <v-text-field
            dense
            outlined
            v-model="minBall"
            :counter="4"
            :rules="[rules.emptyValue, rules.valueLength, rules.invalidValue, rules.valueIsNumber, rules.valueNotZero]"
            prepend-icon="mdi-minus-thick"
            label="Укажите минимальный балл"
            ></v-text-field>
            <v-text-field
            dense
            outlined
            v-model="maxBall"
            :counter="4"
            :rules="[rules.emptyValue, rules.valueLength, rules.invalidValue, rules.valueIsNumber, rules.valueNotZero]"
            prepend-icon="mdi-plus-thick"
            label="Укажите максимальный балл"
            ></v-text-field>
        </div>

        <v-text-field
        dense
        outlined
        v-model="ballInterval"
        :counter="4"
        :rules="[rules.emptyValue, rules.valueLength, rules.invalidValue, rules.valueIsNumber, rules.valueNotZero]"
        label="интервал между баллами"
        ></v-text-field>
    </div>
</template>

<script>
export default {
    props:{
        min: String,
        max: String,
        interval: String,
        settingsFunc: Function,

        currect: Boolean
    },
    data() {
        return {
            rules: {
                valueIsNumber: v => {
                    const pattern = /^[0-9]*\.?[0-9]*$/
                    if(pattern.test(v)){
                        this.valueIsNumber = true
                        return true
                    } else{
                        this.valueIsNumber = false
                        return 'Введённое значение должно быть числом'
                    }
                },
                valueNotZero: v => {
                    if(v!=0){
                        this.valueNotZero = true
                        return true
                    } else{
                        this.valueNotZero = false
                        return 'Введённое значение должно быть больше 0'
                    }
                },

                valueLength: v => {
                    if(v.length <= 4){
                        this.valueLength = true
                        return true
                    } else{
                        this.valueLength = false
                        return 'Значение не может быть больше 4-ёх значного числа (включая дробь)'
                    }
                },
                invalidValue: v => {
                    const start = /^0[0-9]+/
                    if(v.match(start)){
                        this.invalidValue = false
                        return 'Указано не валидное число'
                    } else{
                        this.invalidValue = true
                        return true
                    }
                },
                emptyValue: v => {
                    if(v.length!=0){
                        this.emptyValue = true
                        return true
                    } else{
                        this.emptyValue = false
                        return 'Обязательное поле для заполнения'
                    }
                }
            },

            minBall: this.min,
            maxBall: this.max,
            ballInterval: this.interval,

            valueIsNumber: false,
            valueNotZero: false,
            valueLength: false,
            invalidValue: false,
            emptyValue: false,

            ballIsCurrect: this.currect
        }
    },
    watch:{
        minBall(){
            this.settingsFunc('min', this.minBall)
        },
        maxBall(){
            this.settingsFunc('max', this.maxBall)
        },
        ballInterval(){
            this.settingsFunc('interval', this.ballInterval)
        },

        valueIsNumber(){
            if(this.valueIsNumber && this.valueNotZero && this.valueLength && this.invalidValue && this.emptyValue){
                this.ballIsCurrect = true
            } else{
                this.ballIsCurrect = false
            }
        },
        valueNotZero(){
            if(this.valueIsNumber && this.valueNotZero && this.valueLength && this.invalidValue && this.emptyValue){
                this.ballIsCurrect = true
            } else{
                this.ballIsCurrect = false
            }
        },
        valueLength(){
            if(this.valueIsNumber && this.valueNotZero && this.valueLength && this.invalidValue && this.emptyValue){
                this.ballIsCurrect = true
            } else{
                this.ballIsCurrect = false
            }
        },
        invalidValue(){
            if(this.valueIsNumber && this.valueNotZero && this.valueLength && this.invalidValue && this.emptyValue){
                this.ballIsCurrect = true
            } else{
                this.ballIsCurrect = false
            }
        },
        emptyValue(){
            if(this.valueIsNumber && this.valueNotZero && this.valueLength && this.invalidValue && this.emptyValue){
                this.ballIsCurrect = true
            } else{
                this.ballIsCurrect = false
            }
        },

        ballIsCurrect(){
            this.settingsFunc('currect', this.ballIsCurrect)
        }
        // valueIsNumber(){
        //     console.log(this.valueIsNumber)
        // }
    },
    // mounted() {
    //     console.log(this.valueIsNumber)
    // },
}
</script>

<style scoped>
.ball-box{
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
    justify-content: space-between;
    gap: 40px;
}
</style>