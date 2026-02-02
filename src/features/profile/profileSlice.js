import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  personal: {
    name: '',
    role: '',
    location: '',
    email: '',
  },
  about: '',
  skills: [],
  experience: [],
  education: [],
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
})

export default profileSlice.reducer
