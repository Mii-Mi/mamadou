import axios from "axios"
import axiosConfig from './src/config/axios_config'
 
export default axios.create({
  baseURL: axiosConfig.baseUrl,
  // transformResponse: [function (data) {
  //   console.log(data)
  //   // localStorage.setItem('msg', data)
  //   return data;
  // }],
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});