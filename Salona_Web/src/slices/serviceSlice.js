import { createSlice } from '@reduxjs/toolkit'

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    loading: false,
    error: null,
    result: []
  },
  reducers: {
    serviceRequest: (state, action) => {
      state.loading = true
      state.error = null
    },
    serviceSuccess: (state, action) => {
      state.loading = false
      state.result = action.payload
    },
    serviceFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    serviceAddService: (state, action) => {
      state.result = [...state.result, action.payload]
    },
    serviceEdit: (state, action) => {
      const newResult = state.result.filter((vendor) => vendor.id !== action.payload.id)
      state.result = newResult
    },
    serviceReset: (state, action) => {
      state.loading = false
      state.error = null
      state.result = []
    }
  }
})

export const selectService = (state) => state.service.result

export const {
  serviceFailed,
  serviceSuccess,
  serviceRequest,
  serviceAddService,
  serviceEdit,
  serviceReset
} = serviceSlice.actions
export default serviceSlice.reducer
