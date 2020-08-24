export const handleError = (notifyUser, error) => {
  return error.json()
    .then(data => {
      notifyUser({ style: 'notification-error', text: data.error })
    })
}
