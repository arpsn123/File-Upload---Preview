let otp = "";
let retriev_candidate = null;

const setotp = (newotp) => {
  otp = newotp;
};
const getotp = () => {
  return otp;
};

const setcandidate = (newcandidate) => {
  retriev_candidate = newcandidate;
};
const getcandidate = () => {
  return retriev_candidate;
};

module.exports = { setotp, getotp, setcandidate, getcandidate };
