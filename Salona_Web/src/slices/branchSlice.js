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
      state.result = []
    },
    branchSuccess: (state, action) => {
      state.loading = false
      state.result = action.payload
      state.error = null
    },
    branchFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.result = []
    },
    branchAddBranch: (state, action) => {
      state.result = [...state.result, action.payload]
      state.loading = false
      state.result = action.payload
    },
    branchReset: (state, action) => {
      state.loading = false
      state.error = null
      state.result = []
    }
  }
})

export const selectBranch = (state) => state.branch.result;

export const { branchFailed, branchSuccess, branchRequest, branchAddBranch, branchReset } =
  branchSlice.actions
export default branchSlice.reducer
