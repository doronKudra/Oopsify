

export function EditStation(){
    return <div className="edit-modal">
        <header className="edit-modal-header">
            <h2>Edit details</h2>
            <button>x</button>
        </header>
        <div className="edit-modal-body">
            <div className="edit-modal-image-container">
                <img className="edit-modal-img" src="/src/assets/images/liked-songs.png" alt="" />
                <div className="edit-modal-image-overlay" >

                </div>
            </div>
            <div className="edit-modal-fields">
                <div>
                    <input type="text" />
                </div>
                <div>
                    <textarea />
                </div>
            </div>
        </div>
    </div>
}