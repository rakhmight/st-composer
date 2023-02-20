export default function getUrlParams(){
    let urlParams = window
    .location
    .hash
    .replace(/#\/.+\?/,'')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    )

    return urlParams
}