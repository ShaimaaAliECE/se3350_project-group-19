/**
 * Merge sorts an array of numbers and adds the steps taken to an array.
 * @param {number[]} arr The array of numbers to sort
 * @param {number} num 0 if this is the left array, 1 if this is the right array
 * @param {Array} steps The array into which the sorting steps will be added
 * @returns 
 */
function mergeSort(arr, num, steps, level)
{
    if (arr.length == 1)
    {
        return arr;
    }

    let middle = Math.floor(arr.length / 2);
    let leftHalf = arr.splice(0, middle);

    steps.push({
        stepType: 'split left',
        
        instruction: ``
    });

    leftHalf = mergeSort(leftHalf, 0, steps, level +1);

    steps.push({
        stepType: 'split right',
        
        instruction: ``
    });
    arr = mergeSort(arr, 1, steps, level +1);

    return merge(leftHalf, arr, steps, level);
}

/**
 * Merges two sorted arrays of numbers and adds the steps taken to an array.
 * @param {number[]} left The left array to merge
 * @param {number[]} right The right array to merge
 * @param {Array} steps The array into which the sorting steps will be added
 * @returns An array containing the sorted contents of the left and right arrays
 */
function merge(left, right, steps, level)
{
    let arr = [];
    while (right.length > 0 && left.length > 0)
    {
        // Compare the first elements of both arrays, append the smaller one to arr and delete it from its array
        let leftnum = left[0]
        let rightnum = right[0]
        if (left[0] < right[0])
        {
            arr.push(left.shift());
            steps.push({
                stepType: 'merge',
                
                instruction: leftnum + " and " + rightnum + " are being compared"
            });
        }
        else
        {
            arr.push(right.shift());
            steps.push({
                stepType: 'merge',
                
                instruction: leftnum + " and " + rightnum + " are being compared"
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
                instruction: ``
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
                instruction: ``
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
function twoNums(arr)
{
    let steps = [];
    arr = mergeSort(arr, 0, steps, 0);
    steps.push({
        stepType: 'done',
    });
    return steps;
}

/**
 * Gets the ordinal form (1st, 2nd, 11th, etc) of a given number.
 * @param {number} n The number whose ordinal form to get
 * @returns The ordinal form of n as a string.
 */

//console.log(generateMergeSteps([12, 8, 31, 42, 4, 5, 15, 32, 5, 28]));

export default twoNums;