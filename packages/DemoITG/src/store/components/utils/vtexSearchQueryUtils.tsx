export const getSearchPath = (obj: Record<string, string>) => {
    let urlPath = '';
    if (obj?.department) {
        urlPath += `${obj?.department}`;
    }

    if (obj?.category && obj?.department) urlPath += `/${obj?.category}`;
    else if (obj?.category && !obj?.department) urlPath += `${obj?.category}`;

    if (obj?.subCategory) urlPath += `/${obj?.subCategory}`;
    if (obj?.brand) urlPath += `/${obj?.brand}`;

    return urlPath;
};

export const getQuery = (obj: Record<string, string>) => {
    let query = '';
    if (obj?.term) query = obj.term;
    return query;
};

export const getMap = (obj: Record<string, string>) => {
    let map = [];
    if (obj?.department) map.push('c');
    if (obj?.category) map.push('c');
    if (obj?.subCategory) map.push('c');
    if (obj?.collection) map.push('productClusterIds');
    if (obj?.brand) map.push('brand');
    if (obj?.priceRange) map.push('priceRange');
    return map.reduce((accum, currentValue) => {
        if (accum.length) accum += ',';
        accum += currentValue;
        return accum;
    }, '');
};
 
export const getSelectedFacets = (obj: Record<string, string>) => {
    const selectedFacets = [];
    if (obj?.department)
        selectedFacets.push({ key: 'c', value: obj?.department });
    if (obj?.category)
        selectedFacets.push({ key: 'c', value: obj?.category });
    if (obj?.subCategory)
        selectedFacets.push({ key: 'c', value: obj?.subCategory });
    if (obj?.brand) selectedFacets.push({ key: 'brand', value: obj?.brand });
    if (obj?.collection)
        selectedFacets.push({ key: 'productClusterIds', value: obj?.collection });
    if (obj?.priceRange)
        selectedFacets.push({
            key: 'priceRange',
            value: `${obj?.priceRange?.from} TO ${obj?.priceRange?.to}`,
        });
    return selectedFacets;
};



export const SearchQuery = (obj: Record<string, string>) => {

    return {
        query: {
            query: getSearchPath(obj),
            map: getMap(obj),
            selectedFacets: getSelectedFacets(obj),
            fullText: getQuery(obj),
            orderBy:obj?.orderBy,
            from: obj?.from,
            to: obj?.to
        }
    }
}