import React, { useContext, useState } from "react"
import { Spinner, Modal } from "reactstrap"
import './style.css'

type LoaderProps = {
  onLoader(value: boolean): void
  loader: boolean;
}

const LoaderContext = React.createContext<LoaderProps>({
  onLoader: () => { },
  loader: false,
})

export const LoaderProvider: React.FC = ({ children }) => {
  const [loader, onLoader] = useState(false)

  return (
    <LoaderContext.Provider value={{ onLoader, loader }}>
      {children}
      <Modal
        className="modal-dialog-centered modal-danger"
        contentClassName="content-modal"
        isOpen={loader}
      >
        <Spinner style={{ width: '8rem', height: '8rem' }} color="primary" />
      </Modal>
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const context = useContext(LoaderContext)

  return context;
}
