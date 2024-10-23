function Point(x, y){
    this.x = x;
    this.y = y;
}

Point.prototype.distance = function (other){
    var deltax = other.x - this.x;
    var deltay = other.y - this.y;
    return Math.sqrt(deltax * deltax + deltay * deltay);
}

var p1 = new Point(1, 0);
var p2 = new Point(3, 4);
var p3 = new Point(0, 0);

console.log(p1.distance(p3));
console.log(p2.distance(p3));