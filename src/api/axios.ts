import axios from 'axios';
import env from 'react-dotenv';
console.log(env);
export default axios.create({
  baseURL: env.BASE_URL,
});
