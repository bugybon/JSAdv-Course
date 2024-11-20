const eventHandlerRouter = require('express').Router();

const dataBase = new Map();

eventHandlerRouter.post('/event', (req, res) =>{
    const name = req.body.name;
    const capacity = req.body.capacity;
    const newEvent = {name: name, capacity: capacity};
    dataBase.set(dataBase.size, newEvent);
    res.send(newEvent);
    // const str = req.body;
    // console.log(str);
});

eventHandlerRouter.get('/event/:id', (req,res) =>{

});


module.exports = eventHandlerRouter;
