const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validation = require('./validation');

router.get('/admin/users/sign_up', userController.signUp);
router.post('/admin/users', validation.validateUsers, userController.create);
router.get('/admin/users/sign_in', userController.signInForm);
router.post('/admin/users/sign_in', validation.validateUsers, userController.signIn);
router.get('/admin/users/sign_out', userController.signOut);

module.exports = router;
