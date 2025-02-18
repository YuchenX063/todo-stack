module.exports = app => {
    let router = require('express').Router();
    let controller = require('../controllers/hello_world.controller');
    router.get('/', controller.findAll); // if a GET request is made, call the findAll method in the controller
    app.use('/hello_world', router); // mount the router on the hello_world path
};

// the get() method: define a route that listens for HTTP GET requests.
// The first argument: the url path for which the route is defined; the second argument: a callback function that gets executed
// the use() method: mount middleware functions or routers at a specified path
// The first argument: the path on which the middleware function will be mounted; the second argument: the middleware function