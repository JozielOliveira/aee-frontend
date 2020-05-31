import React, { useState, useContext } from 'react';
import { Alert as AlertComponent } from 'reactstrap'

enum TypeAlert {
  error = 'danger',
  success = 'success',
  warning = 'warning'
}

type TypeAlertKey = keyof typeof TypeAlert;

const AlertContext = React.createContext({
  onAlert: (message: string, type: TypeAlertKey) => { }
})

export const Alert: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string, type: any } | null>(null);

  const onAlert = (message: string, type: TypeAlertKey) => {
    setAlert({ message, type: TypeAlert[type] })
    setTimeout(() => setAlert(null), 5000)
  }

  const IconAlert = (type: any) => {
    switch (type) {
      case 'success':
        return <i className="ni ni-like-2" />
      case 'danger':
        return <i className="ni ni-support-16" />
      case 'warning':
        return <i className="ni ni-bell-55" />
      default:
        return <i className="ni ni-bell-55" />
    }
  }

  return (
    <AlertContext.Provider value={{ onAlert }}>
      {children}
      <AlertComponent
        style={{
          position: 'fixed',
          bottom: 8,
          right: 8,
          paddingRight: 60
        }}
        color={alert?.type}
        isOpen={Boolean(alert?.message)}
        toggle={() => setAlert(null)}
      >
        <span className="alert-inner--icon">
          {IconAlert(alert?.type)}
        </span>
        <span className="alert-inner--text ml-1">
          <strong>{alert?.message}</strong>
        </span>
      </AlertComponent>
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext)

  return context
}
