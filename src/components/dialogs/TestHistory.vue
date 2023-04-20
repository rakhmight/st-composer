<template>
    <v-dialog
        v-model="dialog"
        width="800"
        >
        <template v-slot:activator="{ on, attrs }">
            <div
            v-bind="attrs"
            v-on="on"
            class="dashboard__btn"
            >
            <v-icon color="#0167FF" size="19">mdi-clock-time-eight-outline</v-icon>
            <span class="ml-1">{{ currentLang.dashboardView[60] }}</span>
            </div>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
                {{ currentLang.dashboardView[61] }}
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    <div class="content__subject-info mb-5">
                        <div><span style="color:#0167FF"><b>► </b></span> - {{ currentLang.dashboardView[62] }}</div>
                        <div><span style="color:blueviolet"><b>► </b></span> - {{ currentLang.dashboardView[63] }}</div>
                        <div><span style="color:#ad8011"><b>►</b></span>/<span style="color:#27900dfa"><b>► </b></span> - {{ currentLang.dashboardView[64] }}</div>
                        <div><span style="color:#0c2242"><b>► </b></span> - {{ currentLang.dashboardView[65] }}</div>
                        <div><span style="color:#ff4500"><b>► </b></span> - {{ currentLang.dashboardView[66] }}</div>
                    </div>
                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">
                                {{ currentLang.dashboardView[67] }}
                            </th>
                            <th class="text-center">{{ currentLang.dashboardView[68] }}</th>
                            <th class="text-left">
                                {{ currentLang.dashboardView[69] }}
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="(action, i) in test.history"
                            :key="i"
                            >
                            <td v-if="action.type=='change' && action.des=='ballInterval'"><span style="color:blueviolet"><b>► </b></span>{{ currentLang.dashboardView[70] }}: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='minBall'"><span style="color:blueviolet"><b>► </b></span>{{ currentLang.dashboardView[71] }}: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='maxBall'"><span style="color:blueviolet"><b>► </b></span>{{ currentLang.dashboardView[72] }}: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='ball-dissabled'"><span style="color:blueviolet"><b>► </b></span>{{ currentLang.dashboardView[73] }} <span style="color: red">{{ currentLang.dashboardView[74] }}</span></td>
                            <td v-if="action.type=='change' && action.des=='ball-enabled'"><span style="color:blueviolet"><b>► </b></span>{{ currentLang.dashboardView[73] }} <span style="color: green">{{ currentLang.dashboardView[75] }}</span></td>
                            <td v-if="action.type=='change' && action.des=='difficulty-dissabled'"><span style="color:blueviolet"><b>► </b></span>{{ currentLang.dashboardView[76] }} <span style="color: red">{{ currentLang.dashboardView[77] }}</span></td>
                            <td v-if="action.type=='change' && action.des=='difficulty-enabled'"><span style="color:blueviolet"><b>► </b></span>{{ currentLang.dashboardView[76] }} <span style="color: green">{{ currentLang.dashboardView[78] }}</span></td>
                            <td v-if="action.type=='change' && action.des=='multilingual-dissabled'"><span style="color:blueviolet"><b>► </b></span>Несколько языков: <span style="color: red">отключено</span></td>
                            <td v-if="action.type=='change' && action.des=='multilingual-enabled'"><span style="color:blueviolet"><b>► </b></span>Несколько языков: <span style="color: green">включено</span></td>

                            <td v-if="action.type=='change' && action.des=='languages'"><span style="color:blueviolet"><b>► </b></span>Языки: <b>{{ getLanguages(action.oldData) }}</b></td>

                            <td v-if="action.type=='change' && action.des=='themes'"><span style="color:blueviolet"><b>► </b></span>{{ currentLang.dashboardView[79] }}: <b>{{ action.oldData.join(', ') }}</b></td>
                            <td v-if="action.type=='change' && action.des=='subject'"><span style="color:blueviolet"><b>► </b></span>{{ currentLang.dashboardView[80] }}: <b>{{ action.oldData }}</b></td>
                            <td v-if="action.type=='create'"><span style="color:#0167FF"><b>► {{ currentLang.dashboardView[81] }}</b></span></td>
                            <td v-if="action.type=='save'"><span style="color:#ad8011"><b>► {{ currentLang.dashboardView[82] }}</b></span></td>
                            <td v-if="action.type=='signed'"><span style="color:#0c2242"><b>► {{ currentLang.dashboardView[83] }}</b></span></td>
                            <td v-if="action.type=='delete'"><span style="color:#ff4500"><b>► {{ currentLang.dashboardView[84] }}</b></span></td>
                            <td v-if="action.type=='restore'"><span style="color:#27900dfa"><b>► {{ currentLang.dashboardView[85] }}</b></span></td>

                            <td v-if="action.type=='signed'" class="text-center">{{ getCurrectDate(action.date) }}</td>
                            <td v-if="action.type=='change' && action.des!='difficulty-dissabled' && action.des!='difficulty-enabled' && action.des!='ball-dissabled' && action.des!='ball-enabled' && action.des!='multilingual-dissabled' && action.des!='multilingual-enabled'"  class="text-center">→<br>{{ action.date.date }} {{ action.date.time }}</td>
                            <td v-else class="text-center">{{ action.date.date }} {{ action.date.time }}</td>

                            <td v-if="action.type=='change' && action.des!='themes' && action.des!='languages'"><b>{{ action.newData }}</b></td>
                            <td v-if="action.type=='change' && action.des=='themes'"><b>{{ action.newData.join(', ') }}</b></td>
                            <td v-if="action.type=='change' && action.des=='languages'"><b>{{ getLanguages(action.newData) }}</b></td>
                            <td v-if="action.type=='restore'"><b>{{ currentLang.dashboardView[86] }}: {{ action.des }}</b></td>
                            <td v-if="action.type!='change' && action.type!='restore'"></td>  
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props:{
        test: Object
    },
    data() {
        return {
            dialog: false
        }
    },
    computed: mapGetters(['currentLang']),
    methods:{
        getCurrectDate(date){
            if((date.getMonth()+1) < 9){
                return `${date.getDate()}.0${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
            } else{
                return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
            }
        },
        getLanguages(langs){
            let languages = []
            langs.forEach(lang => {
                if(lang=='custom'){
                    languages.push('Foreign')
                }else if(lang=='ru'){
                    languages.push('Русский')
                } else if(lang=='eng'){
                    languages.push('English')
                } else if(lang=='uz_l'){
                    languages.push("O'zbek")
                } else if(lang=='uz_k'){
                    languages.push('Ўзбек')
                }
            })
            return languages.join(', ')
        }
    }
}
</script>

<style scoped>
.edit-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
}

.dialog-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.content__subject-box{
    padding: 30px;
    width: 100%;
    display: flex;
    max-height: 500px;
    overflow-y: scroll;
}

.content__subject-info{
    display: grid;
    grid-template-columns: repeat(5, 0.2fr);
    gap:10px;
    justify-content: space-between;
    font-size: 0.9em;
    width: 100%;
}
</style>