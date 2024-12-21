import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: 14,
    name: 'SAPssfas',
    email: 'ssafssdzazdcssa@gmail.com',
    phone: '7887557175',
    password: '',
    is_enabled: true,
    role: 'SO',
    exp: 1736791698,
    salon_id: 2
  },
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.phone = action.payload.phone
      state.email = action.payload.email
      state.token = action.payload.token
      state.role = action.payload.role
      state.salon_id = action.payload.salon_id
    }
  }
})

export const { todoAdded, todoToggled } = authSlice.actions
export default authSlice.reducer
