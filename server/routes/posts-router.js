const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user-ctrl');
const PostsCtrl = require('../controllers/posts-ctrl');

// routes
router.post('/new', create);
router.get('/', getAll);
router.get('/:username', getByUsername);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

function create(req, res, next) {
    let currentUser = req.user;
    let username = req.body.username;

    if (currentUser.username !== username) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    PostsCtrl.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    PostsCtrl.getAll()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getByUsername(req, res, next) {
    PostsCtrl.getByUsername(req.params.username)
        .then(posts => posts ? res.json(posts) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    PostsCtrl.getById(req.params.id)
        .then(post => post ? res.json(post) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    PostsCtrl.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const currentUser = req.user;
    const username = req.body.username;

    // only allow admins to access other user records
    if (username !== currentUser.username && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    PostsCtrl.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = router;