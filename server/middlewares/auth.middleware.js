const AuthService = require('../services/auth.service');
const UserService = require('../services/user.service');

exports.protect = async (req, res, next) => {
  try {
    const loginToken = req.headers['login-token'];

    if (!loginToken) {
      const error = new Error('Login token not provided');
      error.status = 401;
      return next(error);
    }

    const userData = AuthService.VerifyToken(loginToken);

    if (!userData?.userId) {
      const error = new Error('Invalid token');
      error.status = 403;
      return next(error);
    }

    const user = await UserService.getUserData({ _id: userData.userId });

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    delete user.password;
    req.sessionDetails = user;

    next(); // Continue to the next middleware
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
