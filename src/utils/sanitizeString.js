export const sanitizeString = (str) => {

    if(str){
        // убераем пробелы
        str = str.replace(/ +/g, ' ').trim()

        // // Убираем спец символы
        str = str[0].replace(/\?|\!|\.|\,|\\|\||\/|\<|\>|\+|\=|\@|\#|\$|\%|\^|\&|\*|\:|\;|\{|\}|\[|\]|\~|\'|\`/, '') + str.slice(1)

        // // Первая буква заглавная
        str = str[0].toUpperCase() + str.slice(1);
    }

    return str
}