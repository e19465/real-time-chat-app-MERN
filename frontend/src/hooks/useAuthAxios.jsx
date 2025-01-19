import axios from "axios";
const API_BASE_URL = process.env.VITE_BACKEND_URL;

const useAuthAxios = () => {
  const jwtAxios = axios.create({ baseURL: API_BASE_URL });

  //TODO: Implement the interceptor with refresh token logic

  return jwtAxios;
};

export default useAuthAxios;
