import { createSlice } from '@reduxjs/toolkit'

const salonSlice = createSlice({
  name: 'salon',
  initialState: {
    loading: false,
    error: null,
    result: null
  },
  reducers: {
    salonRequest: (state, action) => {
      state.loading = true
      state.result = {}
      state.error = null
    },
    salonSuccess: (state, action) => {
      state.loading = false
      state.result = action.payload
      state.error = null
    },
    salonFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.result = {}
    },
    salonReset: (state, action) => {
      state.loading = false
      state.error = null
      state.result = {}
    }
  }
})

export const selectSalon = (state) => state.salon.result

export const { salonFailed, salonSuccess, salonRequest, salonReset } = salonSlice.actions
export default salonSlice.reducer
