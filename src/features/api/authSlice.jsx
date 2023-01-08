import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: undefined,
  user: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    }
  },
})

export const { userLoggedIn } = authSlice.actions
export default authSlice.reducer
