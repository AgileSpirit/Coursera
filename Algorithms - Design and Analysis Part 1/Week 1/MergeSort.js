var fs = require('fs');

var inputFile = 'IntegerArray.txt';
//var inputFile = 'test-05.txt';
var countInversions = true;
var inversions = 0;

function readSortAndDisplayArrayFromFile() {
    fs.readFile(inputFile, function(err, data) {
        if(err) throw err;

        var unsortedArray = convertStringDataIntoIntArray(data);

        var sortedArray = sort(unsortedArray);

        console.log(sortedArray);

        if (countInversions){
            console.log('Number of inversions = ' + inversions);
        }
    });
}

function convertStringDataIntoIntArray(data) {
    var stringArray = data.toString().split('\n');
    var intArray = new Array();
    for (var i = 0; i < stringArray.length; i++) {
        intArray.push(parseInt(stringArray[i]));
    };
    return intArray;
}

function sort(array) {
    console.log('sort: array=' + array);

    var result = mergeSort(array);

    console.log('sort: result=' + result);
    return result;
}

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    // DIVIDE
    var leftArray = new Array();
    var rightArray = new Array();
    var middle = (array.length / 2) >> 0;

    for (var i = 0; i < middle; i++) {
        leftArray.push(array[i]);
    };
    for (var i = middle; i < array.length; i++) {
        rightArray.push(array[i]);
    };

    // CONQUER
    leftArray = mergeSort(leftArray);
    rightArray = mergeSort(rightArray);

    // COMBINE
    return merge(leftArray, rightArray);
}

function merge(leftArray, rightArray) {
    var result = new Array();

    var i = 0; // leftArray iterator
    var j = 0; // rightArray iterator

    while ((i < leftArray.length) || (j < rightArray.length))  {
        // While there is unmerged element in one or other array
        if ((i < leftArray.length) && (j < rightArray.length)) {
            // There are at least one element in each array, so comparison is required
            if (leftArray[i] < rightArray[j]) {
                result.push(leftArray[i++]);
            } else {
                result.push(rightArray[j++]);
                if (countInversions) {
                    inversions += leftArray.length - i;
                }
            }
        } else {
            if (i < leftArray.length) {
                // There is only element on left side
                result.push(leftArray[i++]);
            }
            if (j < rightArray.length) {
                // There is only element on right side
                result.push(rightArray[j++]);
            }
        }

    }

    return result;
}

readSortAndDisplayArrayFromFile('IntegerArray.txt', 'output.txt');

