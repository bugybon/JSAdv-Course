function Point(x, y){
    this.x = x;
    this.y = y;
}

Point.prototype.distance = function (other){
    var deltax = other.x - this.x;
    var deltay = other.y - this.y;
    return Math.sqrt(deltax * deltax + deltay * deltay);
}

function Circle(x, y, radius){
    Point.call(this, x, y);
    this.radius = radius;
}

Circle.prototype = Object.create(Point.prototype);

Circle.prototype.getCircumference = function(){
    return Math.PI * this.radius * 2;
} 

Circle.prototype.getArea = function(){
    return Math.PI * this.radius * this.radius;
}

Circle.prototype.intersects = function(circle2){
    if(circle2.radius + this.radius >= this.distance(circle2)){
        return "There is an intersection";
    }else{
        return "No intersection";
    }
}

var c1 = new Circle(0, 0, 4);
var c2 = new Circle(1, 1, 3);
var c3 = new Circle(5, 0, 0.5);

console.log(c1.intersects(c3));
console.log(c1.getArea());
console.log(c1.getCircumference());