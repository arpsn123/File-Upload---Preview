require("dotenv").config();

const credentials = {
  [process.env.USER_1_NAME]: process.env.USER_1_PASSWORD, // 'Tom': 'really'
  [process.env.USER_2_NAME]: process.env.USER_2_PASSWORD, // 'Bartolo': 'ohmygod'
};


module.exports = credentials;


