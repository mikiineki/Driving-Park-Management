const express = require('express')
const router = express.Router()

const {create, carById, read, remove, update, list, listRelated, listCategories, photo, listBySearch, listSearch} = require ('../controllers/car');
const {requireSignIn, isAuth, isAdmin} = require ('../controllers/auth');
const {userById} = require ('../controllers/user');

router.get('/car/:carId', read);
router.post("/car/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.delete('/car/:carId/:userId', requireSignIn, isAuth, isAdmin, remove);
router.put('/car/:carId/:userId', requireSignIn, isAuth, isAdmin, update);
router.get('/cars', list)
router.get('/cars/related/:carId', listRelated)
router.get('/cars/categories', listCategories)
router.get('/car/photo/:carId', photo)
router.post('/cars/by/search', listBySearch)

router.param("userId", userById);
router.param("carId", carById);

module.exports = router;