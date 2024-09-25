const User = require('../models/user.model');

exports.addUser = async (formData) => {
  let user;
  try {
    const data = new User(formData);
    user = await data.save();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getUserData = async (filter) => {
  let data;
  try {
    data = await User.findOne(filter).lean();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.updateUser = async (filter, updatedValue) => {
  let data;
  try {
    data = await User.findOneAndUpdate(
      filter,
      { $set: updatedValue },
      { multi: false, new: true }
    );
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
