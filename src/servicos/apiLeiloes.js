import axios from 'axios';

// create axios
const instance = axios.create({
  baseURL: 'http://10.1.211.225:3000/',
  timeout: 1000,
});

export default instance;
