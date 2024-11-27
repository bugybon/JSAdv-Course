const apiRouter = require('express').Router();
const eventHandlerRouter = require('./eventHandler');

apiRouter.use('/event', eventHandlerRouter);

module.exports = apiRouter;