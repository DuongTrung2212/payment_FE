import axios from "axios";
const requestAxios = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin' : '*',
    }
});
export default requestAxios;