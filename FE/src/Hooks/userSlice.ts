import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSend } from '../API/DTOs/userTypes'
import type { RootState } from '../store'

// Define a type for the slice state
export interface UserState {
  value: UserSend
}

// Define the initial state using that type
const initialState: UserState = {
  value: {
    email: "",
    password: ""
  },
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<UserSend>) => {
      state.value = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.value

export default userSlice.reducer