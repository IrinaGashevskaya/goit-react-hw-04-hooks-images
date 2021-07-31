import React from 'react';
import PropTypes from 'prop-types';
//import styles from './Button.module.scss';
import './Button.css';
const Button = ({ onClick }) => (
  <div>
    <button type="button" className="Button" onClick={onClick}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
