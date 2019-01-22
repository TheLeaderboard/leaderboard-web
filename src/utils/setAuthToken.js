import axios from "axios";

function setAuthToken(token) {
  if (token) {
    // apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default setAuthToken;
