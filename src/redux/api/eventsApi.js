import { API } from './axiosCreater';

export const createEventAPI = (event) => {

  return API.post('/event', event)

}

export const getForYouEventsAPI = () => {

  return API.get('/event/foryou')

}

export const getEventsAPI = (tags) => {

  let tempTag = tags ? tags : null
  return API.get('/event/all' + (tempTag ? '?tags=' + tempTag.toString() : ''))

}

export const toggleEventGoAPI = (eventID) => {

  return API.patch('/user/go/' + eventID)

}

export const getSingleEventAPI = (eventID) => {

  return API.get('/event/' + eventID)

}

export const sendMessageAPI = ({eventID, text}) => {

  return API.post('/message/' + eventID, {text})

}