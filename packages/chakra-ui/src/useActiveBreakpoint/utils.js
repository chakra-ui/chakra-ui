export function generateMediaQueries(breakpoints){
    return breakpoints.map(p => window.matchMedia(`screen and (min-width: ${p})`));
}

export function findActiveQueries(mediaQueries){
    let activeQuery = -1;
    for(let i = 0; i < mediaQueries.length; i++){
        if(mediaQueries[i].matches) activeQuery = i;
    }
    return activeQuery;
}

export function isEqualish(arr1, arr2) {
    if(arr1.length !== arr2.length) return false;
    for(let i = 0; i < arr1.length; i++){
        if(arr1[i] !== arr2[i]) return false;
    }
    return true;
}
