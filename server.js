const initRoutes = require('./config/RouteConfig');
const db = require('./config/MongoConfig');
const express = require('express');
const cors = require('cors');
const authenticationMiddleware = require('./middleware/AuthenticationMiddleware');
const authorizationMiddleware = require('./middleware/AuthorizationMiddleware');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
// if (process.env.SECURITY_ENABLED === 'true') {
//     console.log("here we go");
//     app.all('*', authenticationMiddleware);
//     app.all('*', authorizationMiddleware);
// }

//config
initRoutes(app);
db(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;