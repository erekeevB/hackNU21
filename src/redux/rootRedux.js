import { configureStore } from '@reduxjs/toolkit'
import { singleEventSlice } from './event/reducer';
import { eventsSlice } from './events/reducer';
import { usersSlice } from './user/reducer';


const reducer = {
  user: usersSlice.reducer,
  events: eventsSlice.reducer,
  event: singleEventSlice.reducer
}

const store = configureStore({
  reducer
})

export default store;