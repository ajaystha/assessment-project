import clsx from 'clsx';
import PropTypes from 'prop-types';

import s from './Spinner.module.css';

export default function Spinner({ className }) {
  return <div className={clsx(s.Spinner, className)} />;
}

Spinner.propTypes = {
  className: PropTypes.string,
};
