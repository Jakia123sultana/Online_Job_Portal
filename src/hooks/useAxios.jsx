import axios from "axios";


const axiosInstance = axios.create({
  baseURL: `https://career-code-server-with-crud.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
