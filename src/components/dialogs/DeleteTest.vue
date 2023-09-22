<template>
    <v-dialog
        v-model="dialog"
        width="700"
        >
        <template v-slot:activator="{ on, attrs }">
            <div
            v-bind="attrs"
            v-on="on"
            class="dashboard__btn"
            >
            <v-icon color="#ff4500" size="19">mdi-trash-can-outline</v-icon>
            <span class="ml-1" style="color:#ff4500">{{ currentLang.dashboardView[87] }}</span>
            </div>
        </template>

        <v-card>
            <v-card-title
            class="text-h5 lighten-2 d-flex flex-row justify-space-between"
            >
                {{ currentLang.dashboardView[88] }}
            <v-icon color="red" @click="dialog=false" size="30">mdi-close-circle</v-icon>
            </v-card-title>

            <v-divider></v-divider>

            <div class="dialog-content">
                <div class="content__subject-box flex-column">
                    
                    <div class="d-flex flex-column">
                            <label class="body-2">{{ currentLang.dashboardView[89] }}: <b>{{ test.subjectID }}</b></label>
                            <div class="d-flex flex-row">
                                <v-text-field
                                dense
                                outlined
                                prepend-icon="mdi-pound"
                                v-model="subjectID"
                                :placeholder="currentLang.dashboardView[4]"
                                :error="deleteEr"
                                >
                                </v-text-field>
                            </div>
                        </div>
                </div>
                
            </div>

            <v-divider></v-divider>
            <v-card-actions class="d-flex align-items-center flex-column">

            <div class="dialog-errors-box">
                <v-alert
                color="red"
                dense
                dismissible
                elevation="3"
                type="error"
                class="subtitle-2"
                v-for="(error, i) in errors"
                :key="i"
                >{{ error }}</v-alert>

                <v-alert
                dense
                dismissible
                elevation="3"
                type="success"
                class="subtitle-2"
                v-if="deleteSuccess"
                >{{ currentLang.dashboardView[90] }}</v-alert>
            </div>

            <v-spacer></v-spacer>
            <v-btn
                color="red"
                small
                justify="center"
                width="200"
                :disabled="blockBtn"
                class="delete-btn"
                @click="deleteTest"
            >
                {{ currentLang.dashboardView[87] }}
            </v-btn>
            </v-card-actions>

            <v-progress-linear
            indeterminate
            color="#0167FF"
            background-color="#85aeea"
            height="5"
            v-if="showProgress"
            ></v-progress-linear>
        </v-card>
    </v-dialog>
</template>

<script>
import putToHistory from '@/services/putToHistory'
import { operationFromStore } from '@/services/localDB'
import { mapGetters } from 'vuex'

export default {
    props:{
        test: Object,
        renderFunc: Function
    },
    data() {
        return {
            dialog: false,
            deleteSuccess: false,
            errors: [],
            blockBtn: false,
            showProgress: false,
            subjectID: '',
            deleteEr: false
        }
    },
    computed: mapGetters(['currentLang']),
    methods:{
        deleteTest(){
            if(this.subjectID == this.test.subjectID){
                this.blockBtn = true
                this.showProgress = true

                let test
                operationFromStore('getByTestID',{id: this.test.id})
                .then(result=>{
                    result.status.isDeleted = true
                    let history = [
                        ...result.history,
                        putToHistory('delete', undefined)
                    ]

                    test = {
                        ...result,
                        history
                    }
                })
                .then(()=>{
                    operationFromStore('deleteTest',{id: this.test.id})
                    operationFromStore('addTest',{data:test})
                })
                .catch(e=>{
                console.error(this.currentLang.errors[0], e.message)
                this.$router.push('/')
                })

                setTimeout(()=>{
                    this.showProgress = false
                    this.deleteSuccess = true
                    setTimeout(()=>{
                        this.dialog = false
                        this.deleteSuccess = false
                        this.blockBtn = false
                        this.subjectID = ''
                        this.renderFunc(test)
                    },1000)
                },2000)
                

            } else{
                this.errors.push(this.currentLang.validators[7])
                this.deleteEr = true
            }
        }
    },
    watch:{
        subjectID(){
            this.errors = []
            this.deleteEr = false
        }
    }
}
</script>

<style scoped>
::-webkit-scrollbar {
    width: 6px; /* ширина для вертикального скролла */
    background-color: #b9b9b9;
}

.delete-btn.theme--light.v-btn {
    color: rgb(255 255 255 / 87%);
} 

.dialog-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 50vh;
    overflow-y: auto;
    overflow-x: hidden
}
.content__subject-box{
    padding: 30px;
    width: 100%;
    display: flex;
}
.content__template-box{
    padding: 30px;
    width: 100%;
}

.v-dialog > .v-card > .v-card__action{
    padding: 15px;
}
.v-card__actions{
    padding: 15px;
}
.v-list{
  padding: 0;
}
.v-dialog{
  overflow: hidden;
}
</style>