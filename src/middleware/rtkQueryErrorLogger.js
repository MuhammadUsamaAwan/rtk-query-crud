import { isRejectedWithValue } from '@reduxjs/toolkit'
import openNotification from '../utils/notification'

export const rtkQueryErrorLogger = api => next => action => {
  if (isRejectedWithValue(action)) {
    openNotification('error', 'Something went wrong!')
  }

  return next(action)
}
