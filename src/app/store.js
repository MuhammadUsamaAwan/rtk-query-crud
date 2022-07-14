import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rtkQueryErrorLogger } from '../middleware/rtkQueryErrorLogger'
import { postApi } from '../services/postService'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger, postApi.middleware),
})

setupListeners(store.dispatch)
