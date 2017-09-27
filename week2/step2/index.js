// a function representing if an arrays' item was dividable by three
function sayThree(){
    console.log("Three is called here!");
}

//a function representing if an arrays' item was dividable by five
function sayFive(){
    console.log("Five is called here!");
}


function threeFive(startIndex, stopIndex, threeCallback, fiveCallback){
    // Create a new array
    let arr = new Array;
    
    // A loop that iterates between startIndex and stopIndex and adds each of the elements to the created-already-array
    for (let i = startIndex; i <= stopIndex; i++){
        arr.push(i);
    }
    
    console.log(arr);
    // loop that checks if array item is dividable by three or five (or them both) and calls their functions
    for (n of arr){
        if (n % 3 == 0 && n % 5 == 0){
            sayThree() + sayFive();
        } else if (n % 3 == 0){
            sayThree()
        } else if (n % 5 == 0){
            sayFive();
        }
    }
    
}

threeFive(10, 15, sayThree, sayFive);