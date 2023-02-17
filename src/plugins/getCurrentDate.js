export default () => {
    let date = new Date()

    let day = ''+date.getDate()
    if(day.length==1){
        day = '0'+day
    }

    let month = ''+(date.getMonth()+1)
    if(month.length==1){
        month = '0'+month
    }

    let outputDate = `${day}.${month}.${date.getFullYear()}`
    let outputTime = `${date.getHours()}:${date.getMinutes()}`

    return {
        date: outputDate,
        time: outputTime,
        full: date
    }
}