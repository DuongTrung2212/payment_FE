import axios from 'axios';
import Cookies from 'universal-cookie';

let cookie = new Cookies();
const access=cookie.get('access');
const haveAccess =()=>{ 
  return `Authorization: Bearer ${access||''}`
}
const requestAxios = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    // haveAccess()
    // Authorization: access ? `Bearer ${access}` : null,
  },
});
export default requestAxios;
