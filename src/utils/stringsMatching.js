const levenshtein = require('js-levenshtein');

export function stringsMatching(testStr, checkedStr, percent){
    if(testStr && checkedStr){
        const tokenSize = prepareString(checkedStr).length % 2 === 0 ? 2 : 3
        const tokenizedTestStr = tokenization(testStr, tokenSize)
        const tokenizedCheckedStr = tokenization(checkedStr, tokenSize)
    
        const matchSet = tokenizedTestStr.map(testToken => {
            const target = tokenizedCheckedStr.find(checkedToken => checkedToken === testToken)

            if(target){
                const index = tokenizedCheckedStr.indexOf(target)
                tokenizedCheckedStr.slice(index, 1)
                return true
            } else return false
        })

        const numberOfCoincidences = matchSet.filter(value => value)
        const probabilityOfSimilarity= numberOfCoincidences.length*100/tokenizedTestStr.length
        const levenshteinAlg = levenshtein(prepareString(testStr), prepareString(checkedStr))
        // console.log(probabilityOfSimilarity, levenshteinAlg);
        if(probabilityOfSimilarity > percent) return true
        else {
            if(probabilityOfSimilarity > 20){
                if(levenshteinAlg < 15) return true
                else false
            } else false
        }
    }
}

export function prepareString(str){
    if(str){
        str = str.toLowerCase();
        str = str.replaceAll(' ', '')
        str = str.replaceAll('\n', '')
        str = str.replace(/[^0-9a-zа-яА-ЯA-Ba-zA-ZäöüßÄÖÜẞa-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒҲҳҒғҚқЎў]/g, '')
        return str
    } else return str
}

function tokenization(str, size){
    str = prepareString(str)

    if(size == 2){
        const tokens = str.split(/(..)/gi).filter(s => s);
        return tokens
    } else if(size == 3){
        const tokens = str.split(/(...)/gi).filter(s => s);
        return tokens
    }
}

// tokenization('asdfasd dasd as fsadfsdfasg \nsa gagsaSAD dasf')
// const s1 = 'Как звали того мореходца, который открыл Амер и съел там овощь, который мест жители называли кукурузой?'
// const s2 = 'Как звали того мореходца, который открыл Америку и съел там овощь, который местные жители называли кукурузой?'

// console.log(stringsMatching(s1, s2, 75));