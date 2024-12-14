import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import branchReducer from './slices/branchSlice'

export const store = configureStore({
  reducer: {
    todos: authReducer,
    branch: branchReducer,
  }
})
