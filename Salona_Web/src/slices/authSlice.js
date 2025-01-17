import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    result: {},
    token: null
  },
  reducers: {
    setAuth: (state, action) => {
      state.result = action.payload.cUser
      state.token = action.payload.token
    },
    clearAuth: (state) => {
      state.result = {}
      state.token = null
    }
  }
})

export const selectUser = (state) => state.auth.result

export const selectRole = (state) => state.auth.result.role;

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
