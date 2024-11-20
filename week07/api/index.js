const apiRouter = require('express').Router();
const eventHandlerRouter = require('./eventHandler');

apiRouter.use('/eventHandler', eventHandlerRouter);

module.exports = apiRouter;