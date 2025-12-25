import { createContext, useContext, useState } from 'react'
import { EditStation } from './EditStation.jsx'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
    const [activeModal, setActiveModal] = useState(null)

    function openEditStation() {
        setActiveModal('edit-station')
    }

    function closeModal() {
        setActiveModal(null)
    }

    return (
        <ModalContext.Provider value={{ openEditStation, closeModal }}>
            {children}

            {activeModal === 'edit-station' && (
                <EditStation closeModal={closeModal} />
            )}
        </ModalContext.Provider>
    )
}

export function useModal() {
    return useContext(ModalContext)
}