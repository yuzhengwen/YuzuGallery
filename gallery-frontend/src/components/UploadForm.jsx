import { useState } from 'react';
import api from '../api/api';

function UploadForm() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const handleChange = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg)');
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            // this encoding allows us to send files
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const formData = new FormData();
            formData.append('title', e.target.title.value);
            formData.append('description', e.target.description.value);
            formData.append('image_file', file);
            api.post('/api/gallery/', formData, config)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setError('Please select an image file (png or jpeg)');
        }
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-container">
                <h1>Upload Image</h1>
                <input type="text" placeholder="Title" name='title' />
                <textarea rows={4} type="text" placeholder="Description" name='description' />
                <label htmlFor="file-upload" class="custom-file-upload">
                    Choose Image
                </label>
                <input id='file-upload' type="file" accept="image/*" onChange={handleChange} name='image_file' />
                <button className='submit-button' type="submit">Upload</button>
                <div className="output">
                    {error && <div className="error">{error}</div>}
                    {file && <div>{file.name}</div>}
                </div>
            </div>
        </form>
    );
}

export default UploadForm;