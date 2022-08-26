import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export function App() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');

  const incrementPage = () => {
    setPage(prevState => ({
      page: prevState.page + 1,
    }));
  };

  const onSubmit = event => {
    event.preventDefault();
    const searchName = event.currentTarget.name.value;

    setName(searchName);
    setPage(1);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery name={name} incrementPage={incrementPage} page={page} />
    </div>
  );
}
