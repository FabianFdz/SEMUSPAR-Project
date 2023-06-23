/**
 * Maps an array of string arrays to an array of objects using the first array as keys and subsequent arrays as values.
 * @param {string[][]} arrays - The input array of string arrays.
 * @returns {Array<{ [key: string]: string }>} - The mapped array of objects.
 */
export function mapArraysToObject(
  arrays: string[][]
): Array<{ [key: string]: string }> {
  const keys = arrays[0].map((key) => key.trim());
  const result: Array<{ [key: string]: string }> = [];

  for (let i = 1; i < arrays.length; i++) {
    const values = arrays[i];
    const obj: { [key: string]: string } = {};

    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = values[j] || "";
    }

    result.push(obj);
  }

  return result;
}
