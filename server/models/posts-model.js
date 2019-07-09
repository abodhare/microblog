const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        username: { type: String, required: true , unique: true },
        message: { type: String, required: true },
        createdDate: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
    },
    { timestamps: true },
)

Post.set('toJSON', { virtuals: true });

module.exports = mongoose.model('posts', Post);