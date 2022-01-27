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
        index: middle
    });

    leftHalf = mergeSort(leftHalf, 0, steps);
    arr = mergeSort(arr, 1, steps);

    return merge(leftHalf, arr, steps);
}

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
                index: leftIndex++
            });
        }
        else
        {
            arr.push(right.shift());
            steps.push({
                stepType: 'merge',
                array: 1,
                index: rightIndex++
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
                index: leftIndex++
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
                index: rightIndex++
            });
        }
    }

    return arr;
}

function generateMergeSteps(arr)
{
    let steps = [];
    arr = mergeSort(arr, 0, steps);
    return steps;
}

//console.log(generateMergeSteps([12, 8, 31, 42, 4, 5, 15, 32, 5, 28]));

export default generateMergeSteps;