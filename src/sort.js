/**
 * Merge sorts an array of numbers and adds the steps taken to an array.
 * @param {number[]} arr The array of numbers to sort
 * @param {number} num 0 if this is the left array, 1 if this is the right array
 * @param {Array} steps The array into which the sorting steps will be added
 * @returns 
 */
function mergeSort(arr, num, steps)
{
    if (arr.length == 1)
    {
        return arr;
    }

    let middle = Math.floor(arr.length / 2);
    let leftHalf = arr.splice(0, middle);

    steps.push({
        stepType: 'split',
        array: num,
        index: middle,
        instruction: `Split the ${num == 0 ? 'left' : 'right'} array before the ${getOrdinal(middle)} element.`
    });

    leftHalf = mergeSort(leftHalf, 0, steps);
    arr = mergeSort(arr, 1, steps);

    return merge(leftHalf, arr, steps);
}

/**
 * Merges two sorted arrays of numbers and adds the steps taken to an array.
 * @param {number[]} left The left array to merge
 * @param {number[]} right The right array to merge
 * @param {Array} steps The array into which the sorting steps will be added
 * @returns An array containing the sorted contents of the left and right arrays
 */
function merge(left, right, steps)
{
    let arr = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (right.length > 0 && left.length > 0)
    {
        // Compare the first elements of both arrays, append the smaller one to arr and delete it from its array
        if (left[0] < right[0])
        {
            arr.push(left.shift());
            steps.push({
                stepType: 'merge',
                array: 0,
                index: leftIndex++,
                instruction: `Out of the first elements of both arrays, choose the smaller one and move it to the new array.`
            });
        }
        else
        {
            arr.push(right.shift());
            steps.push({
                stepType: 'merge',
                array: 1,
                index: rightIndex++,
                instruction: `Out of the first elements of both arrays, choose the smaller one and move it to the new array.`
            });
        }
    }
    
    // Append any leftover array elements to the end
    if (left.length > 0)
    {
        for (let i of left)
        {
            arr.push(i);
            steps.push({
                stepType: 'merge',
                array: 0,
                index: leftIndex++,
                instruction: `The right array is empty, so move the remaining elements of the left array into the new array starting with the first one.`
            });
        }
    }

    if (right.length > 0)
    {
        for (let i of right)
        {
            arr.push(i);
            steps.push({
                stepType: 'merge',
                array: 1,
                index: rightIndex++,
                instruction: `The left array is empty, so move the remaining elements of the right array into the new array starting with the first one.`
            });
        }
    }

    return arr;
}

/**
 * Generates the steps to merge sort a given array of numbers.
 * Each step is of the form {stepType, array, index, instruction} where:
 * - stepType (string): the type of operation for this step, either merge or split.
 * - array (number): The array to perform the operation on, 0 for left or 1 for right.
 * - index (number): The array index of the element to operate on. For splitting, the split is before the element with this index.
 * - instruction (string): Text instructions for use in levels 1 and 2
 * Example: {"split", 1, 2, ""} means split the right array before the element with index 2 (or after the second element).
 * @param {number[]} arr The array of numbers to be sorted.
 * @returns An array containing the sorting steps, as described in the function description.
 */
function generateMergeSteps(arr)
{
    let steps = [];
    arr = mergeSort(arr, 0, steps);
    return steps;
}

/**
 * Gets the ordinal form (1st, 2nd, 11th, etc) of a given number.
 * @param {number} n The number whose ordinal form to get
 * @returns The ordinal form of n as a string.
 */
function getOrdinal(n)
{
    let lastDigit = Number(String(n)[String(n).length - 1]);
    switch (lastDigit)
    {
        case 1:
            if (n == 11){
                return n + 'th';
            }
            return n + 'st';
        case 2:
            return n + 'nd';
        case 3:
            return n + 'rd';
        default:
            return n + 'th';
    }
    
}

console.log(generateMergeSteps([12, 8, 31, 42, 4, 5, 15, 32, 5, 28]));

export default generateMergeSteps;