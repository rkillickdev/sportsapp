import axios from 'axios';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_HOST}`
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// axios.defaults.withCredentials = true;


export const axiosReq = axios.create();
export const axiosRes = axios.create();