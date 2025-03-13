import { useEffect, useState } from 'react'
import '../App.css'
import '../../styles/gallery.css'
import Modal from '../components/Modal'
import GalleryComponent from '../components/Gallery'
import api from '../api/api'

function Gallery() {
  const [images, setImages] = useState([]);
  const route = '/api/gallery';
  const fetchImages = async () => {
    const response = await api.get(route)
    console.log(response.data);
    setImages(response.data);
  }

  useEffect(() => {
    fetchImages();
  }, []);  // Empty dependency array to fetch data only once
  return <GalleryComponent images={images} />;
}

export default Gallery;