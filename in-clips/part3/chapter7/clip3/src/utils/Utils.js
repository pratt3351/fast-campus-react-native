export const getRandomNumbers = ()=>{
    const numberArray = [];

    while(numberArray.length < 6){
        const number = (Math.floor( Math.random() * 45)) +1;
        const hasNumber = numberArray.filter((prev)=> prev === number).length>0;

        if(!hasNumber)
            numberArray.push(number);
    }

    console.log(numberArray);

    return numberArray.sort((numA, numB)=> numA-numB);
}
