/**
 *
 * @param {object} obj1 - The first object to compare.
 * @param {object} obj2 - The second object to compare.
 * @returns {object} An object containing the keys and values that differ between the two objects.
 */
const compareObjects = (obj1, obj2) => {
    const differences = {};

    for (const key in obj1) {
        if (
            !obj2.hasOwnProperty(key) ||
            obj1[key] !== obj2[key] ||
            (typeof obj1[key] === "object" &&
                obj1[key] !== null &&
                !compareObjects(obj1[key], obj2[key]))
        ) {
            differences[key] = obj1[key];
        }
    }

    for (const key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            differences[key] = obj2[key];
        }
    }

    return differences;
}

export default compareObjects;
