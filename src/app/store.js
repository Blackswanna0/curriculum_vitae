import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '../features/profile/profileSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    theme: themeReducer,
  },
})