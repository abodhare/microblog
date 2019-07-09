const Posts = require('../models/posts-model');
const User = require('../models/user-model');

async function getAll() {
    return await Posts.find();
}

async function getById(id) {
    return await Posts.findById(id);
}

async function getByUsername(username) {
    return await Posts.find({
        'username': username,
    });
}

async function create(postParam) {
    const user = await User.find({
        'username': postParam.username,
    });

    if (!user) throw 'Username does not exist';
    const post = new Posts(postParam);

    await post.save();
}

async function update(id, postParam) {
    const post = await Posts.findById(id);

    // validate
    if (!post) throw 'Post not found';

    // copy userParam properties to user
    Object.assign(post, postParam);

    await post.save();
}

// _delete because delete is a keyword in javascript
async function _delete(id) {
    await Posts.findByIdAndRemove(id);
}

module.exports = {
    getAll,
    getByUsername,
    getById,
    create,
    update,
    delete: _delete
};