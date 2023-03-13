export default function (min, max){
    const minDividers = []
    const maxDividers = []
    let result=[]

    for(let i = 0; i<=min; i+=0.01){
        let minDev = Number.isInteger(min/i.toFixed(2))
        if(minDev) {
            minDividers.push(i.toFixed(2))
        }
    }

    for(let g = 0; g<=max; g+=0.01){
        let maxDev = Number.isInteger(max/g.toFixed(2))
        if(maxDev){
            maxDividers.push(g.toFixed(2))
        }
    }

    for(let k = 0; k!=maxDividers.length; k++){
        for(let h=0; h!=minDividers.length; h++){
            if(maxDividers[k]==minDividers[h]){
                result.push(maxDividers[k])
            }
        }
    }

    result = new Set(result)
    result = Array.from(result)
    return result
}