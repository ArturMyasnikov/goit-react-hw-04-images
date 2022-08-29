import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ onModalToggle, largeImageURL }) {
  const onKeyHandle = e => {
    if (e.code === 'Escape') {
      onModalToggle();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyHandle);

    return () => {
      window.removeEventListener('keydown', onKeyHandle);
    };
  }, []);

  return (
    <div
      onClick={e => {
        if (e.target.classList.contains('overlay')) {
          onModalToggle();
        }
      }}
      className="overlay"
    >
      <div className="modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onModalToggle: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};
