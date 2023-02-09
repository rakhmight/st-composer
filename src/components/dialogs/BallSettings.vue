<template>
    <div class="ball-box">
        <div>
            <v-text-field
            dense
            outlined
            :value="editData ? editData.oldMinBall : getMinBall"
            @change="updateMin"
            :counter="4"
            :rules="[rules.emptyValue, rules.valueLength, rules.invalidValue, rules.valueIsNumber, rules.valueNotZero]"
            prepend-icon="mdi-minus-thick"
            label="Укажите минимальный балл"
            ></v-text-field>
            <v-text-field
            dense
            outlined
            :value="editData ? editData.oldMaxBall : getMaxBall"
            change="updateMax"
            :counter="4"
            :rules="[rules.emptyValue, rules.valueLength, rules.invalidValue, rules.valueIsNumber, rules.valueNotZero]"
            prepend-icon="mdi-plus-thick"
            label="Укажите максимальный балл"
            ></v-text-field>
        </div>

        <v-text-field
        dense
        outlined
        :value="editData ? editData.oldInterval : getBallInterval"
        change="updateInterval"
        :counter="4"
            :rules="[rules.emptyValue, rules.valueLength, rules.invalidValue, rules.valueIsNumber, rules.valueNotZero]"
        label="интервал между баллами"
        ></v-text-field>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    props:{
        toEdit: Object,
        mode: String
    },
    data() {
        return {
            rules: {
                valueIsNumber: v => {
                    const pattern = /^[0-9]*\.?[0-9]*$/
                    return pattern.test(v) || 'Введённое значение должно быть числом'
                },
                valueNotZero: v => {
                    return v!=0 || 'Введённое значение должно быть больше 0'
                },

                valueLength: v => {
                    return v.length <= 4 || 'Значение не может быть больше 4-ёх значного числа (включая дробь)'
                },
                invalidValue: v => {
                    const start = /^0[0-9]+/
                    const pattern = /^0(?=\.)/
                    if(v.match(start)){
                        return 'Указано не валидное число'
                    }
                    return true
                },
                emptyValue: v => {
                    return v.length!=0 || 'Обязательное поле для заполнения'
                }
            },

            editData: this.toEdit
        }
    },
    computed: {
        ...mapGetters(['getMinBall', 'getMaxBall', 'getBallInterval']),
    },
    methods: {
        ...mapMutations(['updateMin', 'updateMax', 'updateInterval'])
    },
    mounted() {
        if(this.mode=='create'){
            this.$store.commit('updateMin', '0.01')
            this.editData = null
        }
        else if(this.mode == 'edit'){
            this.$store.commit('updateMin', this.toEdit.oldMinBall)
        }
    }, 
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