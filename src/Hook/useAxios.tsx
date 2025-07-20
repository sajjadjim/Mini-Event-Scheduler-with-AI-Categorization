import axios from "axios";

const axiosInstance = axios.create({
    baseURL: ``
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;