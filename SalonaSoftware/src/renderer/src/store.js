import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import branchReducer from './slices/branchSlice'
import serviceReducer from './slices/serviceSlice'
import maintainerReducer from './slices/maintainerSlice'
import comboReducer from './slices/comboSlice'
export const store = configureStore({
  reducer: {
    todos: authReducer,
    branch: branchReducer,
    service: serviceReducer,
    maintainer: maintainerReducer,
    combo: comboReducer
  }
})
