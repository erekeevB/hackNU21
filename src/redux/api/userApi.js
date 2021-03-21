import { API } from './axiosCreater';

export const loginAPI = (profile) => {

  return API.post('/auth/login', profile)

}

export const registerAPI = (profile) => {

  return API.post('/auth/register', profile)

}

export const logoutAPI = () => {

  return API.delete('/auth/logout')

}

export const currentUserAPI = () => {

  return API.get('/auth/me')

}

export const setPreferenceAPI = (preferences) => {

  return API.patch('/user/tags', preferences)

}