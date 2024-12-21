import { createSlice } from '@reduxjs/toolkit'

const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    loading: false,
    error: null,
    result: []
  },
  reducers: {
    branchRequest: (state, action) => {
      state.loading = true
      state.error = null
    },
    branchSuccess: (state, action) => {
      state.loading = false
      state.result = action.payload
    },
    branchFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    branchAddBranch: (state, action) => {
      state.result = [...state.result, action.payload]
    }
  }
})

export const selectBranch = (state) => state.branch.result

export const { branchFailed, branchSuccess, branchRequest, branchAddBranch } = branchSlice.actions
export default branchSlice.reducer
