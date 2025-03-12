
initRoutes  = (app) => {
    app.use('/customers', require('../routes/CustomerRoutes'));
    app.use('/manager', require('../routes/ManagerRoutes'));
    app.use('/user', require('../routes/UserRoutes'));
}

module.exports = initRoutes;