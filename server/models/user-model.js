const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, required: true },
        posts: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User);