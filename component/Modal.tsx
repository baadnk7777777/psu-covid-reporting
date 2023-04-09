import React, { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        >X</div>

        <div className="bg-white rounded-lg p-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal
