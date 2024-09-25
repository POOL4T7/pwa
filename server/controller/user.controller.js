const AuthService = require('../services/auth.service');
const UserServices = require('../services/user.service');

exports.userRegistration = async (req, res, next) => {
  try {
    const isExists = await UserServices.getUserData({
      email: req.body.email,
    });
    if (!isExists) {
      const password = AuthService.generateRandomPassword();
      const hashedPassword = await AuthService.generateHashPassword(password);
      const formData = {
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        status: 'active',
      };
      await UserServices.addUser(formData);
      return res.status(201).json({
        success: true,
        message: 'Registration email sended sussefully, plase chcek your email',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }
  } catch (e) {
    e.status = 500;
    return next(e);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const formData = {};
    const { profile, bio, name } = req.body;
    if (profile) formData.profileImage = profile;
    if (bio) formData.bio = bio;
    if (name) formData.name = name;
    const data = await UserServices.updateUser(
      { _id: req.sessionDetails._id },
      formData
    );
    if (data) {
      return res.status(201).json({
        success: true,
        message: 'User profile updated succesfully',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'something went wrong, please try again',
      });
    }
  } catch (e) {
    e.status = 500;
    return next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await UserServices.getUserData({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    const isMatched = await AuthService.verifyPassword(
      req.body.password,
      user.password
    );
    if (isMatched) {
      const token = AuthService.generateToken({ userId: user._id });

      delete user.password;
      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: { user, token },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Password not matched',
      });
    }
  } catch (e) {
    e.status = 500;
    return next(e);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await UserServices.getUserData({
      _id: req.sessionDetails._id,
    });
    delete profile.password;
    return res.status(200).json({
      success: true,
      message: 'User profile',
      data: { profile },
    });
  } catch (e) {
    e.status = 500;
    return next(e);
  }
};
