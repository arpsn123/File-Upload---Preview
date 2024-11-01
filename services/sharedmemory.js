let otp = "";
let otpjob = null
let retriev_candidate = null;

const setotpjob = (newotpjob)=>
{
  otpjob = newotpjob
}
const getotpjob = ()=>{
  return otpjob
}
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

module.exports = { setotp, getotp, setcandidate, getcandidate,setotpjob,getotpjob };
