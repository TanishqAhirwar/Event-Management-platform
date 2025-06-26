const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables from .env file
const saltRounds = parseInt(process.env.SALT_ROUND) // Default to 10 if not set in .env

class Bcrypt {
    constructor(saltRound) {
        this.saltRounds = saltRound; // Number of salt rounds for bcrypt
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = new Bcrypt(saltRounds);