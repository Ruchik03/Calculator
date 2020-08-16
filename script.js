
const lowerExpression = document.querySelector('#lowerExpression');
const upperExpression = document.querySelector('#upperExpression');
const buttons = document.querySelectorAll('button');
const operators = ['+','-','x','/'];
const functions = ['AC','C','+/-'];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];

let number = '';
let tokenHistory = [];
let expression = [];

buttons.forEach((btn)=>{
    btn.addEventListener('click',()=>{

        
        let token = btn.innerHTML;

        //if the token is an operand then get the number
        if(numbers.indexOf(token) != -1){
            
            //set the number to token 
            number += token;
            
            //display the number (lowerExpression)
            lowerExpression.innerHTML = number;
        }


        //if the token is an operator and number is not an empty string
        if(operators.indexOf(token)!= -1 && number != ''){

            let operator = token;

            if(expression.length == 2){

                let lastOperator = expression.pop();
                let operand = expression.pop();
                let result = operate(operand, lastOperator, number);
                tokenHistory.push(number, operator);

                expression.push(result, operator);

                let history = tokenHistory.join(' ');
                upperExpression.innerHTML = history;

                lowerExpression.innerHTML = result;
                number = '';
            }

            //get the operator 
            else{

            //add it to both the arrays
                tokenHistory.push(number, operator);
                expression.push(number, operator);
                
                number='';
                lowerExpression.innerHTML = number;
                //display the tokenHistory (upperExpression)
                let history = tokenHistory.join(" ");
                upperExpression.innerHTML = history;
            }

        }

        if(functions.indexOf(token) != -1){
            if(token.indexOf(2)){
                number = operateFunction(token,number);
                lowerExpression.innerHTML = number;
            }
            else{
                number = operateFunction(token,number);
            }
        }

        if(token == '=' && expression.length == 2 && number != ''){
            //evaluate the expression
            let lastOperator = expression.pop();
            let operand = expression.pop();
            let result = operate(operand, lastOperator, number);

            upperExpression.innerHTML = '';
            tokenHistory= [];

            lowerExpression.innerHTML = result;

            //tokenHistory.push(result);
            //expression.push(result);
            number = result;

        }


        

    });
});

function operateFunction(token,number){
    if(token == 'AC'){
        upperExpression.innerHTML = '';
        lowerExpression.innerHTML = 0;
        expression = [];
        tokenHistory = [];
        return '';
    }
    else if(token == 'C'){
        lowerExpression.innerHTML = 0;
        return '';
    }
    else{
        return -1 * number;
    }

}



function operate(operand1, operator, operand2){
    let x = +operand1;
    let y = +operand2;
    let result = 0;

    if(operator == "+"){
        result = add(x,y);
    }
    else if(operator == "-"){
        result = subtract(x,y);
    }
    else if(operator == "x"){
        result = multiply(x,y);
    }
    else if(operator == "/"){
        result = divide(x,y);
    }

    else{
        result = "Invalid";
    }

    return result;
}

function add(operand1,operand2){
    return operand1 + operand2;
}

function subtract(operand1,operand2){
    return operand1 - operand2;
}
function multiply(operand1,operand2){
    return operand1 * operand2;
}
function divide(operand1,operand2){
    return operand1 / operand2;
}
