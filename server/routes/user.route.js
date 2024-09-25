const {
  userRegistration,
  login,
  updateProfile,
} = require('../controller/user.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post('/register', userRegistration);
router.post('/login', login);
router.patch('/update-profile', protect, updateProfile);

module.exports = router;
