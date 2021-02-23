let number1 = '1';
let number2 = '5';


function add(numberToAdd)   {
    console.log('value of "numberToAdd" : ' + numberToAdd);

    if(numberToAdd === '')  {
        return '0';
    }
    else    {
        return numberToAdd;
    }

}

const result = add('1');
console.log('result: ' + result);