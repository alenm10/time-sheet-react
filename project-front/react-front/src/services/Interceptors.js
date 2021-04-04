/*export default function authHeader() {
  
    if (localStorage.getItem('token')) {
        console.log("gettokenhere = ", localStorage.getItem('token'))
        return { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    } else {
      return {};
    }
  }*/
  var axios = require("axios");

export const jwtToken = localStorage.getItem("token");

axios.interceptors.request.use(
  function(config) {
    if (jwtToken) {
      config.headers["Authorization"] = "Bearer " + jwtToken;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);
  