const findCommonObjects = (oldArray, newArray) => {
    
    let commonArray = [], addedArray = [], deletedArray = [];
    let oldPostArray = structuredClone(oldArray), newPostArray = structuredClone(newArray);
    //remove duplicates
    
    for(let i = 0; i < oldPostArray.length-1; i++){
        if(oldPostArray[i] === null) continue;
        for(let j = i+1; j < oldPostArray.length; j++){
            if(oldPostArray[j] === null) continue;
            if(oldPostArray[i].name === oldPostArray[j].name){
                oldPostArray[j] = null;
            }
        }
    }

    for(let i = 0; i < newPostArray.length-1; i++){
        if(newPostArray[i] === null) continue;
        for(let j = i+1; j < newPostArray.length; j++){
            if(newPostArray[j] === null) continue;
            if(newPostArray[i].name === newPostArray[j].name){
                newPostArray[j] = null;
            }
        }
    }

    newPostArray = newPostArray.filter(item => item !== null);
    oldPostArray = oldPostArray.filter(item => item !== null);

    for(let i = 0; i < oldPostArray.length; i++){
        if(oldPostArray[i] === null) continue;
        for(let j = 0; j < newPostArray.length; j++){
            if(newPostArray[j] === null) continue;
            if(oldPostArray[i].name === newPostArray[j].name){
                commonArray = [...commonArray, oldPostArray[i]]
                oldPostArray[i] = null;
                newPostArray[j] = null;
                break;
            }
        }
    }

    addedArray = newPostArray.filter(item => item !== null);
    deletedArray = oldPostArray.filter(item => item !== null);

    oldArray = [...deletedArray, ...commonArray];
    newArray = [...addedArray, ...commonArray]
    
    return [commonArray, addedArray, deletedArray];
}

export default findCommonObjects;