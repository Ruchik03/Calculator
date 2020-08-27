/**
 * This is a simple calculator which performs addition,
 * subtraction, multiplication and division.
 * Date:08/05/2020
 * @author:Ruchik Chaudhari
 */

//get the reference to all the necessary elements
const lowerExpression = document.querySelector("#lowerExpression");
const upperExpression = document.querySelector("#upperExpression");
const buttons = document.querySelectorAll("button");

//Define all the possible operators, functions and numbers
const operators = ["+", "-", "x", "/"];
const functions = ["AC", "C", "+/-"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//Start the operation with these inital values
let number = "";
let tokenHistory = [];
let expression = [];

//listen to the click event for all the buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let token = btn.innerHTML;

    //if the token is an operand then get the number
    if (numbers.indexOf(token) != -1) {
      //set the number to the given token
      number += token;

      //display the number (lowerExpression)
      lowerExpression.innerHTML = number;
    }

    //if the token is an operator and number is not an empty string
    //then there will be two possibilites

    if (operators.indexOf(token) != -1 && number != "") {
      //set the operator to the give token
      let operator = token;

      //First Possibilty: The user already has a pending operation
      //in the array. Solve that first and then add this operand
      //[1, +, 1] [/] --> [2, /]
      if (expression.length == 2) {
        let lastOperator = expression.pop();
        let operand = expression.pop();
        let result = operate(operand, lastOperator, number);
        tokenHistory.push(number, operator);

        expression.push(result, operator);

        let history = tokenHistory.join(" ");
        upperExpression.innerHTML = history;

        lowerExpression.innerHTML = result;
        number = "";
      }

      //Second Possibilty: The user just has one number so
      //far. In this case just add the operator to the array
      //[1] [+] --> [1, +]
      else {
        //add the operator to both the arrays
        tokenHistory.push(number, operator);
        expression.push(number, operator);

        number = "";
        lowerExpression.innerHTML = number;
        //display the tokenHistory (upperExpression)
        let history = tokenHistory.join(" ");
        upperExpression.innerHTML = history;
      }
    }

    //If the user chose to operate one of the functions
    //i.e 'AC', 'C' and '+/-' then perform the operation
    if (functions.indexOf(token) != -1) {
      if (token.indexOf(2)) {
        number = operateFunction(token, number);
        lowerExpression.innerHTML = number;
      } else {
        number = operateFunction(token, number);
      }
    }

    //Evalute the expressio when the user click "=", but 
    //only when we have enough opertors and operands
    if (token == "=" && expression.length == 2 && number != "") {
      //evaluate the expression
      let lastOperator = expression.pop();
      let operand = expression.pop();
      let result = operate(operand, lastOperator, number);

      upperExpression.innerHTML = "";
      tokenHistory = [];

      lowerExpression.innerHTML = result;
      number = result;
    }
  });
});

/**
 * The function gives the functionality to
 * 'AC', 'C', and '+/-'.
 * @param {*} token
 * @param {*} number
 */
function operateFunction(token, number) {
  //clear everything if 'AC'
  if (token == "AC") {
    upperExpression.innerHTML = "";
    lowerExpression.innerHTML = 0;
    expression = [];
    tokenHistory = [];
    return "";
  }
  //Clear just the very last token
  else if (token == "C") {
    lowerExpression.innerHTML = 0;
    return "";
  }
  //change the sign of a number
  else {
    return -1 * number;
  }
}

/**
 * Gets the two operands converts them to numbers
 * and then checks the operator and  calls the
 * appropraite function to perform the operation.
 * @param {*} operand1
 * @param {*} operator
 * @param {*} operand2
 */
function operate(operand1, operator, operand2) {
  let x = +operand1;
  let y = +operand2;
  let result = 0;

  if (operator == "+") {
    result = add(x, y);
  } else if (operator == "-") {
    result = subtract(x, y);
  } else if (operator == "x") {
    result = multiply(x, y);
  } else if (operator == "/") {
    result = divide(x, y);
  } else {
    result = "Invalid";
  }

  return result;
}

/**
 * Add the two the operands
 * @param {*} operand1
 * @param {*} operand2
 */

function add(operand1, operand2) {
  return operand1 + operand2;
}
/**
 * Subtract the two operands
 * @param {} operand1
 * @param {*} operand2
 */

function subtract(operand1, operand2) {
  return operand1 - operand2;
}
/**
 * Multiply the two operands
 * @param {*} operand1
 * @param {*} operand2
 */
function multiply(operand1, operand2) {
  return operand1 * operand2;
}
/**
 * Divide the two operands
 * @param {*} operand1
 * @param {*} operand2
 */
function divide(operand1, operand2) {
  return operand1 / operand2;
}
