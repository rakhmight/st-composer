export function getSubject(id, subjects, lang=undefined){
    let target = subjects.find(subject=>subject.id==id)
    if(target){
        return target.name.ru
    } else {
        return id
    }
}

export function getAuthor(id, sign){
    if(sign.id==id){
        return sign.fullName
    } else {
        return id
    }
}

export function getTheme(sub, theme, sign) {
    const target = sign.subjects.find(subject => subject.id == sub)

    if(target) {
        const themeTarget = target.themes.find(th => th.id == theme)
        if(themeTarget) return themeTarget.name.ru
    }
}

export function getThemes(sub, thems, sign){
    let target = sign.subjects.find(subject=>subject.id==sub)
    if(target){
        let themes = []
        thems.forEach(item=>{
            let ThTarget = target.themes.find(theme=> theme.id==item)
            if(ThTarget){
                themes.push(ThTarget.name.ru)
            } else {
                themes.push(item)
            }
        })

        return themes.join(', ')
    } else {
        return thems.join(', ')
    }
}

export function getLanguages(langs){
    let languages = []
    langs.forEach(lang=>{
        if(lang=='custom'){
            languages.push('Foreign')
        } else if(lang=='ru'){
            languages.push('Русский')
        } else if(lang=='eng'){
            languages.push('English')
        } else if(lang=='uz_l'){
            languages.push("O'zbek")
        } else if(lang=='uz_k'){
            languages.push('Ўзбек')
        } else if(lang=='de'){
            languages.push('Deutsch')
        } else if(lang=='fr'){
            languages.push('French')
        }
    })
    return languages.join(', ')
}