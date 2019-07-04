const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user-ctrl');
const Role = require('../_helpers/role');


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

function authenticate(req, res, next) {
    UserCtrl.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    UserCtrl.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    if (req.user.role === Role.Admin) {
        UserCtrl.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

function getCurrent(req, res, next) {
    UserCtrl.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    UserCtrl.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    UserCtrl.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    UserCtrl.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = router;