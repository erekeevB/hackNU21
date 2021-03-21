import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createEventAPI, getEventsAPI, toggleEventGoAPI } from '../api/eventsApi'
import { logoutThunk } from '../user/reducer'

export const createEventThunk = createAsyncThunk(
  'event/createEventThunk',
  async (event) => {
    const response = await createEventAPI(event)
    return await response.data
  }
)

export const getEventsThunk = createAsyncThunk(
  'events/getEventsThunk',
  async (tags) => {
    const response = await getEventsAPI(tags)
    return await response.data
  }
)

export const toggleEventGoThunk = createAsyncThunk(
  'event/toggleEventGoThunk',
  async (event) => {
    const response = await toggleEventGoAPI(event)
    return await response.data
  }
)

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    eventsError: null,
    eventsLoading: 'idle',
    createEventError: null,
    createEventLoading: 'idle'
  },
  reducers: {
    setCreateEventLoadingIdle: (state, _) => {
      state.createEventLoading = 'idle'
    }
  },
  extraReducers: {
    [createEventThunk.pending]: (state, _) => {
      state.createEventLoading = 'pending'
    },
    [createEventThunk.fulfilled]: (state, _) => {
      state.createEventLoading = 'complete'
      state.createEventError = null
    },
    [createEventThunk.rejected]: (state, action) => {
      state.createEventLoading = 'idle'
      if (action.payload) {
        state.createEventError = action.payload.errorMessage
      } else {
        state.createEventError = action.error
      }
    },
    [getEventsThunk.pending]: (state, _) => {
      state.loading = 'pending'
    },
    [getEventsThunk.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.events = action.payload.content
      state.createEventError = null
    },
    [getEventsThunk.rejected]: (state, action) => {
      if (action.payload) {
        state.eventsError = action.payload.errorMessage
      } else {
        state.eventsError = action.error
      }
      state.loading = 'idle'
    },
    [toggleEventGoThunk.fulfilled]: (state, action) => {
      return {
        ...state,
        events: [...state.events.map((el)=>{
          if(el.event_id===action.payload.id){
            return {
              ...el,
              isGoing: action.payload.going
            }
          }else{
            return {...el}
          }
        })]
      }
    },
    [logoutThunk.fulfilled]: (state, _) => {
      state.events = []
      state.eventsError = null
      state.eventsLoading = 'idle'
      state.createEventError = null
      state.createEventLoading = 'idle'
    }
  }
})

export const {setCreateEventLoadingIdle} = eventsSlice.actions