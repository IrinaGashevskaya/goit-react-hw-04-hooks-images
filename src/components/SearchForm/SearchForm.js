import { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import { ImSearch } from 'react-icons/im';
const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchInput = e => {
    const { value } = e.currentTarget;

    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch(query);

    resetForm();
  };

  const resetForm = () => setQuery('');

  return (
    <form onSubmit={handleSubmit} className="SearchForm">
      <button type="submit" className="buttonForm">
        <ImSearch width="20px" height="20px" fill="#7e7b7b" />
      </button>

      <input
        type="text"
        className="input"
        name="query"
        value={query}
        onChange={handleSearchInput}
        autoComplete="off"
        autoFocus
      />
    </form>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
