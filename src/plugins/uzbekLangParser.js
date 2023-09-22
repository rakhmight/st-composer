import { sanitizeString } from '@/utils/sanitizeString'

export default function uzbekLangParser(ctx, mode){
    let words = ctx.split('')
    const result = []
    const quotes = []
    const quotesPair = []
    const wordsInQuotes = []

    const wordsCopy = [...words]

    words.filter((word, index) => {
        if(word === `"`) quotes.push(index)
    })

    let counter = 0
    let arrayID = 0
    for(let quote of quotes){
        if(counter < 2){
            if(counter == 0){
                quotesPair.push([quote])
            } else {
                quotesPair[arrayID].push(quote)
            }
            counter++
        } else {
            counter = 1
            arrayID++

            quotesPair.push([quote])
        }

        // if(counter!=2){
        //     if(counter == 0){
        //         quotesPair.push([quote])
        //     } else {
        //         quotesPair[arrayID].push(quote)
        //     }

        //     counter++
        // } else {
        //     arrayID++
        //     counter = 0

        //     console.log(1);
        //     quotesPair.push([quote])
        //     counter++
        // }
    }

    for(let pair of quotesPair){
        if(pair[1]){
            const word = words.splice(pair[0]+1, (pair[1]-pair[0])-1)
            // console.log(pair[0], pair[1]);
            wordsInQuotes.push([word])
            words = []
            words = [...wordsCopy]
        }
    }
    // console.log(quotesPair);
    // console.log(wordsInQuotes);

    if(mode == 'lotin'){
        words.forEach(word => {
            switch(word){
                case 'A':
                    result.push('А');
                    break;
                case 'B':
                    result.push('Б');
                    break;
                case 'D':
                    result.push('Д');
                    break;
                case 'E':
                    result.push('Е');
                    break;
                case 'F':
                    result.push('Ф');
                    break;
                case 'G':
                    result.push('Г');
                    break;
                case 'H':
                    result.push('Ҳ');
                    break;
                case 'I':
                    result.push('И');
                    break;
                case 'J':
                    result.push('Ж');
                    break;
                case 'K':
                    result.push('К');
                    break;
                case 'L':
                    result.push('Л');
                    break;
                case 'M':
                    result.push('М');
                    break;
                case 'N':
                    result.push('Н');
                    break;
                case 'O':
                    result.push('О');
                    break;
                case 'P':
                    result.push('П');
                    break;
                case 'Q':
                    result.push('Қ');
                    break;
                case 'R':
                    result.push('Р');
                    break;
                case 'S':
                    result.push('С');
                    break;
                case 'T':
                    result.push('Т');
                    break;
                case 'U':
                    result.push('У');
                    break;
                case 'V':
                    result.push('В');
                    break;
                case 'X':
                    result.push('Х');
                    break;
                case 'Y':
                    result.push('Й');
                    break;
                case 'Z':
                    result.push('З');
                    break;


                case 'a':
                    result.push('а');
                    break;
                case 'b':
                    result.push('б');
                    break;
                case 'd':
                    result.push('д');
                    break;
                case 'e':
                    result.push('е');
                    break;
                case 'f':
                    result.push('ф');
                    break;
                case 'g':
                    result.push('г');
                    break;
                case 'h':
                    result.push('ҳ');
                    break;
                case 'i':
                    result.push('и');
                    break;
                case 'j':
                    result.push('ж');
                    break;
                case 'k':
                    result.push('к');
                    break;
                case 'l':
                    result.push('л');
                    break;
                case 'm':
                    result.push('м');
                    break;
                case 'n':
                    result.push('н');
                    break;
                case 'o':
                    result.push('о');
                    break;
                case 'p':
                    result.push('п');
                    break;
                case 'q':
                    result.push('қ');
                    break;
                case 'r':
                    result.push('р');
                    break;
                case 's':
                    result.push('с');
                    break;
                case 't':
                    result.push('т');
                    break;
                case 'u':
                    result.push('у');
                    break;
                case 'v':
                    result.push('в');
                    break;
                case 'x':
                    result.push('х');
                    break;
                case 'y':
                    result.push('й');
                    break;
                case 'z':
                    result.push('з');
                    break;


                case ',':
                    result.push('◘');
                    break;
                default:
                    result.push(word)
                    break
            }
        });

        // подстановка сохранённых слов
        for(let i = 0; i!=wordsInQuotes.length; i++) {
            const indexes = []

            for(let j = quotesPair[i][0]+1; j!=quotesPair[i][1]; j++) {
                indexes.push(j)
            }
            // console.log(indexes);
            

            wordsInQuotes[i].map((word) => {

                let wCounter = 0
                for(let w of word){
                    console.log(w);
                    console.log(indexes[wCounter]);

                    result[indexes[wCounter]] = w

                    wCounter++
                }
                // console.log(word[wi]);
                // console.log(indexes[wi]);
                // result[indexes[wi]] = word[wi]
            })
        }

        let string = result.join()
        string = string.replaceAll(',', '')
        string = string.replaceAll('◘', ',')
        // Ya, Yu, Yo, ', Sh, Ch, O', G'
        string = string.replaceAll('Йа', 'Я')
        string = string.replaceAll('йа', 'я')
        string = string.replaceAll('Йо', 'Ё')
        string = string.replaceAll('йо', 'ё')
        string = string.replaceAll('Йу', 'Ю')
        string = string.replaceAll('йу', 'ю')
        string = string.replaceAll('Сҳ', 'Ш')
        string = string.replaceAll('сҳ', 'ш')
        string = string.replaceAll('Cҳ', 'Ч')
        string = string.replaceAll('cҳ', 'ч')
        string = string.replaceAll("О'", 'Ў')
        string = string.replaceAll("о'", 'ў')
        string = string.replaceAll("Г'", 'Ғ')
        string = string.replaceAll("г'", 'ғ')
        string = string.replaceAll("'", 'ъ')
        string = string.replaceAll("'", 'ь')

        return sanitizeString(string)
    } else if(mode == 'kiril'){
        words.forEach(word=>{
            switch(word){
                case 'А':
                    result.push('A');
                    break;
                case 'Б':
                    result.push('B');
                    break;
                case 'Д':
                    result.push('D');
                    break;
                case 'Е':
                    result.push('E');
                    break;
                case 'Ф':
                    result.push('F');
                    break;
                case 'Г':
                    result.push('G');
                    break;
                case 'Ҳ':
                    result.push('H');
                    break;
                case 'И':
                    result.push('I');
                    break;
                case 'Ж':
                    result.push('J');
                    break;
                case 'К':
                    result.push('K');
                    break;
                case 'Л':
                    result.push('L');
                    break;
                case 'М':
                    result.push('M');
                    break;
                case 'Н':
                    result.push('N');
                    break;
                case 'О':
                    result.push('O');
                    break;
                case 'П':
                    result.push('P');
                    break;
                case 'Қ':
                    result.push('Q');
                    break;
                case 'Р':
                    result.push('R');
                    break;
                case 'С':
                    result.push('S');
                    break;
                case 'Т':
                    result.push('T');
                    break;
                case 'У':
                    result.push('U');
                    break;
                case 'В':
                    result.push('V');
                    break;
                case 'Х':
                    result.push('X');
                    break;
                case 'Й':
                    result.push('Y');
                    break;
                case 'З':
                    result.push('Z');
                    break;
                case 'Ч':
                    result.push('Ch');
                    break;
                case 'Ш':
                    result.push('Sh');
                    break;
                case 'Ғ':
                    result.push("G'");
                    break;
                case 'Ў':
                    result.push("O'");
                    break;
                case 'Э':
                    result.push('E');
                    break;
                case 'Ю':
                    result.push('Yu');
                    break;
                case 'Я':
                    result.push('Ya');
                    break;
                case 'Ё':
                    result.push('Yo');
                    break;
                case 'Ъ':
                    result.push("'");
                    break;
                case 'Ь':
                    result.push("'");
                    break;

                    
                case 'а':
                    result.push('a');
                    break;
                case 'б':
                    result.push('b');
                    break;
                case 'д':
                    result.push('d');
                    break;
                case 'е':
                    result.push('e');
                    break;
                case 'ф':
                    result.push('f');
                    break;
                case 'г':
                    result.push('g');
                    break;
                case 'ҳ':
                    result.push('h');
                    break;
                case 'и':
                    result.push('i');
                    break;
                case 'ж':
                    result.push('j');
                    break;
                case 'к':
                    result.push('k');
                    break;
                case 'л':
                    result.push('l');
                    break;
                case 'м':
                    result.push('m');
                    break;
                case 'н':
                    result.push('n');
                    break;
                case 'о':
                    result.push('o');
                    break;
                case 'п':
                    result.push('p');
                    break;
                case 'қ':
                    result.push('q');
                    break;
                case 'р':
                    result.push('r');
                    break;
                case 'с':
                    result.push('s');
                    break;
                case 'т':
                    result.push('t');
                    break;
                case 'у':
                    result.push('u');
                    break;
                case 'в':
                    result.push('v');
                    break;
                case 'х':
                    result.push('x');
                    break;
                case 'й':
                    result.push('y');
                    break;
                case 'з':
                    result.push('z');
                    break;
                case 'ч':
                    result.push('ch');
                    break;
                case 'ш':
                    result.push('sh');
                    break;
                case 'ғ':
                    result.push("g'");
                    break;
                case 'ў':
                    result.push("o'");
                    break;
                case 'э':
                    result.push('e');
                    break;
                case 'ю':
                    result.push('yu');
                    break;
                case 'я':
                    result.push('ya');
                    break;
                case 'ё':
                    result.push('yo');
                    break;
                case 'ь':
                    result.push("'");
                    break;
                case 'ъ':
                    result.push("'");
                    break;

                case ',':
                    result.push('◘');
                    break;
                default:
                    result.push(word);
                    break;
            }
        })

        // подстановка сохранённых слов
        for(let i = 0; i!=wordsInQuotes.length; i++) {
            const indexes = []

            for(let j = quotesPair[i][0]+1; j!=quotesPair[i][1]; j++) {
                indexes.push(j)
            }
            // console.log(indexes);
            

            wordsInQuotes[i].map((word) => {

                let wCounter = 0
                for(let w of word){
                    console.log(w);
                    console.log(indexes[wCounter]);

                    result[indexes[wCounter]] = w

                    wCounter++
                }
                // console.log(word[wi]);
                // console.log(indexes[wi]);
                // result[indexes[wi]] = word[wi]
            })
        }

        let string = result.join()
        string = string.replaceAll(',', '')
        string = string.replaceAll('◘', ',')
        return sanitizeString(string)
    }
}