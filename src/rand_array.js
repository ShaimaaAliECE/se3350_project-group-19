/**
 * Generates an array of random integers with no duplicates.
 * @param {number} n The desired array length
 * @param {number} max The maximum value of the random numbers. (Minimum is fixed at 0)
 * @returns Array of n random integers in range [0, max]
 */
function generateRandomArray(n, max)
{
    if (n > max)
    {
        return;
    }
    let arr = [];
    let all = generateSequentialArray(max);
    for (let i = 0; i < n; i++)
    {
        let num = chooseRandom(all);
        arr.push(num);
    }
    return arr;
}

/**
 * Selects a random element from an array and returns it, removing it from the original array.
 * @param {Array} arr Array to pick an element from
 * @returns The removed element
 */
function chooseRandom(arr)
{
    let index = Math.floor(Math.random() * arr.length);
    let element = arr[index];
    arr.splice(index, 1);
    return element;
}

/**
 * Generates a sequential array of all the numbers from 0 to n, inclusive.
 * @param {number} n The number of elements to generate
 * @returns An array containing all integers from 0 to n in order
 */
function generateSequentialArray(n)
{
    let arr = [];
    for (let i = 0; i <= n; i++)
    {
        arr.push(i);
    }
    return arr;
}

export default generateRandomArray;