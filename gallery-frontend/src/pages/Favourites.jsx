import GalleryComponent from '../components/Gallery';
import { useEffect, useState } from 'react'
import api from '../api/api'

// only for logged in users
function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const [images, setImages] = useState([]);

    const fetchFavourites = async () => {
        const response = await api.get('/api/favourites')
        setFavourites(response.data);
    }
    const fetchImages = async () => {
        const response = await api.get('/api/gallery')
        const fav_ids = favourites.map((fav) => fav.image);
        const filteredImages = response.data.filter(image => fav_ids.includes(image.id));
        setImages(filteredImages);
    }

    useEffect(() => {
        if (favourites.length > 0) {
            fetchImages();
        }
    }, [favourites]); // This will run whenever `favourites` state is updated

    useEffect(() => {
        fetchFavourites();
    }, []); // This will run once when the component is mounted

    return <GalleryComponent images={images} />;
}
export default Favourites;