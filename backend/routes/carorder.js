const express = require('express')
const router = express.Router()

const {create, listOrder} = require('../controllers/carorder')
const {requireSignIn, isAuth} = require ('../controllers/auth');
const {userById} = require ('../controllers/user');

router.post("/createorder/:userId", requireSignIn, isAuth, userById, create);
router.get('/carorders', listOrder)

router.param("userId", userById);

module.exports = router;