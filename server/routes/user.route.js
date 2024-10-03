const {
  userRegistration,
  login,
  updateProfile,
  googleLogin,
} = require('../controller/user.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post('/register', userRegistration);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.patch('/update-profile', protect, updateProfile);

module.exports = router;
