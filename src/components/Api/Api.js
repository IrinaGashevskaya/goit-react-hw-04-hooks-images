import axios from 'axios';
//import { API_KEY } from './key';

//axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (searchQuery, currentPage) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=21904508-8c5f9bb97b16d01f890abadf2&image_type=photo&orientation=horizontal&per_page=12`,
  );

  return data;
};

export default fetchImages;
