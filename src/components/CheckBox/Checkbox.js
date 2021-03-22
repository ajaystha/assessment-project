import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import s from './Checkbox.module.css';

export default function Checkbox(props) {
  const { value, defaultChecked, onToggle } = props;

  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    onToggle(checked);

    // eslint-disable-next-line
  }, [checked]);

  return (
    <div className={s.CheckboxWrapper}>
      <input
        type="checkbox"
        id={value}
        value={value}
        checked={checked}
        onChange={(ev) => setChecked(ev.currentTarget.checked)}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
}

Checkbox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultChecked: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};
