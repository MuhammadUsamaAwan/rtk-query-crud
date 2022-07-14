import { notification } from 'antd'

const openNotification = (type = 'error', message = '') => {
  notification[type]({
    message,
  })
}

export default openNotification
