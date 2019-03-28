

const compareAscBy = (key) => {
    return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    };
}

const compareDescBy = (key) => {
    return function (a, b) {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
    };
}

const sorter = (key, array, order) => {
    let arrayCopy = [...array];
    arrayCopy.sort(order ? compareAscBy(key) : compareDescBy(key));
    return arrayCopy;
}

export default sorter