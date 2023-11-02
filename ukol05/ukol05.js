/*
* @TODO / export funkcí z modulu
*/


/*
* @TODO doplnit funkci dle zadání
*/
function hasKey(obj, key) {
    return obj.hasOwnProperty(key)
};

/*
* @TODO doplnit funkci dle zadání
*/
function hasValue(obj, value) {
    return Object.fromEntries(Object.entries(obj).map(a => a.reverse())).hasOwnProperty(value)
};

module.exports = {
    hasKey,
    hasValue
}