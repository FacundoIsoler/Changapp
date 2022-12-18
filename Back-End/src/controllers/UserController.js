const { User, UserRol } = require("../db");

const add = async (user_data, user_role = "User") => {
  try {
    return await User.create({ ...user_data, UserRolName: user_role });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findByEmail = async (email) => {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserRole = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user.UserRolName;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  add,
  findByEmail,
  getUserRole,
};
