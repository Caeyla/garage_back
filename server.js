const initRoutes = require('./config/RouteConfig');
const db = require('./config/MongoConfig');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apptest= express();

apptest.use(cors());
apptest.use(express.json());

//config
initRoutes(apptest);
db(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

apptest.listen(PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = apptest;