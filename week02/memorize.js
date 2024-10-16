function memorize(func){
    var map = {};
    return function(...args){
        if(!(args in map)){
            map[args] = func(...args);
            console.log("Added");
            console.log(args);
        }else{
            console.log("Already in");
        }

        return map[args];
    }
}

const sum = function (x, y) {
    return x + y;
};

const memSum = memorize(sum);

console.log(memSum(2, 3)); // пресмята, връща 5
console.log(memSum(3, 3)); // пресмята, връща 6
console.log(memSum(2, 3)); // директно връща 5 без да смята