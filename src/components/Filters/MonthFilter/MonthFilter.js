import { useEffect, useState } from 'react';

import s from './MonthFilter.module.css';

export default function MonthFilter(props) {
  const { selected, onSelectMonth } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(generateMonths());
  }, []);

  function generateMonths() {
    let current = new Date();
    let month = current.getMonth();
    let year = current.getFullYear();

    let month_arr = [];

    for (let i = 0; i < 12; i++) {
      if (i > 0) {
        current.setMonth(month);
      }

      const month_name = current.toLocaleString('default', { month: 'long' });
      month_arr.push({
        id: ('0' + (month + 1)).slice(-2),
        name: `${month_name} ${year}`,
      });

      if (++month === 12) {
        month = 0;
        year++;
      }
    }

    return month_arr;
  }

  const changeHandler = (ev) => {
    const value = ev.currentTarget.value;

    if (parseInt(value) === 0) {
      onSelectMonth(null);
      return;
    }

    onSelectMonth(ev.currentTarget.value);
  };

  return (
    <select className={s.Select} value={selected || 0} onChange={changeHandler}>
      <option value="0">Select a Month</option>

      {options &&
        options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
    </select>
  );
}
