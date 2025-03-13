import api from "../api/api"
import '../App.css'
import { useEffect, useState } from 'react'
import { useAuth } from "../AuthContext"

const Modal = ({ selectedImage, onNextImage, setSelectedImage }) => {
    const [favourite, setFavourite] = useState(null);
    const { isAuthenticated } = useAuth();
    const isFavourite = () => favourite !== null;
    const handleDismiss = (e) => {
        if (e.target.classList.contains('dismiss')) {
            setSelectedImage(null)
        }
    }
    const handleToggleFavourite = async (image) => {
        if (!isAuthenticated) {
            alert('You must be logged in to add images to favourites');
            return;
        }
        try {
            if (isFavourite()) {
                const response = await api.delete(`/api/favourites/${favourite.id}/`);
                if (response.status === 204) {
                    console.log('Image removed from favourites');
                    setFavourite(null);
                }
            } else {
                const response = await api.post('/api/favourites/', { image: image.id })
                if (response.status === 201) {
                    console.log('Image added to favourites')
                    setFavourite(response.data);
                }
            }
        } catch (e) {
            console.log('Error', e)
        }
    }
    const checkIfFavourite = async (image) => {
        console.log(`Auth: ${isAuthenticated}`);
        if (!isAuthenticated) {
            setFavourite(null);
            return;
        }
        try {
            const response = await api.get('/api/favourites/')
            if (response.status === 200) {
                const fav_ids = response.data.map((fav) => fav.image);
                console.log(fav_ids);
                if (fav_ids.includes(image.id)) {
                    setFavourite(response.data.filter((fav) => fav.image === image.id)[0])
                    return true;
                }
                setFavourite(null);
            }
        } catch (e) {
            console.log('Error', e)
        }
    }
    useEffect(() => {
        checkIfFavourite(selectedImage);
    }, [selectedImage])
    return (
        <>
            <div className='overlay dismiss' onClick={handleDismiss}>
                <div id='modal-toolbar'>
                    <button id='fav-button'
                        className={isFavourite() ? 'active' : ''}
                        onClick={() => handleToggleFavourite(selectedImage)}>
                        Favourite
                    </button>
                    <button id='next-button' onClick={onNextImage}>Next</button>
                    <button id='close-button' className='dismiss' onClick={handleDismiss}>Close</button>
                </div>
                <div className='modal'>
                    <div id='modal-left-pane' className='modal-pane'>
                        <img src={selectedImage.image_file} alt='modal' />
                    </div>
                    <div id='modal-right-pane' className='modal-pane'>
                        <h2>{selectedImage.title}</h2>
                        <p>{selectedImage.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Modal;