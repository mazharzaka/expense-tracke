const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.hashPassword = async (password) => {
    if (!password) {
        throw new Error('Password is required');
    }
    return await bcrypt.hash(password, saltRounds);
};

exports.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};