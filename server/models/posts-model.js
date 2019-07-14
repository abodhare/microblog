const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        username: { type: String, required: true , unique: true },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        message: { type: String, required: true },
        photo: { data: Buffer, contentType: String, name: String, encoding: String },
        child: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
        createdDate: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
    },
    { timestamps: true },
)

Post.set('toJSON', { virtuals: true });

module.exports = mongoose.model('posts', Post);