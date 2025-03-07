const initRoutes = require('./config/RouteConfig');
const dbConnect = require('./config/MongoConfig');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//config
dbConnect(process.env.MONGO_URI);
initRoutes(app);
const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});