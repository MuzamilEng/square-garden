const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// Registration route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);
router.get('/getAllUsers', authController.getAllUsers);
router.delete('/delete/:id', authController.deleteUser);

module.exports = router;
