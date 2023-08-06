let apyKey = 'aAAaASADas12133121';

function numberString(arrg){
    let obj = {};

    for (const element of arrg) {
        const char = element;
        obj[char] = (obj[char] || 0) + 1;
    }

    return obj
}