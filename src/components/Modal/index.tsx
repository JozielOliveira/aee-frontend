import React, { useState, useContext } from 'react'
import {
  Button,
  Modal as ModalComponent
} from 'reactstrap'

enum TypeAlert {
  error = 'danger',
  success = 'success',
  warning = 'warning'
}

type TypeAlertKey = keyof typeof TypeAlert;


type ModalState = {
  open?: boolean;
  title: string;
  description: string;
  subDescription?: string;
  icon?: TypeAlertKey;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: Function
}

const initialModal = {
  open: false,
  title: '',
  description: '',
  icon: undefined,
  confirmText: 'OK',
  cancelText: 'Fechar',
  onConfirm: () => { }
}

const ModalContext = React.createContext({
  onOpenModal: (options: ModalState) => { }
})

export const ModalProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<ModalState>(initialModal)

  const IconAlert = (type: any) => {
    switch (type) {
      case 'success':
        return <i className="ni ni-like-2 ni-3x" />
      case 'danger':
        return <i className="ni ni-support-16 ni-3x" />
      case 'warning':
        return <i className="ni ni-bell-55 ni-3x" />
      case 'info':
        return <i className="ni ni-bell-55 ni-3x" />
      default:
        return <></>
    }
  }

  const onOpenModal = (options: ModalState) => {
    setModal({ open: true, ...options })
  }

  const onModalClose = () => setModal(initialModal)

  const handleConfirm = () => {
    if (modal.onConfirm) modal.onConfirm()
    onModalClose()
  }

  return (
    <ModalContext.Provider value={{ onOpenModal }}>
      {children}
      <ModalComponent
        className="modal-dialog-centered modal-danger"
        contentClassName="bg-gradient-danger"
        isOpen={modal.open}
        toggle={onModalClose}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-notification">
            <strong>{modal.title}</strong>
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={onModalClose}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center">
            {IconAlert(modal.icon)}
            <h4 className="heading mt-4">{modal.description}</h4>
            <p>
              {modal.subDescription}
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            className="btn-white"
            color="default"
            type="button"
            onClick={handleConfirm}
          >
            {modal.confirmText}
          </Button>
          <Button
            className="text-white ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={onModalClose}
          >
            {modal.cancelText}
          </Button>
        </div>
      </ModalComponent>
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)

  return context
}
