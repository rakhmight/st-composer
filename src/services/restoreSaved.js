import { operationFromStore } from '@/services/localDB'
import getCurrentDate from '@/plugins/getCurrentDate'
import putToHistory from '@/services/putToHistory'

export default function restoreSaved(id, saving, params){
    let test

    operationFromStore('getByTestID', {id})
    .then(result=>{
        test = result

        test.subjectID = saving.params.subjectID
        test.themes = saving.params.themes
        test.languagesSettings = saving.params.languagesSettings

        if(saving.params.ballSystem){
            test.ballSystem = saving.params.ballSystem
        }else{
            test.ballSystem = undefined
        }

        if(saving.params.considerDifficulty){
            test.considerDifficulty = saving.params.considerDifficulty
        }else{
            test.considerDifficulty = undefined
        }

        test.questions = saving.questions
        test.lastModified = getCurrentDate()
        test.history.push(putToHistory('restore', saving.date.date))

        if(params && params.presaving){
            test.history.push(putToHistory('save'))
        }
    })
    .then(()=>{
        operationFromStore('deleteTest', {id})
        .then(()=>{
            operationFromStore('addTest', {data: test})
        })
    })
    .catch(e=>{
        console.error('(DB) Ошибка! БД не инициализированно. Подробнее: ', e.message)
        this.$router.push('/')
    })
}