function calculate(number1,number2,operation){
    switch(operation){
        case "+":
            return number1+number2;
            break;
        case "-":
            return number1-number2;
            break;
        case "*":
            return number1*number2;
            break;
        case "/":
            return number1/number2;
            break;
        default:
            return "Not an operation";
            break;
    }
}

console.log(calculate(5, 3, "+")); // 8
console.log(calculate(5, 3, "-")); // 2
console.log(calculate(5, 3, "*")); // 15
console.log(calculate(6, 3, "/")); // 2