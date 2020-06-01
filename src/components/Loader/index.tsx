import React, { useContext, useState } from "react"
import { Spinner, Modal } from "reactstrap"
import './style.css'

type LoaderProps = {
  onLoader(value: boolean): void
}

const LoaderContext = React.createContext<LoaderProps>({
  onLoader: () => { }
})

export const LoaderProvider: React.FC = ({ children }) => {
  const [loader, onLoader] = useState(false)

  return (
    <LoaderContext.Provider value={{ onLoader }}>
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
