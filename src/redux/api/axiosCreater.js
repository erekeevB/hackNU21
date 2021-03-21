import * as axios from 'axios';

export const API = axios.create({
    
    baseURL: 'http://192.168.1.149:8080/',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    Host:"http://localhost:8080/"
})