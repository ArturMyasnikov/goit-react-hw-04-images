import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { Triangle } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export default function ImageGallery({ name, incrementPage, page }) {
  const [photo, setPhoto] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const onModalToggle = () => {
    setShowModal(prevState => !prevState);
  };

  const showLargeImage = event => {
    onModalToggle();

    const photoIndex = event.target.getAttribute('name');
    const url = photo[photoIndex].webformatURL;

    setLargeImageURL(url);
  };

  const fetchPhoto = () => {
    return fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=28717517-f64785f1a0bcfad607225ab19&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response => response.json());
  };

  useEffect(() => {
    if (name === '') {
      return;
    }

    setLoading(true);
    fetchPhoto()
      .then(data => {
        setPhoto(data.hits);
        setTotalHits(data.totalHits);
      })
      .finally(() => setLoading(false)); // eslint-disable-next-line
  }, [name]);
  // setTimeout(
  //   () =>
  //     fetchPhoto()
  //       .then(data => {
  //         setPhoto(data.hits);
  //         setTotalHits(data.totalHits);
  //       })
  //       .finally(() => setLoading(false)),
  //   0
  // );

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setLoading(true);
    fetchPhoto()
      .then(data => setPhoto(prevState => [...prevState, ...data.hits]))
      .finally(() => setLoading(false)); // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <ul className="imageGallery">
        {loading && (
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName="loader"
            visible={true}
          />
        )}
        {showModal && (
          <Modal
            showModal={showModal}
            onModalToggle={onModalToggle}
            largeImageURL={largeImageURL}
          />
        )}
        {photo &&
          photo.map((photo, index) => {
            return (
              <li
                key={photo.webformatURL}
                onClick={showLargeImage}
                className="imageGalleryItem"
              >
                <img
                  name={index}
                  className="imageGalleryItem-image"
                  src={photo.webformatURL}
                  alt={photo.tags}
                />
              </li>
            );
          })}
      </ul>
      <Button
        incrementPage={incrementPage}
        page={page}
        photo={photo}
        totalHits={totalHits}
      />
    </>
  );
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  incrementPage: PropTypes.func,
};
