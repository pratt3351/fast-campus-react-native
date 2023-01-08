import axios from 'axios';

export const createAxiosInstance = () => {
  return axios.create({
    baseURL: 'https://dog.ceo/api/',
  });
};

export const api = createAxiosInstance();

