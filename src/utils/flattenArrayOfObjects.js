export const flattenArrayOfObjects = (array, key) => {
    return array.reduce((acc, obj) => {
        acc.push(obj);
        if (Array.isArray(obj[key])) {
            acc.push(...flattenArrayOfObjects(obj[key], key));
        }
        return acc;
    }, []);
};

