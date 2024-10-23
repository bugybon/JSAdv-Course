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

function Rectangle(x,y,a,b){
    Point.call(this, x, y);
    this.a = a;
    this.b = b;
}

Rectangle.prototype = Object.create(Point.prototype);

Rectangle.prototype.getPerimeter = function(){
    return (this.a + this.b) * 2;
}

Rectangle.prototype.getArea = function(){
    return this.a * this.b;
}

Rectangle.prototype.getLengthOfDiagonals = function(){
    return this.distance(new Point(this.x + this.a, this.y + this.b));
}

Rectangle.prototype.getBiggestCircle = function(){
    return new Circle(this.x + this.a / 2, this.y + this.b / 2, this.getLengthOfDiagonals()/2);
}

var r1 = new Rectangle(0, 0, 3, 4);
var r2 = new Rectangle(0, 0, 1, 1);

console.log(r1.getArea());
console.log(r1.getPerimeter());
console.log(r1.getLengthOfDiagonals());
console.log(r2.getArea());
console.log(r2.getPerimeter());
console.log(r2.getLengthOfDiagonals());
console.log(r1.getBiggestCircle());
console.log(r2.getBiggestCircle());