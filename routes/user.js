/* eslint-disable import/no-unresolved */
const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');
const isLoggedIn = require('../middlewares/authUtil');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.put('/refreshtoken', isLoggedIn.reIssue);

router.put('/onboard', isLoggedIn.checkToken, userController.updateOnboard);
router.delete('/onboard', userController.deleteOnboard);

router.get('/daypromise', isLoggedIn.checkToken, userController.getDailyMaxim);
router.post('/daypromise', userController.createDailyMaxim);

router.get('/mypage', isLoggedIn.checkToken, userController.getMyPage);
router.post('/dailydiary', isLoggedIn.checkToken, userController.createDailyDiary);
router.post('/bookreview', isLoggedIn.checkToken, userController.createBookComment);

module.exports = router;
