const express = require('express');
const router = express.Router();

// Require index controller
const index_controller = require('../../controllers/indexController.js');

// Require index controller
const user_controller = require('../../controllers/userController.js');

// GET main section
router.get('/', index_controller.index);

router.post('/login', user_controller.login);

router.post('/signup', user_controller.signup);

router.get('/users', user_controller.getAllUsers);

router.put('/users/:id', user_controller.update);

router.delete('/users/:id', user_controller.delete);

module.exports = router;
