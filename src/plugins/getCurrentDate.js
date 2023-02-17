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

    let hours = ''+date.getHours()
    if(hours.length==1){
        hours = '0'+hours
    }

    let minutes = ''+date.getMinutes()
    if(minutes.length==1){
        minutes = '0'+minutes
    }

    let outputDate = `${day}.${month}.${date.getFullYear()}`
    let outputTime = `${hours}:${minutes}`

    return {
        date: outputDate,
        time: outputTime,
        full: date
    }
}