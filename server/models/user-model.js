const mongoose = require('mongoose');
const role = require('../_helpers/role');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        createdDate: { type: Date, default: Date.now },
        role: { type: String, default: role.User }
    },
    { timestamps: true },
)

User.set('toJSON', { virtuals: true });

module.exports = mongoose.model('users', User);