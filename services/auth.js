const session_person_map = new Map();

function setsession(id, person) {
  console.log("Setting session:", id, person); 
  session_person_map.set(id, person);
}

function getsession(id) {
  const sessionData = session_person_map.get(id);
  console.log("Retrieving session for ID:", id, "Found:", sessionData); 
  return sessionData; 
}


module.exports = {
  setsession,
  getsession,
};
