import { useEffect, useState } from 'react'
import '../App.css'
import '../../styles/gallery.css'
import Modal from '../components/Modal'
import api from '../api/api'

function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const handleImageClick = (item, index) => {
    setSelectedImage(item)
    setSelectedIndex(index)
  }
  const handleNextImage = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedImage(images[selectedIndex + 1])
      setSelectedIndex(selectedIndex + 1)
    } else {
      setSelectedImage(images[0])
      setSelectedIndex(0)
    }
  }

  return (
    <>
      <div className='wrapper'>
        <div id='gallery'>
          {images.map((item, index) => (
            <div key={index} className='image-wrapper' onClick={() => handleImageClick(item, index)}>
              <img src={item.thumbnail_url} alt={item.description} />
            </div>
          ))}
        </div>
        {selectedImage && <Modal selectedImage={selectedImage} onNextImage={handleNextImage} setSelectedImage={setSelectedImage} />}
      </div>
    </>
  )
}

export default Gallery;
