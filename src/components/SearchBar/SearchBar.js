import React from 'react';

import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import './SearchBar.css';
//import styles from './Searchbar.module.scss';

const Searchbar = ({ onSubmit }) => (
  <header className="SearchBar">
    <SearchForm onSearch={onSubmit} />
  </header>
);

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
