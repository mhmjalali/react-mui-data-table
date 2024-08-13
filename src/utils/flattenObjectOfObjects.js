export const flattenObjectOfObjects = (obj, res = {}) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "object" && obj[key] !== null) {
                flattenObjectOfObjects(obj[key], res);
            } else {
                res[key] = obj[key];
            }
        }
    }
    return res;
};