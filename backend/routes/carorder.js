const express = require('express')
const router = express.Router()

const {create} = require('../controllers/carorder')
const {requireSignIn, isAuth} = require ('../controllers/auth');
const {userById} = require ('../controllers/user');

router.post("/createorder/:userId", requireSignIn, isAuth, userById, create);

router.param("userId", userById);

module.exports = router;