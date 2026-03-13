/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  const opMap = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "===": (a, b) => a === b,
  };

  const comparator = opMap[operator];

  return (obj) => {
    if (!comparator || !obj || obj[field] === undefined) return false;
    return comparator(obj[field], value);
  };
}

export function createSorter(field, order = "asc") {
  return (a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (valA === valB) return 0;

    const comparison = valA > valB ? 1 : -1;
    return order.toLowerCase() === "desc" ? comparison * -1 : comparison;
  };
}

export function createMapper(fields) {
  return (obj) => {
    if (!obj || typeof obj !== "object") return {};

    return fields.reduce((newObj, field) => {
      if (obj.hasOwnProperty(field)) {
        newObj[field] = obj[field];
      }
      return newObj;
    }, {});
  };
}

export function applyOperations(data, ...operations) {
  if (!Array.isArray(data)) return [];

  // Sequential application using reduce
  return operations.reduce((currentData, operation) => {
    if (typeof operation !== "function") return currentData;
    return operation(currentData);
  }, data);
}
