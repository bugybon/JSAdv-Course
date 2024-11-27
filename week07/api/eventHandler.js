const eventHandlerRouter = require('express').Router();

const dataBase = new Map();
const bookingDataBase = new Map();
let eventID = 0;

eventHandlerRouter.post('/', (req, res) =>{
    const name = req.body.name;
    const capacity = req.body.capacity;
    const newEvent = {name: name, capacity: capacity};
    dataBase.set(eventID++, newEvent);
    bookingDataBase.set(bookingDataBase.size, {dataBase:new Map(), id:0});
    res.send(newEvent);
    // const str = req.body;
    // console.log(str);
});

eventHandlerRouter.get('/:id', (req,res) =>{
    if(!dataBase.has(+req.params.id)){
        res.send("Event with this Id doesn't exist");
    }else
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
    if(currentBooking.dataBase.size < currentEvent.capacity){
        currentBooking.dataBase.set(currentBooking.id++, newBooking);
        res.send("".concat(currentEvent.capacity - currentBooking.dataBase.size));
    }else{
        res.send("No available spaces");
    }
    
    // const str = req.body;
    // console.log(str);
});

eventHandlerRouter.get('/:id/booking', (req,res) =>{
    const currentBooking = bookingDataBase.get(+req.params.id);
    let result = "";
    for(booking of currentBooking.dataBase){
        result = result.concat(booking[1].firstName,' ', booking[1].lastName, '\n');
    }
    res.send(result);
});

eventHandlerRouter.get('/:id/booking/:bookingId', (req,res) =>{
    const currentBooking = bookingDataBase.get(+req.params.id);
    res.send(currentBooking.dataBase.get(+req.params.bookingId));
});

eventHandlerRouter.delete('/:id/booking/:bookingId', (req,res) =>{
    const currentBooking = bookingDataBase.get(+req.params.id);
    currentBooking.dataBase.delete(+req.params.bookingId);
    res.send('Booking deleted');
});

module.exports = eventHandlerRouter;
