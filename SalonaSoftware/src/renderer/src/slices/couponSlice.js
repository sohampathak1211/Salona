import { createSlice } from '@reduxjs/toolkit'

const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    loading: false,
    error: null,
    result: []
  },
  reducers: {
    couponRequest: (state, action) => {
      state.loading = true
      state.error = null
      state.result = []
    },
    couponSuccess: (state, action) => {
      state.loading = false
      state.result = action.payload
      state.result = null
    },
    couponFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.result = []
    },
    couponAddCoupon: (state, action) => {
      state.result = [...state.result, action.payload]
      state.loading = false
      state.result = action.payload
    },
    couponReset: (state, action) => {
      state.loading = false
      state.error = null
      state.result = []
    }
  }
})

export const selectCoupon = (state) => state.coupon.result

export const { couponFailed, couponSuccess, couponRequest, couponAddCoupon, couponReset } =
  couponSlice.actions
export default couponSlice.reducer
