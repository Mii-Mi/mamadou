import axios from "axios";
 
export default axios.create({
  baseURL: "https://cecile.cf/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
});