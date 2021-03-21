import { useEffect, useState } from 'react';
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
