const eventHandlerRouter = require('express').Router();

const dataBase = new Map();
const bookingDataBase = new Map();

eventHandlerRouter.post('/', (req, res) =>{
    const name = req.body.name;
    const capacity = req.body.capacity;
    const newEvent = {name: name, capacity: capacity};
    dataBase.set(dataBase.size, newEvent);
    bookingDataBase.set(bookingDataBase.size, new Map());
    res.send(newEvent);
    // const str = req.body;
    // console.log(str);
});

eventHandlerRouter.get('/:id', (req,res) =>{
    res.send(dataBase.get(+req.params.id));
});

eventHandlerRouter.delete('/:id', (req,res) =>{
    dataBase.delete(+req.params.id);
    bookingDataBase.delete(+req.params.id);
    res.send('Event deleted');
});

eventHandlerRouter.post('/:id/booking', (req, res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const newBooking = { firstName: firstName, lastName: lastName };
    const currentBooking = bookingDataBase.get(+req.params.id);
    const currentEvent = dataBase.get(+req.params.id);
    if(currentBooking.size < currentEvent.capacity){
        currentBooking.set(currentBooking.size, newBooking);
        res.send("".concat(currentEvent.capacity - currentBooking.size));
    }else{
        res.send("No available spaces");
    }
    
    // const str = req.body;
    // console.log(str);
});

eventHandlerRouter.get('/:id/booking', (req,res) =>{
    const currentBooking = bookingDataBase.get(+req.params.id);
    let result = "";
    for(booking of currentBooking){
        result = result.concat(booking[1].firstName,' ', booking[1].lastName, '\n');
    }
    res.send(result);
});

eventHandlerRouter.get('/:id/booking/:bookingId', (req,res) =>{
    const currentBooking = bookingDataBase.get(+req.params.id);
    res.send(currentBooking.get(+req.params.bookingId));
});

eventHandlerRouter.delete('/:id/booking/:bookingId', (req,res) =>{
    const currentBooking = bookingDataBase.get(+req.params.id);
    currentBooking.delete(+req.params.bookingId);
    res.send('Booking deleted');
});

module.exports = eventHandlerRouter;
