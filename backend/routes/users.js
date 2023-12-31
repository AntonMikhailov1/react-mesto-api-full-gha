// routes/users.js
const router = require('express').Router();

const {
  getUser,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
  logout,
} = require('../controllers/users');
const {
  validateUserId,
  validateUserUpdate,
  validateAvatar,
} = require('../middlewares/validation');

router.get('/', getUser);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUserUpdate, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);
router.delete('/me', logout);

module.exports = router;
