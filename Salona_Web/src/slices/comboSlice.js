import { createSlice } from '@reduxjs/toolkit'

const comboSlice = createSlice({
  name: 'combo',
  initialState: {
    loading: false,
    error: null,
    result: []
  },
  reducers: {
    comboRequest: (state, action) => {
      state.loading = true
      state.error = null
    },
    comboSuccess: (state, action) => {
      state.loading = false
      state.result = action.payload
    },
    comboFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    comboAddCombo: (state, action) => {
      state.result = [...state.result, action.payload]
    },
    comboEdit: (state, action) => {
      const newResult = state.result.filter((vendor) => vendor.id !== action.payload.id)
      state.result = newResult
    },
    comboReset: (state, action) => {
      state.loading = false
      state.error = null
      state.result = []
    }
  }
})

export const selectCombo = (state) => state.combo.result

export const { comboFailed, comboSuccess, comboRequest, comboAddCombo, comboEdit, comboReset } =
  comboSlice.actions
export default comboSlice.reducer
