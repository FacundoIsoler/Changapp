const { UserLogin } = require("../db");

const find = async (oauth_id) => {
  try {
    const userLogin = await UserLogin.findOne({ where: { oauth_id } });

    return userLogin?.UserId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const add = async (user_login_data) => {
  try {
    return await UserLogin.create(user_login_data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  find,
  add,
};
