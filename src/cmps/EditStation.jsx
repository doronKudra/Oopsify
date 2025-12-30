import { store } from '../store/store'
import { useRef, useState } from 'react'
import { updateStation, loadStation } from '../store/actions/station.actions'
import { useSelector } from 'react-redux'

export function EditStation({ closeModal }) {

    const station = useSelector(storeState => storeState.stationModule.station)
    const [name, setName] = useState(station?.name || '')
    const [description, setDescription] = useState(station?.description || '')
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(imageFile ? URL.createObjectURL(imageFile) : station?.images[0]?.url)
    const fileInputRef = useRef(null)

    async function onSave() {
        if (!station) return

        const updatedStation = {
            ...station,
            name,
            description,
            imageFile, // 👈 important
        }

        await updateStation(updatedStation)
        closeModal()
    }

    function onImageChange(e) {
        const file = e.target.files[0]
        if (!file) return

        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
    }
    return <div className="edit-modal-container">
        <div onMouseDown={closeModal} className="edit-modal-backdrop"></div>
        <div onMouseDown={e => e.stopPropagation()} className="edit-modal">
            <header className="edit-modal-header">
                <h2>Edit details</h2>
                <button onClick={closeModal} className="edit-modal-close-btn"><svg height="16px" width="16px" role="img" aria-label="Close" aria-hidden="false" className="edit-modal-close-icon" viewBox="0 0 16 16" ><path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06"></path></svg></button>
            </header>
            <div className="edit-modal-body">
                <div className="edit-modal-image-container">
                    <img
                        className="edit-modal-img"
                        src={imagePreview || '/src/assets/images/liked-songs.png'}
                        alt="Station cover"
                        onClick={() => fileInputRef.current?.click()}
                    />
                    <div className="edit-modal-image-overlay" onClick={() => fileInputRef.current?.click()}>

                    </div>
                    <input
                        ref={fileInputRef}
                        id="station-image-input"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={onImageChange}
                    />
                </div>
                <div className="edit-modal-fields">
                    <div className="edit-modal-name-field">
                        <span className="edit-modal-fields-label">Name</span>
                        <input type="text" placeholder="Add a name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="edit-modal-desc-field">
                        <span className="edit-modal-fields-label">Description</span>
                        <textarea placeholder="Add an optional description" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                </div>
            </div>
            <footer className="edit-modal-footer">
                <button onClick={onSave} className="edit-modal-save-btn">Save</button>
            </footer>
        </div>
    </div>
}