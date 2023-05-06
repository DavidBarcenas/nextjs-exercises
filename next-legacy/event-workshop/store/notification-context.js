import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) { },
  hideNotification: function () { },
})

export function NotificationProvider(props) {
  const [activeNotification, setActiveNotification] = useState()

  useEffect(() => {
    if (activeNotification) {
      if (
        activeNotification.status === 'success' ||
        activeNotification.status === 'error') {
        const timer = setTimeout(() => {
          setActiveNotification(null)
        }, 3000);

        return () => {
          clearTimeout(timer)
        }
      }
    }
  }, [activeNotification])

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData)
  }

  function hideNotificationHandler() {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext