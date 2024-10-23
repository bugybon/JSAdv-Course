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

function RectanglePrism(x, y, a, b, c){
    Rectangle.call(this, x, y, a, b);
    this.c = c;
}

RectanglePrism.prototype = Object.create(Rectangle.prototype);

RectanglePrism.prototype.getVolume = function(){
    return this.getArea() * this.c;
}

var rp1 = new RectanglePrism(0, 0, 3, 4, 5);

console.log(rp1.getVolume());