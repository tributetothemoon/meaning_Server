const express = require('express');

const router = express.Router();
const groupController = require('../controller/groupController');
const isLoggedIn = require('../middlewares/authUtil');
const upload = require('../modules/multer');

router.post('/', isLoggedIn.checkToken, groupController.createGroup);
router.get('/my', isLoggedIn.checkToken, groupController.readMyGroup);
router.get('/', isLoggedIn.checkToken, groupController.readGroupList);
router.get('/:groupId', isLoggedIn.checkToken, groupController.readGroupDetail);
router.post('/upload', upload.single('image'), groupController.createGroupImage);
router.post('/join', isLoggedIn.checkToken, groupController.joinGroup);
router.get('/:groupId/edit', isLoggedIn.checkToken, groupController.getEditInformation);
router.get('/:groupId/feed', isLoggedIn.checkToken, groupController.readAllPost);

module.exports = router;
