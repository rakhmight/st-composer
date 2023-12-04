import { operationFromStore } from "./localDB";

export default async function checkTimers(){
    operationFromStore('getTimers')
    .then(timers=>{
        timers.forEach(async (timer)=>{
            if(new Date(timer.date.getTime()+1296000000)<new Date()){
                // удаление tests & timer
                await operationFromStore('deleteTest', { id: timer.testID })
                .then(async ()=>{
                    await operationFromStore('deleteTimer', { id: timer.id })
                })
            }
        })
    })
    
    operationFromStore('getAllTestsFromDB')
    .then(tests => {
        tests.forEach(async (test)=>{
            if(!test.status.isSigned){
                if(!test.status.isExported){
                    if(new Date(test.creationDate.full.getTime()+5184000000)<new Date()){
                        await operationFromStore('deleteTest', { id: test.id })
                    }
                } else {
                    if(new Date(test.creationDate.full.getTime()+864000000)<new Date()) {
                        await operationFromStore('deleteTest', { id: test.id })
                    }
                }
            }
        })
    })
}