import { configureStore } from '@reduxjs/toolkit'
import words from '../slices/wordsSlice'
import app from '../slices/appSlice'
import currentUser from '../slices/currentUserSlice'

export const store = configureStore({
  reducer: {
    currentUser,
    words,
    app
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch