const express = require('express');
const Busboy = require('busboy');
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

    console.log(req.body);
    let busboy = new Busboy({ headers: req.headers });

    busboy.on('finish', function() {
        console.log('Upload finished');
    })
    req.pipe(busboy);

    UserCtrl.create(req.body, req.files.photo || {})
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    UserCtrl.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    UserCtrl.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    UserCtrl.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {

    let busboy = new Busboy({ headers: req.headers });

    busboy.on('finish', function() {
        console.log('Upload finished');
    })
    req.pipe(busboy);

    if (req.files.photo) {
        UserCtrl.update(req.params.id, req.body, req.files.photo)
            .then(() => req.json({}))
            .catch(err => next(err));
    } else {
        UserCtrl.update(req.params.id, req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    }
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