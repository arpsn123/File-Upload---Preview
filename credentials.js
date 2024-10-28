require("dotenv").config();

const credentials = {
  [process.env.USER_1_NAME]: process.env.USER_1_PASSWORD, 
  [process.env.USER_2_NAME]: process.env.USER_2_PASSWORD, 
};


module.exports = credentials;


