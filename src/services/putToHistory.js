import getCurrentDate from '@/plugins/getCurrentDate'

export default function putToHistory(type, des=undefined, oldData=undefined, newData=undefined){
    return {
        date: getCurrentDate(),
        type,
        des,
        oldData,
        newData
    }
}