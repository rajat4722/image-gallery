// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png'; 
import headerImage from './header.png'; 

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <header>
      <div>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1 className="gallery-title">Image Gallery</h1>
        <div>
        {/* <img src={headerImage} alt="Header" className="header-image" /> */}
        </div>
       
      </header>
      <div className="image-container">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img src={image.download_url} alt={`Image ${image.id}`} />
          </div>
        ))}
      </div>
    
<button onClick={loadMoreImages} className="load-more-btn">Load more</button>

    </div>
  );
}

export default App;
