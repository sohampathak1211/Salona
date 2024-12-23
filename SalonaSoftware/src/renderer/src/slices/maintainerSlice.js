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
      state.result = []
      state.error = null
    },
    maintainerSuccess: (state, action) => {
      state.loading = false
      state.result = action.payload
      state.error = null
    },
    maintainerFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.result = []
    },
    maintainerAddMaintainer: (state, action) => {
      state.result = [...state.result, action.payload]
    },
    maintainerReset: (state, action) => {
      state.loading = false
      state.error = null
      state.result = []
    }
  }
})

export const selectMaintainer = (state) => state.maintainer.result

export const {
  maintainerFailed,
  maintainerSuccess,
  maintainerRequest,
  maintainerAddMaintainer,
  maintainerReset
} = maintainerSlice.actions
export default maintainerSlice.reducer
