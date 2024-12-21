import { createSlice } from '@reduxjs/toolkit'

const maintainerSlice = createSlice({
  name: 'maintiner',
  initialState: {
    loading: false,
    error: null,
    result: []
  },
  reducers: {
    maintainerRequest: (state, action) => {
      state.loading = true
      state.error = null
    },
    maintainerSuccess: (state, action) => {
      state.loading = false
      state.result = action.payload
    },
    maintainerFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    maintainerAddService: (state, action) => {
      state.result = [...state.result, action.payload]
    }
  }
})

export const selectService = (state) => state.maintainer.result

export const { maintainerFailed, maintainerSuccess, maintainerRequest, maintainerAddService } =
  maintainerSlice.actions
export default maintainerSlice.reducer
