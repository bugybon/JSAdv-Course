function matrixMultiplication(a, b)
{
    if(a[0].length != b.length)
        return;

    var c = Array(a.length);

    for(var row = 0; row < a.length; row++)
    {
        c[row] = Array(b[row].length);

        for(var col = 0; col < b[0].length; col++)
        {
            c[row][col]=0;

            for(var i = 0; i < a[0].length; i++)
                c[row][col]+=a[row][i]*b[i][col];
        }

    }
    return c;
}

var a = [
    [1,0,2],
    [3,2,1]
];

var b = [
    [1,1,1],
    [2,2,1],
    [3,3,1]
]

console.table(matrixMultiplication(a,b));

