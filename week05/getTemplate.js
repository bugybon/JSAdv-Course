const http = require('http');
const fs = require('fs');

function getRequestHandler(templateName){
    
}

const server = http.createServer(function (req, res){
    const handler =  {
        GET: getRequestHandler
    }
    handler[req.handler](req,res);
});


server.listen(8080, function () {
    console.log('Server is listening on port http://localhost:8080');
});