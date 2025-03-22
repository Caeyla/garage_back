require('dotenv').config();
const SALT_ROUNDS = 10;
const TOKEN_DURATION = 8;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    SALT_ROUNDS,
    TOKEN_DURATION,
    SECRET_KEY
}