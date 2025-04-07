import Form from '../components/Form/Form';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Text from '../components/Text/Text';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import ImageModal from '../components/ImageModal/ImageModal';
import { useEffect, useState } from 'react';
import { getPhotos } from '../apiService/photos';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [images, setImages] = useState([
    {
      id: 3573351,
      avg_color: '#374824',
      src: {
        original:
          'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png',
        large:
          'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=350',
        small:
          'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=130',
      },
      alt: 'Brown Rocks During Golden Hour',
    },
    {
      id: 35733515,
      avg_color: '#374824',
      src: {
        original:
          'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png',
        large:
          'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=350',
        small:
          'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=130',
      },
      alt: 'Brown Rocks During Golden Hour',
    },
  ]);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
        console.log(photos);
        console.log(images);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const getQuery = inputValue => {
    setQuery(inputValue);
    setImages([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc('');
    setModalAlt('');
  };

  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
  };

  return (
    <>
      <Form onSubmit={getQuery} />
      {!error && !isEmpty && !images.length && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {error && <Text textAlign="center">Oops! Something were wrong...</Text>}
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openModal} />
      )}
      {isVisible && images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading..' : 'Load More'}
        </Button>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry, but we didn't find images</Text>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </>
  );
};

export default Photos;
