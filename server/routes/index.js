module.exports = app => {
    require('./hello_world.routes.js')(app);
    require('./list.routes.js')(app);
    require('./item.routes.js')(app);
}; // module.exports -- export the function so that it can be re/used elsewhere