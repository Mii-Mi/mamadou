import axios from "axios"
import axiosConfig from './src/config/axios_config'
 
export default axios.create({
  baseURL: axiosConfig.baseUrl,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
});