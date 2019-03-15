const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validation = require('./validation');

router.get('/admin/users/sign_up', userController.signUp);
router.post('/admin/users', validation.validateUsers, userController.create);

module.exports = router;
