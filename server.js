const initRoutes = require('./config/RouteConfig');
const db = require('./config/MongoConfig');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app= express();

app.use(cors());
app.use(express.json());

//config
initRoutes(app);
db(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;