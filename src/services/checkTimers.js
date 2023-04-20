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
}