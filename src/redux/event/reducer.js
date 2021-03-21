import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSingleEventAPI, sendMessageAPI, toggleEventGoAPI } from '../api/eventsApi'

export const getSingleEventThunk = createAsyncThunk(
  'event/getSingleEventThunk',
  async (groupId) => {
    const response = await getSingleEventAPI(groupId)
    return await response.data
  }
)

export const sendMessageThunk = createAsyncThunk(
  'event/sendMessageThunk',
  async (msg) => {
    console.log(msg)
    const response = await sendMessageAPI(msg)
    return await response.data
  }
)

const nullEvent = {
  id: null,
  messageGroup: {
      message_group_id: null,
      messages: []
  },
  city: null,
  tags: [],
  name: null,
  description: null,
  startDate: null,
  postedDate: null,
  attendingPeople: [],
  maxPeople: null,
  ownerUser: {
      username: null,
      id: 3,
  }
}

export const singleEventSlice = createSlice({
  name: 'event',
  initialState: {
    event: {
      id: null,
      messageGroup: {
          message_group_id: null,
          messages: []
      },
      city: null,
      tags: [],
      name: null,
      description: null,
      startDate: null,
      postedDate: null,
      attendingPeople: [],
      maxPeople: null,
      ownerUser: {
          username: null,
          id: 3,
      }
    },
    loading: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: {
    [getSingleEventThunk.pending]: (state, _) => {
      state.loading = 'pending'
    },
    [getSingleEventThunk.fulfilled]: (state, action) => {

      console.log(action.payload)
      state.loading = 'idle'
      state.event = action.payload
    },
    [getSingleEventThunk.rejected]: (state, action) => {
      state.event = nullEvent
      state.createEventLoading = 'idle'
      if (action.payload) {
        state.createEventError = action.payload.errorMessage
      } else {
        state.createEventError = action.error
      }
    },
    [sendMessageThunk.fulfilled]: (state, action) => {
      state.event.messageGroup.messages.push({...action.payload})
    }
  }
})