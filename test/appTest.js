const initRoutes = require('../config/RouteConfig');
const express = require('express');
const cors = require('cors');

const apptest= express();

apptest.use(cors());
apptest.use(express.json());

//config
initRoutes(apptest);


module.exports = apptest;