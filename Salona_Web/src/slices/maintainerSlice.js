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
    maintianerEditMaintainer: (state, action) => {
      const updatedMaintainer = action.payload 
      state.result = state.result.map((maintainer) =>
        maintainer.id === updatedMaintainer.id ? updatedMaintainer : maintainer
      )
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
  maintianerEditMaintainer,
  maintainerAddMaintainer,
  maintainerReset
} = maintainerSlice.actions
export default maintainerSlice.reducer
