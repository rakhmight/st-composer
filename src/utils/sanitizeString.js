export const sanitizeString = (str) => {

    if(str){
        // убераем пробелы
        str = str.replace(/ +/g, ' ').trim()

        // Убираем повторяющиеся спец символы: По отдельности
        str = str.replace(/\◘{2,}/g, '◘')
        // str = str.replace(/\�/g, '')
        str = str.replace(/\•{2,}/g, '•')
        str = str.replace(/\~{2,}/g, '~')
        str = str.replace(/\^{2,}/g, '^')
        str = str.replace(/\&{2,}/g, '&')
        str = str.replace(/\){2,}/g, ')')
        str = str.replace(/\({2,}/g, '(')
        str = str.replace(/\{{2,}/g, '{')
        str = str.replace(/\}{2,}/g, '}')
        str = str.replace(/\]{2,}/g, ']')
        str = str.replace(/\[{2,}/g, '[')
        str = str.replace(/\`{2,}/g, '`')
        str = str.replace(/\'{2,}/g, `'`)
        str = str.replace(/\"{2,}/g, '"')
        str = str.replace(/\:{2,}/g, ':')
        str = str.replace(/\;{2,}/g, ';')
        str = str.replace(/\${2,}/g, '$')
        str = str.replace(/\%{2,}/g, '%')
        str = str.replace(/\№{2,}/g, '№')
        str = str.replace(/\#{2,}/g, '#')
        str = str.replace(/\@{2,}/g, '@')
        str = str.replace(/\?{2,}/g, '?')
        str = str.replace(/\!{2,}/g, '!')
        str = str.replace(/\,{2,}/g, ',')
        str = str.replace(/\\{2,}/g, '\\')
        str = str.replace(/\/{2,}/g, '/')
        str = str.replace(/\|{2,}/g, '|')
        str = str.replace(/\<{2,}/g, '<')
        str = str.replace(/\>{2,}/g, '>')
        str = str.replace(/\+{2,}/g, '+')
        str = str.replace(/\-{2,}/g, '-')
        str = str.replace(/\*{2,}/g, '*')
        str = str.replace(/\_{6,}/g, '_____')
        str = str.replace(/\={2,}/g, '=')
        str = str.replace(/\.{4,}/g, '...')

        // // Первая буква заглавная
        str = str[0].toUpperCase() + str.slice(1);
    }

    return str
}