const router = require('express').Router();
const { userController } = require('../controllers');
const { validation } = require('../middleware/validation')
const { UsersValidator } = require('../middleware/userValidator')

router.post('/signup',validation(UsersValidator.signUp), userController.signup);

router.get('/verify',validation(UsersValidator.verify), userController.emailVerify);

router.post('/login',validation(UsersValidator.login), userController.login);

router.get('/logout',validation(UsersValidator.logout), userController.logout);

module.exports = router;
