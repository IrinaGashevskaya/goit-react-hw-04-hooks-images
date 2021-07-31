import React from 'react';

import 'modern-normalize/modern-normalize.css';
import { ImCross } from 'react-icons/im';
import fetchImages from './components/Api/Api';
import IconButton from './components/IconButton/IconButton';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import LoaderApp from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
class App extends React.Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImage: '',
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      error: null,
    });
  };

  getImages = async () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const { hits } = await fetchImages(searchQuery, currentPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
      }));

      if (currentPage !== 1) {
        this.scrollOnLoadButton();
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleGalleryItem = fullImageUrl => {
    this.setState({
      largeImage: fullImageUrl,
      showModal: true,
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImage: '',
    }));
  };
  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
      block: 'end',
    });
  };
  render() {
    const { images, showModal, largeImage, isLoading } = this.state;
    const needToShowLoadMore = images.length > 0 && images.length >= 12;
    return (
      <>
        <SearchBar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onImageClick={this.handleGalleryItem} />
        {needToShowLoadMore && <Button onClick={this.getImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <div className="Close-box">
              <IconButton onClick={this.toggleModal} aria-label="Close modal">
                <ImCross width="20px" height="20px" fill="#7e7b7b" />
              </IconButton>
            </div>
            <img src={largeImage} alt="" className="Modal-image" />
          </Modal>
        )}
        {isLoading && <LoaderApp />}
      </>
    );
  }
}

export default App;
