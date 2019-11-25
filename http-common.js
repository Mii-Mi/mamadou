import axios from "axios";
 
export default axios.create({
  baseURL: "https://cecile.cf:3333/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
});