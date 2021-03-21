import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { currentUserAPI, loginAPI, logoutAPI, registerAPI, setPreferenceAPI } from "../api/userApi"

export const getUserThunk = createAsyncThunk(
  'users/getUserThunk',
  async (profile) => {
    const response = await currentUserAPI(profile)
    return await response.data
  }
)

export const setPreferenceThunk = createAsyncThunk(
  'users/setPreferenceThunk',
  async (preferences) => {
    const response = await setPreferenceAPI(preferences)
    return await response.data
  }
)

export const signInThunk = createAsyncThunk(
  'users/signInThunk',
  async (profile) => {
    const response = await loginAPI(profile)
    return await response.data
  }
)

export const signUpThunk = createAsyncThunk(
  'users/signUpThunk',
  async (profile) => {
    const response = await registerAPI(profile)
    return await response.data
  }
)

export const logoutThunk = createAsyncThunk(
  'users/logoutThunk',
  async () => {
    const response = await logoutAPI()
    return await response.data
  }
)

const nullUser = {
  id: null,
  username: null,
  firstName: null,
  lastName: null,
  age: null,
  gender: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: {
      id: null,
      username: null,
      firstName: null,
      lastName: null,
      age: null,
      gender: null,
      preferenceTags: []
    },
    isAuth: false,
    isInitialized: false,
    loading: 'idle',
    error: null
  },
  reducers: {
    setLoadingIdle: (state, _) => {
      state.loading = 'idle'
    }
  },
  extraReducers: {
    [signInThunk.pending]: (state, _) => {
      state.loading = 'pending'
    },
    [signInThunk.fulfilled]: (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.loading = 'completed'
      state.error=null
    },
    [signInThunk.rejected]: (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error
      }
      state.loading = 'idle'
      state.isAuth = false
    },
    [signUpThunk.pending]: (state, _) => {
      state.loading = true
    },
    [signUpThunk.fulfilled]: (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.loading = 'completed'
      state.error=null
    },
    [signUpThunk.rejected]: (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error
      }
      state.loading = 'idle'
      state.isAuth = false
    },
    [logoutThunk.fulfilled]: (state, _) => {
      state.user = nullUser
      state.isAuth = false
      state.error=null
    },
    [getUserThunk.fulfilled]: (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.isInitialized = true
    },
    [getUserThunk.rejected]: (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error
      }
      state.user = nullUser
      state.isInitialized = true
    },
    [setPreferenceThunk.fulfilled]: (state, action) => {
      state.user = action.payload
      state.loading = 'completed'
      state.error=null
    }
  }
})

export const usersReducer = usersSlice.reducer

export const {setLoadingIdle} = usersSlice.actions